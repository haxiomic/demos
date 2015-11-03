package three;

@:native("THREE.MorphBlendMeshAnimation") extern typedef MorphBlendMeshAnimation = {
	var startFrame : Float;
	var endFrame : Float;
	var length : Float;
	var fps : Float;
	var duration : Float;
	var lastFrame : Float;
	var currentFrame : Float;
	var active : Bool;
	var time : Float;
	var direction : Float;
	var weight : Float;
	var directionBackwards : Bool;
	var mirroredLoop : Bool;
};