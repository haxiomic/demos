package three;

@:native("THREE.ExtrudeGeometry") extern class ExtrudeGeometry extends Geometry {
	@:overload(function(?shapes:Array<Shape>, ?options:Dynamic):Void { })
	function new(?shape:Shape, ?options:Dynamic):Void;
	var WorldUVGenerator : { function generateTopUV(geometry:Geometry, indexA:Float, indexB:Float, indexC:Float):Array<Vector2>; function generateSideWallUV(geometry:Geometry, indexA:Float, indexB:Float, indexC:Float, indexD:Float):Array<Vector2>; };
	function addShapeList(shapes:Array<Shape>, ?options:Dynamic):Void;
	function addShape(shape:Shape, ?options:Dynamic):Void;
}