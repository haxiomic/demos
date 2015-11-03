package three;

@:native("THREE.BufferGeometry") extern class BufferGeometry {
	function new():Void;
	var id : Float;
	var uuid : String;
	var name : String;
	var type : String;
	var attributes : Array<BufferAttribute>;
	var attributesKeys : Array<String>;
	var drawcalls : Array<{ var start : Float; var count : Float; var index : Float; }>;
	var offsets : Array<{ var start : Float; var count : Float; var index : Float; }>;
	var boundingBox : Box3;
	var boundingSphere : BoundingSphere;
	@:overload(function(name:String, array:Dynamic, itemSize:Float):Dynamic { })
	function addAttribute(name:String, attribute:BufferAttribute):Dynamic;
	function getAttribute(name:String):Dynamic;
	function addDrawCall(start:Float, count:Float, index:Float):Void;
	function applyMatrix(matrix:Matrix4):Void;
	function center():Vector3;
	function fromGeometry(geometry:Geometry, ?settings:Dynamic):BufferGeometry;
	function computeBoundingBox():Void;
	function computeBoundingSphere():Void;
	function computeFaceNormals():Void;
	function computeVertexNormals():Void;
	function computeTangents():Void;
	function computeOffsets(size:Float):Void;
	function merge(geometry:BufferGeometry, offset:Float):BufferGeometry;
	function normalizeNormals():Void;
	function reorderBuffers(indexBuffer:Float, indexMap:Array<Float>, vertexCount:Float):Void;
	function toJSON():Dynamic;
	function clone():BufferGeometry;
	function dispose():Void;
	function addEventListener(type:String, listener:Dynamic -> Void):Void;
	function hasEventListener(type:String, listener:Dynamic -> Void):Void;
	function removeEventListener(type:String, listener:Dynamic -> Void):Void;
	function dispatchEvent(event:{ var type : String; var target : Dynamic; }):Void;
}