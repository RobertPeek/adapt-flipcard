import Adapt from 'core/js/adapt';
import FlipcardModel from './flipcardModel';
import FlipcardView from './flipcardView';

export default Adapt.register('flipcard', {
  model: FlipcardModel,
  view: FlipcardView
});
