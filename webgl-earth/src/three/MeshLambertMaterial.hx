package three;

@:native("THREE.MeshLambertMaterial") extern class MeshLambertMaterial extends Material {
	function new(?parameters:MeshLambertMaterialParameters):Void;
	var color : Color;
	var emissive : Color;
	var wrapAround : Bool;
	var wrapRGB : Vector3;
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
	var morphNormals : Bool;
	@:overload(function():MeshLambertMaterial { })
	override function clone(?material:Material):Material;
}