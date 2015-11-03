package three;

@:native("THREE.MorphAnimation") extern class MorphAnimation {
	function new(mesh:Mesh):Void;
	var mesh : Mesh;
	var frames : Float;
	var currentTime : Float;
	var duration : Float;
	var loop : Bool;
	var lastFrame : Float;
	var currentFrame : Float;
	var isPlaying : Bool;
	function play():Void;
	function pause():Void;
	function update(delta:Float):Void;
}