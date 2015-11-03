package three;

@:native("THREE.VideoTexture") extern class VideoTexture extends Texture {
	function new(video:js.html.VideoElement, ?mapping:Mapping, ?wrapS:Wrapping, ?wrapT:Wrapping, ?magFilter:TextureFilter, ?minFilter:TextureFilter, ?format:PixelFormat, ?type:TextureDataType, ?anisotropy:Float):Void;
}