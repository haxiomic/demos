package three;

@:native("THREE.Spline") extern class Spline {
	function new(points:Array<SplineControlPoint>):Void;
	var points : Array<SplineControlPoint>;
	function initFromArray(a:Array<Array<Float>>):Void;
	function getPoint(k:Float):SplineControlPoint;
	function getControlPointsArray():Array<Array<Float>>;
	function getLength(?nSubDivisions:Float):{ var chunks : Array<Float>; var total : Float; };
	function reparametrizeByArcLength(samplingCoef:Float):Void;
}