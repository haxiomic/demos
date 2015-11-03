package three;

@:native("THREE.Loader") extern class Loader {
	function new(?showStatus:Bool):Void;
	var showStatus : Bool;
	var statusDomElement : js.html.Element;
	var imageLoader : ImageLoader;
	var onLoadStart : Void -> Void;
	var onLoadProgress : Void -> Void;
	var onLoadComplete : Void -> Void;
	var crossOrigin : String;
	function addStatusElement():js.html.Element;
	function updateProgress(progress:Progress):Void;
	function extractUrlBase(url:String):String;
	function initMaterials(materials:Array<Material>, texturePath:String):Array<Material>;
	function needsTangents(materials:Array<Material>):Bool;
	function createMaterial(m:Material, texturePath:String):Bool;
	static var Handlers : LoaderHandler;
}