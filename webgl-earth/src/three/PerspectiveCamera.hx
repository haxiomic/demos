package three;

@:native("THREE.PerspectiveCamera") extern class PerspectiveCamera extends Camera {
	function new(?fov:Float, ?aspect:Float, ?near:Float, ?far:Float):Void;
	var zoom : Float;
	var fov : Float;
	var aspect : Float;
	var near : Float;
	var far : Float;
	function setLens(focalLength:Float, ?frameHeight:Float):Void;
	function setViewOffset(fullWidth:Float, fullHeight:Float, x:Float, y:Float, width:Float, height:Float):Void;
	function updateProjectionMatrix():Void;
	@:overload(function():PerspectiveCamera { })
	@:overload(function(?camera:Camera):Camera { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}