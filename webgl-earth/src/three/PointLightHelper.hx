package three;

@:native("THREE.PointLightHelper") extern class PointLightHelper extends Object3D {
	function new(light:Light, sphereSize:Float):Void;
	var light : Light;
	function dispose():Void;
	function update():Void;
}