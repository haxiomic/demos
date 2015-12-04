(function ($hx_exports, $global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var AssetManager = function() {
	this.assetMap = new haxe_ds_StringMap();
	this.listeners = new haxe_ds_StringMap();
	this.loadingPaths = [];
};
AssetManager.__name__ = true;
AssetManager.prototype = {
	get: function(path,onReady) {
	}
	,__class__: AssetManager
};
var AssetEvent = function(eventType,assetPath,payload) {
};
AssetEvent.__name__ = true;
AssetEvent.prototype = {
	__class__: AssetEvent
};
var CompileTime = function() { };
CompileTime.__name__ = true;
var Debug = function() { };
Debug.__name__ = true;
Debug.init = function() {
	console.log("renderer.getMaxAnisotropy: " + Debug.m.renderer.getMaxAnisotropy());
	Debug.camera2d = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
	Debug.scene2d = new THREE.Scene();
	Debug.debugTex = THREE.ImageUtils.loadTexture("assets/uv-grid.jpg");
	Debug.testPlaneMat = new THREE.MeshBasicMaterial({ map : Debug.debugTex, color : 16777215, wireframe : false, visible : false});
	Debug.testPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1,1,1),Debug.testPlaneMat);
	Debug.testPlane.scale.x = 2.0;
	Debug.testPlane.scale.y = 2.0;
	Debug.testPlane.position.x = -1 + Debug.testPlane.scale.x * .5;
	Debug.testPlane.position.y = -1 + Debug.testPlane.scale.y * .5;
	Debug.scene2d.add(Debug.testPlane);
	Debug.vectorOverlayMaterial = new THREE.LineBasicMaterial({ color : 16777215, transparent : true, opacity : 0.0, linewidth : 2.0});
	var addGeoJsonLines = function(coordinates) {
		var tmp;
		var _g = [];
		var _g1 = 0;
		while(_g1 < coordinates.length) {
			var c = coordinates[_g1];
			++_g1;
			_g.push(Debug.m.globe.geoToLocal(new gis__$GeoCoord_CGeoCoord(c[0],c[1],c[2])));
		}
		tmp = _g;
		var vertices = tmp;
		var geom = new THREE.Geometry();
		geom.vertices = vertices;
		var line = new THREE.Line(geom,Debug.vectorOverlayMaterial);
		Debug.m.globe.earthMesh.add(line);
	};
	var tmp1;
	var handleGeoJsonObject1 = null;
	handleGeoJsonObject1 = function(o) {
		{
			var _g2 = gis_geojson_GeoJsonObjectHelper.getTypeEnum(o);
			switch(_g2[1]) {
			case 0:
				var f = _g2[2];
				handleGeoJsonObject1(f.geometry);
				break;
			case 1:
				var f1 = _g2[2];
				var _g11 = 0;
				var _g21 = f1.features;
				while(_g11 < _g21.length) {
					var feature = _g21[_g11];
					++_g11;
					handleGeoJsonObject1(feature);
				}
				break;
			case 2:
				var g = _g2[2];
				var _g12 = 0;
				var _g22 = g.geometries;
				while(_g12 < _g22.length) {
					var geometry = _g22[_g12];
					++_g12;
					handleGeoJsonObject1(geometry);
				}
				break;
			case 3:
				var l = _g2[2];
				addGeoJsonLines(l.coordinates);
				break;
			case 4:
				var mls = _g2[2];
				var _g13 = 0;
				var _g23 = mls.coordinates;
				while(_g13 < _g23.length) {
					var cs = _g23[_g13];
					++_g13;
					addGeoJsonLines(cs);
				}
				break;
			case 8:case 5:case 6:case 7:
				window.console.warn("unhandled GeoJson geometry type '" + o.type + "'");
				break;
			}
		}
	};
	tmp1 = handleGeoJsonObject1;
	var handleGeoJsonObject = tmp1;
	var request = new haxe_Http("" + Debug.m.assetRoot + "/vectors/coastline-lowres/topojson.json");
	request.onData = function(content) {
		var t = JSON.parse(content);
		var _g3 = 0;
		var _g14 = Reflect.fields(t.objects);
		while(_g3 < _g14.length) {
			var id = _g14[_g3];
			++_g3;
			var o1 = t.objects[id];
			handleGeoJsonObject(topojson.feature(t,o1));
		}
	};
	request.request(false);
	var tmp2;
	var _this = window.document;
	tmp2 = _this.createElement("script");
	var scriptEl = tmp2;
	scriptEl.src = "lib/dat.gui/dat.gui.js";
	scriptEl.onload = Debug.setupDatGUI;
	window.document.body.appendChild(scriptEl);
};
Debug.setupDatGUI = function() {
	Debug.gui = new dat.GUI();
	Debug.gui.add(Debug.m.camera,"fov").min(1).max(180).name("FOV").onChange(function(x) {
		Debug.m.camera.updateProjectionMatrix();
	});
	Debug.gui.add(Debug.m,"sunSpringEnabled");
	Debug.gui.add(Debug.m,"sunSpringK").min(0).max(20);
	Debug.gui.add(Debug.m,"sunSpringDamp").min(0).max(1);
	Debug.gui.add(Debug.testPlane.material,"visible").name("Test Plane");
	Debug.gui.add(Debug.m.globe.atmosphere,"visible").name("Atmosphere");
	Debug.gui.add(Debug.m.globe.earthMesh.material,"shininess").onChange(function(s) {
		(js_Boot.__cast(Debug.m.globe.earthMesh.material , objects_globe_GlobeMaterial)).set_shininess(s);
	}).name("Shininess");
	Debug.gui.add(Debug.m.globe.sun,"intensity").name("Intensity");
	var li = 1;
	Debug.gui.add({ f : function() {
		Debug.m.setChapter(li++ % Debug.m.currentTrack.chapterCount);
	}},"f").name("Next Chapter");
};
Debug.addOverlaySettings = function(windFlowMap) {
	Debug.gui.add(Debug.m.globe.overlay1Material,"opacity").min(0).max(1).name("Heatmap Overlay");
	Debug.gui.add(Debug.m.globe.overlay2Material,"opacity").min(0).max(1).name("Particle Overlay");
	Debug.gui.add(Debug.vectorOverlayMaterial,"opacity").min(0).max(1).name("Coastline");
	Debug.gui.add(Debug.m.globe,"sequenceSpeed").min(0).max(0.01).step(0.000001).name("Playback Speed");
	var flowFolder = Debug.gui.addFolder("Wind Flow");
	flowFolder.add(windFlowMap.processLastFrame.uniforms.halfLife,"value").min(0).max(5).step(0.01).name("Decay Half Life (s)");
	flowFolder.add(windFlowMap.particleRenderObject.material.uniforms.particleOpacity,"value").min(0).max(1).step(0.001).name("Opacity (Additive)");
	flowFolder.add(windFlowMap.particleRenderObject.material.uniforms.particleSize,"value").min(1).max(5).step(1).name("Size");
	flowFolder.add(windFlowMap.particles.positionStepMaterial.uniforms.meanLifetime,"value").min(0).max(10).step(0.001).name("Mean Lifetime (s)");
	flowFolder.add(windFlowMap.particles.positionStepMaterial.uniforms.windVelocityScale,"value").min(0).max(0.00333333333333333355).step(0.000001).name("Velocity Scale");
};
Debug.update = function(t_ms) {
};
Debug.render = function(t_ms) {
	Debug.m.renderer.render(Debug.scene2d,Debug.camera2d);
};
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
EReg.__name__ = true;
EReg.prototype = {
	match: function(s) {
		if(this.r.global) this.r.lastIndex = 0;
		this.r.m = this.r.exec(s);
		this.r.s = s;
		return this.r.m != null;
	}
	,replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.cca = function(s,index) {
	var x = s.charCodeAt(index);
	if(x != x) return undefined;
	return x;
};
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
HxOverrides.remove = function(a,obj) {
	var i = a.indexOf(obj);
	if(i == -1) return false;
	a.splice(i,1);
	return true;
};
HxOverrides.iter = function(a) {
	return { cur : 0, arr : a, hasNext : function() {
		return this.cur < this.arr.length;
	}, next : function() {
		return this.arr[this.cur++];
	}};
};
var Lambda = function() { };
Lambda.__name__ = true;
Lambda.exists = function(it,f) {
	var $it0 = $iterator(it)();
	while( $it0.hasNext() ) {
		var x = $it0.next();
		if(f(x)) return true;
	}
	return false;
};
var List = function() {
	this.length = 0;
};
List.__name__ = true;
List.prototype = {
	iterator: function() {
		return new _$List_ListIterator(this.h);
	}
	,__class__: List
};
var _$List_ListIterator = function(head) {
	this.head = head;
	this.val = null;
};
_$List_ListIterator.__name__ = true;
_$List_ListIterator.prototype = {
	hasNext: function() {
		return this.head != null;
	}
	,next: function() {
		this.val = this.head[0];
		this.head = this.head[1];
		return this.val;
	}
	,__class__: _$List_ListIterator
};
var tracks_Track = function(state) {
	this.state = state;
};
tracks_Track.__name__ = true;
tracks_Track.prototype = {
	cleanup: function() {
	}
	,setChapter: function(i) {
		if(this.currentChapterIdx != null) this.chapters[this.currentChapterIdx].cleanup();
		this.chapters[i].init();
		this.currentChapterIdx = i;
	}
	,__class__: tracks_Track
};
var tracks_AnimalOdysseys = function(state) {
	console.log("setting up AnimalOdysseys");
	tracks_Track.call(this,state);
	this.migrationPaths = [];
	var $it0 = tracks_MigrationData.allPaths.keys();
	while( $it0.hasNext() ) {
		var name = $it0.next();
		var tmp;
		var _this = tracks_MigrationData.allPaths;
		if(__map_reserved[name] != null) tmp = _this.getReserved(name); else tmp = _this.h[name];
		var coords = tmp;
		var tmp1;
		var _g = HxOverrides.substr(name,0,4).toLowerCase();
		switch(_g) {
		case "dwar":
			tmp1 = 15549696;
			break;
		case "gree":
			tmp1 = 630016;
			break;
		case "shea":
			tmp1 = 7997184;
			break;
		default:
			tmp1 = 16711680;
		}
		var color = tmp1;
		var tmp2;
		var _g1 = [];
		var _g11 = 0;
		while(_g11 < coords.length) {
			var a = coords[_g11];
			++_g11;
			_g1.push(new gis__$GeoCoord_CGeoCoord(a[0],a[1],a[2]));
		}
		tmp2 = _g1;
		var path = new objects_migrationpath_MigrationPath(state.globe,tmp2,color,0.01);
		this.migrationPaths.push(path);
		state.globe.earthMesh.add(path);
	}
	this.chapters = [{ init : $bind(this,this.chapter0Init), cleanup : $bind(this,this.chapter0Cleanup)}];
	this.chapterCount = 1;
};
tracks_AnimalOdysseys.__name__ = true;
tracks_AnimalOdysseys.__super__ = tracks_Track;
tracks_AnimalOdysseys.prototype = $extend(tracks_Track.prototype,{
	cleanup: function() {
		console.log("cleaning up AnimalOdysseys");
		var _g = 0;
		var _g1 = this.migrationPaths;
		while(_g < _g1.length) {
			var path = _g1[_g];
			++_g;
			this.state.globe.earthMesh.remove(path);
			path.geometry.dispose();
			path.material.dispose();
		}
	}
	,chapter0Init: function() {
		console.log("AO chapter 0");
		var _this = this.state.globe;
		var v = Math.PI * 0.65;
		_this.earthMesh.rotation.y = v;
		if(_this.atmosphereEnabled) _this.atmosphere.rotation.y = v;
		var _g = 0;
		var _g1 = this.migrationPaths;
		while(_g < _g1.length) {
			var p = _g1[_g];
			++_g;
			p.migrationMaterial.uniforms.progress.value = 0;
			var tween = motion_Actuate.tween(p,20,{ progress : 1},true);
			tween.ease(motion_easing_Sine.get_easeOut());
		}
	}
	,chapter0Cleanup: function() {
		console.log("AO cleanup 0");
	}
	,__class__: tracks_AnimalOdysseys
});
var Main = $hx_exports.Globe = function(container,assetRoot) {
	if(assetRoot == null) assetRoot = "assets/globe";
	this.sunAngularVelocity = 0;
	this.lastFrame_ms = -1;
	this.sunSpringDamp = 0.05;
	this.sunSpringK = 0.8;
	this.sunSpringEnabled = true;
	console.log("WebGL Globe Boot");
	if(container == null) container = window.document.body;
	this.container = container;
	this.assetRoot = assetRoot;
	var tmp;
	var _this = window.document;
	tmp = _this.createElement("canvas");
	this.canvas = tmp;
	this.container.appendChild(this.canvas);
	this.fitCanvas();
	this.assets = new AssetManager();
	this._u = new THREE.Vector3();
	this._v = new THREE.Vector3();
	this.mouse = new THREE.Vector2();
	this.renderer = new THREE.WebGLRenderer({ canvas : this.canvas, antialias : true});
	this.renderer.autoClear = false;
	this.raycaster = new THREE.Raycaster();
	this.scene = new THREE.Scene();
	this.globe = new objects_globe_Globe(this.renderer,assetRoot,1.0);
	this.scene.add(this.globe);
	this.camera = new objects_globe_GlobeCamera(this.globe,60,this.container.clientWidth / this.container.clientHeight,0.01,10.);
	this.camera.position.z = this.cameraZForViewHeight(3.);
	this.controls = new THREE.OrbitControls(this.camera,this.canvas);
	this.controls.zoomSpeed = 0.1;
	this.controls.noPan = false;
	Debug.m = this;
	Debug.init();
	window.addEventListener("resize",$bind(this,this.onWindowResize),false);
	this.canvas.addEventListener("mousedown",$bind(this,this.onMouseDown),false);
	this.canvas.addEventListener("mouseup",$bind(this,this.onMouseUp),false);
	this.canvas.addEventListener("mousemove",$bind(this,this.onMouseMove),false);
	window.requestAnimationFrame($bind(this,this.update));
};
Main.__name__ = true;
Main.main = function() {
};
Main.prototype = {
	setTrack: function(name) {
		var tmp;
		var _this = Main.trackMap;
		if(__map_reserved[name] != null) tmp = _this.getReserved(name); else tmp = _this.h[name];
		var trackClass = tmp;
		if(trackClass == null) throw new js__$Boot_HaxeError("unknown track " + name);
		var state = this;
		this.currentTrack = Type.createInstance(trackClass,[state]);
	}
	,setChapter: function(i) {
		this.currentTrack.setChapter(i);
	}
	,update: function(t_ms) {
		var time_s = t_ms / 1000;
		var dt_ms = this.lastFrame_ms < 0?16.6666666666666679:Math.min(t_ms - this.lastFrame_ms,100.);
		this.lastFrame_ms = t_ms;
		motion_actuators_SimpleActuator.stage_onEnterFrame();
		this.globe.update(dt_ms);
		if(this.sunSpringEnabled) this.sunCameraSpring(dt_ms);
		this.renderer.render(this.scene,this.camera);
		Debug.update(t_ms);
		Debug.render(t_ms);
		window.requestAnimationFrame($bind(this,this.update));
	}
	,render: function(t_ms) {
		this.renderer.render(this.scene,this.camera);
	}
	,sunCameraSpring: function(dt_ms) {
		var dt_s = dt_ms / 1000;
		var cameraSolarAngle = Math.atan2(this.camera.position.x - this.globe.position.y,this.camera.position.z - this.globe.position.z);
		var tmp;
		var _this = this.globe;
		tmp = Math.atan2(_this.sun.position.x,_this.sun.position.z);
		var da = tmp - cameraSolarAngle;
		da = Math.atan2(Math.sin(da),Math.cos(da));
		if(da == NaN) da = 0;
		var aa = -this.sunSpringK * da;
		this.sunAngularVelocity += aa * dt_s;
		var _g = this.globe;
		var v = Math.atan2(_g.sun.position.x,_g.sun.position.z) + this.sunAngularVelocity * dt_s;
		_g.sun.position.set(Math.sin(v) * _g.sunDistance,0,Math.cos(v) * _g.sunDistance);
		v;
		this.sunAngularVelocity *= 1 - this.sunSpringDamp;
	}
	,raycastGlobe: function(startClipspace) {
		this.raycaster.setFromCamera(startClipspace,this.camera);
		var intersects = this.raycaster.intersectObject(this.globe.earthMesh,false);
		if(intersects.length <= 0) return null;
		return intersects[0].point;
	}
	,fitCanvas: function() {
		this.canvas.width = this.container.clientWidth;
		this.canvas.height = this.container.clientHeight;
	}
	,handleResize: function() {
		this.fitCanvas();
		this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setViewport(0,0,this.container.clientWidth,this.container.clientHeight);
	}
	,handleMouseEvent: function(e) {
		var canvasBounds = this.canvas.getBoundingClientRect();
		var nx = (e.pageX - canvasBounds.left) / canvasBounds.width;
		var ny = 1 - (e.pageY - canvasBounds.top) / canvasBounds.height;
		this.mouse.set(nx * 2 - 1,ny * 2 - 1);
	}
	,onWindowResize: function(e) {
		this.handleResize();
	}
	,onMouseDown: function(e) {
		this.handleMouseEvent(e);
	}
	,onMouseUp: function(e) {
		this.handleMouseEvent(e);
	}
	,onMouseMove: function(e) {
		this.handleMouseEvent(e);
	}
	,cameraZForViewHeight: function(height) {
		return height / 2 / Math.tan(0.5 * THREE.Math.degToRad(this.camera.fov));
	}
	,getAspect: function() {
		return this.container.clientWidth / this.container.clientHeight;
	}
	,getWidth: function() {
		return this.container.clientWidth;
	}
	,getHeight: function() {
		return this.container.clientHeight;
	}
	,__class__: Main
};
Math.__name__ = true;
var Reflect = function() { };
Reflect.__name__ = true;
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.fields = function(o) {
	var a = [];
	if(o != null) {
		var hasOwnProperty = Object.prototype.hasOwnProperty;
		for( var f in o ) {
		if(f != "__id__" && f != "hx__closures__" && hasOwnProperty.call(o,f)) a.push(f);
		}
	}
	return a;
};
var Reporting = function() { };
Reporting.__name__ = true;
Reporting.info = function(msg) {
	window.console.info(msg);
};
Reporting.warn = function(msg) {
	window.console.warn(msg);
};
Reporting.error = function(msg) {
	window.console.error(msg);
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var Type = function() { };
Type.__name__ = true;
Type.createInstance = function(cl,args) {
	var _g = args.length;
	switch(_g) {
	case 0:
		return new cl();
	case 1:
		return new cl(args[0]);
	case 2:
		return new cl(args[0],args[1]);
	case 3:
		return new cl(args[0],args[1],args[2]);
	case 4:
		return new cl(args[0],args[1],args[2],args[3]);
	case 5:
		return new cl(args[0],args[1],args[2],args[3],args[4]);
	case 6:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5]);
	case 7:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6]);
	case 8:
		return new cl(args[0],args[1],args[2],args[3],args[4],args[5],args[6],args[7]);
	default:
		throw new js__$Boot_HaxeError("Too many arguments");
	}
	return null;
};
var geometry_RibbonGeometry = function(primary,widthFunc,normalFunc,slices,stacks) {
	if(stacks == null) stacks = 1;
	if(slices == null) slices = 100;
	this._w3 = new THREE.Vector3();
	this._v3 = new THREE.Vector3();
	this._u3 = new THREE.Vector3();
	this.curveFraction = 1;
	THREE.Geometry.call(this);
	this.primary = primary;
	this.slices = slices;
	this.stacks = stacks;
	this.widthFunc = widthFunc;
	this.normalFunc = normalFunc != null?normalFunc:$bind(this,this.defaultNormal);
	this.leftCurve = this.createLoopFreeOffsetCurve(primary,1,slices * 2);
	this.rightCurve = this.createLoopFreeOffsetCurve(primary,0,slices * 2);
	this.computeVertices(true);
	this.cumulativeLengths = [];
	this.totalLength = 0;
	var lastPoint = null;
	var _g1 = 0;
	var _g = slices + 1;
	while(_g1 < _g) {
		var j = _g1++;
		var u = j / slices;
		var p = primary.getPoint(u);
		if(lastPoint != null) this.totalLength += p.distanceTo(lastPoint);
		this.cumulativeLengths.push(this.totalLength);
		lastPoint = p;
	}
	var faces = this.faces;
	var uvs = this.faceVertexUvs[0];
	var nuvs = this.faceVertexUvs[1] = [];
	var sliceCount = slices + 1;
	var _g2 = 0;
	while(_g2 < stacks) {
		var i = _g2++;
		var _g11 = 0;
		while(_g11 < slices) {
			var j1 = _g11++;
			var a = i * sliceCount + j1;
			var b = i * sliceCount + j1 + 1;
			var c = (i + 1) * sliceCount + j1 + 1;
			var d = (i + 1) * sliceCount + j1;
			var u0 = j1 / slices;
			var u1 = (j1 + 1) / slices;
			var t0 = i / stacks;
			var t1 = (i + 1) / stacks;
			var uva = new THREE.Vector2(u0,t0);
			var uvb = new THREE.Vector2(u1,t0);
			var uvc = new THREE.Vector2(u1,t1);
			var uvd = new THREE.Vector2(u0,t1);
			var nu0 = this.cumulativeLengths[j1] / this.totalLength;
			var nu1 = this.cumulativeLengths[j1 + 1] / this.totalLength;
			var nuva = new THREE.Vector2(nu0,t0);
			var nuvb = new THREE.Vector2(nu1,t0);
			var nuvc = new THREE.Vector2(nu1,t1);
			var nuvd = new THREE.Vector2(nu0,t1);
			var f1 = new THREE.Face3(a,b,d);
			var f2 = new THREE.Face3(b,c,d);
			faces.push(f1);
			uvs.push([uva,uvb,uvd]);
			nuvs.push([nuva,nuvb,nuvd]);
			faces.push(f2);
			uvs.push([uvb.clone(),uvc,uvd.clone()]);
			nuvs.push([nuvb.clone(),nuvc,nuvd.clone()]);
		}
	}
	this.computeFaceNormals();
	this.computeVertexNormals();
};
geometry_RibbonGeometry.__name__ = true;
geometry_RibbonGeometry.__super__ = THREE.Geometry;
geometry_RibbonGeometry.prototype = $extend(THREE.Geometry.prototype,{
	computeVertices: function(allocate) {
		if(allocate == null) allocate = false;
		var vIdx = 0;
		var _g1 = 0;
		var _g = this.stacks + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var v = i / this.stacks;
			var _g3 = 0;
			var _g2 = this.slices + 1;
			while(_g3 < _g2) {
				var j = _g3++;
				var u = j / this.slices;
				var v3 = allocate?new THREE.Vector3():this.vertices[vIdx];
				this.vertices[vIdx] = this.ribbonFuncFromOffsets(u,v,v3);
				vIdx++;
			}
		}
	}
	,defaultNormal: function(u,t,p,tan,primary) {
		return new THREE.Vector3(-1,0,0);
	}
	,ribbonFunc: function(u,t,v3) {
		u = THREE.Math.clamp(u - (1 - this.curveFraction),0,1);
		t = t - 0.5;
		var w = this.widthFunc(u,t);
		var p = this.primary.getPoint(u);
		var tan = this.primary.getTangent(u);
		v3.crossVectors(this.normalFunc(u,t,p,tan,this.primary),tan);
		v3.normalize();
		v3.multiplyScalar(w * t);
		v3.add(p);
		return v3;
	}
	,ribbonFuncFromOffsets: function(u,t,v3) {
		u = THREE.Math.clamp(u - (1 - this.curveFraction),0,1);
		return v3.lerpVectors(this.rightCurve.getPoint(u),this.leftCurve.getPoint(u),t);
	}
	,createLoopFreeOffsetCurve: function(primary,side,samples) {
		var offsetPoints = [];
		var _g1 = 0;
		var _g = samples + 1;
		while(_g1 < _g) {
			var i = _g1++;
			var u = i / samples;
			offsetPoints.push(this.ribbonFunc(u,side,new THREE.Vector3()));
		}
		var offsetSpline = new THREE.SplineCurve3(offsetPoints);
		return this.removeOffsetLoops(offsetSpline,primary,samples * 2);
	}
	,removeOffsetLoops: function(offset,primary,samples) {
		var clipBoundaries = [];
		var s;
		var e;
		var adj = false;
		var i = 0;
		while(i < samples + 1) {
			var u = i / samples;
			var primaryTangent = primary.getTangent(u);
			var offsetTangent = offset.getTangent(u);
			var dot = offsetTangent.dot(primaryTangent);
			if(dot < 0) {
				if(!adj) s = u;
				adj = true;
			} else {
				if(adj) {
					e = u;
					var overlapBounds = this.findOverlapBounds(s,e,primary,offset);
					clipBoundaries.push(overlapBounds);
					i = Math.round(overlapBounds[1] * samples);
				}
				adj = false;
			}
			i++;
		}
		var nonLoopPoints = [];
		var _g1 = 0;
		var _g = samples + 1;
		while(_g1 < _g) {
			var i1 = _g1++;
			var u1 = i1 / samples;
			var v = u1;
			var _g2 = 0;
			while(_g2 < clipBoundaries.length) {
				var cb = clipBoundaries[_g2];
				++_g2;
				var s1 = cb[0];
				var e1 = cb[1];
				if(u1 > s1 && u1 < e1) {
					v = u1 - s1 < e1 - u1?s1:e1;
					break;
				}
			}
			nonLoopPoints.push(offset.getPoint(v));
		}
		return new math_LerpCurve3(nonLoopPoints);
	}
	,findOverlapBounds: function(s,e,primary,offset) {
		var n = 0;
		while(s >= 0 && n++ < 1000) {
			var s1 = offset.getPoint(s);
			var m = 0;
			var outside = false;
			while(e <= 1 && m++ < 1000) {
				var e0 = primary.getPoint(e);
				var e1 = offset.getPoint(e);
				var e0e1 = this._u3.subVectors(e1,e0);
				var e1s1 = this._v3.subVectors(s1,e1);
				var proj = e1s1.dot(e0e1);
				var p = e0e1.normalize().multiplyScalar(proj).add(e1);
				var ps1 = this._w3.subVectors(s1,p);
				var tan = primary.getTangent(e);
				var dot = ps1.dot(tan);
				if(dot <= 0) {
					if(proj >= 0) outside = true;
					break;
				}
				e += 0.0005;
			}
			if(outside) break;
			s -= 5e-05;
		}
		if(s < 0) s = 0;
		if(e > 1) e = 1;
		return [s,e];
	}
	,set_curveFraction: function(v) {
		this.curveFraction = v;
		this.dynamic = true;
		this.computeVertices();
		this.computeFaceNormals();
		this.computeVertexNormals();
		this.verticesNeedUpdate = true;
		this.uvsNeedUpdate = true;
		this.normalsNeedUpdate = true;
		return this.curveFraction;
	}
	,__class__: geometry_RibbonGeometry
	,__properties__: {set_curveFraction:"set_curveFraction"}
});
var gis__$GeoCoord_GeoCoord_$Impl_$ = {};
gis__$GeoCoord_GeoCoord_$Impl_$.__name__ = true;
gis__$GeoCoord_GeoCoord_$Impl_$._new = function(longitudeEast,latitudeNorth,altitude) {
	if(altitude == null) altitude = 0;
	if(latitudeNorth == null) latitudeNorth = 0;
	if(longitudeEast == null) longitudeEast = 0;
	return new gis__$GeoCoord_CGeoCoord(longitudeEast,latitudeNorth,altitude);
};
gis__$GeoCoord_GeoCoord_$Impl_$.toArray = function(this1) {
	return [this1["long"],this1.lat,this1.alt];
};
gis__$GeoCoord_GeoCoord_$Impl_$.fromArray = function(arr) {
	return new gis__$GeoCoord_CGeoCoord(arr[0],arr[1],arr[2]);
};
var gis__$GeoCoord_CGeoCoord = function(longitudeEast,latitudeNorth,altitude) {
	if(altitude == null) altitude = 0;
	if(latitudeNorth == null) latitudeNorth = 0;
	if(longitudeEast == null) longitudeEast = 0;
	this["long"] = longitudeEast;
	this.lat = latitudeNorth;
	this.alt = altitude;
};
gis__$GeoCoord_CGeoCoord.__name__ = true;
gis__$GeoCoord_CGeoCoord.prototype = {
	clone: function() {
		return new gis__$GeoCoord_CGeoCoord(this["long"],this.lat,this.alt);
	}
	,__class__: gis__$GeoCoord_CGeoCoord
};
var gis_geojson_GeoJsonObjectType = { __ename__ : true, __constructs__ : ["Feature","FeatureCollection","GeometryCollection","LineString","MultiLineString","MultiPoint","MultiPolygon","Point","Polygon"] };
gis_geojson_GeoJsonObjectType.Feature = function(f) { var $x = ["Feature",0,f]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.FeatureCollection = function(f) { var $x = ["FeatureCollection",1,f]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.GeometryCollection = function(g) { var $x = ["GeometryCollection",2,g]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.LineString = function(l) { var $x = ["LineString",3,l]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.MultiLineString = function(m) { var $x = ["MultiLineString",4,m]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.MultiPoint = function(m) { var $x = ["MultiPoint",5,m]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.MultiPolygon = function(m) { var $x = ["MultiPolygon",6,m]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.Point = function(p) { var $x = ["Point",7,p]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeoJsonObjectType.Polygon = function(p) { var $x = ["Polygon",8,p]; $x.__enum__ = gis_geojson_GeoJsonObjectType; $x.toString = $estr; return $x; };
var gis_geojson_GeometryObjectType = { __ename__ : true, __constructs__ : ["GeometryCollection","LineString","MultiLineString","MultiPoint","MultiPolygon","Point","Polygon"] };
gis_geojson_GeometryObjectType.GeometryCollection = function(g) { var $x = ["GeometryCollection",0,g]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeometryObjectType.LineString = function(l) { var $x = ["LineString",1,l]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeometryObjectType.MultiLineString = function(m) { var $x = ["MultiLineString",2,m]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeometryObjectType.MultiPoint = function(m) { var $x = ["MultiPoint",3,m]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeometryObjectType.MultiPolygon = function(m) { var $x = ["MultiPolygon",4,m]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeometryObjectType.Point = function(p) { var $x = ["Point",5,p]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
gis_geojson_GeometryObjectType.Polygon = function(p) { var $x = ["Polygon",6,p]; $x.__enum__ = gis_geojson_GeometryObjectType; $x.toString = $estr; return $x; };
var gis_geojson_CoordinateReferenceSystemType = { __ename__ : true, __constructs__ : ["LinkedCoordinateReferenceSystem","NamedCoordinateReferenceSystem"] };
gis_geojson_CoordinateReferenceSystemType.LinkedCoordinateReferenceSystem = function(l) { var $x = ["LinkedCoordinateReferenceSystem",0,l]; $x.__enum__ = gis_geojson_CoordinateReferenceSystemType; $x.toString = $estr; return $x; };
gis_geojson_CoordinateReferenceSystemType.NamedCoordinateReferenceSystem = function(n) { var $x = ["NamedCoordinateReferenceSystem",1,n]; $x.__enum__ = gis_geojson_CoordinateReferenceSystemType; $x.toString = $estr; return $x; };
var gis_geojson_GeoJsonObjectHelper = function() { };
gis_geojson_GeoJsonObjectHelper.__name__ = true;
gis_geojson_GeoJsonObjectHelper.getTypeEnum = function(o) {
	return (function($this) {
		var $r;
		var _g = o.type.toLowerCase();
		$r = (function($this) {
			var $r;
			switch(_g) {
			case "feature":
				$r = gis_geojson_GeoJsonObjectType.Feature(o);
				break;
			case "featurecollection":
				$r = gis_geojson_GeoJsonObjectType.FeatureCollection(o);
				break;
			case "geometrycollection":
				$r = gis_geojson_GeoJsonObjectType.GeometryCollection(o);
				break;
			case "linestring":
				$r = gis_geojson_GeoJsonObjectType.LineString(o);
				break;
			case "multilinestring":
				$r = gis_geojson_GeoJsonObjectType.MultiLineString(o);
				break;
			case "multipoint":
				$r = gis_geojson_GeoJsonObjectType.MultiPoint(o);
				break;
			case "multipolygon":
				$r = gis_geojson_GeoJsonObjectType.MultiPolygon(o);
				break;
			case "point":
				$r = gis_geojson_GeoJsonObjectType.Point(o);
				break;
			case "polygon":
				$r = gis_geojson_GeoJsonObjectType.Polygon(o);
				break;
			default:
				$r = (function($this) {
					var $r;
					throw new js__$Boot_HaxeError("unknown GeoJsonObject type " + o.type);
					return $r;
				}($this));
			}
			return $r;
		}($this));
		return $r;
	}(this));
};
var gis_geojson_GeometryObjectHelper = function() { };
gis_geojson_GeometryObjectHelper.__name__ = true;
gis_geojson_GeometryObjectHelper.getTypeEnum = function(o) {
	return (function($this) {
		var $r;
		var _g = o.type.toLowerCase();
		$r = (function($this) {
			var $r;
			switch(_g) {
			case "geometrycollection":
				$r = gis_geojson_GeometryObjectType.GeometryCollection(o);
				break;
			case "linestring":
				$r = gis_geojson_GeometryObjectType.LineString(o);
				break;
			case "multilinestring":
				$r = gis_geojson_GeometryObjectType.MultiLineString(o);
				break;
			case "multipoint":
				$r = gis_geojson_GeometryObjectType.MultiPoint(o);
				break;
			case "multipolygon":
				$r = gis_geojson_GeometryObjectType.MultiPolygon(o);
				break;
			case "point":
				$r = gis_geojson_GeometryObjectType.Point(o);
				break;
			case "polygon":
				$r = gis_geojson_GeometryObjectType.Polygon(o);
				break;
			default:
				$r = (function($this) {
					var $r;
					throw new js__$Boot_HaxeError("unknown GeometryObject type " + o.type);
					return $r;
				}($this));
			}
			return $r;
		}($this));
		return $r;
	}(this));
};
var gis_geojson_CoordinateReferenceSystemHelper = function() { };
gis_geojson_CoordinateReferenceSystemHelper.__name__ = true;
gis_geojson_CoordinateReferenceSystemHelper.getTypeEnum = function(cr) {
	return (function($this) {
		var $r;
		var _g = cr.type.toLowerCase();
		$r = (function($this) {
			var $r;
			switch(_g) {
			case "name":
				$r = gis_geojson_CoordinateReferenceSystemType.NamedCoordinateReferenceSystem(cr);
				break;
			case "link":
				$r = gis_geojson_CoordinateReferenceSystemType.LinkedCoordinateReferenceSystem(cr);
				break;
			default:
				$r = (function($this) {
					var $r;
					throw new js__$Boot_HaxeError("unknown CoordinateReferenceSystem type " + cr.type);
					return $r;
				}($this));
			}
			return $r;
		}($this));
		return $r;
	}(this));
};
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_Http = function(url) {
	this.url = url;
	this.headers = new List();
	this.params = new List();
	this.async = true;
};
haxe_Http.__name__ = true;
haxe_Http.prototype = {
	request: function(post) {
		var me = this;
		me.responseData = null;
		var r = this.req = js_Browser.createXMLHttpRequest();
		var onreadystatechange = function(_) {
			if(r.readyState != 4) return;
			var s = (function($this) {
				var $r;
				try {
					$r = r.status;
				} catch( e ) {
					if (e instanceof js__$Boot_HaxeError) e = e.val;
					$r = null;
				}
				return $r;
			}(this));
			if(s != null) {
				var protocol = window.location.protocol.toLowerCase();
				var rlocalProtocol = new EReg("^(?:about|app|app-storage|.+-extension|file|res|widget):$","");
				var isLocal = rlocalProtocol.match(protocol);
				if(isLocal) s = r.responseText != null?200:404;
			}
			if(s == undefined) s = null;
			if(s != null) me.onStatus(s);
			if(s != null && s >= 200 && s < 400) {
				me.req = null;
				me.onData(me.responseData = r.responseText);
			} else if(s == null) {
				me.req = null;
				me.onError("Failed to connect or resolve host");
			} else switch(s) {
			case 12029:
				me.req = null;
				me.onError("Failed to connect to host");
				break;
			case 12007:
				me.req = null;
				me.onError("Unknown host");
				break;
			default:
				me.req = null;
				me.responseData = r.responseText;
				me.onError("Http Error #" + r.status);
			}
		};
		if(this.async) r.onreadystatechange = onreadystatechange;
		var uri = this.postData;
		if(uri != null) post = true; else {
			var _g_head = this.params.h;
			var _g_val = null;
			while(_g_head != null) {
				var p = (function($this) {
					var $r;
					_g_val = _g_head[0];
					_g_head = _g_head[1];
					$r = _g_val;
					return $r;
				}(this));
				if(uri == null) uri = ""; else uri += "&";
				uri += encodeURIComponent(p.param) + "=" + encodeURIComponent(p.value);
			}
		}
		try {
			if(post) r.open("POST",this.url,this.async); else if(uri != null) {
				var question = this.url.split("?").length <= 1;
				r.open("GET",this.url + (question?"?":"&") + uri,this.async);
				uri = null;
			} else r.open("GET",this.url,this.async);
		} catch( e1 ) {
			if (e1 instanceof js__$Boot_HaxeError) e1 = e1.val;
			me.req = null;
			this.onError(e1.toString());
			return;
		}
		if(!Lambda.exists(this.headers,function(h) {
			return h.header == "Content-Type";
		}) && post && this.postData == null) r.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		var _g_head1 = this.headers.h;
		var _g_val1 = null;
		while(_g_head1 != null) {
			var h1 = (function($this) {
				var $r;
				_g_val1 = _g_head1[0];
				_g_head1 = _g_head1[1];
				$r = _g_val1;
				return $r;
			}(this));
			r.setRequestHeader(h1.header,h1.value);
		}
		r.send(uri);
		if(!this.async) onreadystatechange(null);
	}
	,onData: function(data) {
	}
	,onError: function(msg) {
	}
	,onStatus: function(status) {
	}
	,__class__: haxe_Http
};
var haxe_Timer = function() { };
haxe_Timer.__name__ = true;
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
haxe_ds_ObjectMap.__name__ = true;
haxe_ds_ObjectMap.__interfaces__ = [haxe_IMap];
haxe_ds_ObjectMap.prototype = {
	set: function(key,value) {
		var id = key.__id__ || (key.__id__ = ++haxe_ds_ObjectMap.count);
		this.h[id] = value;
		this.h.__keys__[id] = key;
	}
	,remove: function(key) {
		var id = key.__id__;
		if(this.h.__keys__[id] == null) return false;
		delete(this.h[id]);
		delete(this.h.__keys__[id]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h.__keys__ ) {
		if(this.h.hasOwnProperty(key)) a.push(this.h.__keys__[key]);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i.__id__];
		}};
	}
	,__class__: haxe_ds_ObjectMap
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		return this.rh == null?null:this.rh["$" + key];
	}
	,keys: function() {
		var tmp;
		var _this = this.arrayKeys();
		tmp = HxOverrides.iter(_this);
		return tmp;
	}
	,arrayKeys: function() {
		var out = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) out.push(key);
		}
		if(this.rh != null) {
			for( var key in this.rh ) {
			if(key.charCodeAt(0) == 36) out.push(key.substr(1));
			}
		}
		return out;
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Path = function() { };
haxe_io_Path.__name__ = true;
haxe_io_Path.join = function(paths) {
	var paths1 = paths.filter(function(s) {
		return s != null && s != "";
	});
	if(paths1.length == 0) return "";
	var path = paths1[0];
	var _g1 = 1;
	var _g = paths1.length;
	while(_g1 < _g) {
		var i = _g1++;
		path = haxe_io_Path.addTrailingSlash(path);
		path += paths1[i];
	}
	return haxe_io_Path.normalize(path);
};
haxe_io_Path.normalize = function(path) {
	path = path.split("\\").join("/");
	if(path == null || path == "/") return "/";
	var target = [];
	var _g = 0;
	var _g1 = path.split("/");
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") target.pop(); else if(token != ".") target.push(token);
	}
	var tmp = target.join("/");
	var regex = new EReg("([^:])/+","g");
	regex.replace(tmp,"$1" + "/");
	var acc_b = "";
	var colon = false;
	var slashes = false;
	var _g11 = 0;
	var _g2 = tmp.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var _g21 = HxOverrides.cca(tmp,i);
		if(_g21 != null) switch(_g21) {
		case 58:
			acc_b += ":";
			colon = true;
			break;
		case 47:
			if(colon == false) slashes = true; else {
				colon = false;
				if(slashes) {
					acc_b += "/";
					slashes = false;
				}
				var x = String.fromCharCode(_g21);
				acc_b += x == null?"null":"" + x;
			}
			break;
		default:
			colon = false;
			if(slashes) {
				acc_b += "/";
				slashes = false;
			}
			var x1 = String.fromCharCode(_g21);
			acc_b += x1 == null?"null":"" + x1;
		} else {
			colon = false;
			if(slashes) {
				acc_b += "/";
				slashes = false;
			}
			var x1 = String.fromCharCode(_g21);
			acc_b += x1 == null?"null":"" + x1;
		}
	}
	var result = acc_b;
	return result;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) return "/";
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	return c1 < c2?c2 != path.length - 1?path + "\\":path:c1 != path.length - 1?path + "/":path;
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.getClass = function(o) {
	if((o instanceof Array) && o.__enum__ == null) return Array; else {
		var cl = o.__class__;
		if(cl != null) return cl;
		var name = js_Boot.__nativeClassName(o);
		if(name != null) return js_Boot.__resolveNativeClass(name);
		return null;
	}
};
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
js_Boot.__interfLoop = function(cc,cl) {
	if(cc == null) return false;
	if(cc == cl) return true;
	var intf = cc.__interfaces__;
	if(intf != null) {
		var _g1 = 0;
		var _g = intf.length;
		while(_g1 < _g) {
			var i = _g1++;
			var i1 = intf[i];
			if(i1 == cl || js_Boot.__interfLoop(i1,cl)) return true;
		}
	}
	return js_Boot.__interfLoop(cc.__super__,cl);
};
js_Boot.__instanceof = function(o,cl) {
	if(cl == null) return false;
	switch(cl) {
	case Int:
		return (o|0) === o;
	case Float:
		return typeof(o) == "number";
	case Bool:
		return typeof(o) == "boolean";
	case String:
		return typeof(o) == "string";
	case Array:
		return (o instanceof Array) && o.__enum__ == null;
	case Dynamic:
		return true;
	default:
		if(o != null) {
			if(typeof(cl) == "function") {
				if(o instanceof cl) return true;
				if(js_Boot.__interfLoop(js_Boot.getClass(o),cl)) return true;
			} else if(typeof(cl) == "object" && js_Boot.__isNativeObj(cl)) {
				if(o instanceof cl) return true;
			}
		} else return false;
		if(cl == Class && o.__name__ != null) return true;
		if(cl == Enum && o.__ename__ != null) return true;
		return o.__enum__ == cl;
	}
};
js_Boot.__cast = function(o,t) {
	if(js_Boot.__instanceof(o,t)) return o; else throw new js__$Boot_HaxeError("Cannot cast " + Std.string(o) + " to " + Std.string(t));
};
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	return $global[name];
};
var js_Browser = function() { };
js_Browser.__name__ = true;
js_Browser.createXMLHttpRequest = function() {
	if(typeof XMLHttpRequest != "undefined") return new XMLHttpRequest();
	if(typeof ActiveXObject != "undefined") return new ActiveXObject("Microsoft.XMLHTTP");
	throw new js__$Boot_HaxeError("Unable to create XMLHttpRequest object.");
};
var math_LerpCurve3 = function(points) {
	this.points = points;
};
math_LerpCurve3.__name__ = true;
math_LerpCurve3.__super__ = THREE.Curve;
math_LerpCurve3.prototype = $extend(THREE.Curve.prototype,{
	getPoint: function(u) {
		var idx0 = Math.floor(u * (this.points.length - 1));
		var idx1 = Math.ceil(u * (this.points.length - 1));
		if(idx0 == idx1) return this.points[idx0]; else {
			var u0 = idx0 / (this.points.length - 1);
			var u1 = idx1 / (this.points.length - 1);
			var alpha = (u - u0) / (u1 - u0);
			return new THREE.Vector3().lerpVectors(this.points[idx0],this.points[idx1],alpha);
		}
	}
	,getTangent: function(u) {
		var idx0 = Math.floor(u * (this.points.length - 1));
		var idx1 = Math.ceil(u * (this.points.length - 1));
		if(idx0 == idx1) {
			idx1++;
			if(idx1 >= this.points.length) {
				idx1--;
				idx0--;
			}
		}
		var p0 = this.points[idx0];
		var p1 = this.points[idx1];
		var tangent = new THREE.Vector3().subVectors(p1,p0).normalize();
		return tangent;
	}
	,__class__: math_LerpCurve3
});
var math_XMath = function() { };
math_XMath.__name__ = true;
math_XMath.fract = function(x) {
	return x - Math.floor(x);
};
math_XMath.mod = function(n,m) {
	return (n % m + m) % m;
};
math_XMath.clamp = function(x,a,b) {
	if(x < a) x = a;
	if(x > b) x = b;
	return x;
};
math_XMath.mix = function(a,b,alpha) {
	return a + (b - a) * alpha;
};
var motion_actuators_IGenericActuator = function() { };
motion_actuators_IGenericActuator.__name__ = true;
motion_actuators_IGenericActuator.prototype = {
	__class__: motion_actuators_IGenericActuator
};
var motion_actuators_GenericActuator = function(target,duration,properties) {
	this._autoVisible = true;
	this._delay = 0;
	this._reflect = false;
	this._repeat = 0;
	this._reverse = false;
	this._smartRotation = false;
	this._snapping = false;
	this.special = false;
	this.target = target;
	this.properties = properties;
	this.duration = duration;
	this._ease = motion_Actuate.defaultEase;
};
motion_actuators_GenericActuator.__name__ = true;
motion_actuators_GenericActuator.__interfaces__ = [motion_actuators_IGenericActuator];
motion_actuators_GenericActuator.prototype = {
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) {
				var value = Reflect.field(this.properties,i);
				this.target[i] = value;
			} else {
				var o = this.target;
				var value1 = Reflect.field(this.properties,i);
				var tmp;
				if(o.__properties__ && (tmp = o.__properties__["set_" + i])) o[tmp](value1); else o[i] = value1;
			}
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		return this;
	}
	,callMethod: function(method,params) {
		if(params == null) params = [];
		var tmp;
		var func = method;
		tmp = func.apply(method,params);
		return tmp;
	}
	,change: function() {
		if(this._onUpdate != null) {
			var method = this._onUpdate;
			var params = this._onUpdateParams;
			if(params == null) params = [];
			var func = method;
			func.apply(method,params);
		}
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		if(sendEvent) {
			this.change();
			if(this._onComplete != null) {
				var method = this._onComplete;
				var params = this._onCompleteParams;
				if(params == null) params = [];
				var func = method;
				func.apply(method,params);
			}
		}
		motion_Actuate.unload(this);
	}
	,delay: function(duration) {
		this._delay = duration;
		return this;
	}
	,ease: function(easing) {
		this._ease = easing;
		return this;
	}
	,move: function() {
	}
	,onComplete: function(handler,parameters) {
		this._onComplete = handler;
		if(parameters == null) this._onCompleteParams = []; else this._onCompleteParams = parameters;
		if(this.duration == 0) this.complete();
		return this;
	}
	,onRepeat: function(handler,parameters) {
		this._onRepeat = handler;
		if(parameters == null) this._onRepeatParams = []; else this._onRepeatParams = parameters;
		return this;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		return this;
	}
	,onPause: function(handler,parameters) {
		this._onPause = handler;
		if(parameters == null) this._onPauseParams = []; else this._onPauseParams = parameters;
		return this;
	}
	,onResume: function(handler,parameters) {
		this._onResume = handler;
		if(parameters == null) this._onResumeParams = []; else this._onResumeParams = parameters;
		return this;
	}
	,pause: function() {
		if(this._onPause != null) {
			var method = this._onPause;
			var params = this._onPauseParams;
			if(params == null) params = [];
			var func = method;
			func.apply(method,params);
		}
	}
	,reflect: function(value) {
		if(value == null) value = true;
		this._reflect = value;
		this.special = true;
		return this;
	}
	,repeat: function(times) {
		if(times == null) times = -1;
		this._repeat = times;
		return this;
	}
	,resume: function() {
		if(this._onResume != null) {
			var method = this._onResume;
			var params = this._onResumeParams;
			if(params == null) params = [];
			var func = method;
			func.apply(method,params);
		}
	}
	,reverse: function(value) {
		if(value == null) value = true;
		this._reverse = value;
		this.special = true;
		return this;
	}
	,smartRotation: function(value) {
		if(value == null) value = true;
		this._smartRotation = value;
		this.special = true;
		return this;
	}
	,snapping: function(value) {
		if(value == null) value = true;
		this._snapping = value;
		this.special = true;
		return this;
	}
	,stop: function(properties,complete,sendEvent) {
	}
	,__class__: motion_actuators_GenericActuator
};
var motion_actuators_SimpleActuator = function(target,duration,properties) {
	this.active = true;
	this.propertyDetails = [];
	this.sendChange = false;
	this.paused = false;
	this.cacheVisible = false;
	this.initialized = false;
	this.setVisible = false;
	this.toggleVisible = false;
	this.startTime = haxe_Timer.stamp();
	motion_actuators_GenericActuator.call(this,target,duration,properties);
	if(!motion_actuators_SimpleActuator.addedEvent) motion_actuators_SimpleActuator.addedEvent = true;
};
motion_actuators_SimpleActuator.__name__ = true;
motion_actuators_SimpleActuator.stage_onEnterFrame = function() {
	var currentTime = haxe_Timer.stamp();
	var actuator;
	var j = 0;
	var _g1 = 0;
	var _g = motion_actuators_SimpleActuator.actuatorsLength;
	while(_g1 < _g) {
		_g1++;
		actuator = motion_actuators_SimpleActuator.actuators[j];
		if(actuator != null && actuator.active) {
			if(currentTime >= actuator.timeOffset) actuator.update(currentTime);
			j++;
		} else {
			motion_actuators_SimpleActuator.actuators.splice(j,1);
			--motion_actuators_SimpleActuator.actuatorsLength;
		}
	}
};
motion_actuators_SimpleActuator.__super__ = motion_actuators_GenericActuator;
motion_actuators_SimpleActuator.prototype = $extend(motion_actuators_GenericActuator.prototype,{
	setField_motion_actuators_MotionPathActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else {
			var tmp;
			if(target.__properties__ && (tmp = target.__properties__["set_" + propertyName])) target[tmp](value); else target[propertyName] = value;
		}
	}
	,setField_motion_actuators_SimpleActuator_T: function(target,propertyName,value) {
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) target[propertyName] = value; else {
			var tmp;
			if(target.__properties__ && (tmp = target.__properties__["set_" + propertyName])) target[tmp](value); else target[propertyName] = value;
		}
	}
	,autoVisible: function(value) {
		if(value == null) value = true;
		this._autoVisible = value;
		if(!value) {
			this.toggleVisible = false;
			if(this.setVisible) {
				var target = this.target;
				var value1 = this.cacheVisible;
				if(Object.prototype.hasOwnProperty.call(target,"visible")) target.visible = value1; else {
					var tmp;
					if(target.__properties__ && (tmp = target.__properties__["set_" + "visible"])) target[tmp](value1); else target.visible = value1;
				}
			}
		}
		return this;
	}
	,delay: function(duration) {
		this._delay = duration;
		this.timeOffset = this.startTime + duration;
		return this;
	}
	,getField: function(target,propertyName) {
		var value = null;
		if(Object.prototype.hasOwnProperty.call(target,propertyName)) value = Reflect.field(target,propertyName); else {
			var tmp;
			var tmp1;
			if(target == null) tmp = null; else if(target.__properties__ && (tmp1 = target.__properties__["get_" + propertyName])) tmp = target[tmp1](); else tmp = target[propertyName];
			value = tmp;
		}
		return value;
	}
	,initialize: function() {
		var details;
		var start;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var i = _g1[_g];
			++_g;
			var isField = true;
			if(Object.prototype.hasOwnProperty.call(this.target,i)) start = Reflect.field(this.target,i); else {
				isField = false;
				var tmp;
				var o = this.target;
				var tmp1;
				if(o == null) tmp = null; else if(o.__properties__ && (tmp1 = o.__properties__["get_" + i])) tmp = o[tmp1](); else tmp = o[i];
				start = tmp;
			}
			if(typeof(start) == "number") {
				var tmp2;
				var target = this.properties;
				var value1 = null;
				if(Object.prototype.hasOwnProperty.call(target,i)) value1 = Reflect.field(target,i); else {
					var tmp3;
					var tmp4;
					if(target == null) tmp3 = null; else if(target.__properties__ && (tmp4 = target.__properties__["get_" + i])) tmp3 = target[tmp4](); else tmp3 = target[i];
					value1 = tmp3;
				}
				tmp2 = value1;
				var value = tmp2;
				if(start == null) start = 0;
				if(value == null) value = 0;
				details = new motion_actuators_PropertyDetails(this.target,i,start,value - start,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,move: function() {
		this.toggleVisible = Object.prototype.hasOwnProperty.call(this.properties,"alpha") && Object.prototype.hasOwnProperty.call(this.properties,"visible");
		var tmp;
		if(this.toggleVisible && this.properties.alpha != 0) {
			var tmp1;
			var target = this.target;
			var value = null;
			if(Object.prototype.hasOwnProperty.call(target,"visible")) value = Reflect.field(target,"visible"); else {
				var tmp2;
				var tmp3;
				if(target == null) tmp2 = null; else if(target.__properties__ && (tmp3 = target.__properties__["get_" + "visible"])) tmp2 = target[tmp3](); else tmp2 = target.visible;
				value = tmp2;
			}
			tmp1 = value;
			tmp = !tmp1;
		} else tmp = false;
		if(tmp) {
			this.setVisible = true;
			var tmp4;
			var target1 = this.target;
			var value1 = null;
			if(Object.prototype.hasOwnProperty.call(target1,"visible")) value1 = Reflect.field(target1,"visible"); else {
				var tmp5;
				var tmp6;
				if(target1 == null) tmp5 = null; else if(target1.__properties__ && (tmp6 = target1.__properties__["get_" + "visible"])) tmp5 = target1[tmp6](); else tmp5 = target1.visible;
				value1 = tmp5;
			}
			tmp4 = value1;
			this.cacheVisible = tmp4;
			var target2 = this.target;
			if(Object.prototype.hasOwnProperty.call(target2,"visible")) target2.visible = true; else {
				var tmp7;
				if(target2.__properties__ && (tmp7 = target2.__properties__["set_" + "visible"])) target2[tmp7](true); else target2.visible = true;
			}
		}
		this.timeOffset = this.startTime;
		motion_actuators_SimpleActuator.actuators.push(this);
		++motion_actuators_SimpleActuator.actuatorsLength;
	}
	,onUpdate: function(handler,parameters) {
		this._onUpdate = handler;
		if(parameters == null) this._onUpdateParams = []; else this._onUpdateParams = parameters;
		this.sendChange = true;
		return this;
	}
	,pause: function() {
		if(!this.paused) {
			this.paused = true;
			motion_actuators_GenericActuator.prototype.pause.call(this);
			this.pauseTime = haxe_Timer.stamp();
		}
	}
	,resume: function() {
		if(this.paused) {
			this.paused = false;
			this.timeOffset += haxe_Timer.stamp() - this.pauseTime;
			motion_actuators_GenericActuator.prototype.resume.call(this);
		}
	}
	,setProperty: function(details,value) {
		if(details.isField) details.target[details.propertyName] = value; else {
			var o = details.target;
			var field = details.propertyName;
			var tmp;
			if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
		}
	}
	,stop: function(properties,complete,sendEvent) {
		if(this.active) {
			if(properties == null) {
				this.active = false;
				if(complete) this.apply();
				this.complete(sendEvent);
				return;
			}
			var _g = 0;
			var _g1 = Reflect.fields(properties);
			while(_g < _g1.length) {
				var i = _g1[_g];
				++_g;
				if(Object.prototype.hasOwnProperty.call(this.properties,i)) {
					this.active = false;
					if(complete) this.apply();
					this.complete(sendEvent);
					return;
				}
			}
		}
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var i;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g1 = 0;
				var _g = this.detailsLength;
				while(_g1 < _g) {
					var i1 = _g1++;
					details = this.propertyDetails[i1];
					var value = details.start + details.change * easing;
					if(details.isField) details.target[details.propertyName] = value; else {
						var o = details.target;
						var field = details.propertyName;
						var tmp;
						if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value); else o[field] = value;
					}
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g11 = 0;
				var _g2 = this.detailsLength;
				while(_g11 < _g2) {
					var i2 = _g11++;
					details = this.propertyDetails[i2];
					var tmp1;
					if(this._smartRotation) {
						var tmp2;
						if(!(details.propertyName == "rotation")) tmp2 = details.propertyName == "rotationX"; else tmp2 = true;
						var tmp3;
						if(!tmp2) tmp3 = details.propertyName == "rotationY"; else tmp3 = true;
						if(!tmp3) tmp1 = details.propertyName == "rotationZ"; else tmp1 = true;
					} else tmp1 = false;
					if(tmp1) {
						var rotation = details.change % 360;
						if(rotation > 180) rotation -= 360; else if(rotation < -180) rotation += 360;
						endValue = details.start + rotation * easing;
					} else endValue = details.start + details.change * easing;
					if(!this._snapping) {
						if(details.isField) details.target[details.propertyName] = endValue; else {
							var o1 = details.target;
							var field1 = details.propertyName;
							var tmp4;
							if(o1.__properties__ && (tmp4 = o1.__properties__["set_" + field1])) o1[tmp4](endValue); else o1[field1] = endValue;
						}
					} else {
						var value1 = Math.round(endValue);
						if(details.isField) details.target[details.propertyName] = value1; else {
							var o2 = details.target;
							var field2 = details.propertyName;
							var tmp5;
							if(o2.__properties__ && (tmp5 = o2.__properties__["set_" + field2])) o2[tmp5](value1); else o2[field2] = value1;
						}
					}
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					var tmp6;
					if(this.toggleVisible) {
						var tmp7;
						var target = this.target;
						var value2 = null;
						if(Object.prototype.hasOwnProperty.call(target,"alpha")) value2 = Reflect.field(target,"alpha"); else {
							var tmp8;
							var tmp9;
							if(target == null) tmp8 = null; else if(target.__properties__ && (tmp9 = target.__properties__["get_" + "alpha"])) tmp8 = target[tmp9](); else tmp8 = target.alpha;
							value2 = tmp8;
						}
						tmp7 = value2;
						tmp6 = tmp7 == 0;
					} else tmp6 = false;
					if(tmp6) {
						var target1 = this.target;
						if(Object.prototype.hasOwnProperty.call(target1,"visible")) target1.visible = false; else {
							var tmp10;
							if(target1.__properties__ && (tmp10 = target1.__properties__["set_" + "visible"])) target1[tmp10](false); else target1.visible = false;
						}
					}
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) {
						var method = this._onRepeat;
						var params = this._onRepeatParams;
						if(params == null) params = [];
						var func = method;
						func.apply(method,params);
					}
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_SimpleActuator
});
var motion_easing_Expo = function() { };
motion_easing_Expo.__name__ = true;
motion_easing_Expo.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Expo.get_easeIn = function() {
	return new motion_easing_ExpoEaseIn();
};
motion_easing_Expo.get_easeInOut = function() {
	return new motion_easing_ExpoEaseInOut();
};
motion_easing_Expo.get_easeOut = function() {
	return new motion_easing_ExpoEaseOut();
};
var motion_easing_IEasing = function() { };
motion_easing_IEasing.__name__ = true;
motion_easing_IEasing.prototype = {
	__class__: motion_easing_IEasing
};
var motion_easing_ExpoEaseOut = function() {
};
motion_easing_ExpoEaseOut.__name__ = true;
motion_easing_ExpoEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseOut.prototype = {
	calculate: function(k) {
		return k == 1?1:1 - Math.pow(2,-10 * k);
	}
	,ease: function(t,b,c,d) {
		return t == d?b + c:c * (1 - Math.pow(2,-10 * t / d)) + b;
	}
	,__class__: motion_easing_ExpoEaseOut
};
var motion_Actuate = function() { };
motion_Actuate.__name__ = true;
motion_Actuate.apply = function(target,properties,customActuator) {
	motion_Actuate.stop(target,properties);
	if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
	var actuator = Type.createInstance(customActuator,[target,0,properties]);
	actuator.apply();
	return actuator;
};
motion_Actuate.getLibrary = function(target,allowCreation) {
	if(allowCreation == null) allowCreation = true;
	if(!(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) && allowCreation) motion_Actuate.targetLibraries.set(target,[]);
	return motion_Actuate.targetLibraries.h[target.__id__];
};
motion_Actuate.isActive = function() {
	var result = false;
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		result = true;
		break;
	}
	return true;
};
motion_Actuate.motionPath = function(target,duration,properties,overwrite) {
	if(overwrite == null) overwrite = true;
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MotionPathActuator);
};
motion_Actuate.pause = function(target) {
	if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.pause();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.pause();
			}
		}
	}
};
motion_Actuate.pauseAll = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.pause();
		}
	}
};
motion_Actuate.reset = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var i = library.length - 1;
		while(i >= 0) {
			library[i].stop(null,false,false);
			i--;
		}
	}
	motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
};
motion_Actuate.resume = function(target) {
	if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
		var actuator = target;
		actuator.resume();
	} else {
		var library = motion_Actuate.getLibrary(target,false);
		if(library != null) {
			var _g = 0;
			while(_g < library.length) {
				var actuator1 = library[_g];
				++_g;
				actuator1.resume();
			}
		}
	}
};
motion_Actuate.resumeAll = function() {
	var $it0 = motion_Actuate.targetLibraries.iterator();
	while( $it0.hasNext() ) {
		var library = $it0.next();
		var _g = 0;
		while(_g < library.length) {
			var actuator = library[_g];
			++_g;
			actuator.resume();
		}
	}
};
motion_Actuate.stop = function(target,properties,complete,sendEvent) {
	if(sendEvent == null) sendEvent = true;
	if(complete == null) complete = false;
	if(target != null) {
		if(js_Boot.__instanceof(target,motion_actuators_IGenericActuator)) {
			var actuator = target;
			actuator.stop(null,complete,sendEvent);
		} else {
			var library = motion_Actuate.getLibrary(target,false);
			if(library != null) {
				if(typeof(properties) == "string") {
					var temp = { };
					var field = properties;
					temp[field] = null;
					properties = temp;
				} else if((properties instanceof Array) && properties.__enum__ == null) {
					var temp1 = { };
					var _g = 0;
					var _g1 = js_Boot.__cast(properties , Array);
					while(_g < _g1.length) {
						var property = _g1[_g];
						++_g;
						var field1 = property;
						temp1[field1] = null;
					}
					properties = temp1;
				}
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(properties,complete,sendEvent);
					i--;
				}
			}
		}
	}
};
motion_Actuate.timer = function(duration,customActuator) {
	return motion_Actuate.tween(new motion__$Actuate_TweenTimer(0),duration,new motion__$Actuate_TweenTimer(1),false,customActuator);
};
motion_Actuate.tween = function(target,duration,properties,overwrite,customActuator) {
	if(overwrite == null) overwrite = true;
	if(target != null) {
		if(duration > 0) {
			if(customActuator == null) customActuator = motion_Actuate.defaultActuator;
			var actuator = Type.createInstance(customActuator,[target,duration,properties]);
			var library = motion_Actuate.getLibrary(actuator.target);
			if(overwrite) {
				var i = library.length - 1;
				while(i >= 0) {
					library[i].stop(actuator.properties,false,false);
					i--;
				}
				library = motion_Actuate.getLibrary(actuator.target);
			}
			library.push(actuator);
			actuator.move();
			return actuator;
		} else return motion_Actuate.apply(target,properties,customActuator);
	}
	return null;
};
motion_Actuate.unload = function(actuator) {
	var target = actuator.target;
	if(motion_Actuate.targetLibraries.h.__keys__[target.__id__] != null) {
		HxOverrides.remove(motion_Actuate.targetLibraries.h[target.__id__],actuator);
		if(motion_Actuate.targetLibraries.h[target.__id__].length == 0) motion_Actuate.targetLibraries.remove(target);
	}
};
motion_Actuate.update = function(target,duration,start,end,overwrite) {
	if(overwrite == null) overwrite = true;
	var properties = { start : start, end : end};
	return motion_Actuate.tween(target,duration,properties,overwrite,motion_actuators_MethodActuator);
};
var motion__$Actuate_TweenTimer = function(progress) {
	this.progress = progress;
};
motion__$Actuate_TweenTimer.__name__ = true;
motion__$Actuate_TweenTimer.prototype = {
	__class__: motion__$Actuate_TweenTimer
};
var motion_MotionPath = function() {
	this._x = new motion_ComponentPath();
	this._y = new motion_ComponentPath();
	this._rotation = null;
};
motion_MotionPath.__name__ = true;
motion_MotionPath.prototype = {
	bezier: function(x,y,controlX,controlY,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion_BezierPath(x,controlX,strength));
		this._y.addPath(new motion_BezierPath(y,controlY,strength));
		return this;
	}
	,line: function(x,y,strength) {
		if(strength == null) strength = 1;
		this._x.addPath(new motion_LinearPath(x,strength));
		this._y.addPath(new motion_LinearPath(y,strength));
		return this;
	}
	,get_rotation: function() {
		if(this._rotation == null) this._rotation = new motion_RotationPath(this._x,this._y);
		return this._rotation;
	}
	,get_x: function() {
		return this._x;
	}
	,get_y: function() {
		return this._y;
	}
	,__class__: motion_MotionPath
	,__properties__: {get_y:"get_y",get_x:"get_x",get_rotation:"get_rotation"}
};
var motion_IComponentPath = function() { };
motion_IComponentPath.__name__ = true;
motion_IComponentPath.prototype = {
	__class__: motion_IComponentPath
	,__properties__: {get_end:"get_end"}
};
var motion_ComponentPath = function() {
	this.paths = [];
	this.start = 0;
	this.totalStrength = 0;
};
motion_ComponentPath.__name__ = true;
motion_ComponentPath.__interfaces__ = [motion_IComponentPath];
motion_ComponentPath.prototype = {
	addPath: function(path) {
		this.paths.push(path);
		this.totalStrength += path.strength;
	}
	,calculate: function(k) {
		if(this.paths.length == 1) return this.paths[0].calculate(this.start,k); else {
			var ratio = k * this.totalStrength;
			var lastEnd = this.start;
			var _g = 0;
			var _g1 = this.paths;
			while(_g < _g1.length) {
				var path = _g1[_g];
				++_g;
				if(ratio > path.strength) {
					ratio -= path.strength;
					lastEnd = path.end;
				} else return path.calculate(lastEnd,ratio / path.strength);
			}
		}
		return 0;
	}
	,get_end: function() {
		if(this.paths.length > 0) {
			var path = this.paths[this.paths.length - 1];
			return path.end;
		} else return this.start;
	}
	,__class__: motion_ComponentPath
	,__properties__: {get_end:"get_end"}
};
var motion_BezierPath = function(end,control,strength) {
	this.end = end;
	this.control = control;
	this.strength = strength;
};
motion_BezierPath.__name__ = true;
motion_BezierPath.prototype = {
	calculate: function(start,k) {
		return (1 - k) * (1 - k) * start + 2 * (1 - k) * k * this.control + k * k * this.end;
	}
	,__class__: motion_BezierPath
};
var motion_LinearPath = function(end,strength) {
	motion_BezierPath.call(this,end,0,strength);
};
motion_LinearPath.__name__ = true;
motion_LinearPath.__super__ = motion_BezierPath;
motion_LinearPath.prototype = $extend(motion_BezierPath.prototype,{
	calculate: function(start,k) {
		return start + k * (this.end - start);
	}
	,__class__: motion_LinearPath
});
var motion_RotationPath = function(x,y) {
	this.step = 0.01;
	this._x = x;
	this._y = y;
	this.offset = 0;
	this.start = this.calculate(0.0);
};
motion_RotationPath.__name__ = true;
motion_RotationPath.__interfaces__ = [motion_IComponentPath];
motion_RotationPath.prototype = {
	calculate: function(k) {
		var dX = this._x.calculate(k) - this._x.calculate(k + this.step);
		var dY = this._y.calculate(k) - this._y.calculate(k + this.step);
		var angle = Math.atan2(dY,dX) * (180 / Math.PI);
		angle = (angle + this.offset) % 360;
		return angle;
	}
	,get_end: function() {
		return this.calculate(1.0);
	}
	,__class__: motion_RotationPath
	,__properties__: {get_end:"get_end"}
};
var motion_actuators_MethodActuator = function(target,duration,properties) {
	this.currentParameters = [];
	this.tweenProperties = { };
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
	if(!Object.prototype.hasOwnProperty.call(properties,"start")) this.properties.start = [];
	if(!Object.prototype.hasOwnProperty.call(properties,"end")) this.properties.end = this.properties.start;
	var _g1 = 0;
	var _g = this.properties.start.length;
	while(_g1 < _g) {
		var i = _g1++;
		this.currentParameters.push(this.properties.start[i]);
	}
};
motion_actuators_MethodActuator.__name__ = true;
motion_actuators_MethodActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MethodActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var method = this.target;
		var params = this.properties.end;
		if(params == null) params = [];
		var func = method;
		func.apply(method,params);
	}
	,complete: function(sendEvent) {
		if(sendEvent == null) sendEvent = true;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
		}
		var method = this.target;
		var params = this.currentParameters;
		if(params == null) params = [];
		var func = method;
		func.apply(method,params);
		motion_actuators_SimpleActuator.prototype.complete.call(this,sendEvent);
	}
	,initialize: function() {
		var details;
		var propertyName;
		var start;
		var _g1 = 0;
		var _g = this.properties.start.length;
		while(_g1 < _g) {
			var i = _g1++;
			propertyName = "param" + i;
			start = this.properties.start[i];
			this.tweenProperties[propertyName] = start;
			if(typeof(start) == "number" || ((start | 0) === start)) {
				details = new motion_actuators_PropertyDetails(this.tweenProperties,propertyName,start,this.properties.end[i] - start);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		motion_actuators_SimpleActuator.prototype.update.call(this,currentTime);
		if(this.active && !this.paused) {
			var _g1 = 0;
			var _g = this.properties.start.length;
			while(_g1 < _g) {
				var i = _g1++;
				this.currentParameters[i] = Reflect.field(this.tweenProperties,"param" + i);
			}
			var method = this.target;
			var params = this.currentParameters;
			if(params == null) params = [];
			var func = method;
			func.apply(method,params);
		}
	}
	,__class__: motion_actuators_MethodActuator
});
var motion_actuators_MotionPathActuator = function(target,duration,properties) {
	motion_actuators_SimpleActuator.call(this,target,duration,properties);
};
motion_actuators_MotionPathActuator.__name__ = true;
motion_actuators_MotionPathActuator.__super__ = motion_actuators_SimpleActuator;
motion_actuators_MotionPathActuator.prototype = $extend(motion_actuators_SimpleActuator.prototype,{
	apply: function() {
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) {
				var value = (js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end();
				this.target[propertyName] = value;
			} else {
				var o = this.target;
				var value1 = (js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath)).get_end();
				var tmp;
				if(o.__properties__ && (tmp = o.__properties__["set_" + propertyName])) o[tmp](value1); else o[propertyName] = value1;
			}
		}
	}
	,initialize: function() {
		var details;
		var path;
		var _g = 0;
		var _g1 = Reflect.fields(this.properties);
		while(_g < _g1.length) {
			var propertyName = _g1[_g];
			++_g;
			path = js_Boot.__cast(Reflect.field(this.properties,propertyName) , motion_IComponentPath);
			if(path != null) {
				var isField = true;
				if(Object.prototype.hasOwnProperty.call(this.target,propertyName)) path.start = Reflect.field(this.target,propertyName); else {
					isField = false;
					var tmp;
					var o = this.target;
					var tmp1;
					if(o == null) tmp = null; else if(o.__properties__ && (tmp1 = o.__properties__["get_" + propertyName])) tmp = o[tmp1](); else tmp = o[propertyName];
					path.start = tmp;
				}
				details = new motion_actuators_PropertyPathDetails(this.target,propertyName,path,isField);
				this.propertyDetails.push(details);
			}
		}
		this.detailsLength = this.propertyDetails.length;
		this.initialized = true;
	}
	,update: function(currentTime) {
		if(!this.paused) {
			var details;
			var easing;
			var tweenPosition = (currentTime - this.timeOffset) / this.duration;
			if(tweenPosition > 1) tweenPosition = 1;
			if(!this.initialized) this.initialize();
			if(!this.special) {
				easing = this._ease.calculate(tweenPosition);
				var _g = 0;
				var _g1 = this.propertyDetails;
				while(_g < _g1.length) {
					var details1 = _g1[_g];
					++_g;
					if(details1.isField) {
						var value = (js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing);
						details1.target[details1.propertyName] = value;
					} else {
						var o = details1.target;
						var field = details1.propertyName;
						var value1 = (js_Boot.__cast(details1 , motion_actuators_PropertyPathDetails)).path.calculate(easing);
						var tmp;
						if(o.__properties__ && (tmp = o.__properties__["set_" + field])) o[tmp](value1); else o[field] = value1;
					}
				}
			} else {
				if(!this._reverse) easing = this._ease.calculate(tweenPosition); else easing = this._ease.calculate(1 - tweenPosition);
				var endValue;
				var _g2 = 0;
				var _g11 = this.propertyDetails;
				while(_g2 < _g11.length) {
					var details2 = _g11[_g2];
					++_g2;
					if(!this._snapping) {
						if(details2.isField) {
							var value2 = (js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing);
							details2.target[details2.propertyName] = value2;
						} else {
							var o1 = details2.target;
							var field1 = details2.propertyName;
							var value3 = (js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing);
							var tmp1;
							if(o1.__properties__ && (tmp1 = o1.__properties__["set_" + field1])) o1[tmp1](value3); else o1[field1] = value3;
						}
					} else if(details2.isField) {
						var value4 = Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
						details2.target[details2.propertyName] = value4;
					} else {
						var o2 = details2.target;
						var field2 = details2.propertyName;
						var value5 = Math.round((js_Boot.__cast(details2 , motion_actuators_PropertyPathDetails)).path.calculate(easing));
						var tmp2;
						if(o2.__properties__ && (tmp2 = o2.__properties__["set_" + field2])) o2[tmp2](value5); else o2[field2] = value5;
					}
				}
			}
			if(tweenPosition == 1) {
				if(this._repeat == 0) {
					this.active = false;
					var tmp3;
					if(this.toggleVisible) {
						var tmp4;
						var target = this.target;
						var value6 = null;
						if(Object.prototype.hasOwnProperty.call(target,"alpha")) value6 = Reflect.field(target,"alpha"); else {
							var tmp5;
							var tmp6;
							if(target == null) tmp5 = null; else if(target.__properties__ && (tmp6 = target.__properties__["get_" + "alpha"])) tmp5 = target[tmp6](); else tmp5 = target.alpha;
							value6 = tmp5;
						}
						tmp4 = value6;
						tmp3 = tmp4 == 0;
					} else tmp3 = false;
					if(tmp3) {
						var target1 = this.target;
						if(Object.prototype.hasOwnProperty.call(target1,"visible")) target1.visible = false; else {
							var tmp7;
							if(target1.__properties__ && (tmp7 = target1.__properties__["set_" + "visible"])) target1[tmp7](false); else target1.visible = false;
						}
					}
					this.complete(true);
					return;
				} else {
					if(this._onRepeat != null) {
						var method = this._onRepeat;
						var params = this._onRepeatParams;
						if(params == null) params = [];
						var func = method;
						func.apply(method,params);
					}
					if(this._reflect) this._reverse = !this._reverse;
					this.startTime = currentTime;
					this.timeOffset = this.startTime + this._delay;
					if(this._repeat > 0) this._repeat--;
				}
			}
			if(this.sendChange) this.change();
		}
	}
	,__class__: motion_actuators_MotionPathActuator
});
var motion_actuators_PropertyDetails = function(target,propertyName,start,change,isField) {
	if(isField == null) isField = true;
	this.target = target;
	this.propertyName = propertyName;
	this.start = start;
	this.change = change;
	this.isField = isField;
};
motion_actuators_PropertyDetails.__name__ = true;
motion_actuators_PropertyDetails.prototype = {
	__class__: motion_actuators_PropertyDetails
};
var motion_actuators_PropertyPathDetails = function(target,propertyName,path,isField) {
	if(isField == null) isField = true;
	motion_actuators_PropertyDetails.call(this,target,propertyName,0,0,isField);
	this.path = path;
};
motion_actuators_PropertyPathDetails.__name__ = true;
motion_actuators_PropertyPathDetails.__super__ = motion_actuators_PropertyDetails;
motion_actuators_PropertyPathDetails.prototype = $extend(motion_actuators_PropertyDetails.prototype,{
	__class__: motion_actuators_PropertyPathDetails
});
var motion_easing_ExpoEaseIn = function() {
};
motion_easing_ExpoEaseIn.__name__ = true;
motion_easing_ExpoEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseIn.prototype = {
	calculate: function(k) {
		return k == 0?0:Math.pow(2,10 * (k - 1));
	}
	,ease: function(t,b,c,d) {
		return t == 0?b:c * Math.pow(2,10 * (t / d - 1)) + b;
	}
	,__class__: motion_easing_ExpoEaseIn
};
var motion_easing_ExpoEaseInOut = function() {
};
motion_easing_ExpoEaseInOut.__name__ = true;
motion_easing_ExpoEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_ExpoEaseInOut.prototype = {
	calculate: function(k) {
		if(k == 0) return 0;
		if(k == 1) return 1;
		if((k /= 0.5) < 1.0) return 0.5 * Math.pow(2,10 * (k - 1));
		return 0.5 * (2 - Math.pow(2,-10 * --k));
	}
	,ease: function(t,b,c,d) {
		if(t == 0) return b;
		if(t == d) return b + c;
		if((t /= d / 2.0) < 1.0) return c / 2 * Math.pow(2,10 * (t - 1)) + b;
		return c / 2 * (2 - Math.pow(2,-10 * --t)) + b;
	}
	,__class__: motion_easing_ExpoEaseInOut
};
var motion_easing_Sine = function() { };
motion_easing_Sine.__name__ = true;
motion_easing_Sine.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Sine.get_easeIn = function() {
	return new motion_easing_SineEaseIn();
};
motion_easing_Sine.get_easeInOut = function() {
	return new motion_easing_SineEaseInOut();
};
motion_easing_Sine.get_easeOut = function() {
	return new motion_easing_SineEaseOut();
};
var motion_easing_SineEaseIn = function() {
};
motion_easing_SineEaseIn.__name__ = true;
motion_easing_SineEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_SineEaseIn.prototype = {
	calculate: function(k) {
		return 1 - Math.cos(k * (Math.PI / 2));
	}
	,ease: function(t,b,c,d) {
		return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
	}
	,__class__: motion_easing_SineEaseIn
};
var motion_easing_SineEaseInOut = function() {
};
motion_easing_SineEaseInOut.__name__ = true;
motion_easing_SineEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_SineEaseInOut.prototype = {
	calculate: function(k) {
		return -(Math.cos(Math.PI * k) - 1) / 2;
	}
	,ease: function(t,b,c,d) {
		return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
	}
	,__class__: motion_easing_SineEaseInOut
};
var motion_easing_SineEaseOut = function() {
};
motion_easing_SineEaseOut.__name__ = true;
motion_easing_SineEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_SineEaseOut.prototype = {
	calculate: function(k) {
		return Math.sin(k * (Math.PI / 2));
	}
	,ease: function(t,b,c,d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	}
	,__class__: motion_easing_SineEaseOut
};
var objects_globe_Atmosphere = function(innerRadius,outerRadius) {
	THREE.Object3D.call(this);
	var atmospherePrameters = { innerRadius : innerRadius, outerRadius : outerRadius, Kr : 0.0025, Km : 0.0010, ESun : 20.0, g : -0.990, wavelength : [0.650,0.570,0.475], rayleighScaleDepth : 0.25, mieScaleDepth : 0.1, nSamples : 4};
	var atmosphereUniforms = THREE.UniformsUtils.merge([THREE.UniformsLib.lights,{ v3InvWavelength : { type : "v3", value : new THREE.Vector3(1 / Math.pow(atmospherePrameters.wavelength[0],4),1 / Math.pow(atmospherePrameters.wavelength[1],4),1 / Math.pow(atmospherePrameters.wavelength[2],4))}, fInnerRadius : { type : "f", value : atmospherePrameters.innerRadius}, fInnerRadius2 : { type : "f", value : atmospherePrameters.innerRadius * atmospherePrameters.innerRadius}, fOuterRadius : { type : "f", value : atmospherePrameters.outerRadius}, fOuterRadius2 : { type : "f", value : atmospherePrameters.outerRadius * atmospherePrameters.outerRadius}, fKrESun : { type : "f", value : atmospherePrameters.Kr * atmospherePrameters.ESun}, fKmESun : { type : "f", value : atmospherePrameters.Km * atmospherePrameters.ESun}, fKr4PI : { type : "f", value : atmospherePrameters.Kr * 4.0 * Math.PI}, fKm4PI : { type : "f", value : atmospherePrameters.Km * 4.0 * Math.PI}, fScale : { type : "f", value : 1 / (atmospherePrameters.outerRadius - atmospherePrameters.innerRadius)}, fScaleDepth : { type : "f", value : atmospherePrameters.rayleighScaleDepth}, fScaleOverScaleDepth : { type : "f", value : 1 / (atmospherePrameters.outerRadius - atmospherePrameters.innerRadius) / atmospherePrameters.rayleighScaleDepth}, g : { type : "f", value : atmospherePrameters.g}, g2 : { type : "f", value : atmospherePrameters.g * atmospherePrameters.g}}]);
	var defines = { nSamples : atmospherePrameters.nSamples};
	var atmosphereGeom = new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(innerRadius,120,120));
	var atmosphereOuterMaterial = new objects_globe_AtmosphereOuterMaterial({ uniforms : atmosphereUniforms, defines : defines});
	var atmosphereOuterMesh = new THREE.Mesh(atmosphereGeom,atmosphereOuterMaterial);
	atmosphereOuterMesh.scale.multiplyScalar(outerRadius / innerRadius);
	var atmosphereInnerMaterial = new objects_globe_AtmosphereInnerMaterial({ uniforms : THREE.UniformsUtils.merge([atmosphereUniforms]), defines : defines});
	var atmosphereInnerMesh = new THREE.Mesh(atmosphereGeom,atmosphereInnerMaterial);
	atmosphereInnerMesh.renderOrder = 1;
	this.add(atmosphereOuterMesh);
	this.add(atmosphereInnerMesh);
};
objects_globe_Atmosphere.__name__ = true;
objects_globe_Atmosphere.__super__ = THREE.Object3D;
objects_globe_Atmosphere.prototype = $extend(THREE.Object3D.prototype,{
	__class__: objects_globe_Atmosphere
});
var objects_globe_AtmosphereInnerMaterial = function(parameters) {
	var p = parameters != null?parameters:{ };
	p.vertexShader = p.vertexShader != null?p.vertexShader:objects_globe_AtmosphereInnerMaterial.vertexShaderStr;
	p.fragmentShader = p.fragmentShader != null?p.fragmentShader:objects_globe_AtmosphereInnerMaterial.fragmentShaderStr;
	p.fog = p.fog != null && p.fog;
	p.lights = p.lights != null?p.lights:true;
	p.transparent = p.transparent != null?p.transparent:true;
	p.side = p.side != null?p.side:THREE.FrontSide;
	p.blending = THREE.AdditiveBlending;
	THREE.ShaderMaterial.call(this,p);
};
objects_globe_AtmosphereInnerMaterial.__name__ = true;
objects_globe_AtmosphereInnerMaterial.__super__ = THREE.ShaderMaterial;
objects_globe_AtmosphereInnerMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	__class__: objects_globe_AtmosphereInnerMaterial
});
var objects_globe_AtmosphereOuterMaterial = function(parameters) {
	var p = parameters != null?parameters:{ };
	p.vertexShader = p.vertexShader != null?p.vertexShader:objects_globe_AtmosphereOuterMaterial.vertexShaderStr;
	p.fragmentShader = p.fragmentShader != null?p.fragmentShader:objects_globe_AtmosphereOuterMaterial.fragmentShaderStr;
	p.fog = p.fog != null && p.fog;
	p.lights = p.lights != null?p.lights:true;
	p.transparent = p.transparent != null?p.transparent:true;
	p.side = p.side != null?p.side:THREE.BackSide;
	p.blending = THREE.AdditiveBlending;
	THREE.ShaderMaterial.call(this,p);
};
objects_globe_AtmosphereOuterMaterial.__name__ = true;
objects_globe_AtmosphereOuterMaterial.__super__ = THREE.ShaderMaterial;
objects_globe_AtmosphereOuterMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	__class__: objects_globe_AtmosphereOuterMaterial
});
var objects_globe_Globe = function(renderer,assetRoot,radius) {
	if(radius == null) radius = 1.0;
	this.earthSegments = 80;
	this.sunDistance = 2.0;
	this.atmospherePad = 0.005;
	this.atmosphereHeight = 0.05;
	this.atmosphereEnabled = true;
	this.tilt = 23.4;
	this.sequenceSpeed = 0.001;
	this.renderer = renderer;
	this.assetRoot = assetRoot;
	this.radius = radius;
	THREE.Object3D.call(this);
	this.setupObjects();
	this.earthMesh.rotation.y = 0;
	if(this.atmosphereEnabled) this.atmosphere.rotation.y = 0;
	this.sun.position.set(Math.sin(0) * this.sunDistance,0,Math.cos(0) * this.sunDistance);
};
objects_globe_Globe.__name__ = true;
objects_globe_Globe.__super__ = THREE.Object3D;
objects_globe_Globe.prototype = $extend(THREE.Object3D.prototype,{
	update: function(dt_ms) {
		var dt_s = dt_ms / 1000;
		if(this.windIntensityMap != null) {
			var _g = this.windIntensityMap.sequenceView;
			_g.set_progress(_g.progress + this.sequenceSpeed);
			var _g1 = this.windIntensityMap.sequenceView;
			_g1.set_progress(_g1.progress % 1);
		}
		if(this.windFlowMap != null) {
			var _g2 = this.windFlowMap.get_sequenceView();
			_g2.set_progress(_g2.progress + this.sequenceSpeed);
			var _g3 = this.windFlowMap.get_sequenceView();
			_g3.set_progress(_g3.progress % 1);
			this.windFlowMap.particles.step(dt_s);
			this.windFlowMap.render();
			this.overlay2Material.map = this.windFlowMap.readTarget;
			Debug.testPlaneMat.map = this.windFlowMap.readTarget;
		}
	}
	,geoToWorld: function(c,v) {
		var local = this.geoToLocal(c,v);
		return this.earthMesh.localToWorld(local);
	}
	,geoToLocal: function(c,v) {
		if(v == null) v = new THREE.Vector3();
		var latRad = THREE.Math.degToRad(c.lat);
		var longRad = THREE.Math.degToRad(-c["long"]);
		var r = this.radius + c.alt * this.radius;
		v.x = r * Math.cos(latRad) * Math.cos(longRad);
		v.z = r * Math.cos(latRad) * Math.sin(longRad);
		v.y = r * Math.sin(latRad);
		return v;
	}
	,worldToGeo: function(p,c) {
		return this.localToGeo(this.earthMesh.worldToLocal(p),c);
	}
	,localToGeo: function(p,c) {
		if(c == null) c = new gis__$GeoCoord_CGeoCoord(0,0,0);
		var r = p.length();
		c.alt = r * this.radius - this.radius;
		c.lat = THREE.Math.radToDeg(Math.asin(p.y / r));
		c["long"] = -THREE.Math.radToDeg(Math.atan2(p.z,p.x));
		return c;
	}
	,addMarker: function(c) {
		var local = this.geoToLocal(c);
		var markerSphere = new THREE.SphereGeometry(0.01,10,10);
		var marker = new THREE.Mesh(markerSphere,new THREE.MeshNormalMaterial());
		marker.position.copy(local);
		this.earthMesh.add(marker);
		local.clone().normalize().multiplyScalar(this.radius);
		var arrow = new THREE.ArrowHelper(local.clone().normalize(),new THREE.Vector3(0,0,0),c.alt + 0.1,16711680);
		marker.add(arrow);
		return marker;
	}
	,setupObjects: function() {
		this.sun = new THREE.DirectionalLight(16774642,1.0);
		this.sun.position.set(0,0,this.radius * 2);
		this.sun.target.position.set(0,0,0);
		this.add(this.sun);
		var colorTex = THREE.ImageUtils.loadTexture("" + this.assetRoot + "/maps/color-1_high.jpg");
		var normalTex = THREE.ImageUtils.loadTexture("" + this.assetRoot + "/maps/normal-1_high.jpg");
		var specTex = THREE.ImageUtils.loadTexture("" + this.assetRoot + "/maps/specular-1_low.png");
		colorTex.anisotropy = Math.min(4,this.renderer.getMaxAnisotropy());
		this.earthContainer = new THREE.Object3D();
		this.earthContainer.rotateZ(-THREE.Math.degToRad(this.tilt));
		this.add(this.earthContainer);
		var earthGeom = new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(this.radius,this.earthSegments,this.earthSegments));
		var globeMat = new objects_globe_GlobeMaterial({ map : colorTex, normalMap : normalTex, normalScale : new THREE.Vector3(1.0,1.0,1.0), specularMap : specTex, specular : new THREE.Color(3355443), shininess : 12, wireframe : false});
		this.earthMesh = new THREE.Mesh(earthGeom,globeMat);
		this.earthContainer.add(this.earthMesh);
		this.overlay1Material = new THREE.MeshLambertMaterial({ transparent : true, visible : false});
		this.overlay1Mesh = new THREE.Mesh(earthGeom,this.overlay1Material);
		this.earthMesh.add(this.overlay1Mesh);
		this.overlay2Material = new THREE.MeshLambertMaterial({ transparent : true, visible : false});
		this.overlay2Mesh = new THREE.Mesh(earthGeom,this.overlay2Material);
		this.earthMesh.add(this.overlay2Mesh);
		if(this.atmosphereEnabled) {
			this.atmosphere = new objects_globe_Atmosphere(this.radius * (1 + this.atmospherePad),this.radius * (this.atmosphereHeight + 1));
			this.earthContainer.add(this.atmosphere);
		}
	}
	,setupOverlays: function() {
		var _g = this;
		var windSequence = new objects_globe_MapSequence("" + this.assetRoot + "/climate-data/wind-100m-1000",function(s) {
			console.log("MapSequence Ready " + s.info.mapInfo.width + " x " + s.info.mapInfo.height);
			_g.windIntensityMap = new objects_globe_WindIntensityMap(_g.renderer,s);
			_g.overlay1Material.map = _g.windIntensityMap.renderTarget;
			_g.overlay1Material.needsUpdate = true;
			_g.overlay1Material.opacity = 0.8;
			_g.overlay1Material.visible = true;
			_g.windFlowMap = new objects_globe_WindFlowMap(_g.renderer,s);
			_g.overlay2Material.map = _g.windFlowMap.readTarget;
			_g.overlay2Material.needsUpdate = true;
			_g.overlay2Material.opacity = 1.0;
			_g.overlay2Material.visible = true;
			_g.overlay2Material.blending = THREE.AdditiveBlending;
		},{ overrideMinFiltering : THREE.LinearFilter, overrideMagFiltering : THREE.LinearFilter});
	}
	,get_earthAngle: function() {
		return this.earthMesh.rotation.y;
	}
	,set_earthAngle: function(v) {
		this.earthMesh.rotation.y = v;
		if(this.atmosphereEnabled) this.atmosphere.rotation.y = v;
		return v;
	}
	,get_sunAngle: function() {
		return Math.atan2(this.sun.position.x,this.sun.position.z);
	}
	,set_sunAngle: function(v) {
		this.sun.position.set(Math.sin(v) * this.sunDistance,0,Math.cos(v) * this.sunDistance);
		return v;
	}
	,get_atmosphereGap: function() {
		return this.radius * this.atmospherePad;
	}
	,__class__: objects_globe_Globe
	,__properties__: {get_atmosphereGap:"get_atmosphereGap",set_sunAngle:"set_sunAngle",get_sunAngle:"get_sunAngle",set_earthAngle:"set_earthAngle",get_earthAngle:"get_earthAngle"}
});
var objects_globe_GlobeCamera = function(globe,fov,aspect,near,far) {
	THREE.PerspectiveCamera.call(this,fov,aspect,near * globe.radius,far * globe.radius);
	this.globe = globe;
};
objects_globe_GlobeCamera.__name__ = true;
objects_globe_GlobeCamera.__super__ = THREE.PerspectiveCamera;
objects_globe_GlobeCamera.prototype = $extend(THREE.PerspectiveCamera.prototype,{
	__class__: objects_globe_GlobeCamera
});
var objects_globe_GlobeMaterial = function(parameters) {
	var p = parameters != null?parameters:{ };
	p.uniforms = p.uniforms != null?p.uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.bump,THREE.UniformsLib.normalmap,THREE.UniformsLib.lights,{ 'emissive' : { type : "c", value : new THREE.Color(0)}, 'specular' : { type : "c", value : new THREE.Color(1118481)}, 'shininess' : { type : "f", value : 30}, 'wrapRGB' : { type : "v3", value : new THREE.Vector3(1,1,1)}}]);
	p.vertexShader = p.vertexShader != null?p.vertexShader:objects_globe_GlobeMaterial.vertexShaderStr;
	p.fragmentShader = p.fragmentShader != null?p.fragmentShader:objects_globe_GlobeMaterial.fragmentShaderStr;
	p.fog = p.fog != null && p.fog;
	p.lights = p.lights != null?p.lights:true;
	THREE.ShaderMaterial.call(this,{ });
	this.uniforms = p.uniforms;
	this.vertexShader = p.vertexShader;
	this.fragmentShader = p.fragmentShader;
	this.fog = p.fog;
	this.lights = p.lights;
	this.set_opacity_(p.opacity_ != null?p.opacity_:this.get_opacity_());
	this.set_diffuse(p.diffuse != null?p.diffuse:this.get_diffuse());
	this.set_map(p.map != null?p.map:this.get_map());
	this.set_specularMap(p.specularMap != null?p.specularMap:this.get_specularMap());
	this.set_normalMap(p.normalMap != null?p.normalMap:this.get_normalMap());
	this.set_normalScale(p.normalScale != null?p.normalScale:this.get_normalScale());
	this.set_alphaMap(p.alphaMap != null?p.alphaMap:this.get_alphaMap());
	this.set_bumpMap(p.bumpMap != null?p.bumpMap:this.get_bumpMap());
	this.set_bumpScale(p.bumpScale != null?p.bumpScale:this.get_bumpScale());
	this.set_reflectivity(p.reflectivity != null?p.reflectivity:this.get_reflectivity());
	this.set_refractionRatio(p.refractionRatio != null?p.refractionRatio:this.get_refractionRatio());
	this.set_shininess(p.shininess != null?p.shininess:this.get_shininess());
	this.set_emissive(p.emissive != null?p.emissive:this.get_emissive());
	this.set_specular(p.specular != null?p.specular:this.get_specular());
	this.set_offsetRepeatOverride(p.offsetRepeatOverride != null?p.offsetRepeatOverride:this.get_offsetRepeatOverride());
};
objects_globe_GlobeMaterial.__name__ = true;
objects_globe_GlobeMaterial.__super__ = THREE.ShaderMaterial;
objects_globe_GlobeMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	clone: function(material) {
		if(material != null) return THREE.ShaderMaterial.prototype.clone.call(this,material); else {
			var globeMaterial = new objects_globe_GlobeMaterial();
			THREE.ShaderMaterial.prototype.clone.call(this,globeMaterial);
			globeMaterial.fragmentShader = this.fragmentShader;
			globeMaterial.vertexShader = this.vertexShader;
			globeMaterial.uniforms = THREE.UniformsUtils.clone(this.uniforms);
			globeMaterial.defines = this.defines;
			globeMaterial.shading = this.shading;
			globeMaterial.wireframe = this.wireframe;
			globeMaterial.wireframeLinewidth = this.wireframeLinewidth;
			globeMaterial.fog = this.fog;
			globeMaterial.lights = this.lights;
			globeMaterial.vertexColors = this.vertexColors;
			globeMaterial.skinning = this.skinning;
			globeMaterial.morphTargets = this.morphTargets;
			globeMaterial.morphNormals = this.morphNormals;
			globeMaterial.set_opacity_(this.get_opacity_());
			globeMaterial.set_diffuse(this.get_diffuse());
			globeMaterial.set_map(this.get_map());
			globeMaterial.set_specularMap(this.get_specularMap());
			globeMaterial.set_normalMap(this.get_normalMap());
			globeMaterial.set_normalScale(this.get_normalScale());
			globeMaterial.set_alphaMap(this.get_alphaMap());
			globeMaterial.set_bumpMap(this.get_bumpMap());
			globeMaterial.set_bumpScale(this.get_bumpScale());
			globeMaterial.set_reflectivity(this.get_reflectivity());
			globeMaterial.set_refractionRatio(this.get_refractionRatio());
			globeMaterial.set_shininess(this.get_shininess());
			globeMaterial.set_emissive(this.get_emissive());
			globeMaterial.set_specular(this.get_specular());
			globeMaterial.set_offsetRepeatOverride(this.get_offsetRepeatOverride());
			return globeMaterial;
		}
	}
	,get_opacity_: function() {
		return this.uniforms.opacity.value;
	}
	,set_opacity_: function(v) {
		this.opacity_ = v;
		return this.uniforms.opacity.value = v;
	}
	,get_diffuse: function() {
		return this.uniforms.diffuse.value;
	}
	,set_diffuse: function(v) {
		this.diffuse = v;
		return this.uniforms.diffuse.value = v;
	}
	,get_map: function() {
		return this.uniforms.map.value;
	}
	,set_map: function(v) {
		if(this.get_offsetRepeatOverride() == null && v != null) this.uniforms.offsetRepeat.value.set(v.offset.x,v.offset.y,v.repeat.x,v.repeat.y);
		this.map = v;
		return this.uniforms.map.value = v;
	}
	,get_specularMap: function() {
		return this.uniforms.specularMap.value;
	}
	,set_specularMap: function(v) {
		if(this.get_offsetRepeatOverride() == null && v != null && this.get_map() == null) this.uniforms.offsetRepeat.value.set(v.offset.x,v.offset.y,v.repeat.x,v.repeat.y);
		this.specularMap = v;
		return this.uniforms.specularMap.value = v;
	}
	,get_normalMap: function() {
		return this.uniforms.normalMap.value;
	}
	,set_normalMap: function(v) {
		if(this.get_offsetRepeatOverride() == null && v != null && this.get_map() == null && this.get_specularMap() == null) this.uniforms.offsetRepeat.value.set(v.offset.x,v.offset.y,v.repeat.x,v.repeat.y);
		this.normalMap = v;
		return this.uniforms.normalMap.value = v;
	}
	,get_normalScale: function() {
		return this.uniforms.normalScale.value;
	}
	,set_normalScale: function(v) {
		this.normalScale = v;
		return this.uniforms.normalScale.value = v;
	}
	,get_bumpMap: function() {
		return this.uniforms.bumpMap.value;
	}
	,set_bumpMap: function(v) {
		if(this.get_offsetRepeatOverride() == null && v != null && this.get_map() == null && this.get_specularMap() == null && this.get_normalMap() == null) this.uniforms.offsetRepeat.value.set(v.offset.x,v.offset.y,v.repeat.x,v.repeat.y);
		this.bumpMap = v;
		return this.uniforms.bumpMap.value = v;
	}
	,get_bumpScale: function() {
		return this.uniforms.bumpScale.value;
	}
	,set_bumpScale: function(v) {
		this.bumpScale = v;
		return this.uniforms.bumpScale.value = v;
	}
	,get_alphaMap: function() {
		return this.uniforms.alphaMap.value;
	}
	,set_alphaMap: function(v) {
		if(this.get_offsetRepeatOverride() == null && v != null && this.get_map() == null && this.get_specularMap() == null && this.get_normalMap() == null && this.get_bumpMap() == null) this.uniforms.offsetRepeat.value.set(v.offset.x,v.offset.y,v.repeat.x,v.repeat.y);
		this.alphaMap = v;
		return this.uniforms.alphaMap.value = v;
	}
	,get_reflectivity: function() {
		return this.uniforms.reflectivity.value;
	}
	,set_reflectivity: function(v) {
		this.reflectivity = v;
		return this.uniforms.reflectivity.value = v;
	}
	,get_refractionRatio: function() {
		return this.uniforms.refractionRatio.value;
	}
	,set_refractionRatio: function(v) {
		this.refractionRatio = v;
		return this.uniforms.refractionRatio.value = v;
	}
	,get_shininess: function() {
		return this.uniforms.shininess.value;
	}
	,set_shininess: function(v) {
		this.shininess = v;
		return this.uniforms.shininess.value = v;
	}
	,get_emissive: function() {
		return this.uniforms.emissive.value;
	}
	,set_emissive: function(v) {
		this.emissive = v;
		return this.uniforms.emissive.value = v;
	}
	,get_specular: function() {
		return this.uniforms.specular.value;
	}
	,set_specular: function(v) {
		this.specular = v;
		return this.uniforms.specular.value = v;
	}
	,get_offsetRepeatOverride: function() {
		return this.uniforms.offsetRepeat.value;
	}
	,set_offsetRepeatOverride: function(v) {
		this.offsetRepeatOverride = v;
		return this.uniforms.offsetRepeat.value = v;
	}
	,__class__: objects_globe_GlobeMaterial
	,__properties__: {set_offsetRepeatOverride:"set_offsetRepeatOverride",get_offsetRepeatOverride:"get_offsetRepeatOverride",set_specular:"set_specular",get_specular:"get_specular",set_emissive:"set_emissive",get_emissive:"get_emissive",set_shininess:"set_shininess",get_shininess:"get_shininess",set_refractionRatio:"set_refractionRatio",get_refractionRatio:"get_refractionRatio",set_reflectivity:"set_reflectivity",get_reflectivity:"get_reflectivity",set_bumpScale:"set_bumpScale",get_bumpScale:"get_bumpScale",set_bumpMap:"set_bumpMap",get_bumpMap:"get_bumpMap",set_alphaMap:"set_alphaMap",get_alphaMap:"get_alphaMap",set_normalScale:"set_normalScale",get_normalScale:"get_normalScale",set_normalMap:"set_normalMap",get_normalMap:"get_normalMap",set_specularMap:"set_specularMap",get_specularMap:"get_specularMap",set_map:"set_map",get_map:"get_map",set_diffuse:"set_diffuse",get_diffuse:"get_diffuse",set_opacity_:"set_opacity_",get_opacity_:"get_opacity_"}
});
var objects_globe_MapSequence = function(dirUrl,onReady,parameters) {
	var _g = this;
	if(parameters == null) parameters = { };
	this.dirUrl = dirUrl;
	this.parameters = parameters;
	this.pathArray = [];
	this.timeArray = [];
	this.textureArray = [];
	this.textureRequestsArray = [];
	this.textureReadyCallbacks = [];
	var req = new haxe_Http(haxe_io_Path.join([dirUrl,objects_globe_MapSequence.infoFilename]));
	req.onData = function(content) {
		_g.setup(JSON.parse(content));
		if(onReady != null) onReady(_g);
	};
	req.request(false);
};
objects_globe_MapSequence.__name__ = true;
objects_globe_MapSequence.prototype = {
	requestTexture: function(i,onReady) {
		var tex = this.textureArray[i];
		if(tex == null) this.loadTexture(i,onReady); else if(onReady != null) onReady(tex);
	}
	,nearestIndices: function(u) {
		var _g = this;
		if(this.count <= 1) return { i0 : 0, i1 : 0, alpha : 0};
		var tmp;
		var x = u;
		if(x < 0) x = 0;
		if(x > 1) x = 1;
		tmp = x;
		u = tmp;
		var targetTime = u * this.duration + this.startTime;
		var linearIdx = Math.round(u * (this.count - 1));
		var i = linearIdx;
		var d0 = targetTime - _g.timeArray[linearIdx] >= 0?1:-1;
		while(i + d0 < this.timeArray.length) {
			i += d0;
			if((targetTime - _g.timeArray[i] >= 0?1:-1) != d0) break;
		}
		var i0 = i - d0;
		var i1 = i;
		if(i1 < i0) {
			var tmp1 = i0;
			i0 = i1;
			i1 = tmp1;
		}
		var t0 = this.timeArray[i0];
		var t1 = this.timeArray[i1];
		var alpha = (targetTime - t0) / (t1 - t0);
		return { i0 : i0, i1 : i1, alpha : alpha};
	}
	,setup: function(info) {
		this.info = info;
		var orderedKeys = Reflect.fields(info.sequence);
		orderedKeys.sort(function(a,b) {
			var ta = parseFloat(a);
			var tb = parseFloat(b);
			return ta > tb?1:-1;
		});
		var _g = 0;
		while(_g < orderedKeys.length) {
			var k = orderedKeys[_g];
			++_g;
			var file = info.sequence[k];
			var time_ms = parseFloat(k);
			this.pathArray.push(haxe_io_Path.join([this.dirUrl,file]));
			this.timeArray.push(time_ms);
			this.textureRequestsArray.push(0);
			this.textureReadyCallbacks.push([]);
		}
		this.count = orderedKeys.length;
		this.startTime = this.timeArray[0];
		this.endTime = this.timeArray[this.timeArray.length - 1];
		this.duration = this.endTime - this.startTime;
	}
	,loadTexture: function(idx,onReady) {
		var _g = this;
		if(onReady != null) this.textureReadyCallbacks[idx].push(onReady);
		if(this.textureRequestsArray[idx]++ > 0) {
			window.console.info("already started loading " + idx);
			return;
		}
		var texture1 = THREE.ImageUtils.loadTexture(this.pathArray[idx],null,function(texture) {
			_g.textureArray[idx] = texture;
			var _g1 = 0;
			var _g2 = _g.textureReadyCallbacks[idx];
			while(_g1 < _g2.length) {
				var cb = _g2[_g1];
				++_g1;
				cb(texture);
			}
		});
		var _g3 = this.info.mapInfo.modeName.toLowerCase();
		switch(_g3) {
		case "pack":case "bitpack":
			texture1.minFilter = THREE.NearestFilter;
			texture1.magFilter = THREE.NearestFilter;
			break;
		default:
		}
		if(this.parameters.overrideMinFiltering != null) texture1.minFilter = this.parameters.overrideMinFiltering;
		if(this.parameters.overrideMagFiltering != null) texture1.magFilter = this.parameters.overrideMagFiltering;
	}
	,__class__: objects_globe_MapSequence
};
var objects_globe_MapSequenceView = function(sequence) {
	this.requestId = 0;
	this.loading = false;
	this.progress = 0;
	this.onFrameChanged = function() {
	};
	this.onFrameLoading = function() {
	};
	this.onAlphaChange = function(f) {
	};
	this.onTex1Change = function(t) {
	};
	this.onTex0Change = function(t) {
	};
	this.sequence = sequence;
};
objects_globe_MapSequenceView.__name__ = true;
objects_globe_MapSequenceView.prototype = {
	set_progress: function(u) {
		var _g = this;
		var nearest = this.sequence.nearestIndices(u);
		var c0 = nearest.i0 != this.i0;
		var c1 = nearest.i1 != this.i1;
		var remaining = 0;
		if(c0 || c1) this.requestId++;
		if(c0) remaining++;
		if(c1) remaining++;
		var _tex0 = this.tex0;
		var _tex1 = this.tex1;
		var tryChange = function() {
			if(remaining > 0) return;
			var changed = false;
			if(_tex0 != _g.tex0) {
				_g.tex0 = _tex0;
				_g.i0 = nearest.i0;
				_g.onTex0Change(_g.tex0);
				changed = true;
			}
			if(_tex1 != _g.tex1) {
				_g.tex1 = _tex1;
				_g.i1 = nearest.i1;
				_g.onTex1Change(_g.tex1);
				changed = true;
			}
			if(nearest.alpha != _g.alpha) {
				_g.alpha = nearest.alpha;
				_g.onAlphaChange(_g.alpha);
				changed = true;
			}
			_g.loading = false;
			if(changed) _g.onFrameChanged();
		};
		if(c0) {
			var tmp;
			var callId = this.requestId;
			tmp = function(tex) {
				if(callId != _g.requestId) return;
				_tex0 = tex;
				remaining--;
				tryChange();
			};
			this.sequence.requestTexture(nearest.i0,tmp);
		}
		if(c1) {
			var tmp1;
			var callId1 = this.requestId;
			tmp1 = function(tex1) {
				if(callId1 != _g.requestId) return;
				_tex1 = tex1;
				remaining--;
				tryChange();
			};
			this.sequence.requestTexture(nearest.i1,tmp1);
		}
		if(remaining > 0) {
			this.loading = true;
			this.onFrameLoading();
		}
		tryChange();
		return this.progress = u;
	}
	,__class__: objects_globe_MapSequenceView
	,__properties__: {set_progress:"set_progress"}
};
var render_ShaderPass = function(renderer,width,height,options) {
	this.renderer = renderer;
	this.camera = render_ShaderPass.staticCamera;
	this.planeGeom = render_ShaderPass.staticPlaneGeom;
	this.renderTarget = new THREE.WebGLRenderTarget(width,height,options);
	this.scene = new THREE.Scene();
	this.quad = new THREE.Mesh(this.planeGeom,null);
	this.scene.add(this.quad);
};
render_ShaderPass.__name__ = true;
render_ShaderPass.prototype = {
	render: function(forceClear) {
		if(forceClear == null) forceClear = false;
		this.renderer.render(this.scene,this.camera,this.renderTarget,forceClear);
	}
	,setMaterial: function(material) {
		this.quad.material = material;
	}
	,__class__: render_ShaderPass
};
var render_ShaderPass2Phase = function(renderer,width,height,options) {
	render_ShaderPass.call(this,renderer,width,height,options);
	this.readTarget = this.renderTarget;
	this.writeTarget = this.renderTarget.clone();
};
render_ShaderPass2Phase.__name__ = true;
render_ShaderPass2Phase.__super__ = render_ShaderPass;
render_ShaderPass2Phase.prototype = $extend(render_ShaderPass.prototype,{
	render: function(forceClear) {
		if(forceClear == null) forceClear = false;
		this.renderer.render(this.scene,this.camera,this.writeTarget,forceClear);
		var tmp = this.readTarget;
		this.readTarget = this.writeTarget;
		this.writeTarget = tmp;
	}
	,swapTargets: function() {
		var tmp = this.readTarget;
		this.readTarget = this.writeTarget;
		this.writeTarget = tmp;
	}
	,__class__: render_ShaderPass2Phase
});
var objects_globe_WindFlowMap = function(renderer,sequence,particleCountPOT) {
	if(particleCountPOT == null) particleCountPOT = 18;
	this.lastFrame_ms = -1;
	render_ShaderPass2Phase.call(this,renderer,4096,2048,{ format : THREE.RGBAFormat, type : THREE.UnsignedByteType, wrapS : THREE.ClampToEdgeWrapping, wrapT : THREE.ClampToEdgeWrapping, minFilter : THREE.LinearFilter, magFilter : THREE.LinearFilter, anisotropy : Math.max(4,renderer.getMaxAnisotropy()), depthBuffer : false, stencilBuffer : false});
	this.particles = new objects_globe__$WindFlowMap_ParticleSimulation(renderer,sequence,particleCountPOT);
	this.particleRenderObject = new objects_globe__$WindFlowMap_ParticleRenderObject(renderer,this.particles);
	this.processLastFrame = new THREE.ShaderMaterial({ vertexShader : shaderlib_Vertex.basic_uv, fragmentShader : objects_globe_WindFlowMap.processLastFrameFragment, uniforms : { lastFrame : { type : "t", value : null}, dt_s : { type : "f", value : 0.0166666666666666664}, halfLife : { type : "f", value : 0.2}}});
};
objects_globe_WindFlowMap.__name__ = true;
objects_globe_WindFlowMap.__super__ = render_ShaderPass2Phase;
objects_globe_WindFlowMap.prototype = $extend(render_ShaderPass2Phase.prototype,{
	step: function(dt_s) {
		this.particles.step(dt_s);
	}
	,render: function(forceClear) {
		if(forceClear == null) forceClear = false;
		var t_ms = window.performance.now();
		var dt_ms = this.lastFrame_ms < 0?16.6666666666666679:Math.min(t_ms - this.lastFrame_ms,100.);
		this.lastFrame_ms = t_ms;
		this.processLastFrame.uniforms.lastFrame.value = this.readTarget;
		this.processLastFrame.uniforms.dt_s.value = dt_ms / 1000;
		this.quad.material = this.processLastFrame;
		this.renderer.render(this.scene,this.camera,this.writeTarget,forceClear);
		this.renderer.setRenderTarget(this.writeTarget);
		this.particleRenderObject.render();
		var tmp = this.readTarget;
		this.readTarget = this.writeTarget;
		this.writeTarget = tmp;
	}
	,get_sequence: function() {
		return this.particles.sequence;
	}
	,set_sequence: function(seq) {
		return this.particles.set_sequence(seq);
	}
	,get_sequenceView: function() {
		return this.particles.sequenceView;
	}
	,__class__: objects_globe_WindFlowMap
	,__properties__: {get_sequenceView:"get_sequenceView",set_sequence:"set_sequence",get_sequence:"get_sequence"}
});
var shaderlib_Chunks = function() { };
shaderlib_Chunks.__name__ = true;
var objects_globe__$WindFlowMap_ParticleRenderObject = function(renderer,particles) {
	THREE.Object3D.call(this);
	this.renderer = renderer;
	this.particles = particles;
	this._modelViewMatrix = new THREE.Matrix4();
	var textureSize = particles.textureSize;
	this.lookupUVArray = new Float32Array(textureSize * textureSize * 2);
	var texelSize = 1 / textureSize * .5;
	var _g = 0;
	while(_g < textureSize) {
		var i = _g++;
		var _g1 = 0;
		while(_g1 < textureSize) {
			var j = _g1++;
			var index = (i * textureSize + j) * 2;
			this.lookupUVArray[index] = i / textureSize + texelSize;
			this.lookupUVArray[index + 1] = j / textureSize + texelSize;
		}
	}
	this.material = new THREE.RawShaderMaterial({ vertexShader : objects_globe__$WindFlowMap_ParticleRenderObject.vertexShaderStr, fragmentShader : objects_globe__$WindFlowMap_ParticleRenderObject.fragmentShaderStr, uniforms : { positions : { type : "t", value : null}, particleOpacity : { type : "f", value : 0.3}, particleSize : { type : "f", value : 2.0}}, attributes : { 'lookUpUV' : { type : "v2"}}});
};
objects_globe__$WindFlowMap_ParticleRenderObject.__name__ = true;
objects_globe__$WindFlowMap_ParticleRenderObject.__super__ = THREE.Object3D;
objects_globe__$WindFlowMap_ParticleRenderObject.prototype = $extend(THREE.Object3D.prototype,{
	render: function() {
		this.material.uniforms.positions.value = this.particles.readTarget;
		this.renderer.renderImmediateObject(objects_globe__$WindFlowMap_ParticleRenderObject.dummyCamera,[],null,this.material,this);
	}
	,immediateRenderCallback: function(program,gl,frustum) {
		var state = this.renderer.state;
		state.setDepthTest(false);
		state.setDepthWrite(false);
		state.setColorWrite(true);
		state.initAttributes();
		if(this.__webglLookupUVBuffer == null) {
			this.__webglLookupUVBuffer = gl.createBuffer();
			gl.bindBuffer(34962,this.__webglLookupUVBuffer);
			gl.bufferData(34962,this.lookupUVArray,35044);
		} else gl.bindBuffer(34962,this.__webglLookupUVBuffer);
		state.enableAttribute(program.attributes.lookUpUV);
		gl.vertexAttribPointer(program.attributes.lookUpUV,2,5126,false,0,0);
		state.disableUnusedAttributes();
		state.setBlending(THREE.AdditiveBlending);
		gl.drawArrays(0,0,this.particles.count);
	}
	,__class__: objects_globe__$WindFlowMap_ParticleRenderObject
});
var objects_globe__$WindFlowMap_ParticleSimulation = function(renderer,sequence,countPOT) {
	this.windDataReady = false;
	if(countPOT % 2 != 0) {
		window.console.warn("in ParticleSimulation, constructor argument 'countPOT' should be an even integer");
		countPOT--;
	}
	this.count = 1 << countPOT;
	this.textureSize = 1 << (countPOT * .5 | 0);
	console.log("setting up particles, count: " + this.count + ", texture size: " + this.textureSize + " x " + this.textureSize);
	render_ShaderPass2Phase.call(this,renderer,this.textureSize,this.textureSize,{ format : THREE.RGBAFormat, type : THREE.UnsignedByteType, wrapS : THREE.ClampToEdgeWrapping, wrapT : THREE.ClampToEdgeWrapping, minFilter : THREE.NearestFilter, magFilter : THREE.NearestFilter, anisotropy : 1, depthBuffer : false, stencilBuffer : false});
	this.initialConditionsMaterial = new THREE.ShaderMaterial({ vertexShader : shaderlib_Vertex.basic_uv, fragmentShader : objects_globe__$WindFlowMap_ParticleSimulation.initialConditionsFragment});
	this.positionStepMaterial = new THREE.ShaderMaterial({ vertexShader : shaderlib_Vertex.basic_uv, fragmentShader : objects_globe__$WindFlowMap_ParticleSimulation.positionStepFragment, uniforms : { particlePositions : { type : "t", value : null}, windVelocities0 : { type : "t", value : null}, windVelocities1 : { type : "t", value : null}, windMix : { type : "f", value : 0}, dt_s : { type : "f", value : 0.0166666666666666664}, randomSeed : { type : "f", value : 1.0}, meanLifetime : { type : "f", value : 5.3}, windVelocityScale : { type : "f", value : 0.00178571428571428566}}});
	this.set_sequence(sequence);
	this.quad.material = this.initialConditionsMaterial;
	this.render();
};
objects_globe__$WindFlowMap_ParticleSimulation.__name__ = true;
objects_globe__$WindFlowMap_ParticleSimulation.__super__ = render_ShaderPass2Phase;
objects_globe__$WindFlowMap_ParticleSimulation.prototype = $extend(render_ShaderPass2Phase.prototype,{
	step: function(dt_s) {
		if(this.windDataReady) {
			this.positionStepMaterial.uniforms.dt_s.value = dt_s;
			this.positionStepMaterial.uniforms.particlePositions.value = this.readTarget;
			this.positionStepMaterial.uniforms.randomSeed.value = Math.random();
			this.quad.material = this.positionStepMaterial;
			this.render();
		}
	}
	,set_sequence: function(seq) {
		var _g = this;
		this.sequence = seq;
		if(seq != null) {
			this.sequenceView = new objects_globe_MapSequenceView(seq);
			this.sequenceView.onTex0Change = function(tex) {
				_g.positionStepMaterial.uniforms.windVelocities0.value = tex;
			};
			this.sequenceView.onTex1Change = function(tex1) {
				_g.positionStepMaterial.uniforms.windVelocities1.value = tex1;
			};
			this.sequenceView.onAlphaChange = function(alpha) {
				_g.positionStepMaterial.uniforms.windMix.value = alpha;
			};
			this.sequenceView.onFrameChanged = function() {
				_g.windDataReady = true;
			};
			this.positionStepMaterial.defines.WIND_PACK_OFFSET = seq.info.mapInfo.offset;
			this.positionStepMaterial.defines.WIND_PACK_INV_SCALE = 1 / seq.info.mapInfo.scale;
			this.positionStepMaterial.needsUpdate = true;
		} else {
			this.windDataReady = false;
			this.positionStepMaterial.uniforms.windVelocities0.value = null;
			this.positionStepMaterial.uniforms.windVelocities1.value = null;
			this.positionStepMaterial.uniforms.windMix.value = 0;
		}
		return this.sequence;
	}
	,__class__: objects_globe__$WindFlowMap_ParticleSimulation
	,__properties__: {set_sequence:"set_sequence"}
});
var objects_globe_WindIntensityMap = function(renderer,sequence) {
	var _g = this;
	this.sequenceView = new objects_globe_MapSequenceView(sequence);
	render_ShaderPass.call(this,renderer,sequence.info.mapInfo.width,sequence.info.mapInfo.height,{ format : THREE.RGBFormat, type : THREE.UnsignedByteType, wrapS : THREE.ClampToEdgeWrapping, wrapT : THREE.ClampToEdgeWrapping, minFilter : THREE.LinearFilter, magFilter : THREE.LinearFilter, anisotropy : Math.max(4,renderer.getMaxAnisotropy()), depthBuffer : false, stencilBuffer : false});
	var material = new THREE.ShaderMaterial({ vertexShader : shaderlib_Vertex.basic_uv, fragmentShader : objects_globe_WindIntensityMap.fragmentShaderStr, uniforms : { windVelocities0 : { type : "t", value : null}, windVelocities1 : { type : "t", value : null}, windMix : { type : "f", value : 0}}, defines : { WIND_PACK_OFFSET : sequence.info.mapInfo.offset, WIND_PACK_INV_SCALE : 1 / sequence.info.mapInfo.scale}});
	this.quad.material = material;
	this.sequenceView.onTex0Change = function(tex) {
		material.uniforms.windVelocities0.value = tex;
	};
	this.sequenceView.onTex1Change = function(tex1) {
		material.uniforms.windVelocities1.value = tex1;
	};
	this.sequenceView.onAlphaChange = function(alpha) {
		material.uniforms.windMix.value = alpha;
	};
	this.sequenceView.onFrameChanged = function() {
		_g.render();
	};
};
objects_globe_WindIntensityMap.__name__ = true;
objects_globe_WindIntensityMap.__super__ = render_ShaderPass;
objects_globe_WindIntensityMap.prototype = $extend(render_ShaderPass.prototype,{
	__class__: objects_globe_WindIntensityMap
});
var objects_migrationpath_MigrationPath = function(globe,geoPoints,color,thickness,altOffset,segments) {
	if(segments == null) segments = 200;
	if(altOffset == null) altOffset = 0;
	if(thickness == null) thickness = 0.015;
	var worldPoints = [];
	var _g = 0;
	while(_g < geoPoints.length) {
		var gc = geoPoints[_g];
		++_g;
		gc.alt = globe.radius * globe.atmospherePad * .5 + altOffset * globe.radius;
		worldPoints.push(globe.geoToLocal(gc));
	}
	this.primary = new THREE.SplineCurve3(worldPoints);
	var sphereNormal = function(u,t,p,tan,curve) {
		return p;
	};
	var width = function(u1,t1) {
		return thickness * globe.radius;
	};
	this.ribbonGeom = new geometry_RibbonGeometry(this.primary,width,sphereNormal,segments,1);
	this.migrationMaterial = new objects_migrationpath_MigrationPathMaterial();
	THREE.Mesh.call(this,this.ribbonGeom,this.migrationMaterial);
	this.migrationMaterial.uniforms.color.value.setHex(color);
};
objects_migrationpath_MigrationPath.__name__ = true;
objects_migrationpath_MigrationPath.__super__ = THREE.Mesh;
objects_migrationpath_MigrationPath.prototype = $extend(THREE.Mesh.prototype,{
	get_progress: function() {
		return this.migrationMaterial.uniforms.progress.value;
	}
	,set_progress: function(v) {
		return this.migrationMaterial.uniforms.progress.value = v;
	}
	,get_curveFraction: function() {
		return this.ribbonGeom.curveFraction;
	}
	,set_curveFraction: function(v) {
		return this.ribbonGeom.set_curveFraction(v);
	}
	,get_lengthScale: function() {
		return 1 / this.migrationMaterial.uniforms.scale.value;
	}
	,set_lengthScale: function(v) {
		return this.migrationMaterial.uniforms.scale.value = 1 / v;
	}
	,get_color: function() {
		return this.migrationMaterial.uniforms.color.value;
	}
	,set_color: function(v) {
		return this.migrationMaterial.uniforms.color.value = v;
	}
	,__class__: objects_migrationpath_MigrationPath
	,__properties__: {set_curveFraction:"set_curveFraction",get_curveFraction:"get_curveFraction",set_color:"set_color",get_color:"get_color",set_lengthScale:"set_lengthScale",get_lengthScale:"get_lengthScale",set_progress:"set_progress",get_progress:"get_progress"}
});
var objects_migrationpath_MigrationPathMaterial = function(parameters) {
	if(parameters != null) parameters; else { };
	var shaderMaterialParameters = { vertexShader : objects_migrationpath_MigrationPathMaterial.vertexShaderStr, fragmentShader : objects_migrationpath_MigrationPathMaterial.fragmentShaderStr, uniforms : THREE.UniformsUtils.merge([THREE.UniformsLib.common,{ progress : { type : "f", value : 1}, scale : { type : "f", value : 1}, color : { type : "c", value : new THREE.Color(1.,0,0)}}])};
	shaderMaterialParameters.transparent = true;
	shaderMaterialParameters.side = THREE.FrontSide;
	shaderMaterialParameters.blending = THREE.CustomBlending;
	shaderMaterialParameters.blendEquation = THREE.AddEquation;
	shaderMaterialParameters.blendSrc = THREE.OneFactor;
	shaderMaterialParameters.blendDst = THREE.OneMinusSrcAlphaFactor;
	shaderMaterialParameters.depthWrite = false;
	THREE.ShaderMaterial.call(this,shaderMaterialParameters);
};
objects_migrationpath_MigrationPathMaterial.__name__ = true;
objects_migrationpath_MigrationPathMaterial.__super__ = THREE.ShaderMaterial;
objects_migrationpath_MigrationPathMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	__class__: objects_migrationpath_MigrationPathMaterial
});
var shaderlib_Vertex = function() { };
shaderlib_Vertex.__name__ = true;
var three_ITexture = function() { };
three_ITexture.__name__ = true;
three_ITexture.prototype = {
	__class__: three_ITexture
};
var tracks_MigrationData = function() { };
tracks_MigrationData.__name__ = true;
function $iterator(o) { if( o instanceof Array ) return function() { return HxOverrides.iter(o); }; return typeof(o.iterator) == 'function' ? $bind(o,o.iterator) : o.iterator; }
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.prototype.__class__ = String;
String.__name__ = true;
Array.__name__ = true;
Date.prototype.__class__ = Date;
Date.__name__ = ["Date"];
var Int = { __name__ : ["Int"]};
var Dynamic = { __name__ : ["Dynamic"]};
var Float = Number;
Float.__name__ = ["Float"];
var Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = { __name__ : ["Class"]};
var Enum = { };
/*! @preserve
Copyright (c) 2012, Michael Bostock
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* The name Michael Bostock may not be used to endorse or promote products
  derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL MICHAEL BOSTOCK BE LIABLE FOR ANY DIRECT,
INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/var topojson=function(){function t(c,d){function k(f){var a=c.arcs[0>f?~f:f],b=a[0],e;c.transform?(e=[0,0],a.forEach(function(a){e[0]+=a[0];e[1]+=a[1]})):e=a[a.length-1];return 0>f?[e,b]:[b,e]}function g(f,a){for(var e in f){var c=f[e];delete a[c.start];delete c.start;delete c.end;c.forEach(function(a){l[0>a?~a:a]=1});b.push(c)}}var l={},h={},e={},b=[],m=-1;d.forEach(function(f,a){var b=c.arcs[0>f?~f:f];3>b.length&&!b[1][0]&&!b[1][1]&&(b=d[++m],d[m]=f,d[a]=b)});d.forEach(function(b){var a=k(b),c=
a[0],d=a[1];(a=e[c])?(delete e[a.end],a.push(b),a.end=d,(b=h[d])?(delete h[b.start],c=b===a?a:a.concat(b),h[c.start=a.start]=e[c.end=b.end]=c):h[a.start]=e[a.end]=a):(a=h[d])?(delete h[a.start],a.unshift(b),a.start=c,(b=e[c])?(delete e[b.end],c=b===a?a:b.concat(a),h[c.start=b.start]=e[c.end=a.end]=c):h[a.start]=e[a.end]=a):(a=[b],h[a.start=c]=e[a.end=d]=a)});g(e,h);g(h,e);d.forEach(function(c){l[0>c?~c:c]||b.push([c])});return b}function u(c,d,k){var g=[];if(1<arguments.length){var l=function(b){"GeometryCollection"===
b.type?b.geometries.forEach(l):b.type in a&&(f=b,a[b.type](b.arcs))},h=function(a){a.forEach(e)},e=function(a){a.forEach(b)},b=function(a){var b=0>a?~a:a;(m[b]||(m[b]=[])).push({i:a,g:f})},m=[],f,a={LineString:e,MultiLineString:h,Polygon:h,MultiPolygon:function(a){a.forEach(h)}};l(d);m.forEach(3>arguments.length?function(a){g.push(a[0].i)}:function(a){k(a[0].g,a[a.length-1].g)&&g.push(a[0].i)})}else for(var p=0,A=c.arcs.length;p<A;++p)g.push(p);return{type:"MultiLineString",arcs:t(c,g)}}function v(c,
d){function k(b){b.forEach(function(c){c.forEach(function(c){(l[c=0>c?~c:c]||(l[c]=[])).push(b)})});h.push(b)}function g(b){b=q(c,{type:"Polygon",arcs:[b]}).coordinates[0];for(var e=-1,f=b.length,a,d=b[f-1],h=0;++e<f;)a=d,d=b[e],h+=a[0]*d[1]-a[1]*d[0];return 0<.5*h}var l={},h=[],e=[];d.forEach(function(b){"Polygon"===b.type?k(b.arcs):"MultiPolygon"===b.type&&b.arcs.forEach(k)});h.forEach(function(b){if(!b._){var c=[],f=[b];b._=1;for(e.push(c);b=f.pop();)c.push(b),b.forEach(function(a){a.forEach(function(a){l[0>
a?~a:a].forEach(function(a){a._||(a._=1,f.push(a))})})})}});h.forEach(function(b){delete b._});return{type:"MultiPolygon",arcs:e.map(function(b){var e=[];b.forEach(function(a){a.forEach(function(a){a.forEach(function(a){2>l[0>a?~a:a].length&&e.push(a)})})});e=t(c,e);if(1<(n=e.length)){var f=g(b[0][0]);for(b=0;b<n;++b)if(f===g(e[b])){f=e[0];e[0]=e[b];e[b]=f;break}}return e})}}function w(c,d){var k={type:"Feature",id:d.id,properties:d.properties||{},geometry:q(c,d)};null==d.id&&delete k.id;return k}
function q(c,d){function k(a){a=a.slice();b(a,0);return a}function g(a){for(var c=[],e=0,f=a.length;e<f;++e){var d=a[e],h=c;h.length&&h.pop();for(var g=m[0>d?~d:d],k=0,l=g.length,q=void 0;k<l;++k)h.push(q=g[k].slice()),b(q,k);if(0>d)for(d=h,h=void 0,g=d.length,l=g-l;l<--g;)h=d[l],d[l++]=d[g],d[g]=h}2>c.length&&c.push(c[0].slice());return c}function l(a){for(a=g(a);4>a.length;)a.push(a[0].slice());return a}function h(a){return a.map(l)}function e(a){var b=a.type;return"GeometryCollection"===b?{type:b,
geometries:a.geometries.map(e)}:b in f?{type:b,coordinates:f[b](a)}:null}var b=x(c.transform),m=c.arcs,f={Point:function(a){return k(a.coordinates)},MultiPoint:function(a){return a.coordinates.map(k)},LineString:function(a){return g(a.arcs)},MultiLineString:function(a){return a.arcs.map(g)},Polygon:function(a){return h(a.arcs)},MultiPolygon:function(a){return a.arcs.map(h)}};return e(d)}function y(c,d){for(var k=0,g=c.length;k<g;){var l=k+g>>>1;c[l]<d?k=l+1:g=l}return k}function B(c){var d=c[0],k=
c[1];c=c[2];return Math.abs((d[0]-c[0])*(k[1]-d[1])-(d[0]-k[0])*(c[1]-d[1]))}function C(){function c(c,e){for(;0<e;){var b=(e+1>>1)-1,d=g[b];if(0<=c[1][2]-d[1][2])break;g[d._=e]=d;g[c._=e=b]=c}}function d(c,e){for(;;){var b=e+1<<1,d=b-1,f=e,a=g[f];d<l&&0>g[d][1][2]-a[1][2]&&(a=g[f=d]);b<l&&0>g[b][1][2]-a[1][2]&&(a=g[f=b]);if(f===e)break;g[a._=e]=a;g[c._=e=f]=c}}var k={},g=[],l=0;k.push=function(d){c(g[d._=l]=d,l++);return l};k.pop=function(){if(!(0>=l)){var c=g[0],e;0<--l&&(e=g[l],d(g[e._=0]=e,0));
return c}};k.remove=function(h){var e=h._,b;if(g[e]===h)return e!==--l&&(b=g[l],(0>b[1][2]-h[1][2]?c:d)(g[b._=e]=b,e)),e};return k}function x(c){if(!c)return z;var d,k,g=c.scale[0],l=c.scale[1],h=c.translate[0],e=c.translate[1];return function(b,c){c||(d=k=0);b[0]=(d+=b[0])*g+h;b[1]=(k+=b[1])*l+e}}function D(c){if(!c)return z;var d,k,g=c.scale[0],l=c.scale[1],h=c.translate[0],e=c.translate[1];return function(b,c){c||(d=k=0);var f=(b[0]-h)/g|0,a=(b[1]-e)/l|0;b[0]=f-d;b[1]=a-k;d=f;k=a}}function z(){}
return{version:"1.6.19",mesh:function(c){return q(c,u.apply(this,arguments))},meshArcs:u,merge:function(c){return q(c,v.apply(this,arguments))},mergeArcs:v,feature:function(c,d){return"GeometryCollection"===d.type?{type:"FeatureCollection",features:d.geometries.map(function(d){return w(c,d)})}:w(c,d)},neighbors:function(c){function d(a,b){a.forEach(function(a){0>a&&(a=~a);var c=l[a];c?c.push(b):l[a]=[b]})}function k(a,b){a.forEach(function(a){d(a,b)})}function g(a,b){if("GeometryCollection"===a.type)a.geometries.forEach(function(a){g(a,
b)});else if(a.type in e)e[a.type](a.arcs,b)}var l={},h=c.map(function(){return[]}),e={LineString:d,MultiLineString:k,Polygon:k,MultiPolygon:function(a,b){a.forEach(function(a){k(a,b)})}};c.forEach(g);for(var b in l){c=l[b];for(var m=c.length,f=0;f<m;++f)for(var a=f+1;a<m;++a){var p=c[f],q=c[a],r;(r=h[p])[b=y(r,q)]!==q&&r.splice(b,0,q);(r=h[q])[b=y(r,p)]!==p&&r.splice(b,0,p)}}return h},presimplify:function(c,d){function k(c){h.remove(c);c[1][2]=d(c);h.push(c)}var g=x(c.transform),l=D(c.transform),
h=C();d||(d=B);c.arcs.forEach(function(c){for(var b=[],m=0,f,a=0,p=c.length;a<p;++a)f=c[a],g(c[a]=[f[0],f[1],Infinity],a);a=1;for(p=c.length-1;a<p;++a)f=c.slice(a-1,a+2),f[1][2]=d(f),b.push(f),h.push(f);a=0;for(p=b.length;a<p;++a)f=b[a],f.previous=b[a-1],f.next=b[a+1];for(;f=h.pop();)b=f.previous,a=f.next,f[1][2]<m?f[1][2]=m:m=f[1][2],b&&(b.next=a,b[2]=f[2],k(b)),a&&(a.previous=b,a[0]=f[0],k(a));c.forEach(l)});return c}}}();;
var __map_reserved = {}
Main.globeRadius = 1.0;
Main.trackMap = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = tracks_AnimalOdysseys;
		if(__map_reserved["animal-odysseys"] != null) _g.setReserved("animal-odysseys",value); else _g.h["animal-odysseys"] = value;
	}
	$r = _g;
	return $r;
}(this));
haxe_ds_ObjectMap.count = 0;
js_Boot.__toStr = {}.toString;
motion_actuators_SimpleActuator.actuators = [];
motion_actuators_SimpleActuator.actuatorsLength = 0;
motion_actuators_SimpleActuator.addedEvent = false;
motion_Actuate.defaultActuator = motion_actuators_SimpleActuator;
motion_Actuate.defaultEase = motion_easing_Expo.get_easeOut();
motion_Actuate.targetLibraries = new haxe_ds_ObjectMap();
objects_globe_Atmosphere.atmosphereSegments = 120;
objects_globe_AtmosphereInnerMaterial.vertexShaderStr = "//\n// Atmospheric scattering vertex shader\n//\n// Author: Sean O'Neil\n//\n// Copyright (c) 2004 Sean O'Neil\n//\n\nuniform vec3 v3InvWavelength;\t// 1 / pow(wavelength, 4) for the red, green, and blue channels\nuniform float fOuterRadius;\t\t// The outer (atmosphere) radius\nuniform float fOuterRadius2;\t// fOuterRadius^2\nuniform float fInnerRadius;\t\t// The inner (planetary) radius\nuniform float fInnerRadius2;\t// fInnerRadius^2\nuniform float fKrESun;\t\t\t// Kr * ESun\nuniform float fKmESun;\t\t\t// Km * ESun\nuniform float fKr4PI;\t\t\t// Kr * 4 * PI\nuniform float fKm4PI;\t\t\t// Km * 4 * PI\nuniform float fScale;\t\t\t// 1 / (fOuterRadius - fInnerRadius)\nuniform float fScaleDepth;\t\t// The scale depth (i.e. the altitude at which the atmosphere's average density is found)\nuniform float fScaleOverScaleDepth;\t// fScale / fScaleDepth\n\n//three.js\n#if MAX_DIR_LIGHTS > 0\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n\nvarying vec4 secondaryColor;\nvarying vec4 frontColor;\n\n#ifdef GROUND_TEXTURES\nvarying vec2 vUv;\n#endif\n\nconst float fSamples = float(nSamples);//nSamples provided in prepended define\n\nfloat scale(float fCos)\n{\n\tfloat x = 1.0 - fCos;\n\treturn fScaleDepth * exp(-0.00287 + x*(0.459 + x*(3.83 + x*(-6.80 + x*5.25))));\n}\n\nvoid main(void)\n{\n\t#ifdef GROUND_TEXTURES\n\tvUv = uv;\n\t#endif\n\n\n\t//get values from three.js\n\t//@! doesn't currently handle glancing camera angles\n\tvec3 v3LightDir = directionalLightDirection[0];\n\tvec3 v3VertPos = (modelMatrix * vec4(position, 1.)).xyz;//world coordinates\n\tvec3 v3CameraPos = cameraPosition;\n\n\tfloat fCameraHeight = length(v3CameraPos);\n\tfloat fCameraHeight2 = fCameraHeight * fCameraHeight;\n\n\t// Get the ray from the camera to the vertex and its length (which is the far point of the ray passing through the atmosphere)\n\tvec3 v3Ray = v3VertPos - v3CameraPos;\n\tfloat fFar = length(v3Ray);\n\tv3Ray /= fFar;\n\n\t// Calculate the closest intersection of the ray with the outer atmosphere (which is the near point of the ray passing through the atmosphere)\n\tfloat B = 2.0 * dot(v3CameraPos, v3Ray);\n\tfloat C = fCameraHeight2 - fOuterRadius2;\n\tfloat fDet = max(0.0, B*B - 4.0 * C);\n\tfloat fNear = 0.5 * (-B - sqrt(fDet));\n\n\t// Calculate the ray's starting position, then calculate its scattering offset\n\tvec3 v3Start = v3CameraPos + v3Ray * fNear;\n\tfFar -= fNear;\n\tfloat fDepth = exp((fInnerRadius - fOuterRadius) / fScaleDepth);\n\tfloat fCameraAngle = dot(-v3Ray, v3VertPos) / length(v3VertPos);\n\tfloat fLightAngle = dot(v3LightDir, v3VertPos) / length(v3VertPos);\n\tfloat fCameraScale = scale(fCameraAngle);\n\tfloat fLightScale = scale(fLightAngle);\n\tfloat fCameraOffset = fDepth*fCameraScale;\n\tfloat fTemp = (fLightScale + fCameraScale);\n\n\t// Initialize the scattering loop variables\n\tfloat fSampleLength = fFar / fSamples;\n\tfloat fScaledLength = fSampleLength * fScale;\n\tvec3 v3SampleRay = v3Ray * fSampleLength;\n\tvec3 v3SamplePoint = v3Start + v3SampleRay * 0.5;\n\n\t// Now loop through the sample rays\n\tvec3 v3FrontColor = vec3(0.0, 0.0, 0.0);\n\tvec3 v3Attenuate;\n\tfor(int i=0; i<nSamples; i++)\n\t{\n\t\tfloat fHeight = length(v3SamplePoint);\n\t\tfloat fDepth = exp(fScaleOverScaleDepth * (fInnerRadius - fHeight));\n\t\tfloat fScatter = fDepth*fTemp - fCameraOffset;\n\t\tv3Attenuate = exp(-fScatter * (v3InvWavelength * fKr4PI + fKm4PI));\n\t\tv3FrontColor += v3Attenuate * (fDepth * fScaledLength);\n\t\tv3SamplePoint += v3SampleRay;\n\t}\n\n\t// Atmosphere calculations output:\n\tfrontColor = vec4(v3FrontColor * (v3InvWavelength * fKrESun + fKmESun), 1.0);\n\t// Calculate the attenuation factor for the ground\n\tsecondaryColor = vec4(v3Attenuate, 1.0);\n\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}\n";
objects_globe_AtmosphereInnerMaterial.fragmentShaderStr = "//\n// Atmospheric scattering fragment shader\n//\n// Author: Sean O'Neil\n//\n// Copyright (c) 2004 Sean O'Neil\n//\n\n#ifdef GROUND_TEXTURES\nuniform sampler2D threeTextureBug;\nvarying vec2 vUv;\n#endif\n\nvarying vec4 secondaryColor;\nvarying vec4 frontColor;\n\n\nvoid main (void)\n{\n\t#ifdef GROUND_TEXTURES\n\tgl_FragColor = frontColor + texture2D(threeTextureBug, vUv) * secondaryColor;\n\t#else\n\t// gl_FragColor = frontColor*0.5 + mix(frontColor, secondaryColor*0.25, 0.5) + .0 * secondaryColor;\n\tgl_FragColor = frontColor*0.95 + .1 * secondaryColor;\n\t#endif\n}\n";
objects_globe_AtmosphereOuterMaterial.vertexShaderStr = "//\n// Atmospheric scattering vertex shader\n//\n// Author: Sean O'Neil\n//\n// Copyright (c) 2004 Sean O'Neil\n//\n\nuniform vec3 v3InvWavelength;\t// 1 / pow(wavelength, 4) for the red, green, and blue channels\nuniform float fOuterRadius;\t\t// The outer (atmosphere) radius\nuniform float fOuterRadius2;\t// fOuterRadius^2\nuniform float fInnerRadius;\t\t// The inner (planetary) radius\nuniform float fInnerRadius2;\t// fInnerRadius^2\nuniform float fKrESun;\t\t\t// Kr * ESun\nuniform float fKmESun;\t\t\t// Km * ESun\nuniform float fKr4PI;\t\t\t// Kr * 4 * PI\nuniform float fKm4PI;\t\t\t// Km * 4 * PI\nuniform float fScale;\t\t\t// 1 / (fOuterRadius - fInnerRadius)\nuniform float fScaleDepth;\t\t// The scale depth (i.e. the altitude at which the atmosphere's average density is found)\nuniform float fScaleOverScaleDepth;\t// fScale / fScaleDepth\n\n//three.js\n#if MAX_DIR_LIGHTS > 0\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n\nvarying vec3 v3Direction;\nvarying vec4 secondaryColor;\nvarying vec4 frontColor;\n\nconst float fSamples = float(nSamples);//nSamples provided in prepended define\n\nfloat scale(float fCos)\n{\n\tfloat x = 1.0 - fCos;\n\treturn fScaleDepth * exp(-0.00287 + x*(0.459 + x*(3.83 + x*(-6.80 + x*5.25))));\n}\n\nvoid main(void)\n{\t\n\t//get values from three.js\n\t//@! doesn't currently handle glancing camera angles\n\tvec3 v3LightDir = directionalLightDirection[0];\n\tvec3 v3VertPos = (modelMatrix * vec4(position, 1.)).xyz;//world coordinates\n\tvec3 v3CameraPos = cameraPosition;\n\n\tfloat fCameraHeight = length(v3CameraPos);\n\tfloat fCameraHeight2 = fCameraHeight * fCameraHeight;\n\n\t// Get the ray from the camera to the vertex and its length (which is the far point of the ray passing through the atmosphere)\n\tvec3 v3Ray = v3VertPos - v3CameraPos;\n\tfloat fFar = length(v3Ray);\n\tv3Ray /= fFar;\n\n\t// Calculate the closest intersection of the ray with the outer atmosphere (which is the near point of the ray passing through the atmosphere)\n\tfloat B = 2.0 * dot(v3CameraPos, v3Ray);\n\tfloat C = fCameraHeight2 - fOuterRadius2;\n\tfloat fDet = max(0.0, B*B - 4.0 * C);\n\tfloat fNear = 0.5 * (-B - sqrt(fDet));\n\n\t// Calculate the ray's starting position, then calculate its scattering offset\n\tvec3 v3Start = v3CameraPos + v3Ray * fNear;\n\tfFar -= fNear;\n\tfloat fStartAngle = dot(v3Ray, v3Start) / fOuterRadius;\n\tfloat fStartDepth = exp(-1.0 / fScaleDepth);\n\tfloat fStartOffset = fStartDepth * scale(fStartAngle);\n\n\t// Initialize the scattering loop variables\n\tfloat fSampleLength = fFar / fSamples;\n\tfloat fScaledLength = fSampleLength * fScale;\n\tvec3 v3SampleRay = v3Ray * fSampleLength;\n\tvec3 v3SamplePoint = v3Start + v3SampleRay * 0.5;\n\n\t// Now loop through the sample rays\n\tvec3 v3FrontColor = vec3(0.0, 0.0, 0.0);\n\tfor(int i=0; i<nSamples; i++)\n\t{\n\t\tfloat fHeight = length(v3SamplePoint);\n\t\tfloat fDepth = exp(fScaleOverScaleDepth * (fInnerRadius - fHeight));\n\t\tfloat fLightAngle = dot(v3LightDir, v3SamplePoint) / fHeight;\n\t\tfloat fCameraAngle = dot(v3Ray, v3SamplePoint) / fHeight;\n\t\tfloat fScatter = (fStartOffset + fDepth * (scale(fLightAngle) - scale(fCameraAngle)));\n\t\tvec3 v3Attenuate = exp(-fScatter * (v3InvWavelength * fKr4PI + fKm4PI));\n\n\t\tv3FrontColor += v3Attenuate * (fDepth * fScaledLength);\n\t\tv3SamplePoint += v3SampleRay;\n\t}\n\n\t// Finally, scale the Mie and Rayleigh colors and set up the varying variables for the pixel shader\n\tsecondaryColor = vec4(v3FrontColor * fKmESun, 1.0);\n\tfrontColor = vec4(v3FrontColor * (v3InvWavelength * fKrESun), 1.0);\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\tv3Direction = v3CameraPos - v3VertPos;\n}";
objects_globe_AtmosphereOuterMaterial.fragmentShaderStr = "//\n// Atmospheric scattering fragment shader\n//\n// Author: Sean O'Neil\n//\n// Copyright (c) 2004 Sean O'Neil\n//\n\nuniform float g;\nuniform float g2;\n\nvarying vec3 v3Direction;\nvarying vec4 secondaryColor;\nvarying vec4 frontColor;\n\n//three.js\n#if MAX_DIR_LIGHTS > 0\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n\nvoid main (void)\n{\n\tvec3 v3LightDir = directionalLightDirection[0];\n\n\tfloat fCos = dot(v3LightDir, v3Direction) / length(v3Direction);\n\tfloat fMiePhase = 1.5 * ((1.0 - g2) / (2.0 + g2)) * (1.0 + fCos*fCos) / pow(1.0 + g2 - 2.0*g*fCos, 1.5);\n\tgl_FragColor = frontColor + fMiePhase * secondaryColor;\n\tgl_FragColor.a = gl_FragColor.b;\n}";
objects_globe_GlobeMaterial.vertexShaderStr = "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n\n//ShaderChunk.common\n" + THREE.ShaderChunk.common + "\n//ShaderChunk.map_pars_vertex\n" + THREE.ShaderChunk.map_pars_vertex + "\n\nvoid main() {\n\n\t//ShaderChunk.map_vertex\n\t" + THREE.ShaderChunk.map_vertex + "\n\n\t//ShaderChunk.defaultnormal_vertex\n\t" + THREE.ShaderChunk.defaultnormal_vertex + "\n\n\t#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\n\t//ShaderChunk.default_vertex\n\t" + THREE.ShaderChunk.default_vertex + "\n\n\tvViewPosition = -mvPosition.xyz;\n\n}";
objects_globe_GlobeMaterial.fragmentShaderStr = "#define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\n//ShaderChunk.common\n" + THREE.ShaderChunk.common + "\n//ShaderChunk.map_pars_fragment\n" + THREE.ShaderChunk.map_pars_fragment + "\n//ShaderChunk.alphamap_pars_fragment\n" + THREE.ShaderChunk.alphamap_pars_fragment + "\n//ShaderChunk.lights_phong_pars_fragment\n" + THREE.ShaderChunk.lights_phong_pars_fragment + "\n//ShaderChunk.bumpmap_pars_fragment\n" + THREE.ShaderChunk.bumpmap_pars_fragment + "\n//ShaderChunk.normalmap_pars_fragment\n" + THREE.ShaderChunk.normalmap_pars_fragment + "\n//ShaderChunk.specularmap_pars_fragment\n" + THREE.ShaderChunk.specularmap_pars_fragment + "\n\nvoid main() {\n\n\tvec3 outgoingLight = vec3( 0.0 );\t// outgoing light does not have an alpha, the surface does\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t//ShaderChunk.map_fragment\n\t" + THREE.ShaderChunk.map_fragment + "\n\t//ShaderChunk.alphamap_fragment\n\t" + THREE.ShaderChunk.alphamap_fragment + "\n\t//ShaderChunk.alphatest_fragment\n\t" + THREE.ShaderChunk.alphatest_fragment + "\n\t//ShaderChunk.specularmap_fragment\n\t" + THREE.ShaderChunk.specularmap_fragment + "\n\n\t//ShaderChunk.lights_phong_fragment\n\t#ifndef FLAT_SHADED\n\t\tvec3 normal = normalize( vNormal );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\t\t#endif\n\t#else\n\t\tvec3 fdx = dFdx( vViewPosition );\n\t\tvec3 fdy = dFdy( vViewPosition );\n\t\tvec3 normal = normalize( cross( fdx, fdy ) );\n\t#endif\n\n\tvec3 viewPosition = normalize( vViewPosition );\n\n\t#ifdef USE_NORMALMAP\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\t#elif defined( USE_BUMPMAP )\n\t\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\t#endif\n\n\tvec3 totalDiffuseLight = vec3( 0.0 );\n\tvec3 totalSpecularLight = vec3( 0.0 );\n\n\t#if MAX_DIR_LIGHTS > 0\n\t \tfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\t \n\t \t\tvec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\t \n\t \t\t// diffuse\n\t \t\tfloat dotProduct = dot( normal, dirVector );\n\n\n\t \t\t//@! phong backside hack\n\t \t\t#define WRAP_AROUND\n\t \t\tvec3 wrapRGB = vec3(1.0, 125./255., 18./255.);\n\t \t\tfloat backsideAmbience = 0.04;\n\t \n\t \t\t#ifdef WRAP_AROUND\n\t \t\t\t//@! doubled dot products\n\t \t\t\tfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\n\t \t\t\tfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\t \t\t\tvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), clamp(wrapRGB*0.4 + dotProduct*1.2, 0., 1.) ) + wrapRGB * backsideAmbience;\n\t \t\t#else\n\t \t\t\tfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n\t \t\t#endif\n\t \n\t \t\ttotalDiffuseLight += directionalLightColor[ i ] * dirDiffuseWeight;\n\t \n\t \t\t// specular\n\t \t\tvec3 dirHalfVector = normalize( dirVector + viewPosition );\n\t \t\tfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n\t \t\tfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\t \n\t \t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t \t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n\t \t\ttotalSpecularLight += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\t \t}\n\t#endif\n\n\toutgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) + totalSpecularLight + emissive;\n\n\t//ShaderChunk.linear_to_gamma_fragment\n\t" + THREE.ShaderChunk.linear_to_gamma_fragment + "\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\t// TODO, this should be pre-multiplied to allow for bright highlights on very transparent objects\n\n}";
objects_globe_MapSequence.infoFilename = "sequence-info.json";
render_ShaderPass.staticCamera = new THREE.OrthographicCamera(-1,1,1,-1,0,1);
render_ShaderPass.staticPlaneGeom = new THREE.PlaneBufferGeometry(2,2,1,1);
objects_globe_WindFlowMap.processLastFrameFragment = "#define DEBUG" + "\nuniform sampler2D lastFrame;\nuniform float dt_s;\nvarying vec2 vUv;\n\n#ifdef DEBUG\nuniform float halfLife;\n#else\nconst float halfLife = 0.2;//time required to fall to half of its value\n#endif\n\nconst float ln2 = 0.69314718056;\n\nvoid main(){\n\tvec4 l = texture2D(lastFrame, vUv);\n\n\n\t#ifndef DEBUG\n\tconst \n\t#endif\n\tfloat lambda = ln2 / halfLife;\n\n\tl = l - l * lambda * dt_s;\n\n\tgl_FragColor = l;\n}\n";
shaderlib_Chunks.basic_projection = "gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);";
shaderlib_Chunks.bilerp = "vec4 bilerp(sampler2D texture, vec2 coord, vec2 resolution){\n\t//convert to absolute coordinates\n\tcoord *= resolution;\n\n\tvec4 st;\n\tst.xy = floor(coord - .5) + .5; //left & bottom cell centers\n\tst.zw = st.xy + 1.;             //right & top centers\n\n\tvec2 t = texelCoord - st.xy;\n\n\tst /= resolution.xyxy; //to unitary coords\n\t\n\tvec4 tex11 = texture2D(texture, st.xy);\n\tvec4 tex21 = texture2D(texture, st.zy);\n\tvec4 tex12 = texture2D(texture, st.xw);\n\tvec4 tex22 = texture2D(texture, st.zw);\n\n\treturn mix(mix(tex11, tex21, t.x), mix(tex12, tex22, t.x), t.y);\n}";
shaderlib_Chunks.float_packing = "//Float Packing\nvec4 packFloat8bitRGBA(in float val) {\n    vec4 pack = vec4(1.0, 255.0, 65025.0, 16581375.0) * val;\n    pack = fract(pack);\n    pack -= vec4(pack.yzw / 255.0, 0.0);\n    return pack;\n}\n\nfloat unpackFloat8bitRGBA(in vec4 pack) {\n    return dot(pack, vec4(1.0, 1.0 / 255.0, 1.0 / 65025.0, 1.0 / 16581375.0));\n}\n\nvec3 packFloat8bitRGB(in float val) {\n    vec3 pack = vec3(1.0, 255.0, 65025.0) * val;\n    pack = fract(pack);\n    pack -= vec3(pack.yz / 255.0, 0.0);\n    return pack;\n}\n\nfloat unpackFloat8bitRGB(in vec3 pack) {\n    return dot(pack, vec3(1.0, 1.0 / 255.0, 1.0 / 65025.0));\n}\n\nvec2 packFloat8bitRG(in float val) {\n    vec2 pack = vec2(1.0, 255.0) * val;\n    pack = fract(pack);\n    pack -= vec2(pack.y / 255.0, 0.0);\n    return pack;\n}\n\nfloat unpackFloat8bitRG(in vec2 pack) {\n    return dot(pack, vec2(1.0, 1.0 / 255.0));\n}";
objects_globe__$WindFlowMap_ParticleRenderObject.vertexShaderStr = "#define DEBUG" + ("\nprecision highp float;\n\nattribute vec2 lookUpUV;\nuniform sampler2D positions;\n\n#ifdef DEBUG\nuniform float particleSize;\n#else\nconst float particleSize = 2.0;\n#endif\n\n" + ("" + shaderlib_Chunks.float_packing + "\n\n//position\n#ifndef NO_PARTICLE_PACK\nvec4 packParticlePosition(in vec2 p){\n\tvec2 np = p*0.5 + 0.5;\n\treturn vec4(packFloat8bitRG(np.x), packFloat8bitRG(np.y));\n}\n#else\n#define packParticlePosition(p) vec4(p.xy, 0., 0.)\n#endif\n\n#ifndef NO_PARTICLE_PACK\nvec2 unpackParticlePosition(in vec4 pp){\n\tvec2 np = vec2(unpackFloat8bitRG(pp.xy), unpackFloat8bitRG(pp.zw));\n\treturn 2.0*np.xy - 1.0;\n}\n#else\n#define unpackParticlePosition(pp) pp.xy\n#endif\n") + "\n\nvoid main(){\n\tvec2 p = unpackParticlePosition(texture2D(positions, lookUpUV));\n\n\tgl_PointSize = particleSize;\n\n\tgl_Position = vec4(p*2.0 - 1.0, 0., 1.0);\n}\n");
objects_globe__$WindFlowMap_ParticleRenderObject.fragmentShaderStr = "#define DEBUG" + "\nprecision highp float;\n\n#ifndef DEBUG\nconst float particleOpacity = 0.3;\n#else\nuniform float particleOpacity;\n#endif\n\nvoid main(){\n\tgl_FragColor = vec4(1.0, 1.0, 1.0, particleOpacity);\n}\n";
objects_globe__$WindFlowMap_ParticleRenderObject.dummyCamera = new THREE.Camera();
objects_globe__$WindFlowMap_ParticleSimulation.initialConditionsFragment = "\nvarying vec2 vUv;\n\n" + ("" + shaderlib_Chunks.float_packing + "\n\n//position\n#ifndef NO_PARTICLE_PACK\nvec4 packParticlePosition(in vec2 p){\n\tvec2 np = p*0.5 + 0.5;\n\treturn vec4(packFloat8bitRG(np.x), packFloat8bitRG(np.y));\n}\n#else\n#define packParticlePosition(p) vec4(p.xy, 0., 0.)\n#endif\n\n#ifndef NO_PARTICLE_PACK\nvec2 unpackParticlePosition(in vec4 pp){\n\tvec2 np = vec2(unpackFloat8bitRG(pp.xy), unpackFloat8bitRG(pp.zw));\n\treturn 2.0*np.xy - 1.0;\n}\n#else\n#define unpackParticlePosition(pp) pp.xy\n#endif\n") + "\n\nvoid main(){\n\tvec2 p = vUv;\n\tgl_FragColor = packParticlePosition(p);\n}\n";
objects_globe__$WindFlowMap_ParticleSimulation.positionStepFragment = "#define DEBUG" + ("\nvarying vec2 vUv;\n\nuniform sampler2D windVelocities0;\nuniform sampler2D windVelocities1;\nuniform float windMix;\n\nuniform sampler2D particlePositions;\nuniform float dt_s;\nuniform float randomSeed;\n\n#ifdef DEBUG\nuniform float meanLifetime;\nuniform float windVelocityScale;\n#else\nconst float meanLifetime = 5.3; //how long a particle is expected to last before reset (very loose approx)\nconst float windVelocityScale = 1./560.;\n#endif\n\n" + ("" + shaderlib_Chunks.float_packing + "\n\n//position\n#ifndef NO_PARTICLE_PACK\nvec4 packParticlePosition(in vec2 p){\n\tvec2 np = p*0.5 + 0.5;\n\treturn vec4(packFloat8bitRG(np.x), packFloat8bitRG(np.y));\n}\n#else\n#define packParticlePosition(p) vec4(p.xy, 0., 0.)\n#endif\n\n#ifndef NO_PARTICLE_PACK\nvec2 unpackParticlePosition(in vec4 pp){\n\tvec2 np = vec2(unpackFloat8bitRG(pp.xy), unpackFloat8bitRG(pp.zw));\n\treturn 2.0*np.xy - 1.0;\n}\n#else\n#define unpackParticlePosition(pp) pp.xy\n#endif\n") + "\n" + "//Requires defines:\n//WIND_PACK_OFFSET :FLOAT\n//WIND_PACK_INV_SCALE :FLOAT\nvec2 unpackWindVelocity(vec4 pack){\n\tvec2 u = vec2(unpackFloat8bitRG(pack.rg), unpackFloat8bitRG(pack.ba));\n\tconst vec2 offset = vec2(WIND_PACK_OFFSET);\n\tu = (u * WIND_PACK_INV_SCALE) - offset;\n\treturn u;\n}" + "\n\nvec2 cartesianToAngularVelocity(in vec2 cv){\n\t//@! todo\n\treturn cv;\n}\n\nfloat rand(vec2 co){\n    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);\n}\n\nvoid main(){\n\tvec2 p = unpackParticlePosition(texture2D(particlePositions, vUv));\n\n\t//read wind velocity data\n\tvec2 wv0 = unpackWindVelocity(texture2D(windVelocities0, p));\n\tvec2 wv1 = unpackWindVelocity(texture2D(windVelocities1, p));\n\tvec2 wv = mix(wv0, wv1, windMix);\n\n\tvec2 v = cartesianToAngularVelocity(wv) * windVelocityScale;\n\n\t//euler step\n\tp = p + v * dt_s;\n\n\t//reset position\n\t#ifndef DEBUG\n\tconst\n\t#endif\n\tfloat resetFactor = 1./meanLifetime;\n\n\tif((resetFactor * dt_s) > rand(p + vUv + randomSeed)){\n\t\tp = vUv;\n\t}\n\n\t//wrap positions\n\tp = mod(p, 1.0);\n\n\tgl_FragColor = packParticlePosition(p);\n}\n");
objects_globe_WindIntensityMap.fragmentShaderStr = "uniform sampler2D windVelocities0;\nuniform sampler2D windVelocities1;\n\nuniform float windMix;\n\nvarying vec2 vUv;\n\n" + shaderlib_Chunks.float_packing + "\n\n//iq color palette function\nvec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ){\n    return a + b*cos( 6.28318*(c*t+d) );\n}\n\n" + "//Requires defines:\n//WIND_PACK_OFFSET :FLOAT\n//WIND_PACK_INV_SCALE :FLOAT\nvec2 unpackWindVelocity(vec4 pack){\n\tvec2 u = vec2(unpackFloat8bitRG(pack.rg), unpackFloat8bitRG(pack.ba));\n\tconst vec2 offset = vec2(WIND_PACK_OFFSET);\n\tu = (u * WIND_PACK_INV_SCALE) - offset;\n\treturn u;\n}" + "\n\nvoid main(){\n\n\tvec2 vel0 = unpackWindVelocity(texture2D(windVelocities0, vUv));\n\tvec2 vel1 = unpackWindVelocity(texture2D(windVelocities1, vUv));\n\tvec2 vel = mix(vel0, vel1, windMix);\n\n\tfloat x = clamp(length(vel)/50., 0., 1.);\n\t// x = pow(x,);\n\tgl_FragColor = vec4(\n\t\t//red-yellow\n\t\t//pal( x, vec3(0.8,0.5,0.4),vec3(0.2,0.4,0.2),vec3(2.0,1.0,1.0),vec3(0.0,0.25,0.25) ),\n\t\t//rainbow\n\t\t// pal( 1. - x, vec3(0.5,0.5,0.5),vec3(0.5,0.5,0.5),vec3(1.0,1.0,1.0)*1.3,vec3(0.0,0.33,0.67)*2. ),\n\t\t//rainbow 2\n\t\t// pal(x,vec3(0.55,0.4,0.3),vec3(0.50,0.51,0.35)+0.1,vec3(0.8,0.75,0.8),vec3(0.075,0.33,0.67)+0.21),\n\t\t//black->blue->white\n\t\t// pal(x,vec3(0.55),vec3(0.8),vec3(0.29),vec3(0.00,0.05,0.15) + 0.54 ),\n\t\t//black->blue->white 2\n\t\tpal(pow(x, .5) ,vec3(0.5),vec3(0.55),vec3(0.45),vec3(0.00,0.10,0.20) + 0.47 ),\n\t\t//\n\t\t// pal(1.-x,vec3(0.5),vec3(0.5),vec3(0.9),vec3(0.3,0.20,0.20) + 0.31 ),\n\t\t1.0\n\t);\n}";
objects_migrationpath_MigrationPathMaterial.vertexShaderStr = "varying vec2 vUv;\nvarying vec2 vNUv;\n\n\nvoid main() {\n\tvUv = uv;\n\tvNUv = uv2;\n\t//ShaderChunk.default_vertex\n\t" + THREE.ShaderChunk.default_vertex + "\n}";
objects_migrationpath_MigrationPathMaterial.fragmentShaderStr = "uniform float progress;\nuniform float scale;\nuniform vec3 color;\n\nvarying vec2 vUv;\nvarying vec2 vNUv;\n\nvoid main() {\n\t\n\tconst float end = 0.988;\n\tconst float stepMax = 0.6;\n\n\tfloat a = smoothstep(0., stepMax, vNUv.y);\n\tfloat b = smoothstep(0., stepMax, 1. - vNUv.y);\n    float c = smoothstep(1.0, end, vNUv.x) * smoothstep(0., 1. - end, vNUv.x);//special, can ignore for now\n\n    float ab = a*b;\n\n\tfloat u = vUv.x*scale - (progress*(scale) - 1.);\n\tfloat nu = vNUv.x*scale - (progress*(scale) - 1.);\n\n    float f = smoothstep(1.0, end, nu);\n\n\tfloat i = clamp(ab * c * f * nu * nu, 0., 1.);\n\n\tvec3 col = color;\n\t//increase intensity toward the middle\n\tconst float darkenFactor = 0.5;\n\tcol *= nu * darkenFactor + (1. - darkenFactor);//darken towards end\n\n\tcol += vec3(1.0)*i * nu * nu * nu * ab * ab * ab * ab;\n\t\n\tgl_FragColor = vec4(col, i);\n\t//premultiply alpha\n\tgl_FragColor.rgb *= gl_FragColor.a;\n}";
shaderlib_Vertex.basic = "void main(){\n\t" + shaderlib_Chunks.basic_projection + "\n}";
shaderlib_Vertex.basic_uv = "varying vec2 vUv;\n\nvoid main(){\n\tvUv = uv;\n\t" + shaderlib_Chunks.basic_projection + "\n}";
tracks_MigrationData.greenTurtle_1 = [[128.223742109622492,-3.77551720427859117,0.],[128.942566361455704,-3.96764015118173585,0.],[130.203537122806409,-3.80865725068304517,0.],[130.894335365741512,-4.18509034537972457,0.],[131.840491974361299,-5.00179621141511088,0.],[133.373085421994602,-4.65140191090676,0.],[134.321730388360692,-4.35214488713413061,0.],[136.121615377530588,-4.84941237952222526,0.],[137.892864310688793,-5.7067545291306061,0.],[138.133890862377712,-6.95413833305809437,0.],[137.1670458351349,-8.39870484063325407,0.],[137.685337300817508,-8.68751709648837434,0.],[139.064923512616588,-8.73999348067523663,0.],[139.761772247802611,-8.52159789195962603,0.],[140.719948227595694,-9.21989486544554104,0.],[141.412490052927211,-9.61734775265083464,0.],[142.043479489131414,-9.59537273528240675,0.],[142.68388313242761,-9.5934179255737444,0.],[143.083063574397,-9.59972852654614,0.],[143.665696828373,-9.91203083736769486,0.],[144.077436461805405,-10.1197844674642408,0.],[144.140741195214,-10.8817074104718898,0.],[144.168084419165609,-11.8910266028715199,0.],[144.344545008000495,-12.4254955036709909,0.]];
tracks_MigrationData.shearwater_6 = [[152.184940059344797,-23.7797221152731417,0.],[152.79048146222911,-21.3251537000646,0.],[153.253587411839,-20.1162798391596311,0.],[153.413437443270396,-19.5663260349373296,0.],[152.552020625849906,-17.6295680834658697,0.],[154.017103430970593,-17.4820101502993204,0.],[156.002487332836893,-15.1840305180596,0.],[159.118178710197213,-16.1693975622160906,0.],[161.655719240839602,-14.1105309356667892,0.],[161.096799167363201,-11.1987349517236208,0.],[161.262921373864,-7.9378052833499062,0.],[160.3539582609,-6.45096554330528438,0.],[163.376290131206588,-4.74549737934446902,0.],[163.897104855531296,-2.47733367686286687,0.],[163.927810967225895,0.121939925470569796,0.],[162.278133306834093,3.50562595386516218,0.],[163.551540860581611,8.32369679733179879,0.],[156.713435339999904,6.05799239986102478,0.],[153.179421995300288,9.05124498391147903,0.],[150.792702923505487,12.2021437628735594,0.],[148.254057772837911,13.8822544452015801,0.],[145.930829868803613,14.5635220813568207,0.],[145.272797782494592,16.5993343486485792,0.],[143.577737935277,16.8090479605936,0.],[142.122372007503714,14.6270112174212699,0.],[144.62612901823681,12.1507490866745496,0.],[147.529979056109113,12.2572211214310407,0.],[146.755127781772302,10.5821789602452707,0.],[145.969337145050787,6.97351894050421528,0.],[144.3930840872776,6.17053041903239308,0.],[144.3865223137702,7.82426851463186,0.],[142.41837030444529,8.78319363741127823,0.],[141.061080134768304,9.59664897387753868,0.],[140.692064887579789,10.5139223481632804,0.],[142.500349442506604,10.9587145639307497,0.],[146.966110389732705,14.3379613209709493,0.]];
tracks_MigrationData.greenTurtle_4 = [[167.317514265076795,-16.5083917851314794,0.],[166.544657200169496,-16.0760562200316315,0.],[166.190449351759696,-15.4147014072360893,0.],[166.126823992140203,-14.8498339204080896,0.],[165.894407923475711,-14.1197769382726097,0.],[165.684475105760811,-13.1467915362352397,0.],[165.628221407271695,-12.5192412978801606,0.],[165.313891440739496,-11.9439717721211593,0.],[164.88772468014929,-11.3079651599581794,0.],[164.23576768195,-11.0708299915886101,0.],[162.74232940524891,-11.2994289608601797,0.],[160.80969319907129,-12.1615699695221195,0.],[159.180503347048301,-12.3077983823291195,0.],[156.753965412619,-12.3071768688812799,0.],[155.793110397752088,-11.8653551111677302,0.],[155.284766532800887,-11.3037062200279195,0.],[154.619183952712689,-11.1557077776411102,0.],[154.020192049970291,-10.9019017091898895,0.],[153.258084277826,-10.9923984949228402,0.],[152.844362589276898,-11.1401359445485,0.],[152.501231232555597,-11.3538346533607299,0.],[151.20435586508,-11.3159890356673305,0.],[150.496266780689297,-11.1249050605586106,0.],[149.749438369001808,-10.8979070577029908,0.],[148.854586819265307,-10.5668743264396792,0.],[147.883605311262897,-10.3695965595862098,0.],[147.051441047714405,-10.3743682502035899,0.],[145.990171551713,-10.4113301799376892,0.],[145.139211543321693,-10.75792175858283,0.],[144.915972071740413,-11.4532663855006795,0.],[144.529260148552595,-12.7779490053603304,0.]];
tracks_MigrationData.shearwater_7 = [[152.533119698307701,-23.7016139992184307,0.],[153.231085822343914,-19.7685606230404609,0.],[154.225214799202888,-19.713931912732761,0.],[155.838698063971,-14.2585971537047893,0.],[157.083387752118,-12.7300668932492904,0.],[158.164534257401613,-10.6666156767133895,0.],[159.907927672883204,-6.85965122554175188,0.],[159.688149150645103,-4.83856182080306141,0.],[155.769239679456604,-2.55198390006183518,0.],[151.861890176646398,0.921192561629854856,0.],[148.997447571406809,3.25418725643528584,0.],[146.214919866298402,5.410589546910475,0.],[146.429635757607798,6.95699843611677782,0.],[146.753245563629,8.93596532873342,0.],[146.626105086176892,10.3021727069055302,0.],[144.733745264466,9.58987678386832,0.],[143.990975704793414,10.8741120829925304,0.],[143.768405785953689,12.0033888029004103,0.],[144.134060936585712,13.3068275455170095,0.],[147.75456886183,13.11713343136182,0.],[150.051978417576095,12.6461237055719398,0.],[149.237956909647806,9.51626010447898,0.],[151.458351557901295,10.9743873837362393,0.],[151.296062265614211,12.6265551233027207,0.],[148.301790894355491,15.0436331673449697,0.],[145.461386884059806,15.6922206539183193,0.],[143.623773740852101,14.3401906423329208,0.]];
tracks_MigrationData.shearwater_9 = [[156.213907954399701,-24.9947121042938711,0.],[155.286136444241407,-23.129448496514339,0.],[159.593195621531294,-20.3110583123277593,0.],[163.001174669588693,-18.3176724512260698,0.],[163.169235106354392,-16.4745180174203796,0.],[166.814112318593686,-12.7161163076641,0.],[168.608599521762187,-11.0577312323810499,0.],[173.262708761261905,-10.2948018507042391,0.],[175.681108397581312,-5.99812546416070091,0.],[172.079587260142802,-2.70284181514249688,0.],[169.928729475597606,4.32146579282939136,0.],[166.887429441101602,3.57570860832802495,0.],[164.805550510610914,6.74606875152880114,0.],[164.189971170636511,9.0400519602006657,0.],[161.643860424078412,13.1614284673734598,0.],[160.284530394912309,17.5058357371653486,0.],[165.105081094675313,15.5674264331480394,0.],[161.062235147590712,11.5229759456097707,0.],[159.358894167692114,12.1096174867611399,0.],[156.492604005142709,14.0365374041787891,0.],[156.602108805811611,11.8698673696616304,0.],[154.606325316929087,9.75450735381166467,0.],[152.599155138320896,9.21673654863361591,0.],[152.62209075119469,11.4315800849220093,0.],[150.484714332370686,13.0005465087510093,0.],[148.849790792894,12.1946937180357704,0.],[147.690567364847794,9.92461177772744,0.]];
tracks_MigrationData.dwarfMinkeWhale_4 = [[149.1006568197202,-44.0626229380649406,0.],[147.540234437403086,-44.9099485239582918,0.],[143.4484221780057,-43.6613653108648165,0.],[142.764002454608686,-42.5818120936625633,0.],[142.867702122729895,-41.1770701417871479,0.],[144.156940667952398,-40.371677192337458,0.],[145.073449595028904,-39.6155394759578314,0.],[146.042402501438204,-40.1692910682426216,0.],[147.116135871493697,-40.09160791213273,0.],[147.899191495292,-39.3201064650034624,0.],[148.401920326506314,-38.7128257108372225,0.],[151.668820551042813,-37.4715499891738,0.],[152.562769753172489,-34.6748129563777923,0.],[153.535229132021612,-33.2570453328623472,0.],[154.473832823152,-32.0418550848851069,0.],[154.359413873550494,-29.6233462298880497,0.],[154.136555393682102,-27.1236046132650088,0.],[154.644187738086288,-25.2121174567925905,0.],[153.547964986405788,-23.2194159321172506,0.],[154.03372181411,-20.7621525866003509,0.],[153.781736618776193,-20.1058190656713691,0.],[151.276922508355796,-19.4827449350710786,0.],[149.094539629184197,-18.8536139740509086,0.],[147.224664560509211,-17.2242335133939299,0.],[146.513088861403901,-16.1922194975778808,0.],[146.163193501296,-15.5503699150093198,0.],[145.748994993864699,-13.9952437663796694,0.]];
tracks_MigrationData.greenTurtle_7 = [[134.905614207180804,-6.15421490598358378,0.],[134.9780134630752,-6.48318190658260374,0.],[134.870015712373402,-6.65013131584300687,0.],[134.825530497500893,-6.90972651678547667,0.],[134.622886251740113,-7.20374013854703943,0.],[135.573852543582205,-8.00649660010925146,0.],[137.163734081756388,-8.39158166739783162,0.],[137.816439327852692,-8.67751600511133425,0.],[138.864642516415,-8.61880989362852,0.],[139.080101826902791,-8.49186384476414347,0.],[139.348965573943502,-8.40463090624124121,0.],[139.80585945382029,-8.3983328809783373,0.],[140.301748915332809,-8.74690905874350477,0.],[140.910196961597393,-9.45516487656118265,0.],[141.560768567402391,-9.54644021043896096,0.],[142.249000878397396,-9.6520259285226,0.],[142.848305307675503,-9.7833507964637576,0.],[143.259874944930687,-10.6265843350619,0.],[143.776779172415388,-11.5250750053692794,0.],[144.344044695847288,-12.3728506078041391,0.],[144.552848546363691,-12.6324205089539099,0.]];
tracks_MigrationData.dwarfMinkeWhale_2 = [[144.693433048201399,-48.9898313613692693,0.],[143.982348811495086,-45.2951574617054078,0.],[143.50060501625731,-44.201032352634293,0.],[143.464167978844699,-42.4982505620253477,0.],[144.080723045919797,-40.7931851921368391,0.],[145.032094574792296,-39.3481588131217705,0.],[146.09020401051,-39.683619614156,0.],[149.40615130094011,-39.0592041403006789,0.],[150.4702065788303,-38.3999600745476073,0.],[151.258221557163893,-36.7958634454986893,0.],[152.108916185785205,-35.583162608328422,0.],[152.444613885873309,-34.1167693248737081,0.],[153.27632858066309,-32.6702554220914507,0.],[154.43102371075949,-30.2403301878652897,0.],[154.746608986611392,-27.9513300060522489,0.],[154.185710653387304,-26.7116841146047399,0.],[154.206453123873189,-26.1457257963793,0.],[153.986589342207395,-25.015712820875919,0.],[153.438008867082488,-23.9144808204616,0.],[152.760074325249604,-23.1329238945281297,0.],[151.756795361439,-22.2244241707250687,0.],[150.480825354296513,-21.6983281671820691,0.],[149.713054699997514,-20.0472511080622802,0.],[148.0207015153903,-18.7978694012652383,0.],[146.382563934990714,-16.5225796645215084,0.],[145.950931891999,-15.8720512216707608,0.],[145.840174538604487,-15.4125717046356492,0.],[145.734469427536595,-15.0323670740080306,0.],[145.593644745503894,-14.6501087171873206,0.],[145.533051757516887,-14.5728022589403103,0.],[145.349250028511506,-14.3570602392847,0.],[144.800248912184287,-13.3251549165457792,0.],[144.45514304629171,-12.0632961458297707,0.],[144.505056391914,-11.5808620745405193,0.]];
tracks_MigrationData.greenTurtle_5 = [[153.332828479830113,-25.8419952615682398,0.],[153.510972378282787,-25.4182326755621091,0.],[153.64557499900269,-24.9952287223609595,0.],[153.354809896863,-24.5896354576617817,0.],[152.515884853972409,-24.5312165146613701,0.],[152.207543564261698,-24.3941036566846812,0.],[152.027581132938707,-23.9975155476686,0.],[151.598461898656,-23.9224358775419397,0.],[151.398431200241305,-23.4594813373465101,0.],[151.217653106968214,-23.149505947232079,0.],[150.921716109283807,-22.7269236949544293,0.],[150.864520463258714,-22.3104866060674709,0.],[150.067315414416612,-21.9136249703284811,0.],[149.470746182232801,-21.2339831148140092,0.],[149.24546176960439,-20.1669748141081,0.],[148.711273157994412,-19.6770835418645795,0.],[148.21105338972211,-19.5407748725484,0.],[147.473774830745299,-19.16504221323137,0.],[146.944009758740208,-18.9758952750579617,0.],[146.784075757025704,-18.6276564566335,0.],[146.433550221022813,-18.03722740973312,0.],[146.116723463452,-16.8439313992044184,0.],[145.802663556259205,-16.4003874107893601,0.],[145.560947404747,-15.8878351960895507,0.],[145.790742412604914,-15.2232985579451405,0.],[145.643720020765613,-14.6123205959214602,0.],[145.092742474126709,-14.5336372012076,0.],[144.636662575934707,-14.1462387224547896,0.],[144.380815215764187,-13.9469690498846699,0.],[144.177203150094414,-14.0951608817013607,0.],[143.790433206342897,-13.9769170639733,0.],[143.75880991183331,-13.4549630951991599,0.],[143.830428387879891,-13.0653027193961204,0.],[144.465982453959811,-12.64184233002198,0.]];
tracks_MigrationData.shearwater_5 = [[153.048153381983894,-23.1436145403734592,0.],[153.988705362662614,-21.5032594295841193,0.],[153.990737976201814,-20.1358929246945308,0.],[154.018251457120186,-18.1775872458513597,0.],[155.460892382068494,-17.6292706921671289,0.],[156.915339364204186,-17.4620872627055483,0.],[159.361666660455398,-16.9690444450390316,0.],[160.831092903575609,-14.6819496811291508,0.],[161.691990521111393,-11.9453807033700699,0.],[162.093974752141293,-9.57736556879097378,0.],[162.321062013011101,-6.82916691017579858,0.],[163.392168295903701,-6.27853009443261456,0.],[162.206649948921296,-4.92795213352723493,0.],[161.156733368604392,-2.58787145206721103,0.],[158.477320179044199,-1.27335356694676705,0.],[156.191589394058809,0.391676980445335,0.],[152.877875383762188,2.48962110124184,0.],[150.127481532982387,3.83574930735643882,0.],[147.86681980088639,5.58686911897140437,0.],[147.434273549102699,6.7156692325722851,0.],[148.497384270423396,7.99841195884981,0.],[150.478728924097197,8.17727027125431,0.],[153.451737899496692,8.80451042363999292,0.],[154.527473214150291,10.9616236103971492,0.],[153.772274966740298,13.9062039320744706,0.],[146.554259601081299,13.7245423401151392,0.],[147.97011814569629,15.7955806140714294,0.],[149.209195373649095,17.6290440909342685,0.],[145.462950780549,15.0288996887711903,0.],[145.436654074792614,17.4825295418615703,0.],[142.38537082239381,15.4602676986063194,0.],[142.129937422809604,10.9663992442775307,0.],[144.245575836471204,9.41783278514001,0.]];
tracks_MigrationData.dwarfMinkeWhale_3 = [[144.584618383452607,-44.989845319785708,0.],[145.458220029618786,-44.232251306692,0.],[148.0772371824728,-44.6141137424894,0.],[149.680201417123897,-44.1793459938028832,0.],[149.852670729408686,-41.7610540439621332,0.],[150.353942631570504,-39.916697891428413,0.],[151.4673578597247,-38.8434464995944921,0.],[151.458678940670893,-37.0586022379606632,0.],[151.667272855359414,-35.155897119787177,0.],[153.828737484858607,-31.0493307904239302,0.],[155.181543656483313,-29.1091858656759506,0.],[154.828895007892,-27.1209701470176903,0.],[153.314332802520198,-24.3902139190123286,0.],[151.222846567909386,-22.4957332869328,0.],[150.391887931116287,-21.505791631439,0.],[150.057133409277299,-20.8895910749300917,0.],[148.614336379732208,-19.4717259152162505,0.],[148.637595384155702,-18.3674716719379205,0.],[147.725688008318087,-17.3802554368041804,0.],[146.817828963094,-16.8578065565356709,0.],[146.274730934788607,-16.4206049178414695,0.],[145.785773334474413,-14.8974576936677394,0.],[145.227486028686087,-13.5176857528884,0.],[145.140728847378398,-12.2682567102798092,0.]];
tracks_MigrationData.greenTurtle_2 = [[129.732491822181,-11.8335010397101499,0.],[129.884860835748498,-11.4085245474314192,0.],[130.005535402465114,-11.1120157087975802,0.],[130.370470603357489,-10.9692195749173393,0.],[130.748055937028511,-11.1625710996891208,0.],[131.052261208178493,-11.2421170565550508,0.],[131.321745265828696,-11.1524678727782405,0.],[131.89881403870271,-11.0473122846588208,0.],[132.42042446972,-10.9211961592076499,0.],[132.691774100914,-10.8482364764485801,0.],[132.764999711151887,-11.1304346597800592,0.],[133.112427812526306,-11.2455561609685599,0.],[133.461184328738597,-11.3791954840368206,0.],[134.026817489807087,-11.5888369865359309,0.],[134.399588958143596,-11.8163360728026507,0.],[134.815702008007406,-11.8174206014031107,0.],[135.054323499786193,-11.9122937041545391,0.],[135.314176187846812,-11.9314556190757894,0.],[135.756580108660586,-11.7795600746010596,0.],[136.304039148790309,-11.3974209339540806,0.],[136.609215006744,-11.0875691394914497,0.],[136.931050925647412,-10.8011625465557,0.],[137.467398035492408,-10.9465206988694703,0.],[138.294091468423289,-11.0268932062344,0.],[139.319548816449696,-11.1036555300126594,0.],[139.9555912267314,-11.0685554804673796,0.],[140.837066944220794,-10.9142015818249192,0.],[141.352041981714507,-10.8772570909209101,0.],[141.732002521754509,-10.7268415628062499,0.],[142.09814452199,-10.4890490666315905,0.],[142.423882452670711,-10.4671850351503206,0.],[142.850356603253914,-10.6595977577431604,0.],[142.981370289291789,-10.8883899988774697,0.],[143.310062309193114,-11.3167930944134802,0.],[143.644827249353312,-11.7472096975582,0.],[144.105743905283305,-12.2956182953094508,0.],[144.309781387277695,-12.4397190382505496,0.]];
tracks_MigrationData.shearwater_1 = [[151.991930778699412,-23.7045787886273303,0.],[152.984995142745589,-23.2056606829618204,0.],[154.761750498977307,-23.2669972430602385,0.],[156.85922150137759,-23.459759038940561,0.],[157.979673692207314,-22.833292637875779,0.],[156.696818147866708,-22.5210778688432782,0.],[154.828092459679311,-22.4911443106052609,0.],[154.684207066308886,-21.9298842989992906,0.],[156.411276313099791,-20.6559107216352515,0.],[157.545082914235792,-17.297941723524,0.],[161.810782856433406,-15.4155714543840201,0.],[162.870796680548693,-13.8494406120701505,0.],[164.34795956268681,-12.0827792706095,0.],[166.704412120257,-10.1797270899844108,0.],[169.13831506936441,-5.58769562070636816,0.],[168.525860168894894,-4.16170044550163798,0.],[165.444484196992704,-3.84148482594556695,0.],[162.940311883741288,-1.92634027655542894,0.],[161.964662875581098,0.290885812412476519,0.],[161.385813047474301,2.30741606245598296,0.],[160.786893799529395,4.34241650482902308,0.],[159.542933682034601,5.7711344130788822,0.],[157.781050396525814,4.9375178646643274,0.],[155.373649910031,4.22912576579062183,0.],[154.905661304698214,6.3770405300491,0.],[156.107332986778289,7.46801896343412785,0.],[157.415597063882586,8.69047540154510401,0.],[157.841885179731293,9.85929918613528,0.],[159.682061419504208,9.09180873092832442,0.],[159.614549199070098,7.38854979183327121,0.]];
tracks_MigrationData.dwarfMinkeWhale_1 = [[125.415680150236497,-58.0664417891667668,0.],[125.669052028651606,-55.6295655615863467,0.],[127.267928376675,-53.5675269525945907,0.],[133.5113699846749,-50.4080620490514,0.],[138.109130367984307,-50.0554610120262,0.],[141.375690584489405,-47.8421547353259626,0.],[142.793047095993586,-45.3580684648359878,0.],[143.114609154728811,-42.3585849354004935,0.],[143.844343983514108,-40.9163820314601594,0.],[144.929056622845309,-39.997078444601307,0.],[146.136154841223203,-40.0563347434709272,0.],[148.63477947794189,-38.904007266421452,0.],[150.813273079104789,-38.6997901766379471,0.],[150.86075255299869,-36.9087133250309,0.],[151.75062019370489,-35.7012456135060532,0.],[152.454443776277913,-34.4347733975106394,0.],[153.289027396264913,-33.3098545641378578,0.],[154.041660623798407,-30.8084061238573206,0.],[154.229555900871702,-28.6753564023615084,0.],[154.154379081159192,-27.2744167012731715,0.],[154.206453123873189,-26.1457257963793,0.],[154.376758846564911,-24.9895668781623712,0.],[153.940600075206504,-24.3212444212907712,0.],[153.647240839469788,-23.1365663565342103,0.],[153.279744143952,-21.7377477961118402,0.],[152.838518849203211,-20.1052255608143504,0.],[151.422725920482094,-20.0620098024542912,0.],[148.724878880322706,-18.4199566855236689,0.],[146.347250112129103,-16.7776358628279603,0.],[145.789246789427892,-15.8338914191160391,0.],[145.720869978530288,-15.4349631664700198,0.],[145.645763732409705,-15.04734519997,0.],[145.564466049891394,-14.6765338572029798,0.],[145.23867779270239,-14.3804236477191694,0.],[144.425653107556798,-13.2042930600061492,0.],[144.064832500354299,-11.3972648486740091,0.],[144.165876957163505,-9.95185995648834698,0.]];
tracks_MigrationData.dwarfMinkeWhale_5 = [[137.063121045002305,-50.727892292368189,0.],[139.914940114613898,-46.2736865895161387,0.],[140.728104198863292,-41.9752734527603124,0.],[141.99073678516379,-41.1547301994286272,0.],[143.480901709942486,-40.5814484462643819,0.],[145.195022124285487,-39.8618819145410583,0.],[147.282001655985795,-40.0678425956480666,0.],[148.51229699028741,-39.3896633202577533,0.],[151.279550720608512,-39.2129786379351231,0.],[151.907394369109312,-36.5583371809250366,0.],[151.956683376827897,-35.6467012806899,0.],[152.990441933527194,-33.5468250549216265,0.],[153.827625238616889,-31.5128506198423111,0.],[155.003639146131803,-28.1511630605339498,0.],[154.563108826595908,-26.1026741664556603,0.],[153.616882567476807,-24.0759723378971309,0.],[153.598115400118502,-22.1228729434940199,0.],[152.252838654915308,-20.5117237515067288,0.],[151.240615627239691,-19.7161384514078293,0.],[148.581445057114308,-18.86352537222675,0.],[147.867054679067394,-18.479517579249471,0.],[147.256755687924198,-17.8505329139781104,0.],[146.886156883619492,-17.3471950887424917,0.]];
tracks_MigrationData.greenTurtle_3 = [[147.255067067974,-7.10480376225081,0.],[147.817799362159406,-7.74883928447798542,0.],[148.137002102531113,-7.95286323513372295,0.],[148.511548129379889,-8.36218393503879298,0.],[148.595671017484591,-8.69676666910820373,0.],[149.541698234044105,-8.86348962455771883,0.],[149.627779435042612,-9.30019814169234671,0.],[149.972395594525096,-9.55186885162772548,0.],[150.184440624841386,-9.70257344031898583,0.],[150.397040744687,-9.87889957989035494,0.],[150.873444778046093,-10.1528805574893504,0.],[151.350500657407,-10.4264104416855297,0.],[151.514594355401186,-10.7324096558978201,0.],[150.942052864468,-10.9511852875688103,0.],[149.969320599526611,-10.9189465146851,0.],[149.544601136054695,-10.6685169666063402,0.],[148.726232151200605,-10.5533592557421496,0.],[148.063249037860913,-10.3567270926820107,0.],[147.504515302527807,-10.1574051876014906,0.],[147.369961928221898,-9.95206136179908718,0.],[146.806257753709,-9.38857209499674106,0.],[146.294956451045294,-8.95203271432815662,0.],[146.237535996510587,-8.56321894045275478,0.],[145.916588133387393,-8.61670365444870434,0.],[145.542249203575807,-8.8781513408543109,0.],[144.949727068939211,-9.55727854211316874,0.],[144.731088859485197,-10.3667353419538504,0.],[144.561552089417688,-11.1783131056392,0.],[144.439664570483814,-12.1242153575132097,0.],[144.29698720722169,-12.3631122646634601,0.]];
tracks_MigrationData.shearwater_3 = [[151.806833787094206,-23.1823438598933116,0.],[155.421732732419,-21.9951091872397093,0.],[155.773934123835,-19.1325660992394688,0.],[156.485506069401509,-18.2495591367329801,0.],[159.0148781680561,-15.9132226848593898,0.],[160.693108680266903,-13.6782958759659099,0.],[161.971415883320503,-10.4200632290521,0.],[167.731299189619591,-10.5538870157889,0.],[168.330512626721486,-6.03556508660075508,0.],[167.824646380585506,-3.29060514366311496,0.],[161.698158384233608,-2.54260314612607718,0.],[159.655681868546395,-0.075758516936771228,0.],[159.394490856816191,3.08952788826764602,0.],[159.318607021335509,5.62565333110521859,0.],[159.003930028483893,8.954591274604,0.],[156.240508895669308,8.98834535602380313,0.],[153.939896908539112,7.45562829201583632,0.],[151.266485938705898,7.88570847208794,0.],[149.319507649811499,11.3665987830248199,0.],[147.998515016727197,12.8123080189090395,0.],[146.161616439028109,14.0873586884193696,0.],[143.42260549520941,14.1947875649229207,0.],[144.361113303007,16.2045515161829208,0.],[153.490678149765188,16.7611133574226585,0.],[152.417352978980688,12.4180247463035194,0.],[153.919479221061096,9.0573453100376522,0.],[157.581075695908,7.33973320983169941,0.]];
tracks_MigrationData.shearwater_8 = [[153.046776071766,-22.7832780372016686,0.],[155.995803408010488,-20.0011860585151098,0.],[155.034398652703089,-19.3565487105081,0.],[154.770010372274498,-13.0923553786005602,0.],[155.854390155847796,-11.3217754850990495,0.],[158.024837150242291,-6.59516006705031277,0.],[156.980427734322291,-3.31149071031548381,0.],[157.063881889449902,0.884410051727548385,0.],[157.379881944354111,4.51691576401567474,0.],[159.031073687560706,6.74433012982478886,0.],[157.646241491383307,8.23451251973949105,0.],[154.791972340586511,6.67867773671917586,0.],[152.882165141485899,6.15403818929916557,0.],[153.203645340299403,8.17508063557599,0.],[153.093479377572407,8.17189427186502293,0.],[151.009470674095297,10.5915777311313395,0.],[148.104108282975602,11.0543175538409493,0.],[147.071274922801194,13.4096030081534892,0.],[151.500875901168797,15.3931013431544201,0.],[151.423187612605091,13.1069629512891499,0.],[153.163246122443,12.6492469080117296,0.],[153.608356369692586,10.4567611617560292,0.]];
tracks_MigrationData.greenTurtle_6 = [[168.780715118051404,-16.6309536205564683,0.],[168.838947152460605,-17.2090013517502,0.],[168.34166429653709,-17.3150076429304391,0.],[167.555081985346902,-17.222707188336539,0.],[166.940544438201,-16.81018107661275,0.],[166.598827096402403,-16.3040997767330182,0.],[166.337840278,-15.8893851652414693,0.],[166.093135359253608,-15.2852160728512594,0.],[165.555646447534087,-14.7100770265571494,0.],[163.755934230577196,-13.6081072570534403,0.],[161.969095521506603,-13.4560012994605493,0.],[160.732851537184899,-12.7867257093252302,0.],[160.037990514619,-12.5747660098315102,0.],[158.884351928887696,-12.5062591698293,0.],[156.729327011242589,-12.4196656293857206,0.],[155.734145311776302,-12.7355755630977701,0.],[154.674784941134703,-14.2300972134543695,0.],[153.701442520930414,-16.2584420538098513,0.],[151.758736535964,-16.8415672379713897,0.],[150.264511365194807,-16.5405607310781591,0.],[149.819240667070886,-15.1676214633818507,0.],[149.444511014340094,-14.1320705194649,0.],[149.011303782038794,-13.0328390802028107,0.],[148.604694232852296,-11.81626940908418,0.],[148.079702593407205,-11.2916790157271496,0.],[147.209962030686796,-10.8761309000237301,0.],[146.276459161528408,-10.5575465401309305,0.],[145.55272829197591,-10.6795159529483605,0.],[144.868803380563605,-11.12795436664085,0.],[144.682863463097192,-11.9712647334644799,0.],[144.651577003150493,-12.6672699626304492,0.]];
tracks_MigrationData.shearwater_4 = [[153.216808881625695,-23.1583706640607296,0.],[154.469929768897799,-21.038799350822309,0.],[154.390510828077396,-18.6748864418291483,0.],[155.290948044506592,-17.717554042745121,0.],[158.862602831754288,-17.3801989311153484,0.],[160.878417464400712,-14.6914722609902295,0.],[162.654965151198411,-8.10953449410549609,0.],[164.983735407959301,-6.22789024816654102,0.],[164.801975306398703,-3.40570710612507588,0.],[164.4950220152962,-1.28653879989626,0.],[159.531561538982203,-1.49103998830141204,0.],[155.96328998051041,1.42428003074259402,0.],[155.907744537700296,4.66452707814630685,0.],[153.067437919073313,5.31127101840588711,0.],[150.198106088865813,6.17416588798147092,0.],[146.867487088729291,6.76395315541363917,0.],[146.483492254483508,9.02091575153401593,0.],[148.019230719420904,12.1983308368771102,0.],[149.962534768094713,12.8682770087381,0.],[153.072886832783098,13.0529227241277308,0.],[152.652847664419312,16.1362418411806701,0.],[146.838226416221801,14.7327981316282592,0.],[144.213373657757813,14.4205109706700902,0.],[142.517261126516786,13.1521813398876493,0.],[142.650873592767198,11.5051584827607893,0.],[142.128642513441,8.74745291638898692,0.]];
tracks_MigrationData.shearwater_2 = [[151.785847972866804,-23.1751878427969515,0.],[153.275736177333499,-22.1192703198504397,0.],[153.331377561708393,-24.0413135154234503,0.],[155.393929834463307,-24.8259472347392212,0.],[154.623625949266795,-20.8970234440328717,0.],[154.695828924377309,-18.7695063465697,0.],[156.173172897967504,-17.313494887540319,0.],[157.505427016274894,-15.3111974537870097,0.],[158.720196331650612,-11.5224491007338798,0.],[159.367093712968909,-7.32108457445501859,0.],[159.967565266593908,-5.1210745741920638,0.],[160.156009951890894,-2.39668911073216417,0.],[157.661250312904514,0.991113819483705916,0.],[153.256966559963786,2.55307258435276196,0.],[150.441613398992587,4.86617486816281541,0.],[149.783118959964099,7.08073380044393286,0.],[148.935461500194407,9.82604341594603703,0.],[149.623779524023291,12.7851919149076494,0.],[151.244408422624588,13.9858342702637106,0.],[146.493370093092693,16.0248260833139291,0.],[144.833387004584296,15.0050265065096,0.],[143.816955488776301,13.8999180637604791,0.],[143.668870928684896,10.8292318173025297,0.],[144.929233458877093,12.4066304584958402,0.],[145.627829909266609,10.8790275278404298,0.],[145.972530215188,13.0828611888019797,0.],[156.802880433338402,10.0887153406440504,0.],[158.551221857111813,5.72044114604816123,0.],[155.808423188345813,6.19956497111531668,0.]];
tracks_MigrationData.allPaths = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = tracks_MigrationData.greenTurtle_1;
		if(__map_reserved.greenTurtle_1 != null) _g.setReserved("greenTurtle_1",value); else _g.h["greenTurtle_1"] = value;
	}
	{
		var value1 = tracks_MigrationData.shearwater_6;
		if(__map_reserved.shearwater_6 != null) _g.setReserved("shearwater_6",value1); else _g.h["shearwater_6"] = value1;
	}
	{
		var value2 = tracks_MigrationData.greenTurtle_4;
		if(__map_reserved.greenTurtle_4 != null) _g.setReserved("greenTurtle_4",value2); else _g.h["greenTurtle_4"] = value2;
	}
	{
		var value3 = tracks_MigrationData.shearwater_7;
		if(__map_reserved.shearwater_7 != null) _g.setReserved("shearwater_7",value3); else _g.h["shearwater_7"] = value3;
	}
	{
		var value4 = tracks_MigrationData.shearwater_9;
		if(__map_reserved.shearwater_9 != null) _g.setReserved("shearwater_9",value4); else _g.h["shearwater_9"] = value4;
	}
	{
		var value5 = tracks_MigrationData.dwarfMinkeWhale_4;
		if(__map_reserved.dwarfMinkeWhale_4 != null) _g.setReserved("dwarfMinkeWhale_4",value5); else _g.h["dwarfMinkeWhale_4"] = value5;
	}
	{
		var value6 = tracks_MigrationData.greenTurtle_7;
		if(__map_reserved.greenTurtle_7 != null) _g.setReserved("greenTurtle_7",value6); else _g.h["greenTurtle_7"] = value6;
	}
	{
		var value7 = tracks_MigrationData.dwarfMinkeWhale_2;
		if(__map_reserved.dwarfMinkeWhale_2 != null) _g.setReserved("dwarfMinkeWhale_2",value7); else _g.h["dwarfMinkeWhale_2"] = value7;
	}
	{
		var value8 = tracks_MigrationData.greenTurtle_5;
		if(__map_reserved.greenTurtle_5 != null) _g.setReserved("greenTurtle_5",value8); else _g.h["greenTurtle_5"] = value8;
	}
	{
		var value9 = tracks_MigrationData.shearwater_5;
		if(__map_reserved.shearwater_5 != null) _g.setReserved("shearwater_5",value9); else _g.h["shearwater_5"] = value9;
	}
	{
		var value10 = tracks_MigrationData.dwarfMinkeWhale_3;
		if(__map_reserved.dwarfMinkeWhale_3 != null) _g.setReserved("dwarfMinkeWhale_3",value10); else _g.h["dwarfMinkeWhale_3"] = value10;
	}
	{
		var value11 = tracks_MigrationData.greenTurtle_2;
		if(__map_reserved.greenTurtle_2 != null) _g.setReserved("greenTurtle_2",value11); else _g.h["greenTurtle_2"] = value11;
	}
	{
		var value12 = tracks_MigrationData.shearwater_1;
		if(__map_reserved.shearwater_1 != null) _g.setReserved("shearwater_1",value12); else _g.h["shearwater_1"] = value12;
	}
	{
		var value13 = tracks_MigrationData.dwarfMinkeWhale_1;
		if(__map_reserved.dwarfMinkeWhale_1 != null) _g.setReserved("dwarfMinkeWhale_1",value13); else _g.h["dwarfMinkeWhale_1"] = value13;
	}
	{
		var value14 = tracks_MigrationData.dwarfMinkeWhale_5;
		if(__map_reserved.dwarfMinkeWhale_5 != null) _g.setReserved("dwarfMinkeWhale_5",value14); else _g.h["dwarfMinkeWhale_5"] = value14;
	}
	{
		var value15 = tracks_MigrationData.greenTurtle_3;
		if(__map_reserved.greenTurtle_3 != null) _g.setReserved("greenTurtle_3",value15); else _g.h["greenTurtle_3"] = value15;
	}
	{
		var value16 = tracks_MigrationData.shearwater_3;
		if(__map_reserved.shearwater_3 != null) _g.setReserved("shearwater_3",value16); else _g.h["shearwater_3"] = value16;
	}
	{
		var value17 = tracks_MigrationData.shearwater_8;
		if(__map_reserved.shearwater_8 != null) _g.setReserved("shearwater_8",value17); else _g.h["shearwater_8"] = value17;
	}
	{
		var value18 = tracks_MigrationData.greenTurtle_6;
		if(__map_reserved.greenTurtle_6 != null) _g.setReserved("greenTurtle_6",value18); else _g.h["greenTurtle_6"] = value18;
	}
	{
		var value19 = tracks_MigrationData.shearwater_4;
		if(__map_reserved.shearwater_4 != null) _g.setReserved("shearwater_4",value19); else _g.h["shearwater_4"] = value19;
	}
	{
		var value20 = tracks_MigrationData.shearwater_2;
		if(__map_reserved.shearwater_2 != null) _g.setReserved("shearwater_2",value20); else _g.h["shearwater_2"] = value20;
	}
	$r = _g;
	return $r;
}(this));
Main.main();
})(typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
