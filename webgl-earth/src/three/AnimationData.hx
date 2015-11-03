package three;

@:native("THREE.AnimationData") extern typedef AnimationData = {
	var JIT : Float;
	var fps : Float;
	var hierarchy : Array<KeyFrames>;
	var length : Float;
	var name : String;
};