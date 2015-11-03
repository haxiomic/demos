package three;

@:native("THREE.Light") extern class Light extends Object3D {
	function new(?hex:Float):Void;
	var color : Color;
	@:overload(function(?light:Light):Light { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}