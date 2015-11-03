package three;

@:native("THREE.CurvePath") extern class CurvePath<T:(Vector)> extends Curve<T> {
	function new():Void;
	var curves : Array<Curve<T>>;
	var bends : Array<Path>;
	var autoClose : Bool;
	function add(curve:Curve<T>):Void;
	function checkConnection():Bool;
	function closePath():Void;
	@:overload(function():Float { })
	override function getLength():Float;
	function getCurveLengths():Array<Float>;
	function getBoundingBox():BoundingBox;
	function createPointsGeometry(divisions:Float):Geometry;
	function createSpacedPointsGeometry(divisions:Float):Geometry;
	function createGeometry(points:Array<T>):Geometry;
	function addWrapPath(bendpath:Path):Void;
	function getTransformedPoints(segments:Float, ?bends:Array<Path>):Array<T>;
	function getTransformedSpacedPoints(segments:Float, ?bends:Array<Path>):Array<T>;
	function getWrapPoints(oldPts:Array<T>, path:Path):Array<T>;
}