package three;

@:native("THREE.IFog") extern typedef IFog = {
	var name : String;
	var color : Color;
	function clone():IFog;
};