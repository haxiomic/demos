package three;

@:native("THREE.DirectionalLight") extern class DirectionalLight extends Light {
	function new(?hex:Float, ?intensity:Float):Void;
	var target : Object3D;
	var intensity : Float;
	var onlyShadow : Bool;
	var shadowCameraNear : Float;
	var shadowCameraFar : Float;
	var shadowCameraLeft : Float;
	var shadowCameraRight : Float;
	var shadowCameraTop : Float;
	var shadowCameraBottom : Float;
	var shadowCameraVisible : Bool;
	var shadowBias : Float;
	var shadowDarkness : Float;
	var shadowMapWidth : Float;
	var shadowMapHeight : Float;
	var shadowCascade : Bool;
	var shadowCascadeOffset : Vector3;
	var shadowCascadeCount : Float;
	var shadowCascadeBias : Array<Float>;
	var shadowCascadeWidth : Array<Float>;
	var shadowCascadeHeight : Array<Float>;
	var shadowCascadeNearZ : Array<Float>;
	var shadowCascadeFarZ : Array<Float>;
	var shadowCascadeArray : Array<DirectionalLight>;
	var shadowMap : RenderTarget;
	var shadowMapSize : Float;
	var shadowCamera : Camera;
	var shadowMatrix : Matrix4;
	@:overload(function():DirectionalLight { })
	@:overload(function(?light:Light):Light { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}