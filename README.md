StickySections
==============

iOS-style Sticky Section Headers for a flat list.


Usage
--------------
    $('.div_list').stickySections();

Options
--------------

* `sectionSelector`: Default is `.section`. This should match only elements that will act as sticky section headers.

* `placeholder`: Default is `<tagName></tagName>` where tagName is the tag name of the currently sticky section. This should be a "blank" version of the section header that will have the same display/dimensions without visible content if section headers are transparent.

Note: **`placeholder` should NOT match the `sectionSelector`**. That will cause errors and unending sorrow.


CSS
--------------

Standard scrollable list boilerplate, plus the `.sticky` absolute positioning.

    .wrapper {
      height: 200px;
      width: 300px;
      overflow: hidden;
      position: relative;
    }

    .scrollable_list {
      height: 100%;
      overflow: auto;
    }

    .sticky {
      position: absolute; z-index: 1;
      width: 100%;
    }
