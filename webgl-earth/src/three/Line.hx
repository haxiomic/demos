package three;

@:native("THREE.Line") extern class Line extends Object3D {
	@:overload(function(?geometry:Geometry, ?material:LineBasicMaterial, ?mode:Float):Void { })
	@:overload(function(?geometry:Geometry, ?material:ShaderMaterial, ?mode:Float):Void { })
	@:overload(function(?geometry:BufferGeometry, ?material:LineDashedMaterial, ?mode:Float):Void { })
	@:overload(function(?geometry:BufferGeometry, ?material:LineBasicMaterial, ?mode:Float):Void { })
	@:overload(function(?geometry:BufferGeometry, ?material:ShaderMaterial, ?mode:Float):Void { })
	function new(?geometry:Geometry, ?material:LineDashedMaterial, ?mode:Float):Void;
	var geometry : Dynamic;
	var material : Material;
	var mode : LineMode;
	function raycast(raycaster:Raycaster, intersects:Dynamic):Void;
	@:overload(function(?object:Line):Line { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}