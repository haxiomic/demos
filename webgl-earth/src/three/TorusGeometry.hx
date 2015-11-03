package three;

@:native("THREE.TorusGeometry") extern class TorusGeometry extends Geometry {
	function new(?radius:Float, ?tube:Float, ?radialSegments:Float, ?tubularSegments:Float, ?arc:Float):Void;
	var parameters : { var radius : Float; var tube : Float; var radialSegments : Float; var tubularSegments : Float; var arc : Float; };
}