package three;

@:native("THREE.PointCloud") extern class PointCloud extends Object3D {
	@:overload(function(geometry:Geometry, ?material:ShaderMaterial):Void { })
	@:overload(function(geometry:BufferGeometry, ?material:PointCloudMaterial):Void { })
	@:overload(function(geometry:BufferGeometry, ?material:ShaderMaterial):Void { })
	function new(geometry:Geometry, ?material:PointCloudMaterial):Void;
	var geometry : Geometry;
	var material : Material;
	function raycast(raycaster:Raycaster, intersects:Dynamic):Void;
	@:overload(function(?object:PointCloud):PointCloud { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}