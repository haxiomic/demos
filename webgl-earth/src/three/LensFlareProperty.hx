package three;

@:native("THREE.LensFlareProperty") extern typedef LensFlareProperty = {
	var texture : Texture;
	var size : Float;
	var distance : Float;
	var x : Float;
	var y : Float;
	var z : Float;
	var scale : Float;
	var rotation : Float;
	var opacity : Float;
	var color : Color;
	var blending : Blending;
};