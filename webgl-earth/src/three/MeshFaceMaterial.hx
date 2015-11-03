package three;

@:native("THREE.MeshFaceMaterial") extern class MeshFaceMaterial extends Material {
	function new(?materials:Array<Material>):Void;
	var materials : Array<Material>;
	@:overload(function():Dynamic { })
	override function toJSON():Dynamic;
	@:overload(function():MeshFaceMaterial { })
	override function clone(?material:Material):Material;
}