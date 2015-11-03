package three;

@:native("THREE.ShaderMaterial") extern class ShaderMaterial extends Material {
	function new(?parameters:ShaderMaterialParameters):Void;
	var defines : Dynamic;
	var uniforms : Dynamic;
	var attributes : Dynamic;
	var vertexShader : String;
	var fragmentShader : String;
	var shading : Shading;
	var linewidth : Float;
	var wireframe : Bool;
	var wireframeLinewidth : Float;
	var fog : Bool;
	var lights : Bool;
	var vertexColors : Colors;
	var skinning : Bool;
	var morphTargets : Bool;
	var morphNormals : Bool;
	@:overload(function():ShaderMaterial { })
	override function clone(?material:Material):Material;
}