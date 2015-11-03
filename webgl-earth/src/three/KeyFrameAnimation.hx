package three;

@:native("THREE.KeyFrameAnimation") extern class KeyFrameAnimation {
	function new(data:Dynamic):Void;
	var root : Mesh;
	var data : AnimationData;
	var hierarchy : Array<KeyFrames>;
	var currentTime : Float;
	var timeScale : Float;
	var isPlaying : Bool;
	var isPaused : Bool;
	var loop : Bool;
	function play(?startTime:Float):Void;
	function stop():Void;
	function update(delta:Float):Void;
	function getNextKeyWith(type:String, h:Float, key:Float):KeyFrame;
	function getPrevKeyWith(type:String, h:Float, key:Float):KeyFrame;
}