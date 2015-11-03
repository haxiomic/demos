package three;

@:native("THREE.TubeGeometry") extern class TubeGeometry extends Geometry {
	function new(path:Path, ?segments:Float, ?radius:Float, ?radiusSegments:Float, ?closed:Bool, ?taper:Float -> Float):Void;
	var parameters : { var path : Path; var segments : Float; var radius : Float; var radialSegments : Float; var closed : Bool; var taper : Float -> Float; };
	var tangents : Array<Vector3>;
	var normals : Array<Vector3>;
	var binormals : Array<Vector3>;
	static function NoTaper(?u:Float):Float;
	static function SinusoidalTaper(u:Float):Float;
	static function FrenetFrames(path:Path, segments:Float, closed:Bool):Void;
}