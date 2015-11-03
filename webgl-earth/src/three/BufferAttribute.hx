package three;

@:native("THREE.BufferAttribute") extern class BufferAttribute {
	function new(array:Dynamic, itemSize:Float):Void;
	var array : Array<Float>;
	var itemSize : Float;
	var needsUpdate : Bool;
	var length : Float;
	function copyAt(index1:Float, attribute:BufferAttribute, index2:Float):Void;
	function set(value:Float, ?offset:Float):BufferAttribute;
	function setX(index:Float, x:Float):BufferAttribute;
	function setY(index:Float, y:Float):BufferAttribute;
	function setZ(index:Float, z:Float):BufferAttribute;
	function setXY(index:Float, x:Float, y:Float):BufferAttribute;
	function setXYZ(index:Float, x:Float, y:Float, z:Float):BufferAttribute;
	function setXYZW(index:Float, x:Float, y:Float, z:Float, w:Float):BufferAttribute;
	function clone():BufferAttribute;
}