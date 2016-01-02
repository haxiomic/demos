
var COTSInterface = (function(){
	'use strict';

	var constructor = function(controllerSVG, initialStateChangeCallbacks){
		//elements
		var nitrateBar;
		var nitrateHandle;
		var oneWeekBtn;
		var twoWeeksBtn;
		var oneMonthBtn;
		var timeBtns;
		//state
		var state = {
			timeRange: ONE_WEEK, //:TimeRange
			nitrateFraction: 0.5
		}
		var stateChangeCallbacks = [];
		//interaction
		var mouseDown = false;
		var mouse = {x: 0, y: 0};
		//drag control
		var dragTarget = null;
		var dragMouseStart = {x: 0, y: 0};
		var dragTargetStart = {x: 0, y: 0};

		//new COTSInterface()
		{
			//public
			this.state = state;
			if(initialStateChangeCallbacks) stateChangeCallbacks.push(initialStateChangeCallbacks);

			nitrateBar = controllerSVG.querySelector('#nitrate-bar');
			nitrateHandle = controllerSVG.querySelector('#nitrate-handle');
			oneWeekBtn = controllerSVG.querySelector('#oneWeek');
			twoWeeksBtn = controllerSVG.querySelector('#twoWeeks');
			oneMonthBtn = controllerSVG.querySelector('#oneMonth');
			timeBtns = [oneWeekBtn, twoWeeksBtn, oneMonthBtn];

			nitrateBar.style.cursor = 'pointer';
			nitrateBar.style.pointerEvents = 'bounding-box';//requires SVG2 support
			var f = function(){
				var f = (mouse.x - nitrateBarRange.x)/nitrateBarRange.width;
				setNitrateFraction(f);
				setDragTarget(nitrateHandle);
			}
			nitrateBar.addEventListener('mousedown', f);
			nitrateBar.addEventListener('touchstart', f);

			nitrateHandle.style.cursor = 'pointer';
			nitrateHandle.dragBounds = {
				x: nitrateBarRange.x,
				y: nitrateBarRange.y,
				width: nitrateBarRange.width,
				height: 0
			};
			var f = function(){
				setDragTarget(nitrateHandle);
			}
			nitrateHandle.addEventListener('mousedown', f);
			nitrateHandle.addEventListener('touchstart', f);
			nitrateHandle.onDragUpdate = function(){
				var f = (nitrateHandle.x - nitrateHandle.dragBounds.x)/nitrateHandle.dragBounds.width;
				setNitrateFraction(f);
			}

			oneWeekBtn.addEventListener('mousedown', function(){ setTimeRange(ONE_WEEK); });
			twoWeeksBtn.addEventListener('mousedown', function(){ setTimeRange(TWO_WEEKS); });
			oneMonthBtn.addEventListener('mousedown', function(){ setTimeRange(ONE_MONTH); });
			oneWeekBtn.addEventListener('touchstart', function(){ setTimeRange(ONE_WEEK); });
			twoWeeksBtn.addEventListener('touchstart', function(){ setTimeRange(TWO_WEEKS); });
			oneMonthBtn.addEventListener('touchstart', function(){ setTimeRange(ONE_MONTH); });

			//core event listeners
			controllerSVG.addEventListener('mousedown', onMouseDown);
			document.body.addEventListener('mouseup', onMouseUp);
			document.body.addEventListener('mousemove', onMouseMove);

			//mouse leave window
			document.body.addEventListener('mouseout', function(e){
				e = e ? e : window.event;
				var from = e.relatedTarget || e.toElement;
				if(!from || from.nodeName == "HTML"){
					onMouseUp(null);
				}
			});

			controllerSVG.addEventListener('touchstart', onTouchStart);
			document.body.addEventListener('touchend', onTouchEnd);
			document.body.addEventListener('touchmove', onTouchMove);

			syncAll();
		}

		//--
		//public functions
		this.stateChanged = function(cb){
			stateChangeCallbacks.push(cb);
		}

		this.removeCallback = function(cb){
			var i = stateChangeCallbacks.length - 1;
			while(i >= 0){
				if(stateChangeCallbacks[i] == cb){
					stateChangeCallbacks.splice(i, 1);
					return true;
				}
				i--;
			}
			return false;
		}

		//private functions
		function syncAll(){
			syncState();
			syncTransformations();
		}

		function syncState(){
			for(var i in timeBtns){
				timeBtns[i].classList.toggle('active', false);
			}
			switch(state.timeRange){
				case ONE_WEEK:
					oneWeekBtn.classList.toggle('active', true);
					break;
				case TWO_WEEKS:
					twoWeeksBtn.classList.toggle('active', true);
					break;
				case ONE_MONTH:
					oneMonthBtn.classList.toggle('active', true);
					break;
			}

			nitrateHandle.x = nitrateBarRange.x + nitrateBarRange.width * state.nitrateFraction;
			nitrateHandle.y = nitrateBarRange.y;
			syncSVGTransformation(nitrateHandle);

			nitrateHandle.querySelector('text').innerHTML = Math.round(state.nitrateFraction*100) + '%';

			for(var i in stateChangeCallbacks){
				stateChangeCallbacks[i](state);
			}
		}

		function syncTransformations(){
			syncSVGTransformation(nitrateHandle);
		}

		function onMouseDown(e){
			mouse.x = e.pageX - controllerSVG.offsetLeft;
			mouse.y = e.pageY - controllerSVG.offsetTop;
			mouseDown = true;
			dragMouseStart.x = mouse.x;
			dragMouseStart.y = mouse.y;
		}

		function onMouseUp(e){
			mouseDown = false;
			setDragTarget(null);
		}

		function onMouseMove(e){
			mouse.x = e.pageX - controllerSVG.offsetLeft;
			mouse.y = e.pageY - controllerSVG.offsetTop;

			//handle dragging
			if(dragTarget){
				var dx = mouse.x - dragMouseStart.x;
				var dy = mouse.y - dragMouseStart.y;
				dragTarget.x = dragTargetStart.x + dx;
				dragTarget.y = dragTargetStart.y + dy;

				var bounds = dragTarget.dragBounds;
				if(bounds){
					dragTarget.x = clamp(dragTarget.x, bounds.x, bounds.x + bounds.width);
					dragTarget.y = clamp(dragTarget.y, bounds.y, bounds.y + bounds.height);
				}

				if(dragTarget.onDragUpdate){
					dragTarget.onDragUpdate(dragTarget);
				}
			}
		}

		function onTouchStart(e){
			onMouseDown(e.touches[0]);
		}

		function onTouchEnd(e){
			//@! this needs review
			onMouseUp(e.touches[0]);
		}

		function onTouchMove(e){
			onMouseMove(e.touches[0]);
		}

		function setDragTarget(target){
			dragTarget = target;
			if(target){
				dragTargetStart.x = target.x;
				dragTargetStart.y = target.y;
			}
		}

		function setTimeRange(v){
			state.timeRange = v;
			syncState();
		}

		function setNitrateFraction(v){
			state.nitrateFraction = v;
			syncState();
		}
	}

	//static

	var nitrateBarRange = {//hard code because SVG getBBox() is still too buggy
		x: 65,
		y: 186.275,
		width: 272.530029296875
	}

	function syncSVGTransformation(svgElement){
		var translate = 'translate('+
			(isNaN(svgElement.x) ? 0 : svgElement.x)
			+','+
			(isNaN(svgElement.y) ? 0 : svgElement.y)
		+')';

		svgElement.setAttribute('transform', translate);
	}

	function clamp(x, a, b){
		return x < a ? a : (x > b ? b : x);
	}

	//enum TimeRange
	{
		var ONE_WEEK = 0;
		var TWO_WEEKS = 1; 
		var ONE_MONTH = 2;
	}

	return constructor;

})();