package three;

@:native("THREE.BinaryTextureLoader") extern class BinaryTextureLoader {
	function new():Void;
	function load(url:String, onLoad:DataTexture -> Void, ?onProgress:Dynamic -> Void, ?onError:Dynamic -> Void):Void;
}