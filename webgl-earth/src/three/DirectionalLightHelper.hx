package three;

@:native("THREE.DirectionalLightHelper") extern class DirectionalLightHelper extends Object3D {
	function new(light:Light, ?size:Float):Void;
	var light : Light;
	var lightPlane : Line;
	var targetLine : Line;
	function dispose():Void;
	function update():Void;
}