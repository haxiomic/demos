package three;

@:native("THREE.LoaderHandler") extern typedef LoaderHandler = {
	var handlers : Array<Dynamic>;
	function add(regex:String, loader:Loader):Void;
	function get(file:String):Loader;
};