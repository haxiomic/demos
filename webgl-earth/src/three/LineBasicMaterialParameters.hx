package three;

@:native("THREE.LineBasicMaterialParameters") extern typedef LineBasicMaterialParameters = {
	>MaterialParameters,
	@:optional
	var color : Float;
	@:optional
	var linewidth : Float;
	@:optional
	var linecap : String;
	@:optional
	var linejoin : String;
	@:optional
	var vertexColors : Colors;
	@:optional
	var fog : Bool;
};