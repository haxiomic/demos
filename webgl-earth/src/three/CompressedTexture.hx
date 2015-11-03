package three;

@:native("THREE.CompressedTexture") extern class CompressedTexture extends Texture {
	function new(mipmaps:Array<js.html.ImageData>, width:Float, height:Float, ?format:PixelFormat, ?type:TextureDataType, ?mapping:Mapping, ?wrapS:Wrapping, ?wrapT:Wrapping, ?magFilter:TextureFilter, ?minFilter:TextureFilter, ?anisotropy:Float):Void;
	@:overload(function():CompressedTexture { })
	override function clone():Texture;
}