package three;

@:native("THREE.TextureLoader") extern class TextureLoader {
	function new(?manager:LoadingManager):Void;
	var manager : LoadingManager;
	var crossOrigin : String;
	function load(url:String, onLoad:Texture -> Void):Void;
	function setCrossOrigin(crossOrigin:String):Void;
}