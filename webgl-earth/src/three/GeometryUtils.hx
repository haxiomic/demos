package three;

@:native("THREE.GeometryUtils") extern class GeometryUtils {
	@:overload(function(geometry1:Geometry, object2:Geometry, ?materialIndexOffset:Float):Void { })
	static function merge(geometry1:Geometry, object2:Mesh, ?materialIndexOffset:Float):Void;
	static function center(geometry:Geometry):Vector3;
}