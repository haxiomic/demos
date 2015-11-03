package three;

@:native("THREE.GridHelper") extern class GridHelper extends Line {
	function new(size:Float, step:Float):Void;
	var color1 : Color;
	var color2 : Color;
	function setColors(colorCenterLine:Float, colorGrid:Float):Void;
}