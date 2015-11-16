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
var Main = $hx_exports.Globe = function(container,assetRoot) {
	if(assetRoot == null) assetRoot = "assets";
	this.sunAngularVelocity = 0;
	this.sunSpringDamp = 0.05;
	this.sunSpringK = 0.8;
	this.lastFrame_ms = -1;
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
	this.camera = new THREE.PerspectiveCamera(60,this.getAspect(),0.01,10.);
	this.camera.position.z = this.cameraZForViewHeight(3.);
	this.controls = new THREE.OrbitControls(this.camera,this.canvas);
	this.controls.zoomSpeed = 0.1;
	this.controls.noPan = false;
	this.scene = new THREE.Scene();
	this.raycaster = new THREE.Raycaster();
	this.globe = new objects_globe_Globe(1.0,assetRoot);
	this.scene.add(this.globe);
	this.trails = [];
	var $it0 = data.Paths.allPaths.keys();
	while( $it0.hasNext() ) {
		var name = $it0.next();
		var tmp1;
		var _this1 = data.Paths.allPaths;
		if(__map_reserved[name] != null) tmp1 = _this1.getReserved(name); else tmp1 = _this1.h[name];
		var coords = tmp1;
		var tmp2;
		var _g = HxOverrides.substr(name,0,4).toLowerCase();
		switch(_g) {
		case "dwar":
			tmp2 = 15549696;
			break;
		case "gree":
			tmp2 = 630016;
			break;
		default:
			tmp2 = 16711680;
		}
		var color = tmp2;
		var tmp3;
		var _g1 = [];
		var _g11 = 0;
		while(_g11 < coords.length) {
			var a = coords[_g11];
			++_g11;
			_g1.push(new math_CGeoCoord(a[0],a[1],a[2]));
		}
		tmp3 = _g1;
		var path = new objects_migration_MigrationPath(this.globe,tmp3,color,0.01);
		path.migrationMaterial.uniforms.progress.value = 0;
		this.trails.push(path);
		this.globe.earthMesh.add(path);
	}
	this.debugInit();
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
	handleResize: function() {
		this.fitCanvas();
		this.camera.aspect = this.getAspect();
		this.camera.updateProjectionMatrix();
		this.renderer.setViewport(0,0,this.getWidth(),this.getHeight());
	}
	,setTrack: function(name) {
		console.log("Globe: setTrack " + name);
		this.setChapter(0,0);
	}
	,setChapter: function(i,time_s) {
		if(time_s == null) time_s = 2;
		var _g = this;
		console.log("Globe: setChapter " + i);
		var locations = [new math_CGeoCoord(-42.44466811222699,-158.671614578854,0),new math_CGeoCoord(-12.823020,-154.204906,0),new math_CGeoCoord(13.185726,-159.283641,0),new math_CGeoCoord(10.173778,-100.150828,0)];
		var loc = locations[i % locations.length];
		if(this.marker != null) this.marker.parent.remove(this.marker);
		this.marker = this.globe.addMarker(loc);
		this.scene.updateMatrixWorld(false);
		var geoSurface = loc.clone();
		var geoSpace = loc.clone();
		geoSpace.alt = 1.0;
		this.globe.geoToWorld(geoSurface);
		var cameraTargetSpace = this.globe.geoToWorld(geoSpace);
		if(time_s > 0) {
			var cameraTween = motion_Actuate.tween(this.camera.position,time_s,cameraTargetSpace,true);
			cameraTween.ease(motion_easing_Quad.get_easeInOut());
			cameraTween.onUpdate(function() {
				_g._u.set(0,0,0);
				_g.camera.lookAt(_g._u);
			});
		} else {
			this.camera.position.copy(cameraTargetSpace);
			this._u.set(0,0,0);
			this.camera.lookAt(this._u);
		}
	}
	,animateTrails: function() {
		var _g = 0;
		var _g1 = this.trails;
		while(_g < _g1.length) {
			var t = _g1[_g];
			++_g;
			t.migrationMaterial.uniforms.progress.value = 0;
			t.migrationMaterial.uniforms.scale.value = 1.;
			var trailTween = motion_Actuate.tween(t,20,{ progress : 1},true);
			trailTween.ease(motion_easing_Sine.get_easeOut());
		}
	}
	,update: function(t_ms) {
		var time_s = t_ms / 1000;
		var dt_ms = this.lastFrame_ms < 0?16.6666666666666679:Math.min(t_ms - this.lastFrame_ms,100.);
		this.lastFrame_ms = t_ms;
		motion_actuators_SimpleActuator.stage_onEnterFrame();
		this.sunCameraSpring(dt_ms);
		this.debugUpdate();
		this.render(t_ms);
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
	,raycastGlobe: function(viewClipspace) {
		this.raycaster.setFromCamera(viewClipspace,this.camera);
		var intersects = this.raycaster.intersectObject(this.globe.earthMesh,false);
		if(intersects.length <= 0) return null;
		return intersects[0].point;
	}
	,fitCanvas: function() {
		this.canvas.width = this.getWidth();
		this.canvas.height = this.getHeight();
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
	,sign: function(x) {
		return x > 0?1:x < 0?-1:0;
	}
	,getAspect: function() {
		return this.getWidth() / this.getHeight();
	}
	,getWidth: function() {
		return this.container.clientWidth;
	}
	,getHeight: function() {
		return this.container.clientHeight;
	}
	,debugInit: function() {
		console.log("renderer.getMaxAnisotropy: " + this.renderer.getMaxAnisotropy());
		var tmp;
		var _this = window.document;
		tmp = _this.createElement("script");
		var scriptEl = tmp;
		scriptEl.src = "lib/dat.gui/dat.gui.js";
		scriptEl.onload = $bind(this,this.setupDatGUI);
		window.document.body.appendChild(scriptEl);
	}
	,setupDatGUI: function() {
		var _g = this;
		var gui = new dat.GUI();
		gui.add(this.camera,"fov").name("FOV").min(1).max(180).onChange(function(x) {
			_g.camera.updateProjectionMatrix();
		});
		gui.add(this,"sunSpringK").name("Sun Spring Strength").min(0).max(20);
		gui.add(this,"sunSpringDamp").name("Sun Spring Dampening").min(0).max(1);
		gui.addColor({ color : "#" + this.trails[0].migrationMaterial.uniforms.color.value.getHexString()},"color").onChange(function(c) {
			var _g1 = 0;
			var _g2 = _g.trails;
			while(_g1 < _g2.length) {
				var t = _g2[_g1];
				++_g1;
				t.migrationMaterial.uniforms.color.value.setStyle(c);
			}
		});
		gui.add({ f : function() {
			_g.animateTrails();
		}},"f").name("Animate Trails");
		var li = 1;
		gui.add({ f : function() {
			_g.setChapter(li++);
		}},"f").name("Next Chapter");
	}
	,debugUpdate: function() {
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
	getReserved: function(key) {
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
	return new math_CGeoCoord(latitudeNorth,longitudeWest,altitude);
};
math__$GeoCoord_GeoCoord_$Impl_$.toArray = function(this1) {
	return [this1.lat,this1["long"],this1.alt];
};
math__$GeoCoord_GeoCoord_$Impl_$.fromArray = function(arr) {
	return new math_CGeoCoord(arr[0],arr[1],arr[2]);
};
var math_CGeoCoord = function(latitudeNorth,longitudeWest,altitude) {
	if(altitude == null) altitude = 0;
	if(longitudeWest == null) longitudeWest = 0;
	if(latitudeNorth == null) latitudeNorth = 0;
	this.lat = latitudeNorth;
	this["long"] = longitudeWest;
	this.alt = altitude;
};
math_CGeoCoord.__name__ = true;
math_CGeoCoord.prototype = {
	clone: function() {
		return new math_CGeoCoord(this.lat,this["long"],this.alt);
	}
	,__class__: math_CGeoCoord
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
			return new THREE.Vector3().lerpVectors(this.points[idx0],this.points[idx1],u1 - u0);
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
var motion_easing_Quad = function() { };
motion_easing_Quad.__name__ = true;
motion_easing_Quad.__properties__ = {get_easeOut:"get_easeOut",get_easeInOut:"get_easeInOut",get_easeIn:"get_easeIn"}
motion_easing_Quad.get_easeIn = function() {
	return new motion_easing_QuadEaseIn();
};
motion_easing_Quad.get_easeInOut = function() {
	return new motion_easing_QuadEaseInOut();
};
motion_easing_Quad.get_easeOut = function() {
	return new motion_easing_QuadEaseOut();
};
var motion_easing_QuadEaseIn = function() {
};
motion_easing_QuadEaseIn.__name__ = true;
motion_easing_QuadEaseIn.__interfaces__ = [motion_easing_IEasing];
motion_easing_QuadEaseIn.prototype = {
	calculate: function(k) {
		return k * k;
	}
	,ease: function(t,b,c,d) {
		return c * (t /= d) * t + b;
	}
	,__class__: motion_easing_QuadEaseIn
};
var motion_easing_QuadEaseInOut = function() {
};
motion_easing_QuadEaseInOut.__name__ = true;
motion_easing_QuadEaseInOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_QuadEaseInOut.prototype = {
	calculate: function(k) {
		if((k *= 2) < 1) return 0.5 * k * k;
		return -0.5 * ((k - 1) * (k - 3) - 1);
	}
	,ease: function(t,b,c,d) {
		if((t /= d / 2) < 1) return c / 2 * t * t + b;
		return -c / 2 * ((t - 1) * (t - 3) - 1) + b;
	}
	,__class__: motion_easing_QuadEaseInOut
};
var motion_easing_QuadEaseOut = function() {
};
motion_easing_QuadEaseOut.__name__ = true;
motion_easing_QuadEaseOut.__interfaces__ = [motion_easing_IEasing];
motion_easing_QuadEaseOut.prototype = {
	calculate: function(k) {
		return -k * (k - 2);
	}
	,ease: function(t,b,c,d) {
		return -c * (t /= d) * (t - 2) + b;
	}
	,__class__: motion_easing_QuadEaseOut
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
	colorTex.anisotropy = 4;
	this.earthContainer = new THREE.Object3D();
	this.earthContainer.rotateZ(-THREE.Math.degToRad(this.tilt));
	this.add(this.earthContainer);
	var earthGeom = new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(radius,80,80));
	var globeMat = new objects_globe_GlobeMaterial({ map : colorTex, normalMap : normalTex, normalScale : new THREE.Vector3(1.0,1.0,1.0), specularMap : specTex, specular : new THREE.Color(3355443), shininess : 12, wireframe : false});
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
		if(c == null) c = new math_CGeoCoord(0,0,0);
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
var objects_migration_MigrationPath = function(globe,geoPoints,color,thickness,altOffset,segments) {
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
	this.migrationMaterial = new objects_migration_MigrationPathMaterial();
	THREE.Mesh.call(this,this.ribbonGeom,this.migrationMaterial);
	this.migrationMaterial.uniforms.color.value.setHex(color);
};
objects_migration_MigrationPath.__name__ = true;
objects_migration_MigrationPath.__super__ = THREE.Mesh;
objects_migration_MigrationPath.prototype = $extend(THREE.Mesh.prototype,{
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
	,__class__: objects_migration_MigrationPath
	,__properties__: {set_curveFraction:"set_curveFraction",get_curveFraction:"get_curveFraction",set_color:"set_color",get_color:"get_color",set_lengthScale:"set_lengthScale",get_lengthScale:"get_lengthScale",set_progress:"set_progress",get_progress:"get_progress"}
});
var objects_migration_MigrationPathMaterial = function(parameters) {
	if(parameters != null) parameters; else { };
	var shaderMaterialParameters = { vertexShader : objects_migration_MigrationPathMaterial.vertexShaderStr, fragmentShader : objects_migration_MigrationPathMaterial.fragmentShaderStr, uniforms : THREE.UniformsUtils.merge([THREE.UniformsLib.common,{ progress : { type : "f", value : 1}, scale : { type : "f", value : 1}, color : { type : "c", value : new THREE.Color(1.,0,0)}}])};
	shaderMaterialParameters.transparent = true;
	shaderMaterialParameters.side = THREE.FrontSide;
	shaderMaterialParameters.blending = THREE.CustomBlending;
	shaderMaterialParameters.blendEquation = THREE.AddEquation;
	shaderMaterialParameters.blendSrc = THREE.OneFactor;
	shaderMaterialParameters.blendDst = THREE.OneMinusSrcAlphaFactor;
	shaderMaterialParameters.depthWrite = false;
	THREE.ShaderMaterial.call(this,shaderMaterialParameters);
};
objects_migration_MigrationPathMaterial.__name__ = true;
objects_migration_MigrationPathMaterial.__super__ = THREE.ShaderMaterial;
objects_migration_MigrationPathMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	__class__: objects_migration_MigrationPathMaterial
});
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
objects_globe_GlobeMaterial.fragmentShaderStr = "#define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\n//ShaderChunk.common\n" + THREE.ShaderChunk.common + "\n//ShaderChunk.map_pars_fragment\n" + THREE.ShaderChunk.map_pars_fragment + "\n//ShaderChunk.alphamap_pars_fragment\n" + THREE.ShaderChunk.alphamap_pars_fragment + "\n//ShaderChunk.lights_phong_pars_fragment\n" + THREE.ShaderChunk.lights_phong_pars_fragment + "\n//ShaderChunk.bumpmap_pars_fragment\n" + THREE.ShaderChunk.bumpmap_pars_fragment + "\n//ShaderChunk.normalmap_pars_fragment\n" + THREE.ShaderChunk.normalmap_pars_fragment + "\n//ShaderChunk.specularmap_pars_fragment\n" + THREE.ShaderChunk.specularmap_pars_fragment + "\n\nvoid main() {\n\n\tvec3 outgoingLight = vec3( 0.0 );\t// outgoing light does not have an alpha, the surface does\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t//ShaderChunk.map_fragment\n\t" + THREE.ShaderChunk.map_fragment + "\n\t//ShaderChunk.alphamap_fragment\n\t" + THREE.ShaderChunk.alphamap_fragment + "\n\t//ShaderChunk.alphatest_fragment\n\t" + THREE.ShaderChunk.alphatest_fragment + "\n\t//ShaderChunk.specularmap_fragment\n\t" + THREE.ShaderChunk.specularmap_fragment + "\n\n\t//ShaderChunk.lights_phong_fragment\n\t#ifndef FLAT_SHADED\n\t\tvec3 normal = normalize( vNormal );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\t\t#endif\n\t#else\n\t\tvec3 fdx = dFdx( vViewPosition );\n\t\tvec3 fdy = dFdy( vViewPosition );\n\t\tvec3 normal = normalize( cross( fdx, fdy ) );\n\t#endif\n\n\tvec3 viewPosition = normalize( vViewPosition );\n\n\t#ifdef USE_NORMALMAP\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\t#elif defined( USE_BUMPMAP )\n\t\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\t#endif\n\n\tvec3 totalDiffuseLight = vec3( 0.0 );\n\tvec3 totalSpecularLight = vec3( 0.0 );\n\n\t#if MAX_DIR_LIGHTS > 0\n\t \tfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\t \n\t \t\tvec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\t \n\t \t\t// diffuse\n\t \t\tfloat dotProduct = dot( normal, dirVector );\n\n\n\t \t\t//@! phong backside hack\n\t \t\t#define WRAP_AROUND\n\t \t\tvec3 wrapRGB = vec3(1.0, 125./255., 18./255.);\n\t \t\tfloat backsideAmbience = 0.04;\n\t \n\t \t\t#ifdef WRAP_AROUND\n\t \t\t\t//@! doubled dot products\n\t \t\t\tfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\n\t \t\t\tfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\t \t\t\tvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), clamp(wrapRGB*0.4 + dotProduct*1.2, 0., 1.) ) + wrapRGB * backsideAmbience;\n\t \t\t#else\n\t \t\t\tfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n\t \t\t#endif\n\t \n\t \t\ttotalDiffuseLight += directionalLightColor[ i ] * dirDiffuseWeight;\n\t \n\t \t\t// specular\n\t \t\tvec3 dirHalfVector = normalize( dirVector + viewPosition );\n\t \t\tfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n\t \t\tfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\t \n\t \t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t \t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n\t \t\ttotalSpecularLight += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\t \t}\n\t#endif\n\n\toutgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) + totalSpecularLight + emissive;\n\n\t//ShaderChunk.linear_to_gamma_fragment\n\t" + THREE.ShaderChunk.linear_to_gamma_fragment + "\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\t// TODO, this should be pre-multiplied to allow for bright highlights on very transparent objects\n\n}";
objects_migration_MigrationPathMaterial.vertexShaderStr = "varying vec2 vUv;\nvarying vec2 vNUv;\n\n\nvoid main() {\n\tvUv = uv;\n\tvNUv = uv2;\n\t//ShaderChunk.default_vertex\n\t" + THREE.ShaderChunk.default_vertex + "\n}";
objects_migration_MigrationPathMaterial.fragmentShaderStr = "uniform float progress;\nuniform float scale;\nuniform vec3 color;\n\nvarying vec2 vUv;\nvarying vec2 vNUv;\n\nvoid main() {\n\t\n\tconst float end = 0.988;\n\tconst float stepMax = 0.6;\n\n\tfloat a = smoothstep(0., stepMax, vNUv.y);\n\tfloat b = smoothstep(0., stepMax, 1. - vNUv.y);\n    float c = smoothstep(1.0, end, vNUv.x) * smoothstep(0., 1. - end, vNUv.x);//special, can ignore for now\n\n    float ab = a*b;\n\n\tfloat u = vUv.x*scale - (progress*(scale) - 1.);\n\tfloat nu = vNUv.x*scale - (progress*(scale) - 1.);\n\n    float f = smoothstep(1.0, end, nu);\n\n\tfloat i = clamp(ab * c * f * nu * nu, 0., 1.);\n\n\tvec3 col = color;\n\t//increase intensity toward the middle\n\tconst float darkenFactor = 0.5;\n\tcol *= nu * darkenFactor + (1. - darkenFactor);//darken towards end\n\n\tcol += vec3(1.0)*i * nu * nu * nu * ab * ab * ab * ab;\n\t\n\tgl_FragColor = vec4(col, i);\n\t//premultiply alpha\n\tgl_FragColor.rgb *= gl_FragColor.a;\n}";
Main.main();
})(typeof window != "undefined" ? window : exports, typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : this);
