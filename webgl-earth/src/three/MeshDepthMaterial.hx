package three;

@:native("THREE.MeshDepthMaterial") extern class MeshDepthMaterial extends Material {
	function new(?parameters:MeshDepthMaterialParameters):Void;
	var wireframe : Bool;
	var wireframeLinewidth : Float;
	@:overload(function():MeshDepthMaterial { })
	override function clone(?material:Material):Material;
}