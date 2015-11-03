package three;

@:native("THREE.PointLight") extern class PointLight extends Light {
	function new(?hex:Float, ?intensity:Float, ?distance:Float, ?decay:Float):Void;
	var intensity : Float;
	var distance : Float;
	var decay : Float;
	@:overload(function():PointLight { })
	@:overload(function(?light:Light):Light { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}