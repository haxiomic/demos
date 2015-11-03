package three.postprocessing;

@:native("THREE.EffectComposer") extern class EffectComposer {
	function new(renderer:three.WebGLRenderer, ?renderTarget:three.WebGLRenderTarget):Void;
	var renderTarget1 : three.WebGLRenderTarget;
	var renderTarget2 : three.WebGLRenderTarget;
	var writeBuffer : three.WebGLRenderTarget;
	var readBuffer : three.WebGLRenderTarget;
	var passes : Array<Dynamic>;
	var copyPass : ShaderPass;
	function swapBuffers():Void;
	function addPass(pass:Dynamic):Void;
	function insertPass(pass:Dynamic, index:Float):Void;
	function render(?delta:Float):Void;
	function reset(?renderTarget:three.WebGLRenderTarget):Void;
	function setSize(width:Float, height:Float):Void;
}