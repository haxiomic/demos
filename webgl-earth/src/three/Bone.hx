package three;

@:native("THREE.Bone") extern class Bone extends Object3D {
	function new(skin:SkinnedMesh):Void;
	var skin : SkinnedMesh;
}