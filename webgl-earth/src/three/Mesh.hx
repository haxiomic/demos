package three;

@:native("THREE.Mesh") extern class Mesh extends Object3D {
	@:overload(function(?geometry:BufferGeometry, ?material:Material):Void { })
	function new(?geometry:Geometry, ?material:Material):Void;
	var geometry : Geometry;
	var material : Material;
	function updateMorphTargets():Void;
	function getMorphTargetIndexByName(name:String):Float;
	function raycast(raycaster:Raycaster, intersects:Dynamic):Void;
	@:overload(function(?object:Mesh):Mesh { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}