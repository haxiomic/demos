package three;

@:native("THREE.SceneUtils") extern class SceneUtils {
	static function createMultiMaterialObject(geometry:Geometry, materials:Array<Material>):Object3D;
	static function detach(child:Object3D, parent:Object3D, scene:Scene):Void;
	static function attach(child:Object3D, scene:Scene, parent:Object3D):Void;
}