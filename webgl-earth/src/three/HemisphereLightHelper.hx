package three;

@:native("THREE.HemisphereLightHelper") extern class HemisphereLightHelper extends Object3D {
	function new(light:Light, sphereSize:Float):Void;
	var light : Light;
	var colors : Array<Color>;
	var lightSphere : Mesh;
	function dispose():Void;
	function update():Void;
}