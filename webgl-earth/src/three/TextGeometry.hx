package three;

@:native("THREE.TextGeometry") extern class TextGeometry extends ExtrudeGeometry {
	function new(text:String, ?TextGeometryParameters:TextGeometryParameters):Void;
}