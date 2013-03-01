/*
 *  Project: StickySections
 *  Description: iOS-style Sticky Section Headers for a flat list
 *  Author: Mary Ann Mierau
 *  License: Dual, MIT and GPL
 */

;(function ( $, window, document, undefined ) {

    var pluginName = 'stickySections',
        defaults = {
            sectionSelector: '.section',
            placeholder: null
        };

    function Plugin( element, options ) {
        this.element = element;

        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
          $(this.element).scroll(function() {this.handleScroll($(this.element), this.options)}.bind(this));
        },

        handleScroll: function(el, options) {

          var sections = el.find(options.sectionSelector);

          var lastSection = null; // last section with negative top
          var lastTop = null;
          var top = null;
          var nextTop = Number.MAX_VALUE;

          sections.each(function(i,section) {
            section = $(section);
            if (section.hasClass('sticky')) {
              if ((next = section.next()).length > 0) {
                top = next.position().top;
              }
              else {
                // If it's last, it can't scroll beyond the top
                top = 1;
              }
            }
            else {
              top = section.position().top;
            }

            if (top < 0) {
              lastSection = section;
              lastTop = top;
              if (nextSection = sections[i+1]) {
                nextTop = $(nextSection).position().top;
              }
              else {
                nextTop = Number.MAX_VALUE;
              }
            }
          });

          el.find('.sticky_placeholder').remove();
          if (lastSection
              && lastSection.next(options.sectionSelector).length == 0) {
              // check that the next element isn't also a section.
              // If so, it will do the right thing (get pushed up by the next section)
              // if it goes back into the layout when we remove .sticky

            lastSection.addClass('sticky');
            sections.not(lastSection).removeClass('sticky');
            // removing from all first then adding to last causes a flicker

            placeholder = $(options.placeholder || ('<'+lastSection.prop('tagName')+'></'+lastSection.prop('tagName')+'>'));
            placeholder.addClass('sticky_placeholder');
            lastSection.after(placeholder);

            lastSection.css({
              top: (nextTop < lastSection.outerHeight() ? (nextTop - lastSection.outerHeight()) : 0)+'px'
            });
          }
          else {
            sections.removeClass('sticky');
          }
        }
    };

    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName, new Plugin( this, options ));
            }
        });
    };

})( jQuery, window, document );