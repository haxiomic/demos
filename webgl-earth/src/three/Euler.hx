package three;

@:native("THREE.Euler") extern class Euler {
	function new(?x:Float, ?y:Float, ?z:Float, ?order:String):Void;
	var x : Float;
	var y : Float;
	var z : Float;
	var order : String;
	function set(x:Float, y:Float, z:Float, ?order:String):Euler;
	function copy(euler:Euler):Euler;
	function setFromRotationMatrix(m:Matrix4, ?order:String, ?update:Bool):Euler;
	function setFromQuaternion(q:Quaternion, ?order:String, ?update:Bool):Euler;
	function setFromVector3(v:Vector3, ?order:String):Euler;
	function reorder(newOrder:String):Euler;
	function equals(euler:Euler):Bool;
	function fromArray(xyzo:Array<Dynamic>):Euler;
	function toArray(?array:Array<Float>, ?offset:Float):Array<Float>;
	function toVector3(?optionalResult:Vector3):Vector3;
	var onChange : Void -> Void;
	function clone():Euler;
}