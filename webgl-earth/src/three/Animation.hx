package three;

@:native("THREE.Animation") extern class Animation {
	function new(root:Mesh, data:AnimationData):Void;
	var root : Mesh;
	var data : AnimationData;
	var hierarchy : Array<Bone>;
	var currentTime : Float;
	var timeScale : Float;
	var isPlaying : Bool;
	var loop : Bool;
	var weight : Float;
	var interpolationType : Float;
	function play(?startTime:Float, ?weight:Float):Void;
	function stop():Void;
	function reset():Void;
	function resetBlendWeights():Void;
	function update(delta:Float):Void;
	function getNextKeyWith(type:String, h:Float, key:Float):KeyFrame;
	function getPrevKeyWith(type:String, h:Float, key:Float):KeyFrame;
}