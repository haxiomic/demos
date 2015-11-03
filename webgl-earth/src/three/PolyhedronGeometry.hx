package three;

@:native("THREE.PolyhedronGeometry") extern class PolyhedronGeometry extends Geometry {
	function new(vertices:Array<Vector3>, faces:Array<Face3>, ?radius:Float, ?detail:Float):Void;
	var parameters : { var vertices : Array<Vector3>; var faces : Array<Face3>; var radius : Float; var detail : Float; };
}