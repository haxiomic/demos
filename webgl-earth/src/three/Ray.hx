package three;

@:native("THREE.Ray") extern class Ray {
	function new(?origin:Vector3, ?direction:Vector3):Void;
	var origin : Vector3;
	var direction : Vector3;
	function set(origin:Vector3, direction:Vector3):Ray;
	function copy(ray:Ray):Ray;
	function at(t:Float, ?optionalTarget:Vector3):Vector3;
	function recast(t:Float):Ray;
	function closestPointToPoint(point:Vector3, ?optionalTarget:Vector3):Vector3;
	function distanceToPoint(point:Vector3):Float;
	function distanceSqToSegment(v0:Vector3, v1:Vector3, ?optionalPointOnRay:Vector3, ?optionalPointOnSegment:Vector3):Float;
	function isIntersectionSphere(sphere:Sphere):Bool;
	function intersectSphere(sphere:Sphere, ?optionalTarget:Vector3):Vector3;
	function isIntersectionPlane(plane:Plane):Bool;
	function distanceToPlane(plane:Plane):Float;
	function intersectPlane(plane:Plane, ?optionalTarget:Vector3):Vector3;
	function isIntersectionBox(box:Box3):Bool;
	function intersectBox(box:Box3, ?optionalTarget:Vector3):Vector3;
	function intersectTriangle(a:Vector3, b:Vector3, c:Vector3, backfaceCulling:Bool, ?optionalTarget:Vector3):Vector3;
	function applyMatrix4(matrix4:Matrix4):Ray;
	function equals(ray:Ray):Bool;
	function clone():Ray;
}