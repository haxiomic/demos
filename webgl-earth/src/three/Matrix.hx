package three;

@:native("THREE.Matrix") extern typedef Matrix = {
	var elements : js.html.Float32Array;
	function identity():Matrix;
	function copy(m:Matrix):Matrix;
	function multiplyScalar(s:Float):Matrix;
	function determinant():Float;
	function getInverse(matrix:Matrix, ?throwOnInvertible:Bool):Matrix;
	function transpose():Matrix;
	function clone():Matrix;
};