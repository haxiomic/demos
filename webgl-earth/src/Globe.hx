package;

import three.BoxGeometry;
import three.DirectionalLight;
import three.ImageUtils;
import three.Mesh;
import three.MeshNormalMaterial;
import three.MeshPhongMaterial;
import three.Object3D;
import three.SphereGeometry;
import three.Vector3;

class Globe extends Object3D{

	var sphereContainer:Object3D;
	var sphereMesh:Mesh;
	var sun:DirectionalLight;

	var rotationAxis:Vector3;

	public function new(){
		super();
		var tilt_deg = 23.4;
		rotationAxis = new Vector3(Math.sin(three.Math.degToRad(tilt_deg)), Math.cos(three.Math.degToRad(tilt_deg)), 0);
		rotationAxis.normalize();

		var colorTex = ImageUtils.loadTexture('assets/earth/color-1_mid.jpg');
		var bumpTex = ImageUtils.loadTexture('assets/earth/bump-1_mid.jpg');
		var specTex = ImageUtils.loadTexture('assets/earth/specular-1_mid.png');

		colorTex.anisotropy = 4;//@! needs checking in GPUCapabilties

		var sphereGeom = new SphereGeometry(radius, segments, segments);
		var mat = new MeshPhongMaterial({
			map: colorTex,

			bumpMap: bumpTex,
			bumpScale: 0.0025,

			specularMap: specTex,

			specular: 0x333333,
			shininess: 25,
			metal: false,

			// reflectivity: 1, for envMap

			color: 0xFFFFFF
		});
		

		sphereContainer = new Object3D();
		sphereContainer.rotateZ(-three.Math.degToRad(tilt_deg));
		this.add(sphereContainer);

		sphereMesh = new Mesh(sphereGeom, mat);
		sphereContainer.add(sphereMesh);

		sun = new DirectionalLight(0xfff5f2, 1);//http://www.todayifoundout.com/index.php/2010/03/the-sun-is-white-not-yellow/
		sun.position.set(2, 0, 0);
		sun.target.position.set(0, 0, 0);
		this.add(sun);

		#if debug
		var debugMesh = new Mesh(new BoxGeometry(0.1, 0.1, 0.02), new MeshNormalMaterial());
		debugMesh.position.copy(sun.position);
		debugMesh.lookAt(sun.target.position);
		this.add(debugMesh);
		#end
	}

	public function setEarthAngle(degrees:Float){
		sphereMesh.rotation.y = three.Math.degToRad(degrees);
	}

	public function setAxisAngle(degrees:Float){
		sphereContainer.rotation.y = three.Math.degToRad(degrees);
	}

	static inline var radius = 1;
	static inline var segments = 80;

}