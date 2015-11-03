package three;

@:native("THREE.LOD") extern class LOD extends Object3D {
	function new():Void;
	var objects : Array<Dynamic>;
	function addLevel(object:Object3D, ?distance:Float):Void;
	function getObjectForDistance(distance:Float):Object3D;
	function raycast(raycaster:Raycaster, intersects:Dynamic):Void;
	function update(camera:Camera):Void;
	@:overload(function(?object:LOD):LOD { })
	override function clone(?object:Object3D, ?recursive:Bool):Object3D;
}