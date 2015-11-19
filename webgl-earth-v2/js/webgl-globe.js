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
	var testPlaneMat = new THREE.MeshBasicMaterial({ map : Debug.debugTex, color : 16777215, wireframe : false, visible : false});
	Debug.testPlane = new THREE.Mesh(new THREE.PlaneBufferGeometry(1,1,1,1),testPlaneMat);
	Debug.testPlane.scale.x = 1.0;
	Debug.testPlane.scale.y = 1.0;
	Debug.testPlane.position.x = -1 + Debug.testPlane.scale.x * .5;
	Debug.testPlane.position.y = -1 + Debug.testPlane.scale.y * .5;
	Debug.scene2d.add(Debug.testPlane);
	var tmp;
	var _this = window.document;
	tmp = _this.createElement("script");
	var scriptEl = tmp;
	scriptEl.src = "lib/dat.gui/dat.gui.js";
	scriptEl.onload = Debug.setupDatGUI;
	window.document.body.appendChild(scriptEl);
};
Debug.setupDatGUI = function() {
	var gui = new dat.GUI();
	gui.add(Debug.m.camera,"fov").min(1).max(180).name("FOV").onChange(function(x) {
		Debug.m.camera.updateProjectionMatrix();
	});
	gui.add(Debug.m,"sunSpringEnabled");
	gui.add(Debug.m,"sunSpringK").min(0).max(20);
	gui.add(Debug.m,"sunSpringDamp").min(0).max(1);
	gui.add(Debug.testPlane.material,"visible").name("Test Plane");
	gui.add(Debug.m.globe.atmosphere,"visible").name("Atmosphere");
	gui.add(Debug.m.globe.earthMesh.material,"shininess").onChange(function(s) {
		(js_Boot.__cast(Debug.m.globe.earthMesh.material , objects_globe_GlobeMaterial)).set_shininess(s);
	}).name("Shininess");
	gui.add(Debug.m.globe.sun,"intensity").name("Intensity");
	gui.add(Debug.m.globe.earthMesh.material.uniforms.overlayOpacity,"value").min(0).max(1).name("Wind Overlay");
	var li = 1;
	gui.add({ f : function() {
		Debug.m.setChapter(li++ % Debug.m.currentTrack.chapterCount);
	}},"f").name("Next Chapter");
};
Debug.update = function(t_ms) {
};
Debug.render = function(t_ms) {
	Debug.m.renderer.render(Debug.scene2d,Debug.camera2d);
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
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
	var $it0 = tracks__$AnimalOdysseys_MigrationData.allPaths.keys();
	while( $it0.hasNext() ) {
		var name = $it0.next();
		var tmp;
		var _this = tracks__$AnimalOdysseys_MigrationData.allPaths;
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
			_g1.push(new math__$GeoCoord_CGeoCoord(a[0],a[1],a[2]));
		}
		tmp2 = _g1;
		var path = new objects_migrationpath_MigrationPath(state.globe,tmp2,color,0.01);
		this.migrationPaths.push(path);
		state.globe.earthMesh.add(path);
	}
	this.chapters = [{ init : $bind(this,this.chapter0Init), cleanup : $bind(this,this.chapter0Cleanup)},{ init : $bind(this,this.chapter1Init), cleanup : $bind(this,this.chapter1Cleanup)}];
	this.chapterCount = 2;
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
	}
	,chapter0Cleanup: function() {
		console.log("AO cleanup 0");
	}
	,chapter1Init: function() {
		console.log("AO chapter 1");
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
	,chapter1Cleanup: function() {
		console.log("AO cleanup 1");
	}
	,__class__: tracks_AnimalOdysseys
});
var Main = $hx_exports.Globe = function(container,assetRoot) {
	if(assetRoot == null) assetRoot = "assets";
	this.sunAngularVelocity = 0;
	this.lastFrame_ms = -1;
	this.sunSpringDamp = 0.05;
	this.sunSpringK = 0.8;
	this.sunSpringEnabled = false;
	console.log("WebGL Globe Boot");
	if(container == null) container = window.document.body;
	this.container = container;
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
	this.globe = new objects_globe_Globe(1.0,assetRoot);
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
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
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
var math__$GeoCoord_GeoCoord_$Impl_$ = {};
math__$GeoCoord_GeoCoord_$Impl_$.__name__ = true;
math__$GeoCoord_GeoCoord_$Impl_$._new = function(latitudeNorth,longitudeWest,altitude) {
	if(altitude == null) altitude = 0;
	if(longitudeWest == null) longitudeWest = 0;
	if(latitudeNorth == null) latitudeNorth = 0;
	return new math__$GeoCoord_CGeoCoord(latitudeNorth,longitudeWest,altitude);
};
math__$GeoCoord_GeoCoord_$Impl_$.toArray = function(this1) {
	return [this1.lat,this1["long"],this1.alt];
};
math__$GeoCoord_GeoCoord_$Impl_$.fromArray = function(arr) {
	return new math__$GeoCoord_CGeoCoord(arr[0],arr[1],arr[2]);
};
var math__$GeoCoord_CGeoCoord = function(latitudeNorth,longitudeWest,altitude) {
	if(altitude == null) altitude = 0;
	if(longitudeWest == null) longitudeWest = 0;
	if(latitudeNorth == null) latitudeNorth = 0;
	this.lat = latitudeNorth;
	this["long"] = longitudeWest;
	this.alt = altitude;
};
math__$GeoCoord_CGeoCoord.__name__ = true;
math__$GeoCoord_CGeoCoord.prototype = {
	clone: function() {
		return new math__$GeoCoord_CGeoCoord(this.lat,this["long"],this.alt);
	}
	,__class__: math__$GeoCoord_CGeoCoord
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
var objects_globe_Globe = function(radius,assetRoot) {
	this.sunDistance = 2.0;
	this.atmospherePad = 0.005;
	this.atmosphereHeight = 0.05;
	this.atmosphereEnabled = true;
	this.tilt = 23.4;
	this.radius = radius;
	THREE.Object3D.call(this);
	var colorTex = THREE.ImageUtils.loadTexture("" + assetRoot + "/earth/color-1_high.jpg");
	var normalTex = THREE.ImageUtils.loadTexture("" + assetRoot + "/earth/normal-1_high.jpg");
	var specTex = THREE.ImageUtils.loadTexture("" + assetRoot + "/earth/specular-1_low.png");
	var overlayTex = THREE.ImageUtils.loadTexture("" + assetRoot + "/climate-data/wind-surface-0.25-v2.png");
	colorTex.anisotropy = 4;
	this.earthContainer = new THREE.Object3D();
	this.earthContainer.rotateZ(-THREE.Math.degToRad(this.tilt));
	this.add(this.earthContainer);
	var earthGeom = new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(radius,80,80));
	var globeMat = new objects_globe_GlobeMaterial({ map : colorTex, normalMap : normalTex, normalScale : new THREE.Vector3(1.0,1.0,1.0), specularMap : specTex, specular : new THREE.Color(3355443), shininess : 12, wireframe : false});
	globeMat.uniforms.overlay = { type : "t", value : overlayTex};
	globeMat.uniforms.overlayOpacity = { type : "f", value : 0.5};
	this.earthMesh = new THREE.Mesh(earthGeom,globeMat);
	this.earthContainer.add(this.earthMesh);
	if(this.atmosphereEnabled) {
		this.atmosphere = new objects_globe_Atmosphere(radius * (1 + this.atmospherePad),radius * (this.atmosphereHeight + 1));
		this.earthContainer.add(this.atmosphere);
	}
	this.sun = new THREE.DirectionalLight(16774642,1.0);
	this.sun.position.set(0,0,radius * 2);
	this.sun.target.position.set(0,0,0);
	this.add(this.sun);
	this.earthMesh.rotation.y = 0;
	if(this.atmosphereEnabled) this.atmosphere.rotation.y = 0;
	this.sun.position.set(Math.sin(0) * this.sunDistance,0,Math.cos(0) * this.sunDistance);
};
objects_globe_Globe.__name__ = true;
objects_globe_Globe.__super__ = THREE.Object3D;
objects_globe_Globe.prototype = $extend(THREE.Object3D.prototype,{
	geoToWorld: function(c,v) {
		var local = this.geoToLocal(c,v);
		return this.earthMesh.localToWorld(local);
	}
	,geoToLocal: function(c,v) {
		if(v == null) v = new THREE.Vector3();
		var latRad = THREE.Math.degToRad(c.lat);
		var longRad = THREE.Math.degToRad(c["long"]);
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
		if(c == null) c = new math__$GeoCoord_CGeoCoord(0,0,0);
		var r = p.length();
		c.alt = r * this.radius - this.radius;
		c.lat = THREE.Math.radToDeg(Math.asin(p.y / r));
		c["long"] = THREE.Math.radToDeg(Math.atan2(p.z,p.x));
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
var tracks__$AnimalOdysseys_MigrationData = function() { };
tracks__$AnimalOdysseys_MigrationData.__name__ = true;
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
objects_globe_Globe.earthSegments = 80;
objects_globe_GlobeMaterial.vertexShaderStr = "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n\n//ShaderChunk.common\n" + THREE.ShaderChunk.common + "\n//ShaderChunk.map_pars_vertex\n" + THREE.ShaderChunk.map_pars_vertex + "\n\nvoid main() {\n\n\t//ShaderChunk.map_vertex\n\t" + THREE.ShaderChunk.map_vertex + "\n\n\t//ShaderChunk.defaultnormal_vertex\n\t" + THREE.ShaderChunk.defaultnormal_vertex + "\n\n\t#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\n\t//ShaderChunk.default_vertex\n\t" + THREE.ShaderChunk.default_vertex + "\n\n\tvViewPosition = -mvPosition.xyz;\n\n}";
objects_globe_GlobeMaterial.fragmentShaderStr = "#define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\nuniform sampler2D overlay;\nuniform float overlayOpacity;\n\n//ShaderChunk.common\n" + THREE.ShaderChunk.common + "\n//ShaderChunk.map_pars_fragment\n" + THREE.ShaderChunk.map_pars_fragment + "\n//ShaderChunk.alphamap_pars_fragment\n" + THREE.ShaderChunk.alphamap_pars_fragment + "\n//ShaderChunk.lights_phong_pars_fragment\n" + THREE.ShaderChunk.lights_phong_pars_fragment + "\n//ShaderChunk.bumpmap_pars_fragment\n" + THREE.ShaderChunk.bumpmap_pars_fragment + "\n//ShaderChunk.normalmap_pars_fragment\n" + THREE.ShaderChunk.normalmap_pars_fragment + "\n//ShaderChunk.specularmap_pars_fragment\n" + THREE.ShaderChunk.specularmap_pars_fragment + "\n\nvoid main() {\n\n\tvec3 outgoingLight = vec3( 0.0 );\t// outgoing light does not have an alpha, the surface does\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t//ShaderChunk.map_fragment\n\t" + THREE.ShaderChunk.map_fragment + "\n\t//ShaderChunk.alphamap_fragment\n\t" + THREE.ShaderChunk.alphamap_fragment + "\n\t//ShaderChunk.alphatest_fragment\n\t" + THREE.ShaderChunk.alphatest_fragment + "\n\t//ShaderChunk.specularmap_fragment\n\t" + THREE.ShaderChunk.specularmap_fragment + "\n\n\t//ShaderChunk.lights_phong_fragment\n\t#ifndef FLAT_SHADED\n\t\tvec3 normal = normalize( vNormal );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\t\t#endif\n\t#else\n\t\tvec3 fdx = dFdx( vViewPosition );\n\t\tvec3 fdy = dFdy( vViewPosition );\n\t\tvec3 normal = normalize( cross( fdx, fdy ) );\n\t#endif\n\n\tvec3 viewPosition = normalize( vViewPosition );\n\n\t#ifdef USE_NORMALMAP\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\t#elif defined( USE_BUMPMAP )\n\t\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\t#endif\n\n\tvec3 totalDiffuseLight = vec3( 0.0 );\n\tvec3 totalSpecularLight = vec3( 0.0 );\n\n\t#if MAX_DIR_LIGHTS > 0\n\t \tfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\t \n\t \t\tvec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\t \n\t \t\t// diffuse\n\t \t\tfloat dotProduct = dot( normal, dirVector );\n\n\n\t \t\t//@! phong backside hack\n\t \t\t#define WRAP_AROUND\n\t \t\tvec3 wrapRGB = vec3(1.0, 125./255., 18./255.);\n\t \t\tfloat backsideAmbience = 0.04;\n\t \n\t \t\t#ifdef WRAP_AROUND\n\t \t\t\t//@! doubled dot products\n\t \t\t\tfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\n\t \t\t\tfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\t \t\t\tvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), clamp(wrapRGB*0.4 + dotProduct*1.2, 0., 1.) ) + wrapRGB * backsideAmbience;\n\t \t\t#else\n\t \t\t\tfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n\t \t\t#endif\n\t \n\t \t\ttotalDiffuseLight += directionalLightColor[ i ] * dirDiffuseWeight;\n\t \n\t \t\t// specular\n\t \t\tvec3 dirHalfVector = normalize( dirVector + viewPosition );\n\t \t\tfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n\t \t\tfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\t \n\t \t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t \t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n\t \t\ttotalSpecularLight += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\t \t}\n\t#endif\n\n\tvec4 overlayColor = texture2D(overlay, vUv);\n\n\toutgoingLight += mix(diffuseColor.rgb, overlayColor.rgb, overlayOpacity) * ( totalDiffuseLight + ambientLightColor ) + totalSpecularLight + emissive;\n\n\t//ShaderChunk.linear_to_gamma_fragment\n\t" + THREE.ShaderChunk.linear_to_gamma_fragment + "\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\t// TODO, this should be pre-multiplied to allow for bright highlights on very transparent objects\n\n}";
objects_migrationpath_MigrationPathMaterial.vertexShaderStr = "varying vec2 vUv;\nvarying vec2 vNUv;\n\n\nvoid main() {\n\tvUv = uv;\n\tvNUv = uv2;\n\t//ShaderChunk.default_vertex\n\t" + THREE.ShaderChunk.default_vertex + "\n}";
objects_migrationpath_MigrationPathMaterial.fragmentShaderStr = "uniform float progress;\nuniform float scale;\nuniform vec3 color;\n\nvarying vec2 vUv;\nvarying vec2 vNUv;\n\nvoid main() {\n\t\n\tconst float end = 0.988;\n\tconst float stepMax = 0.6;\n\n\tfloat a = smoothstep(0., stepMax, vNUv.y);\n\tfloat b = smoothstep(0., stepMax, 1. - vNUv.y);\n    float c = smoothstep(1.0, end, vNUv.x) * smoothstep(0., 1. - end, vNUv.x);//special, can ignore for now\n\n    float ab = a*b;\n\n\tfloat u = vUv.x*scale - (progress*(scale) - 1.);\n\tfloat nu = vNUv.x*scale - (progress*(scale) - 1.);\n\n    float f = smoothstep(1.0, end, nu);\n\n\tfloat i = clamp(ab * c * f * nu * nu, 0., 1.);\n\n\tvec3 col = color;\n\t//increase intensity toward the middle\n\tconst float darkenFactor = 0.5;\n\tcol *= nu * darkenFactor + (1. - darkenFactor);//darken towards end\n\n\tcol += vec3(1.0)*i * nu * nu * nu * ab * ab * ab * ab;\n\t\n\tgl_FragColor = vec4(col, i);\n\t//premultiply alpha\n\tgl_FragColor.rgb *= gl_FragColor.a;\n}";
tracks__$AnimalOdysseys_MigrationData.greenTurtle_1 = [[-3.77551720427859117,-128.223742109622492,0.],[-3.96764015118173585,-128.942566361455704,0.],[-3.80865725068304517,-130.203537122806409,0.],[-4.18509034537972457,-130.894335365741512,0.],[-5.00179621141511088,-131.840491974361299,0.],[-4.65140191090676,-133.373085421994602,0.],[-4.35214488713413061,-134.321730388360692,0.],[-4.84941237952222526,-136.121615377530588,0.],[-5.7067545291306061,-137.892864310688793,0.],[-6.95413833305809437,-138.133890862377712,0.],[-8.39870484063325407,-137.1670458351349,0.],[-8.68751709648837434,-137.685337300817508,0.],[-8.73999348067523663,-139.064923512616588,0.],[-8.52159789195962603,-139.761772247802611,0.],[-9.21989486544554104,-140.719948227595694,0.],[-9.61734775265083464,-141.412490052927211,0.],[-9.59537273528240675,-142.043479489131414,0.],[-9.5934179255737444,-142.68388313242761,0.],[-9.59972852654614,-143.083063574397,0.],[-9.91203083736769486,-143.665696828373,0.],[-10.1197844674642408,-144.077436461805405,0.],[-10.8817074104718898,-144.140741195214,0.],[-11.8910266028715199,-144.168084419165609,0.],[-12.4254955036709909,-144.344545008000495,0.]];
tracks__$AnimalOdysseys_MigrationData.shearwater_6 = [[-23.7797221152731417,-152.184940059344797,0.],[-21.3251537000646,-152.79048146222911,0.],[-20.1162798391596311,-153.253587411839,0.],[-19.5663260349373296,-153.413437443270396,0.],[-17.6295680834658697,-152.552020625849906,0.],[-17.4820101502993204,-154.017103430970593,0.],[-15.1840305180596,-156.002487332836893,0.],[-16.1693975622160906,-159.118178710197213,0.],[-14.1105309356667892,-161.655719240839602,0.],[-11.1987349517236208,-161.096799167363201,0.],[-7.9378052833499062,-161.262921373864,0.],[-6.45096554330528438,-160.3539582609,0.],[-4.74549737934446902,-163.376290131206588,0.],[-2.47733367686286687,-163.897104855531296,0.],[0.121939925470569796,-163.927810967225895,0.],[3.50562595386516218,-162.278133306834093,0.],[8.32369679733179879,-163.551540860581611,0.],[6.05799239986102478,-156.713435339999904,0.],[9.05124498391147903,-153.179421995300288,0.],[12.2021437628735594,-150.792702923505487,0.],[13.8822544452015801,-148.254057772837911,0.],[14.5635220813568207,-145.930829868803613,0.],[16.5993343486485792,-145.272797782494592,0.],[16.8090479605936,-143.577737935277,0.],[14.6270112174212699,-142.122372007503714,0.],[12.1507490866745496,-144.62612901823681,0.],[12.2572211214310407,-147.529979056109113,0.],[10.5821789602452707,-146.755127781772302,0.],[6.97351894050421528,-145.969337145050787,0.],[6.17053041903239308,-144.3930840872776,0.],[7.82426851463186,-144.3865223137702,0.],[8.78319363741127823,-142.41837030444529,0.],[9.59664897387753868,-141.061080134768304,0.],[10.5139223481632804,-140.692064887579789,0.],[10.9587145639307497,-142.500349442506604,0.],[14.3379613209709493,-146.966110389732705,0.]];
tracks__$AnimalOdysseys_MigrationData.greenTurtle_4 = [[-16.5083917851314794,-167.317514265076795,0.],[-16.0760562200316315,-166.544657200169496,0.],[-15.4147014072360893,-166.190449351759696,0.],[-14.8498339204080896,-166.126823992140203,0.],[-14.1197769382726097,-165.894407923475711,0.],[-13.1467915362352397,-165.684475105760811,0.],[-12.5192412978801606,-165.628221407271695,0.],[-11.9439717721211593,-165.313891440739496,0.],[-11.3079651599581794,-164.88772468014929,0.],[-11.0708299915886101,-164.23576768195,0.],[-11.2994289608601797,-162.74232940524891,0.],[-12.1615699695221195,-160.80969319907129,0.],[-12.3077983823291195,-159.180503347048301,0.],[-12.3071768688812799,-156.753965412619,0.],[-11.8653551111677302,-155.793110397752088,0.],[-11.3037062200279195,-155.284766532800887,0.],[-11.1557077776411102,-154.619183952712689,0.],[-10.9019017091898895,-154.020192049970291,0.],[-10.9923984949228402,-153.258084277826,0.],[-11.1401359445485,-152.844362589276898,0.],[-11.3538346533607299,-152.501231232555597,0.],[-11.3159890356673305,-151.20435586508,0.],[-11.1249050605586106,-150.496266780689297,0.],[-10.8979070577029908,-149.749438369001808,0.],[-10.5668743264396792,-148.854586819265307,0.],[-10.3695965595862098,-147.883605311262897,0.],[-10.3743682502035899,-147.051441047714405,0.],[-10.4113301799376892,-145.990171551713,0.],[-10.75792175858283,-145.139211543321693,0.],[-11.4532663855006795,-144.915972071740413,0.],[-12.7779490053603304,-144.529260148552595,0.]];
tracks__$AnimalOdysseys_MigrationData.shearwater_7 = [[-23.7016139992184307,-152.533119698307701,0.],[-19.7685606230404609,-153.231085822343914,0.],[-19.713931912732761,-154.225214799202888,0.],[-14.2585971537047893,-155.838698063971,0.],[-12.7300668932492904,-157.083387752118,0.],[-10.6666156767133895,-158.164534257401613,0.],[-6.85965122554175188,-159.907927672883204,0.],[-4.83856182080306141,-159.688149150645103,0.],[-2.55198390006183518,-155.769239679456604,0.],[0.921192561629854856,-151.861890176646398,0.],[3.25418725643528584,-148.997447571406809,0.],[5.410589546910475,-146.214919866298402,0.],[6.95699843611677782,-146.429635757607798,0.],[8.93596532873342,-146.753245563629,0.],[10.3021727069055302,-146.626105086176892,0.],[9.58987678386832,-144.733745264466,0.],[10.8741120829925304,-143.990975704793414,0.],[12.0033888029004103,-143.768405785953689,0.],[13.3068275455170095,-144.134060936585712,0.],[13.11713343136182,-147.75456886183,0.],[12.6461237055719398,-150.051978417576095,0.],[9.51626010447898,-149.237956909647806,0.],[10.9743873837362393,-151.458351557901295,0.],[12.6265551233027207,-151.296062265614211,0.],[15.0436331673449697,-148.301790894355491,0.],[15.6922206539183193,-145.461386884059806,0.],[14.3401906423329208,-143.623773740852101,0.]];
tracks__$AnimalOdysseys_MigrationData.shearwater_9 = [[-24.9947121042938711,-156.213907954399701,0.],[-23.129448496514339,-155.286136444241407,0.],[-20.3110583123277593,-159.593195621531294,0.],[-18.3176724512260698,-163.001174669588693,0.],[-16.4745180174203796,-163.169235106354392,0.],[-12.7161163076641,-166.814112318593686,0.],[-11.0577312323810499,-168.608599521762187,0.],[-10.2948018507042391,-173.262708761261905,0.],[-5.99812546416070091,-175.681108397581312,0.],[-2.70284181514249688,-172.079587260142802,0.],[4.32146579282939136,-169.928729475597606,0.],[3.57570860832802495,-166.887429441101602,0.],[6.74606875152880114,-164.805550510610914,0.],[9.0400519602006657,-164.189971170636511,0.],[13.1614284673734598,-161.643860424078412,0.],[17.5058357371653486,-160.284530394912309,0.],[15.5674264331480394,-165.105081094675313,0.],[11.5229759456097707,-161.062235147590712,0.],[12.1096174867611399,-159.358894167692114,0.],[14.0365374041787891,-156.492604005142709,0.],[11.8698673696616304,-156.602108805811611,0.],[9.75450735381166467,-154.606325316929087,0.],[9.21673654863361591,-152.599155138320896,0.],[11.4315800849220093,-152.62209075119469,0.],[13.0005465087510093,-150.484714332370686,0.],[12.1946937180357704,-148.849790792894,0.],[9.92461177772744,-147.690567364847794,0.]];
tracks__$AnimalOdysseys_MigrationData.dwarfMinkeWhale_4 = [[-44.0626229380649406,-149.1006568197202,0.],[-44.9099485239582918,-147.540234437403086,0.],[-43.6613653108648165,-143.4484221780057,0.],[-42.5818120936625633,-142.764002454608686,0.],[-41.1770701417871479,-142.867702122729895,0.],[-40.371677192337458,-144.156940667952398,0.],[-39.6155394759578314,-145.073449595028904,0.],[-40.1692910682426216,-146.042402501438204,0.],[-40.09160791213273,-147.116135871493697,0.],[-39.3201064650034624,-147.899191495292,0.],[-38.7128257108372225,-148.401920326506314,0.],[-37.4715499891738,-151.668820551042813,0.],[-34.6748129563777923,-152.562769753172489,0.],[-33.2570453328623472,-153.535229132021612,0.],[-32.0418550848851069,-154.473832823152,0.],[-29.6233462298880497,-154.359413873550494,0.],[-27.1236046132650088,-154.136555393682102,0.],[-25.2121174567925905,-154.644187738086288,0.],[-23.2194159321172506,-153.547964986405788,0.],[-20.7621525866003509,-154.03372181411,0.],[-20.1058190656713691,-153.781736618776193,0.],[-19.4827449350710786,-151.276922508355796,0.],[-18.8536139740509086,-149.094539629184197,0.],[-17.2242335133939299,-147.224664560509211,0.],[-16.1922194975778808,-146.513088861403901,0.],[-15.5503699150093198,-146.163193501296,0.],[-13.9952437663796694,-145.748994993864699,0.]];
tracks__$AnimalOdysseys_MigrationData.greenTurtle_7 = [[-6.15421490598358378,-134.905614207180804,0.],[-6.48318190658260374,-134.9780134630752,0.],[-6.65013131584300687,-134.870015712373402,0.],[-6.90972651678547667,-134.825530497500893,0.],[-7.20374013854703943,-134.622886251740113,0.],[-8.00649660010925146,-135.573852543582205,0.],[-8.39158166739783162,-137.163734081756388,0.],[-8.67751600511133425,-137.816439327852692,0.],[-8.61880989362852,-138.864642516415,0.],[-8.49186384476414347,-139.080101826902791,0.],[-8.40463090624124121,-139.348965573943502,0.],[-8.3983328809783373,-139.80585945382029,0.],[-8.74690905874350477,-140.301748915332809,0.],[-9.45516487656118265,-140.910196961597393,0.],[-9.54644021043896096,-141.560768567402391,0.],[-9.6520259285226,-142.249000878397396,0.],[-9.7833507964637576,-142.848305307675503,0.],[-10.6265843350619,-143.259874944930687,0.],[-11.5250750053692794,-143.776779172415388,0.],[-12.3728506078041391,-144.344044695847288,0.],[-12.6324205089539099,-144.552848546363691,0.]];
tracks__$AnimalOdysseys_MigrationData.dwarfMinkeWhale_2 = [[-48.9898313613692693,-144.693433048201399,0.],[-45.2951574617054078,-143.982348811495086,0.],[-44.201032352634293,-143.50060501625731,0.],[-42.4982505620253477,-143.464167978844699,0.],[-40.7931851921368391,-144.080723045919797,0.],[-39.3481588131217705,-145.032094574792296,0.],[-39.683619614156,-146.09020401051,0.],[-39.0592041403006789,-149.40615130094011,0.],[-38.3999600745476073,-150.4702065788303,0.],[-36.7958634454986893,-151.258221557163893,0.],[-35.583162608328422,-152.108916185785205,0.],[-34.1167693248737081,-152.444613885873309,0.],[-32.6702554220914507,-153.27632858066309,0.],[-30.2403301878652897,-154.43102371075949,0.],[-27.9513300060522489,-154.746608986611392,0.],[-26.7116841146047399,-154.185710653387304,0.],[-26.1457257963793,-154.206453123873189,0.],[-25.015712820875919,-153.986589342207395,0.],[-23.9144808204616,-153.438008867082488,0.],[-23.1329238945281297,-152.760074325249604,0.],[-22.2244241707250687,-151.756795361439,0.],[-21.6983281671820691,-150.480825354296513,0.],[-20.0472511080622802,-149.713054699997514,0.],[-18.7978694012652383,-148.0207015153903,0.],[-16.5225796645215084,-146.382563934990714,0.],[-15.8720512216707608,-145.950931891999,0.],[-15.4125717046356492,-145.840174538604487,0.],[-15.0323670740080306,-145.734469427536595,0.],[-14.6501087171873206,-145.593644745503894,0.],[-14.5728022589403103,-145.533051757516887,0.],[-14.3570602392847,-145.349250028511506,0.],[-13.3251549165457792,-144.800248912184287,0.],[-12.0632961458297707,-144.45514304629171,0.],[-11.5808620745405193,-144.505056391914,0.]];
tracks__$AnimalOdysseys_MigrationData.greenTurtle_5 = [[-25.8419952615682398,-153.332828479830113,0.],[-25.4182326755621091,-153.510972378282787,0.],[-24.9952287223609595,-153.64557499900269,0.],[-24.5896354576617817,-153.354809896863,0.],[-24.5312165146613701,-152.515884853972409,0.],[-24.3941036566846812,-152.207543564261698,0.],[-23.9975155476686,-152.027581132938707,0.],[-23.9224358775419397,-151.598461898656,0.],[-23.4594813373465101,-151.398431200241305,0.],[-23.149505947232079,-151.217653106968214,0.],[-22.7269236949544293,-150.921716109283807,0.],[-22.3104866060674709,-150.864520463258714,0.],[-21.9136249703284811,-150.067315414416612,0.],[-21.2339831148140092,-149.470746182232801,0.],[-20.1669748141081,-149.24546176960439,0.],[-19.6770835418645795,-148.711273157994412,0.],[-19.5407748725484,-148.21105338972211,0.],[-19.16504221323137,-147.473774830745299,0.],[-18.9758952750579617,-146.944009758740208,0.],[-18.6276564566335,-146.784075757025704,0.],[-18.03722740973312,-146.433550221022813,0.],[-16.8439313992044184,-146.116723463452,0.],[-16.4003874107893601,-145.802663556259205,0.],[-15.8878351960895507,-145.560947404747,0.],[-15.2232985579451405,-145.790742412604914,0.],[-14.6123205959214602,-145.643720020765613,0.],[-14.5336372012076,-145.092742474126709,0.],[-14.1462387224547896,-144.636662575934707,0.],[-13.9469690498846699,-144.380815215764187,0.],[-14.0951608817013607,-144.177203150094414,0.],[-13.9769170639733,-143.790433206342897,0.],[-13.4549630951991599,-143.75880991183331,0.],[-13.0653027193961204,-143.830428387879891,0.],[-12.64184233002198,-144.465982453959811,0.]];
tracks__$AnimalOdysseys_MigrationData.shearwater_5 = [[-23.1436145403734592,-153.048153381983894,0.],[-21.5032594295841193,-153.988705362662614,0.],[-20.1358929246945308,-153.990737976201814,0.],[-18.1775872458513597,-154.018251457120186,0.],[-17.6292706921671289,-155.460892382068494,0.],[-17.4620872627055483,-156.915339364204186,0.],[-16.9690444450390316,-159.361666660455398,0.],[-14.6819496811291508,-160.831092903575609,0.],[-11.9453807033700699,-161.691990521111393,0.],[-9.57736556879097378,-162.093974752141293,0.],[-6.82916691017579858,-162.321062013011101,0.],[-6.27853009443261456,-163.392168295903701,0.],[-4.92795213352723493,-162.206649948921296,0.],[-2.58787145206721103,-161.156733368604392,0.],[-1.27335356694676705,-158.477320179044199,0.],[0.391676980445335,-156.191589394058809,0.],[2.48962110124184,-152.877875383762188,0.],[3.83574930735643882,-150.127481532982387,0.],[5.58686911897140437,-147.86681980088639,0.],[6.7156692325722851,-147.434273549102699,0.],[7.99841195884981,-148.497384270423396,0.],[8.17727027125431,-150.478728924097197,0.],[8.80451042363999292,-153.451737899496692,0.],[10.9616236103971492,-154.527473214150291,0.],[13.9062039320744706,-153.772274966740298,0.],[13.7245423401151392,-146.554259601081299,0.],[15.7955806140714294,-147.97011814569629,0.],[17.6290440909342685,-149.209195373649095,0.],[15.0288996887711903,-145.462950780549,0.],[17.4825295418615703,-145.436654074792614,0.],[15.4602676986063194,-142.38537082239381,0.],[10.9663992442775307,-142.129937422809604,0.],[9.41783278514001,-144.245575836471204,0.]];
tracks__$AnimalOdysseys_MigrationData.dwarfMinkeWhale_3 = [[-44.989845319785708,-144.584618383452607,0.],[-44.232251306692,-145.458220029618786,0.],[-44.6141137424894,-148.0772371824728,0.],[-44.1793459938028832,-149.680201417123897,0.],[-41.7610540439621332,-149.852670729408686,0.],[-39.916697891428413,-150.353942631570504,0.],[-38.8434464995944921,-151.4673578597247,0.],[-37.0586022379606632,-151.458678940670893,0.],[-35.155897119787177,-151.667272855359414,0.],[-31.0493307904239302,-153.828737484858607,0.],[-29.1091858656759506,-155.181543656483313,0.],[-27.1209701470176903,-154.828895007892,0.],[-24.3902139190123286,-153.314332802520198,0.],[-22.4957332869328,-151.222846567909386,0.],[-21.505791631439,-150.391887931116287,0.],[-20.8895910749300917,-150.057133409277299,0.],[-19.4717259152162505,-148.614336379732208,0.],[-18.3674716719379205,-148.637595384155702,0.],[-17.3802554368041804,-147.725688008318087,0.],[-16.8578065565356709,-146.817828963094,0.],[-16.4206049178414695,-146.274730934788607,0.],[-14.8974576936677394,-145.785773334474413,0.],[-13.5176857528884,-145.227486028686087,0.],[-12.2682567102798092,-145.140728847378398,0.]];
tracks__$AnimalOdysseys_MigrationData.greenTurtle_2 = [[-11.8335010397101499,-129.732491822181,0.],[-11.4085245474314192,-129.884860835748498,0.],[-11.1120157087975802,-130.005535402465114,0.],[-10.9692195749173393,-130.370470603357489,0.],[-11.1625710996891208,-130.748055937028511,0.],[-11.2421170565550508,-131.052261208178493,0.],[-11.1524678727782405,-131.321745265828696,0.],[-11.0473122846588208,-131.89881403870271,0.],[-10.9211961592076499,-132.42042446972,0.],[-10.8482364764485801,-132.691774100914,0.],[-11.1304346597800592,-132.764999711151887,0.],[-11.2455561609685599,-133.112427812526306,0.],[-11.3791954840368206,-133.461184328738597,0.],[-11.5888369865359309,-134.026817489807087,0.],[-11.8163360728026507,-134.399588958143596,0.],[-11.8174206014031107,-134.815702008007406,0.],[-11.9122937041545391,-135.054323499786193,0.],[-11.9314556190757894,-135.314176187846812,0.],[-11.7795600746010596,-135.756580108660586,0.],[-11.3974209339540806,-136.304039148790309,0.],[-11.0875691394914497,-136.609215006744,0.],[-10.8011625465557,-136.931050925647412,0.],[-10.9465206988694703,-137.467398035492408,0.],[-11.0268932062344,-138.294091468423289,0.],[-11.1036555300126594,-139.319548816449696,0.],[-11.0685554804673796,-139.9555912267314,0.],[-10.9142015818249192,-140.837066944220794,0.],[-10.8772570909209101,-141.352041981714507,0.],[-10.7268415628062499,-141.732002521754509,0.],[-10.4890490666315905,-142.09814452199,0.],[-10.4671850351503206,-142.423882452670711,0.],[-10.6595977577431604,-142.850356603253914,0.],[-10.8883899988774697,-142.981370289291789,0.],[-11.3167930944134802,-143.310062309193114,0.],[-11.7472096975582,-143.644827249353312,0.],[-12.2956182953094508,-144.105743905283305,0.],[-12.4397190382505496,-144.309781387277695,0.]];
tracks__$AnimalOdysseys_MigrationData.shearwater_1 = [[-23.7045787886273303,-151.991930778699412,0.],[-23.2056606829618204,-152.984995142745589,0.],[-23.2669972430602385,-154.761750498977307,0.],[-23.459759038940561,-156.85922150137759,0.],[-22.833292637875779,-157.979673692207314,0.],[-22.5210778688432782,-156.696818147866708,0.],[-22.4911443106052609,-154.828092459679311,0.],[-21.9298842989992906,-154.684207066308886,0.],[-20.6559107216352515,-156.411276313099791,0.],[-17.297941723524,-157.545082914235792,0.],[-15.4155714543840201,-161.810782856433406,0.],[-13.8494406120701505,-162.870796680548693,0.],[-12.0827792706095,-164.34795956268681,0.],[-10.1797270899844108,-166.704412120257,0.],[-5.58769562070636816,-169.13831506936441,0.],[-4.16170044550163798,-168.525860168894894,0.],[-3.84148482594556695,-165.444484196992704,0.],[-1.92634027655542894,-162.940311883741288,0.],[0.290885812412476519,-161.964662875581098,0.],[2.30741606245598296,-161.385813047474301,0.],[4.34241650482902308,-160.786893799529395,0.],[5.7711344130788822,-159.542933682034601,0.],[4.9375178646643274,-157.781050396525814,0.],[4.22912576579062183,-155.373649910031,0.],[6.3770405300491,-154.905661304698214,0.],[7.46801896343412785,-156.107332986778289,0.],[8.69047540154510401,-157.415597063882586,0.],[9.85929918613528,-157.841885179731293,0.],[9.09180873092832442,-159.682061419504208,0.],[7.38854979183327121,-159.614549199070098,0.]];
tracks__$AnimalOdysseys_MigrationData.dwarfMinkeWhale_1 = [[-58.0664417891667668,-125.415680150236497,0.],[-55.6295655615863467,-125.669052028651606,0.],[-53.5675269525945907,-127.267928376675,0.],[-50.4080620490514,-133.5113699846749,0.],[-50.0554610120262,-138.109130367984307,0.],[-47.8421547353259626,-141.375690584489405,0.],[-45.3580684648359878,-142.793047095993586,0.],[-42.3585849354004935,-143.114609154728811,0.],[-40.9163820314601594,-143.844343983514108,0.],[-39.997078444601307,-144.929056622845309,0.],[-40.0563347434709272,-146.136154841223203,0.],[-38.904007266421452,-148.63477947794189,0.],[-38.6997901766379471,-150.813273079104789,0.],[-36.9087133250309,-150.86075255299869,0.],[-35.7012456135060532,-151.75062019370489,0.],[-34.4347733975106394,-152.454443776277913,0.],[-33.3098545641378578,-153.289027396264913,0.],[-30.8084061238573206,-154.041660623798407,0.],[-28.6753564023615084,-154.229555900871702,0.],[-27.2744167012731715,-154.154379081159192,0.],[-26.1457257963793,-154.206453123873189,0.],[-24.9895668781623712,-154.376758846564911,0.],[-24.3212444212907712,-153.940600075206504,0.],[-23.1365663565342103,-153.647240839469788,0.],[-21.7377477961118402,-153.279744143952,0.],[-20.1052255608143504,-152.838518849203211,0.],[-20.0620098024542912,-151.422725920482094,0.],[-18.4199566855236689,-148.724878880322706,0.],[-16.7776358628279603,-146.347250112129103,0.],[-15.8338914191160391,-145.789246789427892,0.],[-15.4349631664700198,-145.720869978530288,0.],[-15.04734519997,-145.645763732409705,0.],[-14.6765338572029798,-145.564466049891394,0.],[-14.3804236477191694,-145.23867779270239,0.],[-13.2042930600061492,-144.425653107556798,0.],[-11.3972648486740091,-144.064832500354299,0.],[-9.95185995648834698,-144.165876957163505,0.]];
tracks__$AnimalOdysseys_MigrationData.dwarfMinkeWhale_5 = [[-50.727892292368189,-137.063121045002305,0.],[-46.2736865895161387,-139.914940114613898,0.],[-41.9752734527603124,-140.728104198863292,0.],[-41.1547301994286272,-141.99073678516379,0.],[-40.5814484462643819,-143.480901709942486,0.],[-39.8618819145410583,-145.195022124285487,0.],[-40.0678425956480666,-147.282001655985795,0.],[-39.3896633202577533,-148.51229699028741,0.],[-39.2129786379351231,-151.279550720608512,0.],[-36.5583371809250366,-151.907394369109312,0.],[-35.6467012806899,-151.956683376827897,0.],[-33.5468250549216265,-152.990441933527194,0.],[-31.5128506198423111,-153.827625238616889,0.],[-28.1511630605339498,-155.003639146131803,0.],[-26.1026741664556603,-154.563108826595908,0.],[-24.0759723378971309,-153.616882567476807,0.],[-22.1228729434940199,-153.598115400118502,0.],[-20.5117237515067288,-152.252838654915308,0.],[-19.7161384514078293,-151.240615627239691,0.],[-18.86352537222675,-148.581445057114308,0.],[-18.479517579249471,-147.867054679067394,0.],[-17.8505329139781104,-147.256755687924198,0.],[-17.3471950887424917,-146.886156883619492,0.]];
tracks__$AnimalOdysseys_MigrationData.greenTurtle_3 = [[-7.10480376225081,-147.255067067974,0.],[-7.74883928447798542,-147.817799362159406,0.],[-7.95286323513372295,-148.137002102531113,0.],[-8.36218393503879298,-148.511548129379889,0.],[-8.69676666910820373,-148.595671017484591,0.],[-8.86348962455771883,-149.541698234044105,0.],[-9.30019814169234671,-149.627779435042612,0.],[-9.55186885162772548,-149.972395594525096,0.],[-9.70257344031898583,-150.184440624841386,0.],[-9.87889957989035494,-150.397040744687,0.],[-10.1528805574893504,-150.873444778046093,0.],[-10.4264104416855297,-151.350500657407,0.],[-10.7324096558978201,-151.514594355401186,0.],[-10.9511852875688103,-150.942052864468,0.],[-10.9189465146851,-149.969320599526611,0.],[-10.6685169666063402,-149.544601136054695,0.],[-10.5533592557421496,-148.726232151200605,0.],[-10.3567270926820107,-148.063249037860913,0.],[-10.1574051876014906,-147.504515302527807,0.],[-9.95206136179908718,-147.369961928221898,0.],[-9.38857209499674106,-146.806257753709,0.],[-8.95203271432815662,-146.294956451045294,0.],[-8.56321894045275478,-146.237535996510587,0.],[-8.61670365444870434,-145.916588133387393,0.],[-8.8781513408543109,-145.542249203575807,0.],[-9.55727854211316874,-144.949727068939211,0.],[-10.3667353419538504,-144.731088859485197,0.],[-11.1783131056392,-144.561552089417688,0.],[-12.1242153575132097,-144.439664570483814,0.],[-12.3631122646634601,-144.29698720722169,0.]];
tracks__$AnimalOdysseys_MigrationData.shearwater_3 = [[-23.1823438598933116,-151.806833787094206,0.],[-21.9951091872397093,-155.421732732419,0.],[-19.1325660992394688,-155.773934123835,0.],[-18.2495591367329801,-156.485506069401509,0.],[-15.9132226848593898,-159.0148781680561,0.],[-13.6782958759659099,-160.693108680266903,0.],[-10.4200632290521,-161.971415883320503,0.],[-10.5538870157889,-167.731299189619591,0.],[-6.03556508660075508,-168.330512626721486,0.],[-3.29060514366311496,-167.824646380585506,0.],[-2.54260314612607718,-161.698158384233608,0.],[-0.075758516936771228,-159.655681868546395,0.],[3.08952788826764602,-159.394490856816191,0.],[5.62565333110521859,-159.318607021335509,0.],[8.954591274604,-159.003930028483893,0.],[8.98834535602380313,-156.240508895669308,0.],[7.45562829201583632,-153.939896908539112,0.],[7.88570847208794,-151.266485938705898,0.],[11.3665987830248199,-149.319507649811499,0.],[12.8123080189090395,-147.998515016727197,0.],[14.0873586884193696,-146.161616439028109,0.],[14.1947875649229207,-143.42260549520941,0.],[16.2045515161829208,-144.361113303007,0.],[16.7611133574226585,-153.490678149765188,0.],[12.4180247463035194,-152.417352978980688,0.],[9.0573453100376522,-153.919479221061096,0.],[7.33973320983169941,-157.581075695908,0.]];
tracks__$AnimalOdysseys_MigrationData.shearwater_8 = [[-22.7832780372016686,-153.046776071766,0.],[-20.0011860585151098,-155.995803408010488,0.],[-19.3565487105081,-155.034398652703089,0.],[-13.0923553786005602,-154.770010372274498,0.],[-11.3217754850990495,-155.854390155847796,0.],[-6.59516006705031277,-158.024837150242291,0.],[-3.31149071031548381,-156.980427734322291,0.],[0.884410051727548385,-157.063881889449902,0.],[4.51691576401567474,-157.379881944354111,0.],[6.74433012982478886,-159.031073687560706,0.],[8.23451251973949105,-157.646241491383307,0.],[6.67867773671917586,-154.791972340586511,0.],[6.15403818929916557,-152.882165141485899,0.],[8.17508063557599,-153.203645340299403,0.],[8.17189427186502293,-153.093479377572407,0.],[10.5915777311313395,-151.009470674095297,0.],[11.0543175538409493,-148.104108282975602,0.],[13.4096030081534892,-147.071274922801194,0.],[15.3931013431544201,-151.500875901168797,0.],[13.1069629512891499,-151.423187612605091,0.],[12.6492469080117296,-153.163246122443,0.],[10.4567611617560292,-153.608356369692586,0.]];
tracks__$AnimalOdysseys_MigrationData.greenTurtle_6 = [[-16.6309536205564683,-168.780715118051404,0.],[-17.2090013517502,-168.838947152460605,0.],[-17.3150076429304391,-168.34166429653709,0.],[-17.222707188336539,-167.555081985346902,0.],[-16.81018107661275,-166.940544438201,0.],[-16.3040997767330182,-166.598827096402403,0.],[-15.8893851652414693,-166.337840278,0.],[-15.2852160728512594,-166.093135359253608,0.],[-14.7100770265571494,-165.555646447534087,0.],[-13.6081072570534403,-163.755934230577196,0.],[-13.4560012994605493,-161.969095521506603,0.],[-12.7867257093252302,-160.732851537184899,0.],[-12.5747660098315102,-160.037990514619,0.],[-12.5062591698293,-158.884351928887696,0.],[-12.4196656293857206,-156.729327011242589,0.],[-12.7355755630977701,-155.734145311776302,0.],[-14.2300972134543695,-154.674784941134703,0.],[-16.2584420538098513,-153.701442520930414,0.],[-16.8415672379713897,-151.758736535964,0.],[-16.5405607310781591,-150.264511365194807,0.],[-15.1676214633818507,-149.819240667070886,0.],[-14.1320705194649,-149.444511014340094,0.],[-13.0328390802028107,-149.011303782038794,0.],[-11.81626940908418,-148.604694232852296,0.],[-11.2916790157271496,-148.079702593407205,0.],[-10.8761309000237301,-147.209962030686796,0.],[-10.5575465401309305,-146.276459161528408,0.],[-10.6795159529483605,-145.55272829197591,0.],[-11.12795436664085,-144.868803380563605,0.],[-11.9712647334644799,-144.682863463097192,0.],[-12.6672699626304492,-144.651577003150493,0.]];
tracks__$AnimalOdysseys_MigrationData.shearwater_4 = [[-23.1583706640607296,-153.216808881625695,0.],[-21.038799350822309,-154.469929768897799,0.],[-18.6748864418291483,-154.390510828077396,0.],[-17.717554042745121,-155.290948044506592,0.],[-17.3801989311153484,-158.862602831754288,0.],[-14.6914722609902295,-160.878417464400712,0.],[-8.10953449410549609,-162.654965151198411,0.],[-6.22789024816654102,-164.983735407959301,0.],[-3.40570710612507588,-164.801975306398703,0.],[-1.28653879989626,-164.4950220152962,0.],[-1.49103998830141204,-159.531561538982203,0.],[1.42428003074259402,-155.96328998051041,0.],[4.66452707814630685,-155.907744537700296,0.],[5.31127101840588711,-153.067437919073313,0.],[6.17416588798147092,-150.198106088865813,0.],[6.76395315541363917,-146.867487088729291,0.],[9.02091575153401593,-146.483492254483508,0.],[12.1983308368771102,-148.019230719420904,0.],[12.8682770087381,-149.962534768094713,0.],[13.0529227241277308,-153.072886832783098,0.],[16.1362418411806701,-152.652847664419312,0.],[14.7327981316282592,-146.838226416221801,0.],[14.4205109706700902,-144.213373657757813,0.],[13.1521813398876493,-142.517261126516786,0.],[11.5051584827607893,-142.650873592767198,0.],[8.74745291638898692,-142.128642513441,0.]];
tracks__$AnimalOdysseys_MigrationData.shearwater_2 = [[-23.1751878427969515,-151.785847972866804,0.],[-22.1192703198504397,-153.275736177333499,0.],[-24.0413135154234503,-153.331377561708393,0.],[-24.8259472347392212,-155.393929834463307,0.],[-20.8970234440328717,-154.623625949266795,0.],[-18.7695063465697,-154.695828924377309,0.],[-17.313494887540319,-156.173172897967504,0.],[-15.3111974537870097,-157.505427016274894,0.],[-11.5224491007338798,-158.720196331650612,0.],[-7.32108457445501859,-159.367093712968909,0.],[-5.1210745741920638,-159.967565266593908,0.],[-2.39668911073216417,-160.156009951890894,0.],[0.991113819483705916,-157.661250312904514,0.],[2.55307258435276196,-153.256966559963786,0.],[4.86617486816281541,-150.441613398992587,0.],[7.08073380044393286,-149.783118959964099,0.],[9.82604341594603703,-148.935461500194407,0.],[12.7851919149076494,-149.623779524023291,0.],[13.9858342702637106,-151.244408422624588,0.],[16.0248260833139291,-146.493370093092693,0.],[15.0050265065096,-144.833387004584296,0.],[13.8999180637604791,-143.816955488776301,0.],[10.8292318173025297,-143.668870928684896,0.],[12.4066304584958402,-144.929233458877093,0.],[10.8790275278404298,-145.627829909266609,0.],[13.0828611888019797,-145.972530215188,0.],[10.0887153406440504,-156.802880433338402,0.],[5.72044114604816123,-158.551221857111813,0.],[6.19956497111531668,-155.808423188345813,0.]];
tracks__$AnimalOdysseys_MigrationData.allPaths = (function($this) {
	var $r;
	var _g = new haxe_ds_StringMap();
	{
		var value = tracks__$AnimalOdysseys_MigrationData.greenTurtle_1;
		if(__map_reserved.greenTurtle_1 != null) _g.setReserved("greenTurtle_1",value); else _g.h["greenTurtle_1"] = value;
	}
	{
		var value1 = tracks__$AnimalOdysseys_MigrationData.shearwater_6;
		if(__map_reserved.shearwater_6 != null) _g.setReserved("shearwater_6",value1); else _g.h["shearwater_6"] = value1;
	}
	{
		var value2 = tracks__$AnimalOdysseys_MigrationData.greenTurtle_4;
		if(__map_reserved.greenTurtle_4 != null) _g.setReserved("greenTurtle_4",value2); else _g.h["greenTurtle_4"] = value2;
	}
	{
		var value3 = tracks__$AnimalOdysseys_MigrationData.shearwater_7;
		if(__map_reserved.shearwater_7 != null) _g.setReserved("shearwater_7",value3); else _g.h["shearwater_7"] = value3;
	}
	{
		var value4 = tracks__$AnimalOdysseys_MigrationData.shearwater_9;
		if(__map_reserved.shearwater_9 != null) _g.setReserved("shearwater_9",value4); else _g.h["shearwater_9"] = value4;
	}
	{
		var value5 = tracks__$AnimalOdysseys_MigrationData.dwarfMinkeWhale_4;
		if(__map_reserved.dwarfMinkeWhale_4 != null) _g.setReserved("dwarfMinkeWhale_4",value5); else _g.h["dwarfMinkeWhale_4"] = value5;
	}
	{
		var value6 = tracks__$AnimalOdysseys_MigrationData.greenTurtle_7;
		if(__map_reserved.greenTurtle_7 != null) _g.setReserved("greenTurtle_7",value6); else _g.h["greenTurtle_7"] = value6;
	}
	{
		var value7 = tracks__$AnimalOdysseys_MigrationData.dwarfMinkeWhale_2;
		if(__map_reserved.dwarfMinkeWhale_2 != null) _g.setReserved("dwarfMinkeWhale_2",value7); else _g.h["dwarfMinkeWhale_2"] = value7;
	}
	{
		var value8 = tracks__$AnimalOdysseys_MigrationData.greenTurtle_5;
		if(__map_reserved.greenTurtle_5 != null) _g.setReserved("greenTurtle_5",value8); else _g.h["greenTurtle_5"] = value8;
	}
	{
		var value9 = tracks__$AnimalOdysseys_MigrationData.shearwater_5;
		if(__map_reserved.shearwater_5 != null) _g.setReserved("shearwater_5",value9); else _g.h["shearwater_5"] = value9;
	}
	{
		var value10 = tracks__$AnimalOdysseys_MigrationData.dwarfMinkeWhale_3;
		if(__map_reserved.dwarfMinkeWhale_3 != null) _g.setReserved("dwarfMinkeWhale_3",value10); else _g.h["dwarfMinkeWhale_3"] = value10;
	}
	{
		var value11 = tracks__$AnimalOdysseys_MigrationData.greenTurtle_2;
		if(__map_reserved.greenTurtle_2 != null) _g.setReserved("greenTurtle_2",value11); else _g.h["greenTurtle_2"] = value11;
	}
	{
		var value12 = tracks__$AnimalOdysseys_MigrationData.shearwater_1;
		if(__map_reserved.shearwater_1 != null) _g.setReserved("shearwater_1",value12); else _g.h["shearwater_1"] = value12;
	}
	{
		var value13 = tracks__$AnimalOdysseys_MigrationData.dwarfMinkeWhale_1;
		if(__map_reserved.dwarfMinkeWhale_1 != null) _g.setReserved("dwarfMinkeWhale_1",value13); else _g.h["dwarfMinkeWhale_1"] = value13;
	}
	{
		var value14 = tracks__$AnimalOdysseys_MigrationData.dwarfMinkeWhale_5;
		if(__map_reserved.dwarfMinkeWhale_5 != null) _g.setReserved("dwarfMinkeWhale_5",value14); else _g.h["dwarfMinkeWhale_5"] = value14;
	}
	{
		var value15 = tracks__$AnimalOdysseys_MigrationData.greenTurtle_3;
		if(__map_reserved.greenTurtle_3 != null) _g.setReserved("greenTurtle_3",value15); else _g.h["greenTurtle_3"] = value15;
	}
	{
		var value16 = tracks__$AnimalOdysseys_MigrationData.shearwater_3;
		if(__map_reserved.shearwater_3 != null) _g.setReserved("shearwater_3",value16); else _g.h["shearwater_3"] = value16;
	}
	{
		var value17 = tracks__$AnimalOdysseys_MigrationData.shearwater_8;
		if(__map_reserved.shearwater_8 != null) _g.setReserved("shearwater_8",value17); else _g.h["shearwater_8"] = value17;
	}
	{
		var value18 = tracks__$AnimalOdysseys_MigrationData.greenTurtle_6;
		if(__map_reserved.greenTurtle_6 != null) _g.setReserved("greenTurtle_6",value18); else _g.h["greenTurtle_6"] = value18;
	}
	{
		var value19 = tracks__$AnimalOdysseys_MigrationData.shearwater_4;
		if(__map_reserved.shearwater_4 != null) _g.setReserved("shearwater_4",value19); else _g.h["shearwater_4"] = value19;
	}
	{
		var value20 = tracks__$AnimalOdysseys_MigrationData.shearwater_2;
		if(__map_reserved.shearwater_2 != null) _g.setReserved("shearwater_2",value20); else _g.h["shearwater_2"] = value20;
	}
	$r = _g;
	return $r;
}(this));
Main.main();
})(typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
