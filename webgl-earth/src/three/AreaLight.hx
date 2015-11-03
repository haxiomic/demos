package three;

@:native("THREE.AreaLight") extern class AreaLight extends Light {
	function new(hex:Float, ?intensity:Float):Void;
	var normal : Vector3;
	var right : Vector3;
	var intensity : Float;
	var width : Float;
	var height : Float;
	var constantAttenuation : Float;
	var linearAttenuation : Float;
	var quadraticAttenuation : Float;
}