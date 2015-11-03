package three;

@:native("THREE.Vector") extern typedef Vector = {
	function setComponent(index:Float, value:Float):Void;
	function getComponent(index:Float):Float;
	function copy(v:Vector):Vector;
	function add(v:Vector):Vector;
	function addVectors(a:Vector, b:Vector):Vector;
	function sub(v:Vector):Vector;
	function subVectors(a:Vector, b:Vector):Vector;
	function multiplyScalar(s:Float):Vector;
	function divideScalar(s:Float):Vector;
	function negate():Vector;
	function dot(v:Vector):Float;
	function lengthSq():Float;
	function length():Float;
	function normalize():Vector;
	@:optional
	function distanceTo(v:Vector):Float;
	@:optional
	function distanceToSquared(v:Vector):Float;
	function setLength(l:Float):Vector;
	function lerp(v:Vector, alpha:Float):Vector;
	function equals(v:Vector):Bool;
	function clone():Vector;
};