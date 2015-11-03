package three;

@:native("THREE.ImageLoader") extern class ImageLoader {
	function new(?manager:LoadingManager):Void;
	var cache : Cache;
	var manager : LoadingManager;
	var crossOrigin : String;
	function load(url:String, ?onLoad:js.html.ImageElement -> Void, ?onProgress:Dynamic -> Void, ?onError:Dynamic -> Void):js.html.ImageElement;
	function setCrossOrigin(crossOrigin:String):Void;
}