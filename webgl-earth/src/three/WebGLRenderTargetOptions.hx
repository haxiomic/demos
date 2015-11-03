package three;

@:native("THREE.WebGLRenderTargetOptions") extern typedef WebGLRenderTargetOptions = {
	@:optional
	var wrapS : Wrapping;
	@:optional
	var wrapT : Wrapping;
	@:optional
	var magFilter : TextureFilter;
	@:optional
	var minFilter : TextureFilter;
	@:optional
	var anisotropy : Float;
	@:optional
	var format : Float;
	@:optional
	var type : TextureDataType;
	@:optional
	var depthBuffer : Bool;
	@:optional
	var stencilBuffer : Bool;
};