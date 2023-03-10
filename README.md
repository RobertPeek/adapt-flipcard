# adapt-flipcard

**Flipcard** is a *presentation component* for the [Adapt framework](https://github.com/adaptlearning/adapt_framework).  

The component generates cards with an image on the front face and text on the back face.  

## Installation

**Flipcard** must be manually installed in the adapt framework and authoring tool.

If **Flipcard** has been uninstalled from the Adapt authoring tool, it may be reinstalled using the [Plug-in Manager](https://github.com/adaptlearning/adapt_authoring/wiki/Plugin-Manager).  

## Settings Overview

The attributes listed below are used in *components.json* to configure **Flipcard**, and are properly formatted as JSON in [*example.json*](https://github.com/RobertPeek/adapt-flipcard/blob/master/example.json).

### Attributes

[**core model attributes**](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes): These are inherited by every Adapt component. [Read more](https://github.com/adaptlearning/adapt_framework/wiki/Core-model-attributes).

**_component** (string): This value must be: `flipcard`.

**_classes** (string): CSS class name to be applied to **Flipcard**’s containing div. The class must be predefined in one of the Less files. Separate multiple classes with a space. A predefined CSS class can be applied to an Accordion Item.

**_layout** (string): This defines the horizontal position of the component in the block. Acceptable values are `full`, `left` or `right`.  

**instruction** (string): This optional text appears above the component. It is frequently used to guide the learner’s interaction with the component.  

**_flipType** (string): This specifies whether all items animate or just the item selected. Acceptable values are `singleFlip` or `allFlip`.  

**_animation** (string): This specifies which animation will reveal the card. Acceptable values are `flipY`, `flipX`,  `slideUp`, `slideDown`, `slideLeft` or `slideRight`.  

**_inRow** (number): This specifies the number of items displayed in a row.  

**_items** (array): Multiple items may be created. Each _item contains values for **frontImage**, **backTitle**, **backBody**, and **_audio**.  

>**frontImage** (string): File name (including path) of the image. Path should be relative to the *src* folder.  

>**backTitle** (string): This text is displayed as the item's title.  

>**backBody** (string): This text is displayed as the item's body text.  

>**_audio** (object): Items can have audio if it is enabled. It contains values for **src**.  

>>**src** (string): File name (including path) of the audio clip.  

## Limitations

No known limitations.  

----------------------------
**Version number:**  1.0.0  
**Framework versions:** 5.8+  
**Author / maintainer:** Robert Peek 
**Accessibility support:** yes   
**RTL support:** yes   
**Authoring tool support:** yes
