/*
 *  Project: StickySections
 *  Description: iOS-style Sticky Section Headers for a flat list
 *  Author: Mary Ann Mierau
 *  License: Dual, MIT and GPL
 */

;(function ( $, window, document, undefined ) {

    var pluginName = 'stickySections',
        defaults = {
            sectionSelector: '.section'
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

          var lastSection = null;
          var lastTop = null;
          var nextTop = null;
          var top = null;

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
            }
          });

          el.find('.sticky_placeholder').remove();
          if (lastSection && lastSection.next(options.sectionSelector)) {
            lastSection.addClass('sticky');
            sections.not(lastSection).removeClass('sticky');

            lastSection.after('<li class="sticky_placeholder"></li>');
            nextTop = 1000;
            if ((nextSection = lastSection.nextAll(options.sectionSelector+':first')).length > 0) {
              nextTop = nextSection.position().top;
            }

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