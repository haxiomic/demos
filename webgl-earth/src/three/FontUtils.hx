package three;

@:native("THREE.FontUtils") extern class FontUtils {
	static var faces : { };
	static var face : String;
	static var weight : String;
	static var style : String;
	static var size : Float;
	static var divisions : Float;
	static function getFace():Face3;
	static function loadFace(data:TypefaceData):TypefaceData;
	static function drawText(text:String):{ var paths : Array<Path>; var offset : Float; };
	static function extractGlyphPoints(c:String, face:Face3, scale:Float, offset:Float, path:Path):{ var offset : Float; var path : Path; };
	static function generateShapes(text:String, ?parameters:{ @:optional
	var size : Float; @:optional
	var curveSegments : Float; @:optional
	var font : String; @:optional
	var weight : String; @:optional
	var style : String; }):Array<Shape>;
	static var Triangulate : { function area(contour:Array<Vector2>):Float; };
}