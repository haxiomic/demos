package three;

@:native("THREE") extern enum TextureFilter {
	NearestFilter;
	NearestMipMapNearestFilter;
	NearestMipMapLinearFilter;
	LinearFilter;
	LinearMipMapNearestFilter;
	LinearMipMapLinearFilter;
}