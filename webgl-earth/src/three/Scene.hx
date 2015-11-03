package three;

@:native("THREE.Scene") extern class Scene extends Object3D {
	function new():Void;
	var fog : IFog;
	var overrideMaterial : Material;
	var autoUpdate : Bool;
	@:overload(function():Scene { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}