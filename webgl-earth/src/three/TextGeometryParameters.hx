package three;

@:native("THREE.TextGeometryParameters") extern typedef TextGeometryParameters = {
	@:optional
	var size : Float;
	@:optional
	var height : Float;
	@:optional
	var curveSegments : Float;
	@:optional
	var font : String;
	@:optional
	var weight : String;
	@:optional
	var style : String;
	@:optional
	var bevelEnabled : Bool;
	@:optional
	var bevelThickness : Float;
	@:optional
	var bevelSize : Float;
};