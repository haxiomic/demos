'use strict';

var app = (function(){
	//core
	var renderer;
	var controls;
	//cameras
	var cubeCamera;
	var screenPlaneCamera;
	//scenes
	var cubeScene;
	var screenPlaneScene;
	var skyScene;
	//objects
	var sky;
	var renderCube;
	var screenPlane;

	//rendering
	var shaders;//automatically populated from html
	//materials
	var backfacePassMaterial;
	var raytracePassMaterial;
	//render targets
	var backfaceRenderTarget;
	var screenbufferRenderTarget;
	//misc
	var cameraNormal;

	//settings
	var cubeRenderScaleFactor = parseFloat(URLParams.get("s", 0.3));
	var sunInclination = parseFloat(URLParams.get("inc", 0.35));
	var sunAzimuth = parseFloat(URLParams.get("az", 0.35));

	var initTime;
	var time;

	function init(){
		//load external resources
		var noiseTexture = THREE.ImageUtils.loadTexture("images/noise.png");
		noiseTexture.magFilter = THREE.LinearFilter;
		noiseTexture.minFilter = THREE.LinearFilter;
		noiseTexture.wrapS = THREE.RepeatWrapping;
		noiseTexture.wrapT = THREE.RepeatWrapping;
		noiseTexture.generateMipmaps = false;
		noiseTexture.flipY = false;

		//create objects
		renderer = new THREE.WebGLRenderer();
		cubeCamera = new THREE.PerspectiveCamera(80, getDrawAspect(), 0.001, 2000000);
		screenPlaneCamera = new THREE.OrthographicCamera();

		cubeScene = new THREE.Scene();
		screenPlaneScene = new THREE.Scene();
		skyScene = new THREE.Scene();
		controls = new THREE.OrbitControls(cubeCamera);
		cameraNormal = new THREE.Vector3(0,0,-1);
		var sunPosition = computeSunPosition(sunInclination, sunAzimuth);


		//set properties
		//renderer
		renderer.autoClearDepth = true;
		renderer.autoClearStencil = false;
		renderer.setSize(getScreenWidth(), getScreenHeight());
		renderer.setClearColor(0x000000, 0);
		renderer.setPixelRatio(window.devicePixelRatio);
		//cameras
		cubeCamera.position.z = 2.0;
		screenPlaneCamera.position.z = 1;
		//controls
		controls.damping = 0.2;
		controls.zoomSpeed = 0.5;
		controls.addEventListener('change', render);

		//get shaders from DOM
		shaders = ShaderTools.getDOMShaders();

		//render targets
		backfaceRenderTarget = new THREE.WebGLRenderTarget(getDrawWidth(), getDrawHeight(), {
			magFilter: THREE.NearestFilter,
			minFilter: THREE.NearestFilter,
			format: THREE.RGBAFormat,
			type: THREE.UnsignedByteType,
			depthBuffer: false,
			stencilBuffer: false,
			generateMipmaps: false
		});

		screenbufferRenderTarget = new THREE.WebGLRenderTarget(getDrawWidth(), getDrawHeight(), {
			magFilter: THREE.LinearFilter,
			minFilter: THREE.LinearFilter,
			format: THREE.RGBAFormat,
			type: THREE.UnsignedByteType,
			depthBuffer: false,
			stencilBuffer: false,
			generateMipmaps: false
		});

		//shader materials
		backfacePassMaterial = new THREE.ShaderMaterial({
			vertexShader: shaders.screenProjectionVS,
			fragmentShader: shaders.faceCoordinatesFS,
			uniform: {
				cameraNormal: {
					type: "v3",
					value: cameraNormal
				}
			},
			side: THREE.BackSide
		});

		raytracePassMaterial = new THREE.ShaderMaterial({
			vertexShader: shaders.screenProjectionVS,
			fragmentShader: shaders.raytraceCloudsFS,
			uniforms: {
				cameraNormal: {
					type: "v3",
					value: cameraNormal
				},
				backfaceInvResolution: {
					type: "v2",
					value: new THREE.Vector2(1/getDrawWidth(), 1/getDrawHeight())
				},
				backfaceTexture: {
					type: "t",
					value: backfaceRenderTarget
				},
				noiseTexture: {
					type: "t",
					value: noiseTexture
				},
				sunPosition: {
					type: "v3",
					value: sunPosition
				},
				time: {
					type: "f",
					value: 0
				}
			},
			transparent: false,
			// blending: THREE.AdditiveBlending,
			// blending: THREE.CustomBlending,
			// blendEquation: THREE.AddEquation,
			// blendSrc: THREE.OneFactor,
			// blendDst: THREE.OneFactor
		});

		//scene

		//cube scene
		renderCube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), null);
		cubeScene.add(renderCube);

		//sky scene
		//create sky
		sky = new THREE.Sky();
		sky.uniforms.turbidity.value = 10;
		sky.uniforms.reileigh.value = 2;
		sky.uniforms.mieCoefficient.value = 0.005;
		sky.uniforms.mieDirectionalG.value = 0.8;
		sky.uniforms.luminance.value = 1;

		sky.uniforms.sunPosition.value = sunPosition;
		skyScene.add(sky.mesh);

		screenPlane = new THREE.Mesh(
			new THREE.PlaneBufferGeometry(2, 2),
			new THREE.ShaderMaterial({
				vertexShader: "\
					varying vec2 texelCoord;\
					void main(void){\
						texelCoord = (position.xy + vec2(1.0))*.5;\
						gl_Position = vec4(position, 1.0);\
					}\
				",
				fragmentShader:"\
					uniform sampler2D tex;\
					varying vec2 texelCoord;\
					void main(void){\
						gl_FragColor = texture2D(tex, texelCoord);\
					}\
				",
				uniforms: {
					tex:{
						type: "t",
						value: screenbufferRenderTarget
					}
				},
				transparent: true,
				blending: THREE.CustomBlending,
				blendEquation: THREE.AddEquation,
				blendSrc: THREE.SrcAlphaFactor,
				blendDst: THREE.OneMinusSrcAlphaFactor
			})
		);
		screenPlaneScene.add(screenPlane);


		initTime = Date.now();
		mainLoop();

		//register event listeners
		window.addEventListener('resize', onWindowResize, false);

		//DOM modification
		document.body.appendChild(renderer.domElement);
	}

	function mainLoop(){
		//update time
		time = Date.now() - initTime;
		raytracePassMaterial.uniforms.time.value = time / 1000;

		//update camera normal
		cameraNormal.set(0,0,-1);
		cameraNormal.applyQuaternion(cubeCamera.quaternion);

		controls.update();
		// controls.rotateLeft(0.01); //spin
		render();

		requestAnimationFrame(mainLoop);
	}

	function render(){
		//backface coordinates pass
		renderCube.material = backfacePassMaterial;
		renderer.setViewport (0, 0, getDrawWidth(), getDrawHeight());
		renderer.render(cubeScene, cubeCamera, backfaceRenderTarget, false);

		//raytrace pass
		renderCube.material = raytracePassMaterial;
		renderer.setViewport (0, 0, getDrawWidth(), getDrawHeight());
		renderer.render(cubeScene, cubeCamera, screenbufferRenderTarget, false);

		//screen pass
		renderer.setViewport (0, 0, getScreenWidth(), getScreenHeight());

		//@! needs proper blending for screenPlaneScene onto skyScene
		// renderer.state.setBlending(THREE.CustomBlending, THREE.SubtractEquation, THREE.OneFactor, THREE.OneFactor);

		renderer.autoClearColor = true;
		// renderer.render(skyScene, cubeCamera, null, false);
		renderer.render(screenPlaneScene, screenPlaneCamera, null, false);
		renderer.autoClearColor = true;

		// renderer.state.setBlending(THREE.NoBlending);
	}

	//Events
	function onWindowResize(){
		//update cameras
		cubeCamera.aspect = getDrawAspect();
		cubeCamera.updateProjectionMatrix();
		screenPlaneCamera.updateProjectionMatrix();
		//update render targets
		//@! causes problems with upscaling
		// backfaceRenderTarget.setSize(getDrawWidth(), getDrawHeight());
		// screenbufferRenderTarget.setSize(getDrawWidth(), getDrawHeight());
		//update renderers
		renderer.setSize(getScreenWidth(), getScreenHeight());

		render();
	}

	//
	function computeSunPosition(inclination, azimuth){
		//compute sun position from inclination and az
		var theta = Math.PI * (inclination - 0.5);
		var phi = 2 * Math.PI * (azimuth - 0.5);
		var distance = 1;

		var sunPosition = new THREE.Vector3();
		sunPosition.x = distance * Math.cos(phi);
		sunPosition.y = distance * Math.sin(phi) * Math.sin(theta);
		sunPosition.z = distance * Math.sin(phi) * Math.cos(theta);
		return sunPosition;
	}

	function getScreenWidth(){return window.innerWidth;}
	function getScreenHeight(){return window.innerHeight;}
	function getScreenAspect(){return getScreenWidth() / getScreenHeight();}

	function getDrawWidth(){return window.innerWidth * cubeRenderScaleFactor;}
	function getDrawHeight(){return window.innerHeight * cubeRenderScaleFactor;}
	function getDrawAspect(){return getDrawWidth() / getDrawHeight();}

	return {
		init: init
	}

})();

//start
app.init();