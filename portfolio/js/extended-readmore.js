/*!
 * @preserve
 *
 * Readmore.js jQuery plugin
 * Author: @jed_foster
 * Project home: http://jedfoster.github.io/Readmore.js
 * Licensed under the MIT license
 *
 * Debounce function from http://davidwalsh.name/javascript-debounce-function
 */

/* global jQuery */

(function($) {
  'use strict';

  var readmore = 'readmore',
      defaults = {
        speed: 100,
        collapsedHeight: 200,
        heightMargin: 16,
        moreLink: '<a href="#">Read More</a>',
        lessLink: '<a href="#">Close</a>',
        embedCSS: true,
        blockCSS: 'display: block; width: 100%;',
        startOpen: false,

        // callbacks
        beforeToggle: function(){},
        afterToggle: function(){}
      },
      cssEmbedded = {},
      uniqueIdCounter = 0;

  function debounce(func, wait, immediate) {
    var timeout;

    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (! immediate) {
          func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);

      if (callNow) {
        func.apply(context, args);
      }
    };
  }

  function uniqueId(prefix) {
    var id = ++uniqueIdCounter;

    return String(prefix == null ? 'rmjs-' : prefix) + id;
  }

  function setBoxHeights(element) {
    var el = element.clone().css({
          height: 'auto',
          width: element.width(),
          maxHeight: 'none',
          overflow: 'hidden'
        }).insertAfter(element),
        expandedHeight = el.outerHeight(),
        cssMaxHeight = parseInt(el.css({maxHeight: ''}).css('max-height').replace(/[^-\d\.]/g, ''), 10),
        defaultHeight = element.data('defaultHeight');

    el.remove();

    var collapsedHeight = cssMaxHeight || element.data('collapsedHeight') || defaultHeight;

    // Store our measurements.
    element.data({
      expandedHeight: expandedHeight,
      maxHeight: cssMaxHeight,
      collapsedHeight: collapsedHeight
    })
    // and disable any `max-height` property set in CSS
    .css({
      maxHeight: 'none'
    });
  }

  var resizeBoxes = debounce(function() {
    $('[data-readmore]').each(function() {
      var current = $(this),
          isExpanded = (current.attr('aria-expanded') === 'true');

      setBoxHeights(current);

      current.css({
        height: current.data( (isExpanded ? 'expandedHeight' : 'collapsedHeight') )
      });
    });
  }, 100);

  function embedCSS(options) {
    if (! cssEmbedded[options.selector]) {
      var styles = ' ';

      if (options.embedCSS && options.blockCSS !== '') {
        styles += options.selector + ' + [data-readmore-toggle], ' +
          options.selector + '[data-readmore]{' +
            options.blockCSS +
          '}';
      }

      // Include the transition CSS even if embedCSS is false
      styles += options.selector + '[data-readmore]{' +
        'transition: height ' + options.speed + 'ms;' +
        'overflow: hidden;' +
      '}';

      (function(d, u) {
        var css = d.createElement('style');
        css.type = 'text/css';

        if (css.styleSheet) {
          css.styleSheet.cssText = u;
        }
        else {
          css.appendChild(d.createTextNode(u));
        }

        d.getElementsByTagName('head')[0].appendChild(css);
      }(document, styles));

      cssEmbedded[options.selector] = true;
    }
  }

  function Readmore(element, options) {
    var $this = this;

    this.element = element;

    this.options = $.extend({}, defaults, options);

    embedCSS(this.options);

    this._defaults = defaults;
    this._name = readmore;

    this.init();

    // IE8 chokes on `window.addEventListener`, so need to test for support.
    if (window.addEventListener) {
      // Need to resize boxes when the page has fully loaded.
      window.addEventListener('load', resizeBoxes);
      window.addEventListener('resize', resizeBoxes);
    }
    else {
      window.attachEvent('load', resizeBoxes);
      window.attachEvent('resize', resizeBoxes);
    }
  }


  Readmore.prototype = {
    init: function() {
      var $this = this,
          current = $(this.element);

      current.data({
        defaultHeight: this.options.collapsedHeight,
        heightMargin: this.options.heightMargin
      });

      setBoxHeights(current);

      var collapsedHeight = current.data('collapsedHeight'),
          heightMargin = current.data('heightMargin');

      if (current.outerHeight(true) <= collapsedHeight + heightMargin) {
        // The block is shorter than the limit, so there's no need to truncate it.
        return true;
      }
      else {
        var id = current.attr('id') || uniqueId(),
            useLink = $this.options.startOpen ? $this.options.lessLink : $this.options.moreLink;

        current.attr({
          'data-readmore': '',
          'aria-expanded': false,
          'id': id
        });

        current.after($(useLink)
          .on('click', function(event) { $this.toggle(this, current[0], event); })
          .attr({
            'data-readmore-toggle': '',
            'aria-controls': id
          }));

        if (! $this.options.startOpen) {
          current.css({
            height: collapsedHeight
          });
        }
      }
    },

    toggle: function(trigger, element, event, expand) {
      if (event) {
        event.preventDefault();
      }

      if (! trigger) {
        trigger = $('[aria-controls="' + this.element.id + '"]')[0];
      }

      if (! element) {
        element = this.element;
      }

      var $this = this,
          $element = $(element),
          newHeight = '',
          newLink = '',
          expanded = false,
          collapsedHeight = $element.data('collapsedHeight');

      if ($element.height() <= collapsedHeight || expand === true) {
        newHeight = $element.data('expandedHeight') + 'px';
        newLink = 'lessLink';
        expanded = true;
      }
      else {
        newHeight = collapsedHeight;
        newLink = 'moreLink';
      }

      // Fire beforeToggle callback
      // Since we determined the new "expanded" state above we're now out of sync
      // with our true current state, so we need to flip the value of `expanded`
      $this.options.beforeToggle(trigger, element, ! expanded);

      $element.css({'height': newHeight});

      // Fire afterToggle callback
      $element.on('transitionend', function() {
        $this.options.afterToggle(trigger, element, expanded);

        $(this).attr({
          'aria-expanded': expanded
        }).off('transitionend');
      });

      $(trigger).replaceWith($($this.options[newLink])
          .on('click', function(event) { $this.toggle(this, element, event); })
          .attr({
            'data-readmore-toggle': '',
            'aria-controls': $element.attr('id')
          }));
    },

    destroy: function() {
      $(this.element).each(function() {
        var current = $(this);

        current.attr({
          'data-readmore': null,
          'aria-expanded': null
        })
          .css({
            maxHeight: '',
            height: ''
          })
          .next('[data-readmore-toggle]')
          .remove();

        current.removeData();
      });
    }
  };


  $.fn.readmore = function(options) {
    var args = arguments,
        selector = this.selector;

    options = options || {};

    if (typeof options === 'object') {
      return this.each(function() {
        if ($.data(this, 'plugin_' + readmore)) {
          var instance = $.data(this, 'plugin_' + readmore);
          instance.destroy.apply(instance);
        }

        options.selector = selector;

        $.data(this, 'plugin_' + readmore, new Readmore(this, options));
      });
    }
    else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      return this.each(function () {
        var instance = $.data(this, 'plugin_' + readmore);
        if (instance instanceof Readmore && typeof instance[options] === 'function') {
          instance[options].apply(instance, Array.prototype.slice.call(args, 1));
        }
      });
    }
  };

})(jQuery);


