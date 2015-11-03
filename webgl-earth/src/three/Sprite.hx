package three;

@:native("THREE.Sprite") extern class Sprite extends Object3D {
	function new(?material:Material):Void;
	var geometry : BufferGeometry;
	var material : SpriteMaterial;
	function raycast(raycaster:Raycaster, intersects:Dynamic):Void;
	@:overload(function(?object:Sprite):Sprite { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}