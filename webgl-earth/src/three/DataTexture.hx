package three;

@:native("THREE.DataTexture") extern class DataTexture extends Texture {
	function new(data:js.html.ImageData, width:Float, height:Float, format:PixelFormat, type:TextureDataType, mapping:Mapping, wrapS:Wrapping, wrapT:Wrapping, magFilter:TextureFilter, minFilter:TextureFilter, ?anisotropy:Float):Void;
	@:overload(function():DataTexture { })
	override function clone():Texture;
}