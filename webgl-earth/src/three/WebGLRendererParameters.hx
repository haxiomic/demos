package three;

@:native("THREE.WebGLRendererParameters") extern typedef WebGLRendererParameters = {
	@:optional
	var canvas : js.html.CanvasElement;
	@:optional
	var precision : String;
	@:optional
	var alpha : Bool;
	@:optional
	var premultipliedAlpha : Bool;
	@:optional
	var antialias : Bool;
	@:optional
	var stencil : Bool;
	@:optional
	var preserveDrawingBuffer : Bool;
	@:optional
	var clearColor : Float;
	@:optional
	var clearAlpha : Float;
	@:optional
	var devicePixelRatio : Float;
};