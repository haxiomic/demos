package three;

@:native("THREE.WebGLProgram") extern class WebGLProgram {
	function new(renderer:WebGLRenderer, code:String, material:ShaderMaterial, parameters:WebGLRendererParameters):Void;
	var attributes : Dynamic;
	var attributesKeys : Array<String>;
	var id : Float;
	var code : String;
	var usedTimes : Float;
	var program : Dynamic;
	var vertexShader : WebGLShader;
	var fragmentShader : WebGLShader;
}