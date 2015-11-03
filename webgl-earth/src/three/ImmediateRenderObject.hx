package three;

@:native("THREE.ImmediateRenderObject") extern class ImmediateRenderObject extends Object3D {
	function new():Void;
	function render(renderCallback:haxe.Constraints.Function):Void;
}