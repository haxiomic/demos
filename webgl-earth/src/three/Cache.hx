package three;

@:native("THREE.Cache") extern class Cache {
	static var files : Array<Dynamic>;
	static function add(key:String, file:Dynamic):Void;
	static function get(key:String):Dynamic;
	static function remove(key:String):Void;
	static function clear():Void;
}