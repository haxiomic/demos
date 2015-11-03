package three;

@:native("THREE.Face3") extern class Face3 {
	@:overload(function(a:Float, b:Float, c:Float, ?normal:Vector3, ?vertexColors:Array<Color>, ?materialIndex:Float):Void { })
	@:overload(function(a:Float, b:Float, c:Float, ?vertexNormals:Array<Vector3>, ?color:Color, ?materialIndex:Float):Void { })
	@:overload(function(a:Float, b:Float, c:Float, ?vertexNormals:Array<Vector3>, ?vertexColors:Array<Color>, ?materialIndex:Float):Void { })
	function new(a:Float, b:Float, c:Float, ?normal:Vector3, ?color:Color, ?materialIndex:Float):Void;
	var a : Float;
	var b : Float;
	var c : Float;
	var normal : Vector3;
	var vertexNormals : Array<Vector3>;
	var color : Color;
	var vertexColors : Array<Color>;
	var vertexTangents : Array<Float>;
	var materialIndex : Float;
	function clone():Face3;
}