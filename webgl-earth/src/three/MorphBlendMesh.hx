package three;

@:native("THREE.MorphBlendMesh") extern class MorphBlendMesh extends Mesh {
	function new(geometry:Geometry, material:Material):Void;
	var animationsMap : { };
	var animationsList : Array<MorphBlendMeshAnimation>;
	function createAnimation(name:String, start:Float, end:Float, fps:Float):Void;
	function autoCreateAnimations(fps:Float):Void;
	function setAnimationDirectionForward(name:String):Void;
	function setAnimationDirectionBackward(name:String):Void;
	function setAnimationFPS(name:String, fps:Float):Void;
	function setAnimationDuration(name:String, duration:Float):Void;
	function setAnimationWeight(name:String, weight:Float):Void;
	function setAnimationTime(name:String, time:Float):Void;
	function getAnimationTime(name:String):Float;
	function getAnimationDuration(name:String):Float;
	function playAnimation(name:String):Void;
	function stopAnimation(name:String):Void;
	function update(delta:Float):Void;
}