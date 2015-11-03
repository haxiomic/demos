package three;

@:native("THREE.WebGLExtensions") extern class WebGLExtensions {
	function new(gl:Dynamic):Void;
	function get(name:String):Dynamic;
}