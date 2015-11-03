package three;

@:native("THREE.ClosedSplineCurve3") extern class ClosedSplineCurve3 extends Curve<Vector3> {
	function new(?points:Array<Vector3>):Void;
	var points : Array<Vector3>;
}