package three;

@:native("THREE.FogExp2") extern class FogExp2 {
	function new(hex:Float, ?density:Float):Void;
	var name : String;
	var color : Color;
	var density : Float;
	function clone():FogExp2;
}