package three;

@:native("THREE.HemisphereLight") extern class HemisphereLight extends Light {
	function new(?skyColorHex:Float, ?groundColorHex:Float, ?intensity:Float):Void;
	var groundColor : Color;
	var intensity : Float;
	@:overload(function():HemisphereLight { })
	@:overload(function(?light:Light):Light { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}