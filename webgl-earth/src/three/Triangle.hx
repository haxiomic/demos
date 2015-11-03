package three;

@:native("THREE.Triangle") extern class Triangle {
	function new(?a:Vector3, ?b:Vector3, ?c:Vector3):Void;
	var a : Vector3;
	var b : Vector3;
	var c : Vector3;
	function set(a:Vector3, b:Vector3, c:Vector3):Triangle;
	function setFromPointsAndIndices(points:Array<Vector3>, i0:Float, i1:Float, i2:Float):Triangle;
	function copy(triangle:Triangle):Triangle;
	function area():Float;
	function midpoint(?optionalTarget:Vector3):Vector3;
	@:overload(function(a:Vector3, b:Vector3, c:Vector3, ?optionalTarget:Vector3):Vector3 { })
	function normal(?optionalTarget:Vector3):Vector3;
	function plane(?optionalTarget:Vector3):Plane;
	@:overload(function(point:Vector3, a:Vector3, b:Vector3, c:Vector3, optionalTarget:Vector3):Vector3 { })
	function barycoordFromPoint(point:Vector3, ?optionalTarget:Vector3):Vector3;
	@:overload(function(point:Vector3, a:Vector3, b:Vector3, c:Vector3):Bool { })
	function containsPoint(point:Vector3):Bool;
	function equals(triangle:Triangle):Bool;
	function clone():Triangle;
}