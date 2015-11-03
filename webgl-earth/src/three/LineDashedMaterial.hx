package three;

@:native("THREE.LineDashedMaterial") extern class LineDashedMaterial extends Material {
	function new(?parameters:LineDashedMaterialParameters):Void;
	var color : Color;
	var linewidth : Float;
	var scale : Float;
	var dashSize : Float;
	var gapSize : Float;
	var vertexColors : Colors;
	var fog : Bool;
	@:overload(function():LineDashedMaterial { })
	override function clone(?material:Material):Material;
}