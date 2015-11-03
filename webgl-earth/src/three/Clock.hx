package three;

@:native("THREE.Clock") extern class Clock {
	function new(?autoStart:Bool):Void;
	var autoStart : Bool;
	var startTime : Float;
	var oldTime : Float;
	var elapsedTime : Float;
	var running : Bool;
	function start():Void;
	function stop():Void;
	function getElapsedTime():Float;
	function getDelta():Float;
}