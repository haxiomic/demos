package three;

@:native("THREE.Intersection") extern typedef Intersection = {
	var distance : Float;
	var point : Vector3;
	var face : Face3;
	var object : Object3D;
};