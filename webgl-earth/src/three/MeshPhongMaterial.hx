package three;

@:native("THREE.MeshPhongMaterial") extern class MeshPhongMaterial extends Material {
	function new(?parameters:MeshPhongMaterialParameters):Void;
	var color : Color;
	var emissive : Color;
	var specular : Color;
	var shininess : Float;
	var metal : Bool;
	var wrapAround : Bool;
	var wrapRGB : Vector3;
	var map : Texture;
	var lightMap : Texture;
	var bumpMap : Texture;
	var bumpScale : Float;
	var normalMap : Texture;
	var normalScale : Vector2;
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
	@:overload(function():MeshPhongMaterial { })
	override function clone(?material:Material):Material;
}