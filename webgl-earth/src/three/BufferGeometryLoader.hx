package three;

@:native("THREE.BufferGeometryLoader") extern class BufferGeometryLoader {
	function new(?manager:LoadingManager):Void;
	var manager : LoadingManager;
	function load(url:String, onLoad:BufferGeometry -> Void, ?onProgress:Dynamic -> Void, ?onError:Dynamic -> Void):Void;
	function setCrossOrigin(crossOrigin:String):Void;
	function parse(json:Dynamic):BufferGeometry;
}