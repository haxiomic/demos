package three;

@:native("THREE.WebGLRenderTarget") extern class WebGLRenderTarget {
	function new(width:Float, height:Float, ?options:WebGLRenderTargetOptions):Void;
	var width : Float;
	var height : Float;
	var wrapS : Wrapping;
	var wrapT : Wrapping;
	var magFilter : TextureFilter;
	var minFilter : TextureFilter;
	var anisotropy : Float;
	var offset : Vector2;
	var repeat : Vector2;
	var format : Float;
	var type : Float;
	var depthBuffer : Bool;
	var stencilBuffer : Bool;
	var generateMipmaps : Bool;
	var shareDepthFrom : Dynamic;
	function setSize(width:Float, height:Float):Void;
	function clone():WebGLRenderTarget;
	function dispose():Void;
	function addEventListener(type:String, listener:Dynamic -> Void):Void;
	function hasEventListener(type:String, listener:Dynamic -> Void):Void;
	function removeEventListener(type:String, listener:Dynamic -> Void):Void;
	function dispatchEvent(event:{ var type : String; var target : Dynamic; }):Void;
}