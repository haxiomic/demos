package three;

@:native("THREE.CubeCamera") extern class CubeCamera extends Object3D {
	function new(?near:Float, ?far:Float, ?cubeResolution:Float):Void;
	var renderTarget : WebGLRenderTargetCube;
	function updateCubeMap(renderer:Renderer, scene:Scene):Void;
}