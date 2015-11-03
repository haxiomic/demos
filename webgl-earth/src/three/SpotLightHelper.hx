package three;

@:native("THREE.SpotLightHelper") extern class SpotLightHelper extends Object3D {
	function new(light:Light, sphereSize:Float, arrowLength:Float):Void;
	var light : Light;
	var cone : Mesh;
	function dispose():Void;
	function update():Void;
}