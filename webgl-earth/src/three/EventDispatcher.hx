package three;

@:native("THREE.EventDispatcher") extern class EventDispatcher {
	function new():Void;
	function addEventListener(type:String, listener:Dynamic -> Void):Void;
	function hasEventListener(type:String, listener:Dynamic -> Void):Void;
	function removeEventListener(type:String, listener:Dynamic -> Void):Void;
	function dispatchEvent(event:{ var type : String; var target : Dynamic; }):Void;
}