package three;

@:native("THREE.Geometry") extern class Geometry {
	function new():Void;
	var id : Float;
	var uuid : String;
	var name : String;
	var type : String;
	var vertices : Array<Vector3>;
	var colors : Array<Color>;
	var faces : Array<Face3>;
	var faceVertexUvs : Array<Array<Array<Vector2>>>;
	var morphTargets : Array<MorphTarget>;
	var morphColors : Array<MorphColor>;
	var morphNormals : Array<MorphNormals>;
	var skinWeights : Array<Float>;
	var skinIndices : Array<Float>;
	var lineDistances : Array<Float>;
	var boundingBox : Box3;
	var boundingSphere : BoundingSphere;
	var hasTangents : Bool;
	var dynamic_(get, set) : Bool;
	var verticesNeedUpdate : Bool;
	var elementsNeedUpdate : Bool;
	var uvsNeedUpdate : Bool;
	var normalsNeedUpdate : Bool;
	var tangentsNeedUpdate : Bool;
	var colorsNeedUpdate : Bool;
	var lineDistancesNeedUpdate : Bool;
	var groupsNeedUpdate : Bool;
	function applyMatrix(matrix:Matrix4):Void;
	function fromBufferGeometry(geometry:BufferGeometry):Geometry;
	function center():Vector3;
	function computeFaceNormals():Void;
	function computeVertexNormals(?areaWeighted:Bool):Void;
	function computeMorphNormals():Void;
	function computeTangents():Void;
	function computeLineDistances():Void;
	function computeBoundingBox():Void;
	function computeBoundingSphere():Void;
	function merge(geometry:Geometry, matrix:Matrix, materialIndexOffset:Float):Void;
	function mergeMesh(mesh:Mesh):Void;
	function mergeVertices():Float;
	function toJSON():Dynamic;
	function clone():Geometry;
	function dispose():Void;
	var bones : Array<Bone>;
	var animation : AnimationData;
	var animations : Array<AnimationData>;
	function addEventListener(type:String, listener:Dynamic -> Void):Void;
	function hasEventListener(type:String, listener:Dynamic -> Void):Void;
	function removeEventListener(type:String, listener:Dynamic -> Void):Void;
	function dispatchEvent(event:{ var type : String; var target : Dynamic; }):Void;
	@:noComplete
	inline private function get_dynamic_():Bool {
		return untyped this["dynamic"];
	}
	@:noComplete
	inline private function set_dynamic_(v:Bool):Bool {
		return untyped this["dynamic"] = v;
	}
}