package three;

@:native("THREE.ShaderMaterialParameters") extern typedef ShaderMaterialParameters = {
	>MaterialParameters,
	@:optional
	var defines : Dynamic;
	@:optional
	var uniforms : Dynamic;
	@:optional
	var attributes : Dynamic;
	@:optional
	var vertexShader : String;
	@:optional
	var fragmentShader : String;
	@:optional
	var shading : Shading;
	@:optional
	var linewidth : Float;
	@:optional
	var wireframe : Bool;
	@:optional
	var wireframeLinewidth : Float;
	@:optional
	var fog : Bool;
	@:optional
	var lights : Bool;
	@:optional
	var vertexColors : Colors;
	@:optional
	var skinning : Bool;
	@:optional
	var morphTargets : Bool;
	@:optional
	var morphNormals : Bool;
};