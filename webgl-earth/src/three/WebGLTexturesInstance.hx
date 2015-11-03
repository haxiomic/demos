package three;

@:native("THREE.WebGLTexturesInstance") extern typedef WebGLTexturesInstance = {
	function new(webgglcontext:Dynamic):WebGLTexturesInstance;
	function get(texture:Texture):Dynamic;
	function create(texture:Texture):Dynamic;
	function delete(texture:Texture):Void;
};