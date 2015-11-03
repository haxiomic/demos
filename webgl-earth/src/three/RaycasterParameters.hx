package three;

@:native("THREE.RaycasterParameters") extern typedef RaycasterParameters = {
	@:optional
	var Sprite : Dynamic;
	@:optional
	var Mesh : Dynamic;
	@:optional
	var PointCloud : Dynamic;
	@:optional
	var LOD : Dynamic;
	@:optional
	var Line : Dynamic;
};