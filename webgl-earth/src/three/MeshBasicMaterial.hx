package three;

@:native("THREE.MeshBasicMaterial") extern class MeshBasicMaterial extends Material {
	function new(?parameters:MeshBasicMaterialParameters):Void;
	var color : Color;
	var map : Texture;
	var lightMap : Texture;
	var specularMap : Texture;
	var alphaMap : Texture;
	var envMap : Texture;
	var combine : Combine;
	var reflectivity : Float;
	var refractionRatio : Float;
	var fog : Bool;
	var shading : Shading;
	var wireframe : Bool;
	var wireframeLinewidth : Float;
	var wireframeLinecap : String;
	var wireframeLinejoin : String;
	var vertexColors : Colors;
	var skinning : Bool;
	var morphTargets : Bool;
	@:overload(function():MeshBasicMaterial { })
	override function clone(?material:Material):Material;
}