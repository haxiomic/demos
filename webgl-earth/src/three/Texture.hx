package three;

@:native("THREE.Texture") extern class Texture {
	function new(image:haxe.extern.EitherType<js.html.ImageElement, haxe.extern.EitherType<js.html.CanvasElement, js.html.VideoElement>>, ?mapping:Mapping, ?wrapS:Wrapping, ?wrapT:Wrapping, ?magFilter:TextureFilter, ?minFilter:TextureFilter, ?format:PixelFormat, ?type:TextureDataType, ?anisotropy:Float):Void;
	var id : Float;
	var uuid : String;
	var name : String;
	var sourceFile : String;
	var image : Dynamic;
	var mipmaps : Array<js.html.ImageData>;
	var mapping : Mapping;
	var wrapS : Wrapping;
	var wrapT : Wrapping;
	var magFilter : TextureFilter;
	var minFilter : TextureFilter;
	var anisotropy : Float;
	var format : PixelFormat;
	var type : TextureDataType;
	var offset : Vector2;
	var repeat : Vector2;
	var generateMipmaps : Bool;
	var premultiplyAlpha : Bool;
	var flipY : Bool;
	var unpackAlignment : Float;
	var needsUpdate : Bool;
	var onUpdate : Void -> Void;
	static var DEFAULT_IMAGE : Dynamic;
	static var DEFAULT_MAPPING : Dynamic;
	function clone():Texture;
	function update():Void;
	function dispose():Void;
	function addEventListener(type:String, listener:Dynamic -> Void):Void;
	function hasEventListener(type:String, listener:Dynamic -> Void):Void;
	function removeEventListener(type:String, listener:Dynamic -> Void):Void;
	function dispatchEvent(event:{ var type : String; var target : Dynamic; }):Void;
}