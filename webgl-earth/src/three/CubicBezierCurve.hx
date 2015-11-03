package three;

@:native("THREE.CubicBezierCurve") extern class CubicBezierCurve extends Curve<Vector2> {
	function new(v0:Vector2, v1:Vector2, v2:Vector2, v3:Vector2):Void;
	var v0 : Vector2;
	var v1 : Vector2;
	var v2 : Vector2;
	var v3 : Vector2;
}