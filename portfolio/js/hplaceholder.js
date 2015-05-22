/*
*  hplacerholder, easy placeholders
*  set placerholder class as hplaceholder
*  add data tags to set the action
*  supports
*      data-url
*      data-iframe-src
*/

'use strict';
//initialize hplaceholder
var placeholders = $('.hplaceholder');
placeholders.each(function(i, p) {
	var $placeholder = $(p);
	//set iframe-placeholder class
	$placeholder.toggleClass('hplaceholder', true);
	//encapsulate and add play button
	var $wrap = $placeholder.wrap('<div class="hplaceholder-wrap"></div>').parent();

	var $overlay = $('<div class="hplaceholder-overlay"></div>');
	var $play = $('<div class="hplaceholder-play"></div>');
	$wrap.append($overlay);
	$wrap.append($play);

	$wrap.click(function(){
		//determine type of placeholder by searching data attributes
		if($placeholder.is('[data-iframe-src]')){
			replaceWithIframe($placeholder, $placeholder.data('iframe-src'));
		}else if($placeholder.is('[data-js]')){
			//@!
			console.log('TODO: data-js');
		}else if($placeholder.is('[data-url]')){
			var win = window.open($placeholder.data('url'), '_blank');
			win.focus();
		}
	});
});

function hidePlaceholder(placeholder){
	var $placeholder = $(placeholder);
	$placeholder.css('opacity', 0);
	getPlaceholderUI($placeholder).hide();
}

function getPlaceholderUI(placeholder){
	var $placeholder = $(placeholder);
	return $placeholder.parent().children('.hplaceholder-overlay,.hplaceholder-play');
}

function replaceWithIframe(placeholder, url){
	var $placeholder = $(placeholder);
	var $container = $placeholder.parent();
	var $iframe = $('<iframe src="'+url+'"></iframe>');
	$iframe.toggleClass('hplaceholder-iframe', true);

	hidePlaceholder($placeholder);
	$container.append($iframe);
}