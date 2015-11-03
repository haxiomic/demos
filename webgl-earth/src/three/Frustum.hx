package three;

@:native("THREE.Frustum") extern class Frustum {
	function new(?p0:Plane, ?p1:Plane, ?p2:Plane, ?p3:Plane, ?p4:Plane, ?p5:Plane):Void;
	var planes : Array<Plane>;
	function set(?p0:Float, ?p1:Float, ?p2:Float, ?p3:Float, ?p4:Float, ?p5:Float):Frustum;
	function copy(frustum:Frustum):Frustum;
	function setFromMatrix(m:Matrix4):Frustum;
	function intersectsObject(object:Object3D):Bool;
	function intersectsSphere(sphere:Sphere):Bool;
	function intersectsBox(box:Box3):Bool;
	function containsPoint(point:Vector3):Bool;
	function clone():Frustum;
}