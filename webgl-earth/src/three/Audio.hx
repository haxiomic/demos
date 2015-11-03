package three;

@:native("THREE.Audio") extern class Audio extends Object3D {
	function new(listener:AudioListener):Void;
	var context : js.html.audio.AudioContext;
	var source : js.html.audio.AudioBufferSourceNode;
	var gain : js.html.audio.GainNode;
	var panner : js.html.audio.PannerNode;
	var autoplay : Bool;
	var startTime : Float;
	var isPlaying : Bool;
	function load(file:String):Audio;
	function play():Void;
	function pause():Void;
	function stop():Void;
	function setLoop(value:Bool):Void;
	function setRefDistance(value:Float):Void;
	function setRolloffFactor(value:Float):Void;
	function setVolume(value:Float):Void;
	@:overload(function(?force:Bool):Void { })
	override function updateMatrixWorld(force:Bool):Void;
}