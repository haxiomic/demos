package three;

@:native("THREE.JSONLoader") extern class JSONLoader extends Loader {
	function new(?showStatus:Bool):Void;
	var withCredentials : Bool;
	function load(url:String, callback:Geometry -> Array<Material> -> Void, ?texturePath:String):Void;
	function loadAjaxJSON(context:JSONLoader, url:String, callback:Geometry -> Array<Material> -> Void, ?texturePath:String, ?callbackProgress:Progress -> Void):Void;
	function parse(json:Dynamic, ?texturePath:String):{ var geometry : Geometry; @:optional
	var materials : Array<Material>; };
}