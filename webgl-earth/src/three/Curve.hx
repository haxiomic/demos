package three;

@:native("THREE.Curve") extern class Curve<T:(Vector)> {
	function getPoint(t:Float):T;
	function getPointAt(u:Float):T;
	function getPoints(?divisions:Float):Array<T>;
	function getSpacedPoints(?divisions:Float):Array<T>;
	function getLength():Float;
	function getLengths(?divisions:Float):Array<Float>;
	function updateArcLengths():Void;
	function getUtoTmapping(u:Float, distance:Float):Float;
	function getTangent(t:Float):T;
	function getTangentAt(u:Float):T;
	static var Utils : { function tangentQuadraticBezier(t:Float, p0:Float, p1:Float, p2:Float):Float; function tangentCubicBezier(t:Float, p0:Float, p1:Float, p2:Float, p3:Float):Float; function tangentSpline(t:Float, p0:Float, p1:Float, p2:Float, p3:Float):Float; function interpolate(p0:Float, p1:Float, p2:Float, p3:Float, t:Float):Float; };
	static function create(constructorFunc:haxe.Constraints.Function, getPointFunc:haxe.Constraints.Function):haxe.Constraints.Function;
}