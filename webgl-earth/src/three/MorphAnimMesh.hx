package three;

@:native("THREE.MorphAnimMesh") extern class MorphAnimMesh extends Mesh {
	@:overload(function(?geometry:Geometry, ?material:MeshDepthMaterial):Void { })
	@:overload(function(?geometry:Geometry, ?material:MeshFaceMaterial):Void { })
	@:overload(function(?geometry:Geometry, ?material:MeshLambertMaterial):Void { })
	@:overload(function(?geometry:Geometry, ?material:MeshNormalMaterial):Void { })
	@:overload(function(?geometry:Geometry, ?material:MeshPhongMaterial):Void { })
	@:overload(function(?geometry:Geometry, ?material:ShaderMaterial):Void { })
	function new(?geometry:Geometry, ?material:MeshBasicMaterial):Void;
	var duration : Float;
	var mirroredLoop : Bool;
	var time : Float;
	var lastKeyframe : Float;
	var currentKeyframe : Float;
	var direction : Float;
	var directionBackwards : Bool;
	var startKeyframe : Float;
	var endKeyframe : Float;
	var length : Float;
	function setFrameRange(start:Float, end:Float):Void;
	function setDirectionForward():Void;
	function setDirectionBackward():Void;
	function parseAnimations():Void;
	function setAnimationLabel(label:String, start:Float, end:Float):Void;
	function playAnimation(label:String, fps:Float):Void;
	function updateAnimation(delta:Float):Void;
	function interpolateTargets(a:Float, b:Float, t:Float):Void;
	@:overload(function(?object:MorphAnimMesh):MorphAnimMesh { })
	@:overload(function(?object:Mesh):Mesh { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}