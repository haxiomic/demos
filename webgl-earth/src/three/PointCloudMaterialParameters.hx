package three;

@:native("THREE.PointCloudMaterialParameters") extern typedef PointCloudMaterialParameters = {
	>MaterialParameters,
	@:optional
	var color : Float;
	@:optional
	var map : Texture;
	@:optional
	var size : Float;
	@:optional
	var sizeAttenuation : Bool;
	@:optional
	var vertexColors : Colors;
	@:optional
	var fog : Bool;
};