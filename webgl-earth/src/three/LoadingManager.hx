package three;

@:native("THREE.LoadingManager") extern class LoadingManager {
	function new(?onLoad:Void -> Void, ?onProgress:String -> Float -> Float -> Void, ?onError:Void -> Void):Void;
	var onLoad : Void -> Void;
	var onProgress : Dynamic -> Float -> Float -> Void;
	var onError : Void -> Void;
	function itemStart(url:String):Void;
	function itemEnd(url:String):Void;
}