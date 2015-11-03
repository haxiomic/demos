package three;

@:native("THREE.Shader") extern typedef Shader = {
	var uniforms : Dynamic;
	var vertexShader : String;
	var fragmentShader : String;
};