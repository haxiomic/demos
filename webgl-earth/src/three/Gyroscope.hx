package three;

@:native("THREE.Gyroscope") extern class Gyroscope extends Object3D {
	function new():Void;
	@:overload(function(?force:Bool):Void { })
	override function updateMatrixWorld(force:Bool):Void;
}