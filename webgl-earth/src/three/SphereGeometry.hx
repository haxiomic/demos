package three;

@:native("THREE.SphereGeometry") extern class SphereGeometry extends Geometry {
	function new(radius:Float, ?widthSegments:Float, ?heightSegments:Float, ?phiStart:Float, ?phiLength:Float, ?thetaStart:Float, ?thetaLength:Float):Void;
	var parameters : { var radius : Float; var widthSegments : Float; var heightSegments : Float; var phiStart : Float; var phiLength : Float; var thetaStart : Float; var thetaLength : Float; };
}