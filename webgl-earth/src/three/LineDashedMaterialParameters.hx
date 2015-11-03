package three;

@:native("THREE.LineDashedMaterialParameters") extern typedef LineDashedMaterialParameters = {
	>MaterialParameters,
	@:optional
	var color : Float;
	@:optional
	var linewidth : Float;
	@:optional
	var scale : Float;
	@:optional
	var dashSize : Float;
	@:optional
	var gapSize : Float;
	@:optional
	var vertexColors : Colors;
	@:optional
	var fog : Bool;
};