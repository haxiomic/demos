package three;

@:native("THREE.DodecahedronGeometry") extern class DodecahedronGeometry extends Geometry {
	function new(radius:Float, detail:Float):Void;
	var parameters : { var radius : Float; var detail : Float; };
}