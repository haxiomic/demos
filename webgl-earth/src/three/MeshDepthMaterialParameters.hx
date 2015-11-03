package three;

@:native("THREE.MeshDepthMaterialParameters") extern typedef MeshDepthMaterialParameters = {
	>MaterialParameters,
	@:optional
	var wireframe : Bool;
	@:optional
	var wireframeLinewidth : Float;
};