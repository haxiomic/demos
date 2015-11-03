package three;

@:native("THREE.Path") extern class Path extends CurvePath<Vector2> {
	function new(?points:Array<Vector2>):Void;
	var actions : Array<PathAction>;
	function fromPoints(vectors:Array<Vector2>):Void;
	function moveTo(x:Float, y:Float):Void;
	function lineTo(x:Float, y:Float):Void;
	function quadraticCurveTo(aCPx:Float, aCPy:Float, aX:Float, aY:Float):Void;
	function bezierCurveTo(aCP1x:Float, aCP1y:Float, aCP2x:Float, aCP2y:Float, aX:Float, aY:Float):Void;
	function splineThru(pts:Array<Vector2>):Void;
	function arc(aX:Float, aY:Float, aRadius:Float, aStartAngle:Float, aEndAngle:Float, aClockwise:Bool):Void;
	function absarc(aX:Float, aY:Float, aRadius:Float, aStartAngle:Float, aEndAngle:Float, aClockwise:Bool):Void;
	function ellipse(aX:Float, aY:Float, xRadius:Float, yRadius:Float, aStartAngle:Float, aEndAngle:Float, aClockwise:Bool):Void;
	function absellipse(aX:Float, aY:Float, xRadius:Float, yRadius:Float, aStartAngle:Float, aEndAngle:Float, aClockwise:Bool):Void;
	@:overload(function(?divisions:Float, ?closedPath:Bool):Array<Vector2> { })
	override function getSpacedPoints(?divisions:Float):Array<T>;
	@:overload(function(?divisions:Float, ?closedPath:Bool):Array<Vector2> { })
	override function getPoints(?divisions:Float):Array<T>;
	function toShapes():Array<Shape>;
}