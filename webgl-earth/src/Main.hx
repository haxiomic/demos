import js.Browser;
import js.html.CanvasElement;
import three.PerspectiveCamera;
import three.Scene;
import three.WebGLRenderer;
import three.controls.OrbitControls;

class Main{

	//dom
	var canvas:CanvasElement;
	//assets
	var assets:AssetManager;
	//three
	var renderer:WebGLRenderer;
	var scene:Scene;
	var camera:PerspectiveCamera;
	var controls:OrbitControls;

	var globe:Globe;

	public function new(){
		canvas = js.Browser.document.createCanvasElement();
		Browser.document.body.appendChild(canvas);
		fitCanvas();

		assets = new AssetManager();

		renderer = new WebGLRenderer({
			canvas: canvas,
			antialias: true//@! review
		});

		camera = new PerspectiveCamera(60, getAspect(), 0.01, 1000);
		camera.position.z = cameraZForViewHeight(3.00);

		controls = new OrbitControls(camera, canvas);
		controls.zoomSpeed = 0.1;
		controls.noPan = true;

		scene = new Scene();

		globe = new Globe();
		scene.add(globe);

		#if debug debugInit(); #end

		//dom listeners
		Browser.window.addEventListener('resize', onWindowResize, false);

		//kick off
		Browser.window.requestAnimationFrame(update);
	}

	#if debug
	function debugInit(){
		trace(renderer.getMaxAnisotropy());
	}
	#end

	function update(?t:Float){
		globe.setEarthAngle(10*Browser.window.performance.now()/1000);

		render(t);
		Browser.window.requestAnimationFrame(update);
	}

	function render(?t:Float){
		renderer.render(scene, camera);
	}

	function fitCanvas(){
		canvas.width = getWidth();
		canvas.height = getHeight();
	}

	function onWindowResize(?e){
		fitCanvas();

		camera.aspect = getAspect();
		camera.updateProjectionMatrix();

		renderer.setViewport(0, 0, getWidth(), getHeight());
	}

	//utilities
	function cameraZForViewHeight(height:Float){
		return (height/2)/Math.tan(0.5*three.Math.degToRad(camera.fov));
	}

	//container dimensions
	function getAspect()
		return getWidth()/getHeight();
	function getWidth()
		return Browser.window.innerWidth;
	function getHeight()
		return Browser.window.innerHeight;

	static inline function main(){
		new Main();
	}
}