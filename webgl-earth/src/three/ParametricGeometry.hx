package three;

@:native("THREE.ParametricGeometry") extern class ParametricGeometry extends Geometry {
	function new(func:Float -> Float -> Vector3, slices:Float, stacks:Float):Void;
	var parameters : { var func : Float -> Float -> Vector3; var slices : Float; var stacks : Float; };
}