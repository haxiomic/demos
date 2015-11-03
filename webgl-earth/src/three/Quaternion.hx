package three;

@:native("THREE.Quaternion") extern class Quaternion {
	function new(?x:Float, ?y:Float, ?z:Float, ?w:Float):Void;
	var x : Float;
	var y : Float;
	var z : Float;
	var w : Float;
	function set(x:Float, y:Float, z:Float, w:Float):Quaternion;
	function copy(q:Quaternion):Quaternion;
	function setFromEuler(euler:Euler, ?update:Bool):Quaternion;
	function setFromAxisAngle(axis:Vector3, angle:Float):Quaternion;
	function setFromRotationMatrix(m:Matrix4):Quaternion;
	function setFromUnitVectors(vFrom:Vector3, vTo:Vector3):Quaternion;
	function inverse():Quaternion;
	function conjugate():Quaternion;
	function dot(v:Vector3):Float;
	function lengthSq():Float;
	function length():Float;
	function normalize():Quaternion;
	function multiply(q:Quaternion):Quaternion;
	function multiplyQuaternions(a:Quaternion, b:Quaternion):Quaternion;
	function multiplyVector3(vector:Vector3):Vector3;
	@:overload(function(qa:Quaternion, qb:Quaternion, qm:Quaternion, t:Float):Quaternion { })
	function slerp(qb:Quaternion, t:Float):Quaternion;
	function equals(v:Quaternion):Bool;
	@:overload(function(xyzw:Array<Float>, ?offset:Float):Quaternion { })
	function fromArray(n:Array<Float>):Quaternion;
	@:overload(function(?xyzw:Array<Float>, ?offset:Float):Array<Float> { })
	function toArray():Array<Float>;
	var onChange : Void -> Void;
	function clone():Quaternion;
}