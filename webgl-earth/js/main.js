(function (console) { "use strict";
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
var AssetEvent = function() { };
AssetEvent.__name__ = true;
var Globe = function() {
	THREE.Object3D.call(this);
	this.rotationAxis = new THREE.Vector3(Math.sin(THREE.Math.degToRad(23.4)),Math.cos(THREE.Math.degToRad(23.4)),0);
	this.rotationAxis.normalize();
	var colorTex = THREE.ImageUtils.loadTexture("assets/earth/color-1_mid.jpg");
	var bumpTex = THREE.ImageUtils.loadTexture("assets/earth/bump-1_mid.jpg");
	var specTex = THREE.ImageUtils.loadTexture("assets/earth/specular-1_mid.png");
	colorTex.anisotropy = 4;
	var sphereGeom = new THREE.SphereGeometry(1,80,80);
	var mat = new THREE.MeshPhongMaterial({ map : colorTex, bumpMap : bumpTex, bumpScale : 0.0025, specularMap : specTex, specular : 3355443, shininess : 25, metal : false, color : 16777215});
	this.sphereContainer = new THREE.Object3D();
	this.sphereContainer.rotateZ(-THREE.Math.degToRad(23.4));
	this.add(this.sphereContainer);
	this.sphereMesh = new THREE.Mesh(sphereGeom,mat);
	this.sphereContainer.add(this.sphereMesh);
	this.sun = new THREE.DirectionalLight(16774642,1);
	this.sun.position.set(2,0,0);
	this.sun.target.position.set(0,0,0);
	this.add(this.sun);
};
Globe.__name__ = true;
Globe.__super__ = THREE.Object3D;
Globe.prototype = $extend(THREE.Object3D.prototype,{
	setEarthAngle: function(degrees) {
		this.sphereMesh.rotation.y = THREE.Math.degToRad(degrees);
	}
});
var Main = function() {
	var tmp;
	var _this = window.document;
	tmp = _this.createElement("canvas");
	this.canvas = tmp;
	window.document.body.appendChild(this.canvas);
	this.fitCanvas();
	this.assets = new AssetManager();
	this.renderer = new THREE.WebGLRenderer({ canvas : this.canvas, antialias : true});
	this.camera = new THREE.PerspectiveCamera(60,this.getAspect(),0.01,1000);
	this.camera.position.z = this.cameraZForViewHeight(3.00);
	this.controls = new THREE.OrbitControls(this.camera,this.canvas);
	this.controls.zoomSpeed = 0.1;
	this.controls.noPan = true;
	this.scene = new THREE.Scene();
	this.globe = new Globe();
	this.scene.add(this.globe);
	window.addEventListener("resize",$bind(this,this.onWindowResize),false);
	window.requestAnimationFrame($bind(this,this.update));
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.prototype = {
	update: function(t) {
		this.globe.setEarthAngle(10 * window.performance.now() / 1000);
		this.render(t);
		window.requestAnimationFrame($bind(this,this.update));
	}
	,render: function(t) {
		this.renderer.render(this.scene,this.camera);
	}
	,fitCanvas: function() {
		this.canvas.width = this.getWidth();
		this.canvas.height = this.getHeight();
	}
	,onWindowResize: function(e) {
		this.fitCanvas();
		this.camera.aspect = this.getAspect();
		this.camera.updateProjectionMatrix();
		this.renderer.setViewport(0,0,this.getWidth(),this.getHeight());
	}
	,cameraZForViewHeight: function(height) {
		return height / 2 / Math.tan(0.5 * THREE.Math.degToRad(this.camera.fov));
	}
	,getAspect: function() {
		return this.getWidth() / this.getHeight();
	}
	,getWidth: function() {
		return window.innerWidth;
	}
	,getHeight: function() {
		return window.innerHeight;
	}
};
Math.__name__ = true;
var haxe_IMap = function() { };
haxe_IMap.__name__ = true;
var haxe_ds_StringMap = function() {
	this.h = { };
};
haxe_ds_StringMap.__name__ = true;
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
var js_Boot = function() { };
js_Boot.__name__ = true;
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
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
var __map_reserved = {}
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
