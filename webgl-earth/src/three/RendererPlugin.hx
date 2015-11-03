package three;

@:native("THREE.RendererPlugin") extern typedef RendererPlugin = {
	function init(renderer:WebGLRenderer):Void;
	function render(scene:Scene, camera:Camera, currentWidth:Float, currentHeight:Float):Void;
};