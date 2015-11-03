package three;

@:native("THREE.Material") extern class Material {
	function new():Void;
	var id : Float;
	var uuid : String;
	var name : String;
	var type : String;
	var side : Side;
	var opacity : Float;
	var transparent : Bool;
	var blending : Blending;
	var blendSrc : BlendingDstFactor;
	var blendDst : BlendingSrcFactor;
	var blendEquation : BlendingEquation;
	var blendSrcAlpha : Float;
	var blendDstAlpha : Float;
	var blendEquationAlpha : Float;
	var depthTest : Bool;
	var depthWrite : Bool;
	var colorWrite : Bool;
	var polygonOffset : Bool;
	var polygonOffsetFactor : Float;
	var polygonOffsetUnits : Float;
	var alphaTest : Float;
	var overdraw : Float;
	var visible : Bool;
	var needsUpdate : Bool;
	function setValues(values:Dynamic):Void;
	function toJSON():Dynamic;
	function clone(?material:Material):Material;
	function update():Void;
	function dispose():Void;
	function addEventListener(type:String, listener:Dynamic -> Void):Void;
	function hasEventListener(type:String, listener:Dynamic -> Void):Void;
	function removeEventListener(type:String, listener:Dynamic -> Void):Void;
	function dispatchEvent(event:{ var type : String; var target : Dynamic; }):Void;
}