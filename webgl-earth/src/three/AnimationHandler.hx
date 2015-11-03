package three;

@:native("THREE.AnimationHandler") extern class AnimationHandler {
	static var LINEAR : Float;
	static var CATMULLROM : Float;
	static var CATMULLROM_FORWARD : Float;
	static var animations : Array<Dynamic>;
	static function init(data:AnimationData):AnimationData;
	static function parse(root:Mesh):Array<Object3D>;
	static function play(animation:Animation):Void;
	static function stop(animation:Animation):Void;
	static function update(deltaTimeMS:Float):Void;
}