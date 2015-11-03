package three;

@:native("THREE.MeshNormalMaterialParameters") extern typedef MeshNormalMaterialParameters = {
	>MaterialParameters,
	@:optional
	var color : Float;
	@:optional
	var map : Texture;
	@:optional
	var lightMap : Texture;
	@:optional
	var specularMap : Texture;
	@:optional
	var alphaMap : Texture;
	@:optional
	var envMap : Texture;
	@:optional
	var fog : Bool;
	@:optional
	var shading : Shading;
	@:optional
	var wireframe : Bool;
	@:optional
	var wireframeLinewidth : Float;
	@:optional
	var wireframeLinecap : String;
	@:optional
	var wireframeLinejoin : String;
	@:optional
	var vertexColors : Colors;
	@:optional
	var skinning : Bool;
	@:optional
	var morphTargets : Bool;
};