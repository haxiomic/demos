package three;

@:native("THREE.CircleGeometry") extern class CircleGeometry extends Geometry {
	function new(?radius:Float, ?segments:Float, ?thetaStart:Float, ?thetaLength:Float):Void;
	var parameters : { var radius : Float; var segments : Float; var thetaStart : Float; var thetaLength : Float; };
}