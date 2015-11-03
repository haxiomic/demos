package three;

@:native("THREE.VertexNormalsHelper") extern class VertexNormalsHelper extends Line {
	function new(object:Object3D, ?size:Float, ?hex:Float, ?linewidth:Float):Void;
	var object : Object3D;
	var size : Float;
	var normalMatrix : Matrix3;
	function update(?object:Object3D):Void;
}