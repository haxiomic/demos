package three;

@:native("THREE.DynamicBufferAttribute") extern class DynamicBufferAttribute extends BufferAttribute {
	function new(array:Dynamic, itemSize:Float):Void;
	var updateRange : { var offset : Float; var count : Float; };
	@:overload(function():DynamicBufferAttribute { })
	override function clone():BufferAttribute;
}