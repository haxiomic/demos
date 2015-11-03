package three;

@:native("THREE.WebGLStateInstance") extern typedef WebGLStateInstance = {
	function new(gl:Dynamic, paramThreeToGL:haxe.Constraints.Function):Void;
	function initAttributes():Void;
	function enableAttribute(attribute:String):Void;
	function disableUnusedAttributes():Void;
	function setBlending(blending:Float, blendEquation:Float, blendSrc:Float, blendDst:Float, blendEquationAlpha:Float, blendSrcAlpha:Float, blendDstAlpha:Float):Void;
	function setDepthTest(depthTest:Float):Void;
	function setDepthWrite(depthWrite:Float):Void;
	function setColorWrite(colorWrite:Float):Void;
	function setDoubleSided(doubleSided:Float):Void;
	function setFlipSided(flipSided:Float):Void;
	function setLineWidth(width:Float):Void;
	function setPolygonOffset(polygonoffset:Float, factor:Float, units:Float):Void;
	function reset():Void;
};