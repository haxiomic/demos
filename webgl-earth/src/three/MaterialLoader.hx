package three;

@:native("THREE.MaterialLoader") extern class MaterialLoader {
	function new(?manager:LoadingManager):Void;
	var manager : LoadingManager;
	function load(url:String, onLoad:Material -> Void):Void;
	function setCrossOrigin(crossOrigin:String):Void;
	function parse(json:Dynamic):Material;
}