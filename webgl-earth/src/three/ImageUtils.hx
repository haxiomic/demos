package three;

@:native("THREE.ImageUtils") extern class ImageUtils {
	static var crossOrigin : String;
	static function loadTexture(url:String, ?mapping:Mapping, ?onLoad:Texture -> Void, ?onError:String -> Void):Texture;
	static function loadTextureCube(array:Array<String>, ?mapping:Mapping, ?onLoad:Texture -> Void, ?onError:String -> Void):Texture;
	static function getNormalMap(image:js.html.ImageElement, ?depth:Float):js.html.CanvasElement;
	static function generateDataTexture(width:Float, height:Float, color:Color):DataTexture;
}