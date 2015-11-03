package three;

@:native("THREE.SplineCurve3") extern class SplineCurve3 extends Curve<Vector3> {
	function new(?points:Array<Vector3>):Void;
	var points : Array<Vector3>;
}