package three;

@:native("THREE.Camera") extern class Camera extends Object3D {
	function new():Void;
	var matrixWorldInverse : Matrix4;
	var projectionMatrix : Matrix4;
	@:overload(function(?optionalTarget:Vector3):Vector3 { })
	override function getWorldDirection(?optionalTarget:Vector3):Vector3;
	@:overload(function(vector:Vector3):Void { })
	override function lookAt(vector:Vector3):Void;
	@:overload(function(?camera:Camera):Camera { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}