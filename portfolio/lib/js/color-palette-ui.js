/*!
 * color-palette.js
 * Author: @haxiomic (George Corney)
 * Licensed under the MIT license
 */

'use strict';
(function(){

//find color classes by selecting all class names starting with _color
var cssPalette = {};//<String{class name}, String{color}>

var classReg = /^\._color-.+/g;
var cssRules = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
for (var i = 0; i < cssRules.length; i++){
	var rule = cssRules[i];
	if(!rule.selectorText) continue;
	if(rule.selectorText.match(classReg)){
		//trim prefix from name
		cssPalette[rule.selectorText.substr(8)] = rule.style.color;
	}
}

var colorNames = Object.keys(cssPalette);

var colorContainerClassName = 'color-palette-ui';
var colorSquareClassName = 'color-square';

var colorSquares = [];

var matchedPropertyMap = null;
var watchColorTimer = null;
var colorPollInterval = 200;

//create palette
var colorContainer = document.createElement('div');
colorContainer.className = colorContainerClassName;

//create color squares
for(var i = 0; i < colorNames.length; i++){
	var colorSquare = document.createElement('div');
	var colorLabel = document.createElement('span');

	colorSquares.push(colorSquare);

	(function(colorSquare, colorLabel, colorName){
		colorSquare.className = colorSquareClassName;
		colorSquare.style.backgroundColor = cssPalette[colorName];
		colorLabel.className = 'color-label';
		colorLabel.innerHTML = colorName;

		//initial hide
		colorLabel.style.display = 'none';
		//add event listeners
		//mouse over show/hide label
		colorSquare.addEventListener('mouseover', function(){
			if(this.parentElement.classList.contains('active')){
				colorLabel.style.display = '';
			}
		});
		colorSquare.addEventListener('mouseout', function(){
			colorLabel.style.display = 'none';
		});
		colorSquare.addEventListener('color-change', function(e){
			var colorSquareIndex = e.detail.colorSquareIndex;
			var newColor = e.detail.newColor;
			var elProps = matchedPropertyMap[colorSquareIndex];

			for(var i = 0; i < elProps.length; i++){
				var el = elProps[i][0];
				var prop = elProps[i][1];
				el.style[prop] = newColor;
			}
		});

		colorSquare.appendChild(colorLabel);
		colorContainer.appendChild(colorSquare);
	})(colorSquare, colorLabel, colorNames[i]);
}

//click event on color container
colorContainer.addEventListener('click', function(){
	toggleClass(colorContainer, 'active');

	//match color properties if not done already
	if(!matchedPropertyMap){
		matchedPropertyMap = matchElementProperties();
	}

	if(colorContainer.classList.contains('active')){
		watchForColorChanges();
	}else{
		stopWatchingForColorChanges();
	}
});

//add to dom
document.body.appendChild(colorContainer);

//finds all elements that have properties that match
var colorProps = [
	'backgroundColor',
	'borderBottomColor',
	'borderLeftColor',
	'borderRightColor',
	'borderTopColor',
	'color',
	'floodColor',
	'lightingColor',
	'outlineColor',
	'stopColor',
	// 'webkitBorderAfterColor',
	// 'webkitBorderBeforeColor',
	// 'webkitBorderEndColor',
	// 'webkitBorderStartColor',
	// 'webkitColumnRuleColor',
	// 'webkitTapHighlightColor',
	// 'webkitTextEmphasisColor',
	// 'webkitTextFillColor',
	// 'webkitTextStrokeColor'
];
function matchElementProperties(){
	var colorSquareColorMap = {};//<String{color square color}, Int{color square index}>
	var matchedPropertyMap = {};//<Int{color square index}, Array{[element, property name]}>
	var colorString = [];

	//find color square colors
	for(var i = 0; i < colorSquares.length; i++){
		var style = window.getComputedStyle(colorSquares[i]);
		colorSquareColorMap[style.backgroundColor] = i;
		matchedPropertyMap[i] = [];//initialize empty array
	}

	colorString = Object.keys(colorSquareColorMap);

	//find all matching color properties
	var allElements = document.getElementsByTagName('*');
	for(var i = 0; i < allElements.length; i++){
		var el = allElements[i];

		var reject = false;
		//iterate parents to determine if it's within the palette ui
		var ep = el;
		while(ep){
			if(ep.classList.contains(colorContainerClassName)){
				reject = true;
				break;
			}
			ep = ep.parentElement;
		}
		if(reject) continue;

		var style = window.getComputedStyle(el);

		for(var j = 0; j < colorProps.length; j++){
			var prop = colorProps[j];
			var color = style[prop];

			//search for matching color
			for(var k = 0; k < colorString.length; k++){
				var colStr = colorString[k];
				if(colStr === color){
					//found matching color property
					var colorSquareIndex = colorSquareColorMap[colStr];
					matchedPropertyMap[colorSquareIndex].push([el, prop]);
				}
			}
		}
	}

	return matchedPropertyMap;
}

function watchForColorChanges(){
	if(watchColorTimer) return;

	function getCurrentColors(){
		var colors = [];//<Int{color square index}, String{color square color}>
		for(var i = 0; i < colorSquares.length; i++){
			colors[i] = window.getComputedStyle(colorSquares[i]).backgroundColor;
		}
		return colors;	
	}

	//get initial colors
	var icolors = getCurrentColors();

	watchColorTimer = setInterval(function(){
		//get current color
		var ccolors = getCurrentColors();
		//search for differences
		for(var i = 0; i < icolors.length; i++){
			if(icolors[i] !== ccolors[i]){
				var ccevent = new CustomEvent('color-change', {detail:{
					colorSquareIndex: i,
					newColor: ccolors[i]
				}});
				colorSquares[i].dispatchEvent(ccevent);
				icolors[i] = ccolors[i];
			}
		}
	}, colorPollInterval);

	return watchColorTimer;
}

function stopWatchingForColorChanges(){
	clearInterval(watchColorTimer);
	watchColorTimer = null;
}

//Utilities
function toggleClass(el, className){
	if (el.classList) {
	  el.classList.toggle(className);
	} else {
	  var classes = el.className.split(' ');
	  var existingIndex = classes.indexOf(className);
	  if (existingIndex >= 0) classes.splice(existingIndex, 1);
	  else classes.push(className);
	  el.className = classes.join(' ');
	}
}
})();