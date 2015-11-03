package three;

@:native("THREE.CameraHelper") extern class CameraHelper extends Line {
	function new(camera:Camera):Void;
	var camera : Camera;
	var pointMap : { };
	function update():Void;
}