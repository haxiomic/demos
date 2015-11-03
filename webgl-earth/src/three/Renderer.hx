package three;

@:native("THREE.Renderer") extern typedef Renderer = {
	function render(scene:Scene, camera:Camera):Void;
	function setSize(width:Float, height:Float, ?updateStyle:Bool):Void;
	var domElement : js.html.CanvasElement;
};