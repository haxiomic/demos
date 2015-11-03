package three.controls;

@:native("THREE.TransformControls") extern class TransformControls extends three.Object3D {
	function new(object:three.Camera, ?domElement:js.html.Element):Void;
	var object : three.Object3D;
	function update():Void;
	function detach(object:three.Object3D):Void;
	function attach(object:three.Object3D):Void;
	function setMode(mode:String):Void;
	function setSnap(snap:Dynamic):Void;
	function setSize(size:Float):Void;
	function setSpace(space:String):Void;
}