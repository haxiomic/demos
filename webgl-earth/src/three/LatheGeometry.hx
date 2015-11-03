package three;

@:native("THREE.LatheGeometry") extern class LatheGeometry extends Geometry {
	function new(points:Array<Vector3>, ?segments:Float, ?phiStart:Float, ?phiLength:Float):Void;
	var parameters : { var points : Array<Vector3>; var segments : Float; var phiStart : Float; var phiLength : Float; };
}