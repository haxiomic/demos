package three;

@:native("THREE.BoxGeometry") extern class BoxGeometry extends Geometry {
	function new(width:Float, height:Float, depth:Float, ?widthSegments:Float, ?heightSegments:Float, ?depthSegments:Float):Void;
	var parameters : { var width : Float; var height : Float; var depth : Float; var widthSegments : Float; var heightSegments : Float; var depthSegments : Float; };
}