/*
*  Extended readmore
*  Adds:
*      - mouseover peak
*      - whiteout over text
*
*  Todo:
*      - merge with with readmore plugin
*      - add whiteout color config (requires gradient generator)
*  Extension Author: @haxiomic (George Corney)
*/

'use strict';
//content truncating with read more link
(function(){
  //arguments
  var containerSelector = '.info';
  //get background color
  var whiteoutColor = $(containerSelector).parents('.item').css('background-color');//must be rgb() or # format

	//settings
  var animationTime = 200;
  var peakAnimationTime = 200;
  var collapsedHeight = 400;
  var whiteoutHeight = 45;
  var whiteoutClass = 'readmore-whiteout';
  var peakAmount = 1.05;

  //create whiteout css
  //extract channels from color string
  var woRGB = {
    r: 255,
    g: 255,
    b: 255
  };

  if(whiteoutColor){
    whiteoutColor.trim();
    var rgbReg = /^rgb\((\s*\d+\s*),(\s*\d+\s*),(\s*\d+\s*)\)$/i;
    var hexReg = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    var r = null;

    if(r = whiteoutColor.match(rgbReg)){
      woRGB.r = r[1];
      woRGB.g = r[2];
      woRGB.b = r[3];
    }else if(r = whiteoutColor.match(hexReg)){
      woRGB.r = parseInt(r[1], 16);
      woRGB.g = parseInt(r[2], 16);
      woRGB.b = parseInt(r[3], 16);
    }else{
      console.log('whiteoutColor should have rgb() or # format');
    }
  }

  var colStart = 'rgba('+woRGB.r+','+woRGB.g+','+woRGB.b+', 0)';
  var colEnd = 'rgba('+woRGB.r+','+woRGB.g+','+woRGB.b+', 1)';
	var whiteoutCSS = '\
    position:absolute;\
    bottom:0;\
    left:0;\
    right:0;\
    height:'+whiteoutHeight+'px;\
    background:linear-gradient(to bottom, '+colStart+' 0, '+colEnd+' 100%); \
  ';

  //add style to DOM
  $(document.head).append($('<style>.'+whiteoutClass+'{'+whiteoutCSS+'}</style>'));

	function containerClick(){
		//force expand
		$(this).readmore('toggle', null, null, null, true);
	}

	function mouseover(){
		$(this).css('height', collapsedHeight * peakAmount);
	}

	function mouseout(){
		$(this).css('height', collapsedHeight);
	}

	function bindMouseEvents($element){
		$element.bind('mouseover', mouseover);
		$element.bind('mouseout', mouseout);
		$element.bind('click', containerClick);
	}

	function unbindMouseEvents($element){
		$element.unbind('mouseover', mouseover);
		$element.unbind('mouseout', mouseout);
		$element.unbind('click', containerClick);
	}

  function setExpandedState($element){
    var $whiteout = $element.children('.'+whiteoutClass);
    $whiteout.fadeOut(animationTime);
    $element.css('cursor', 'default');
    $element.css('transition', 'height ' + animationTime + 'ms');
    unbindMouseEvents($element);
  }

  function setCollapsedState($element){
    var $whiteout = $element.children('.'+whiteoutClass);
    $whiteout.fadeIn(animationTime);
    $element.css('cursor', 'pointer');
    //reduce height animation time when in collapsed state to alter peak animation
    $element.css('transition', 'height ' + peakAnimationTime + 'ms');
    bindMouseEvents($element);
  }

	var $container = $(containerSelector);
	$container.readmore({
		speed: animationTime,
		collapsedHeight: collapsedHeight,
		moreLink: '<a href="#">Read more</a>',
		lessLink: null,
		startOpen: false,
		beforeToggle: function(trigger, element, expanded){
			var $element = $(element);
			if(!expanded){
        setExpandedState($element);
			}else{
        setCollapsedState($element);
			}
		},
		afterToggle: function(trigger, element, expanded){}
	}).css({
		'position': 'relative'
	});

	$container.each(function(i, el){
		var $element = $(el);
		if($element.data('readmore') === undefined)
			return;

    //add whiteout element
    var $whiteout = $('<div class="'+whiteoutClass+'">');
    $element.append($whiteout);

  	setCollapsedState($element);
	});
})();