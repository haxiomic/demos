package three;

@:native("THREE.Box2") extern class Box2 {
	function new(?min:Vector2, ?max:Vector2):Void;
	var max : Vector2;
	var min : Vector2;
	function set(min:Vector2, max:Vector2):Box2;
	function setFromPoints(points:Array<Vector2>):Box2;
	function setFromCenterAndSize(center:Vector2, size:Vector2):Box2;
	function copy(box:Box2):Box2;
	function makeEmpty():Box2;
	function empty():Bool;
	function center(?optionalTarget:Vector2):Vector2;
	function size(?optionalTarget:Vector2):Vector2;
	function expandByPoint(point:Vector2):Box2;
	function expandByVector(vector:Vector2):Box2;
	function expandByScalar(scalar:Float):Box2;
	function containsPoint(point:Vector2):Bool;
	function containsBox(box:Box2):Bool;
	function getParameter(point:Vector2):Vector2;
	function isIntersectionBox(box:Box2):Bool;
	function clampPoint(point:Vector2, ?optionalTarget:Vector2):Vector2;
	function distanceToPoint(point:Vector2):Float;
	function intersect(box:Box2):Box2;
	function union(box:Box2):Box2;
	function translate(offset:Vector2):Box2;
	function equals(box:Box2):Bool;
	function clone():Box2;
}