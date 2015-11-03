package three;

@:native("THREE.ObjectLoader") extern class ObjectLoader {
	function new(?manager:LoadingManager):Void;
	var manager : LoadingManager;
	var texturePass : String;
	function load(url:String, ?onLoad:Object3D -> Void):Void;
	function setTexturePath(value:String):Void;
	function setCrossOrigin(crossOrigin:String):Void;
	function parse<T:(Object3D)>(json:Dynamic, ?onLoad:Object3D -> Void):T;
	function parseGeometries(json:Dynamic):Array<Dynamic>;
	function parseMaterials(json:Dynamic, textures:Array<Texture>):Array<Material>;
	function parseImages(json:Dynamic, onLoad:Void -> Void):Array<Dynamic>;
	function parseTextures(json:Dynamic, images:Dynamic):Array<Texture>;
	function parseObject<T:(Object3D)>(data:Dynamic, geometries:Array<Dynamic>, materials:Array<Material>):T;
}