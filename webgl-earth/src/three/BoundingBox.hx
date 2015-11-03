package three;

@:native("THREE.BoundingBox") extern typedef BoundingBox = {
	var minX : Float;
	var minY : Float;
	@:optional
	var minZ : Float;
	var maxX : Float;
	var maxY : Float;
	@:optional
	var maxZ : Float;
};