package three;

@:native("THREE.KeyFrame") extern typedef KeyFrame = {
	var pos : Array<Float>;
	var rot : Array<Float>;
	var scl : Array<Float>;
	var time : Float;
};