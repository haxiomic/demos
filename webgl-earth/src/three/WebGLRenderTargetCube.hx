package three;

@:native("THREE.WebGLRenderTargetCube") extern class WebGLRenderTargetCube extends WebGLRenderTarget {
	function new(width:Float, height:Float, ?options:WebGLRenderTargetOptions):Void;
	var activeCubeFace : Float;
}