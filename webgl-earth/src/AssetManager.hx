package;

class AssetManager{

	var assetMap:Map<String, Dynamic>;
	var listeners:Map<String, Array<AssetEvent->Void>>;
	var loadingPaths:Array<String>;

	public function new(){
		assetMap = new Map();
		listeners = new Map();
		loadingPaths = new Array();
	}

	public function get(path:String, onReady:Dynamic->Void){
		//@! todo
	}

}

class AssetEvent{
	public function new(eventType, assetPath, payload){

	}	
}