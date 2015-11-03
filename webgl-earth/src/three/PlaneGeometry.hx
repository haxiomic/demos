package three;

@:native("THREE.PlaneGeometry") extern class PlaneGeometry extends Geometry {
	function new(width:Float, height:Float, ?widthSegments:Float, ?heightSegments:Float):Void;
	var parameters : { var width : Float; var height : Float; var widthSegments : Float; var heightSegments : Float; };
}