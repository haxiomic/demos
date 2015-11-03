package three;

@:native("THREE.MeshNormalMaterial") extern class MeshNormalMaterial extends Material {
	function new(?parameters:MeshNormalMaterialParameters):Void;
	var wireframe : Bool;
	var wireframeLinewidth : Float;
	var morphTargets : Bool;
	@:overload(function():MeshNormalMaterial { })
	override function clone(?material:Material):Material;
}