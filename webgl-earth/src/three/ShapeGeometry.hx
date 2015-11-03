package three;

@:native("THREE.ShapeGeometry") extern class ShapeGeometry extends Geometry {
	@:overload(function(shapes:Array<Shape>, ?options:Dynamic):Void { })
	function new(shape:Shape, ?options:Dynamic):Void;
	function addShapeList(shapes:Array<Shape>, options:Dynamic):ShapeGeometry;
	function addShape(shape:Shape, ?options:Dynamic):Void;
}