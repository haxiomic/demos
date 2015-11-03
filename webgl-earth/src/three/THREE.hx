package three;

@:native("THREE") extern class THREE {
	static var REVISION : String;
	static function warn(?message:Dynamic, optionalParams:haxe.extern.Rest<Dynamic>):Void;
	static function error(?message:Dynamic, optionalParams:haxe.extern.Rest<Dynamic>):Void;
	static function log(?message:Dynamic, optionalParams:haxe.extern.Rest<Dynamic>):Void;
}