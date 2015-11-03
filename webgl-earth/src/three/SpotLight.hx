package three;

@:native("THREE.SpotLight") extern class SpotLight extends Light {
	function new(?hex:Float, ?intensity:Float, ?distance:Float, ?angle:Float, ?exponent:Float, ?decay:Float):Void;
	var target : Object3D;
	var intensity : Float;
	var distance : Float;
	var angle : Float;
	var exponent : Float;
	var decay : Float;
	var onlyShadow : Bool;
	var shadowCameraNear : Float;
	var shadowCameraFar : Float;
	var shadowCameraFov : Float;
	var shadowCameraVisible : Bool;
	var shadowBias : Float;
	var shadowDarkness : Float;
	var shadowMapWidth : Float;
	var shadowMapHeight : Float;
	var shadowMap : RenderTarget;
	var shadowMapSize : Vector2;
	var shadowCamera : Camera;
	var shadowMatrix : Matrix4;
	@:overload(function():SpotLight { })
	@:overload(function(?light:Light):Light { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}