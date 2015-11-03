package three;

@:native("THREE.Fog") extern class Fog {
	function new(hex:Float, ?near:Float, ?far:Float):Void;
	var name : String;
	var color : Color;
	var near : Float;
	var far : Float;
	function clone():Fog;
}