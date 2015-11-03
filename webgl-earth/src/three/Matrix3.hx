package three;

@:native("THREE.Matrix3") extern class Matrix3 {
	@:overload(function(n11:Float, n12:Float, n13:Float, n21:Float, n22:Float, n23:Float, n31:Float, n32:Float, n33:Float):Void { })
	function new():Void;
	var elements : js.html.Float32Array;
	function set(n11:Float, n12:Float, n13:Float, n21:Float, n22:Float, n23:Float, n31:Float, n32:Float, n33:Float):Matrix3;
	function identity():Matrix3;
	function copy(m:Matrix3):Matrix3;
	function applyToVector3Array(array:Array<Float>, ?offset:Float, ?length:Float):Array<Float>;
	function multiplyScalar(s:Float):Matrix3;
	function determinant():Float;
	@:overload(function(matrix:Matrix4, ?throwOnInvertible:Bool):Matrix3 { })
	function getInverse(matrix:Matrix3, ?throwOnInvertible:Bool):Matrix3;
	function transpose():Matrix3;
	function flattenToArrayOffset(array:Array<Float>, offset:Float):Array<Float>;
	function getNormalMatrix(m:Matrix4):Matrix3;
	function transposeIntoArray(r:Array<Float>):Array<Float>;
	function fromArray(array:Array<Float>):Matrix3;
	function toArray():Array<Float>;
	function clone():Matrix3;
}