import Adapt from 'core/js/adapt';
import ComponentView from 'core/js/views/componentView';

class FlipcardView extends ComponentView {

  preRender() {
    this.onClick = this.onClick.bind(this);
    this.listenTo(this.model.getChildren(), 'change:_isActive', this.onItemsActiveChange);

    this.listenTo(Adapt, {
      'device:resize': this.updateLayout,
      'device:changed': this.resetLayout
    });

    this.setupItems();
  }

  postRender() {
    this.$('.flipcard__widget').imageready(() => {
      this.setReadyStatus();
      this.updateLayout();
    });
  }

  setupItems() {
    const _this = this;
    this.itemFlipped = [];
    
    this.model.getChildren().forEach(item => {
      const $itemEl = this.getItemElement(item);
      const index = item.get('_index');
      
      _this.itemFlipped[index] = false;
      $itemEl.on('inview.componentItemView', this.onInviewItem.bind(this));
    });
  }

  onInviewItem(event, visible, visiblePartX, visiblePartY) {
    if (!visible) return;

    const pos = Adapt.device.screenSize === 'small' ? 'top' : 'both';

    if (visiblePartY === pos || visiblePartY === 'both') {
      $(event.currentTarget).off('inview.componentItemView');

      this.resizeHeights();
    }
  }

  onClick(event) {
    this.model.toggleItemsState($(event.currentTarget).data('index'));
  }

  onItemsActiveChange(item, isActive) {
    this.toggleItem(item, isActive);
  }

  toggleItem(item, isActive) {
    const $item = this.getItemElement(item);
    const $backflipcard = $item.find('.flipcard__item-back');
    const itemIndex = item.get('_index');

    if (isActive) {
      this.playAudio(item);
    } else {
      this.stopAudio();
    }

    this.itemFlipped[itemIndex] = isActive;

    Adapt.a11y.toggleAccessibleEnabled($backflipcard, isActive);

    this.resizeHeights();
  }

  getItemElement(item) {
    if (!item) return;
    const index = item.get('_index');
    return this.$('.js-flipcard-item').filter(`[data-index="${index}"]`);
  }

  updateLayout() {
    this.checkInRow();
    this.resizeHeights();

    const $itemBack = this.$('.flipcard__item-back');
    Adapt.a11y.toggleAccessibleEnabled($itemBack, false);
  }

  resetLayout() {
    this.model.resetActiveItems();
  }

  checkInRow($selectedElement) {
    if (Adapt.device.screenSize === 'large') {
      const inRow = this.model.get('_inRow');
      const itemWidth = 100 / inRow;
      this.$('.flipcard__item').css({ width: (itemWidth - 1) + '%' });
    } else {
      this.$('.flipcard__item').css({ 'width': '100%' });
    }
  }

  resizeHeights() {
    const $items = this.$('.flipcard__item');
    const itemLength = this.model.get('_items').length;

    for (let i = 0; i < itemLength; i++) {
      const $item = $items.eq(i);
      let height = $item.find('.flipcard__item-frontImage__image-container').height();

      const $frontflipcard = $item.find('.flipcard__item-frontImage__image-container');
      const $backflipcard = $item.find('.flipcard__item-back');

      // reset
      $item.css('height', 'auto');

      // Check if item is flipped
      if (this.itemFlipped[i] === true) {
        // Check if text is bigger than image
        if ($backflipcard.outerHeight() > height) {
          height = $backflipcard.outerHeight();
        } else {
          height = $frontflipcard.outerHeight();
        }
      } else {
        height = $frontflipcard.outerHeight();
      }

      $item.height(height + 6);
    }
  }

  playAudio(item) {
    if (!Adapt.audio || Adapt.course.get('_audio') && !Adapt.course.get('_audio')._isEnabled) return;

    if (this.model.has('_audio') && this.model.get('_audio')._isEnabled && Adapt.audio.audioClip[this.model.get('_audio')._channel].status==1) {
      // Reset onscreen id
      Adapt.audio.audioClip[this.model.get('_audio')._channel].onscreenID = "";
      // Trigger audio
      Adapt.trigger('audio:playAudio', item.get('_audio').src, this.model.get('_id'), this.model.get('_audio')._channel);
    }
  }

  stopAudio() {
    if (!Adapt.audio || Adapt.course.get('_audio') && !Adapt.course.get('_audio')._isEnabled) return;

    if (this.model.has('_audio') && this.model.get('_audio')._isEnabled) {
      Adapt.trigger('audio:pauseAudio', this.model.get('_audio')._channel);
    }
  }
}

FlipcardView.template = 'flipcard.jsx';

export default FlipcardView;
