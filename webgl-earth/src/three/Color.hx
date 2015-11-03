package three;

@:native("THREE.Color") extern class Color {
	@:overload(function(?color:String):Void { })
	@:overload(function(?color:Float):Void { })
	@:overload(function(r:Float, g:Float, b:Float):Void { })
	function new(?color:Color):Void;
	var r : Float;
	var g : Float;
	var b : Float;
	@:overload(function(color:Float):Color { })
	@:overload(function(color:String):Color { })
	function set(color:Color):Color;
	function setHex(hex:Float):Color;
	function setRGB(r:Float, g:Float, b:Float):Color;
	function setHSL(h:Float, s:Float, l:Float):Color;
	function setStyle(style:String):Color;
	function copy(color:Color):Color;
	function copyGammaToLinear(color:Color, ?gammaFactor:Float):Color;
	function copyLinearToGamma(color:Color, ?gammaFactor:Float):Color;
	function convertGammaToLinear():Color;
	function convertLinearToGamma():Color;
	function getHex():Float;
	function getHexString():String;
	function getHSL():HSL;
	function getStyle():String;
	function offsetHSL(h:Float, s:Float, l:Float):Color;
	function add(color:Color):Color;
	function addColors(color1:Color, color2:Color):Color;
	function addScalar(s:Float):Color;
	function multiply(color:Color):Color;
	function multiplyScalar(s:Float):Color;
	function lerp(color:Color, alpha:Float):Color;
	function equals(color:Color):Bool;
	function fromArray(rgb:Array<Float>):Color;
	function toArray(?array:Array<Float>, ?offset:Float):Array<Float>;
	function clone():Color;
}