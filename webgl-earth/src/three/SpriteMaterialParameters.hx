package three;

@:native("THREE.SpriteMaterialParameters") extern typedef SpriteMaterialParameters = {
	>MaterialParameters,
	@:optional
	var color : Float;
	@:optional
	var map : Texture;
	@:optional
	var rotation : Float;
	@:optional
	var fog : Bool;
};