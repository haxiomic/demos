package three;

@:native("THREE.SkeletonHelper") extern class SkeletonHelper extends Line {
	function new(bone:Object3D):Void;
	var bones : Array<Bone>;
	var root : Object3D;
	function getBoneList(object:Object3D):Array<Bone>;
	function update():Void;
}