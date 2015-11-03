package three;

@:native("THREE.BoundingBoxHelper") extern class BoundingBoxHelper extends Mesh {
	function new(?object:Object3D, ?hex:Float):Void;
	var object : Object3D;
	var box : Box3;
	function update():Void;
}