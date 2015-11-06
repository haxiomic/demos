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
var Main = function() {
	var tmp;
	var _this = window.document;
	tmp = _this.createElement("canvas");
	this.canvas = tmp;
	window.document.body.appendChild(this.canvas);
	this.fitCanvas();
	this.assets = new AssetManager();
	this.renderer = new THREE.WebGLRenderer({ canvas : this.canvas, antialias : true});
	this.camera = new THREE.PerspectiveCamera(60,this.getAspect(),0.01,10);
	this.camera.position.z = this.cameraZForViewHeight(3.);
	this.controls = new THREE.OrbitControls(this.camera,this.canvas);
	this.controls.zoomSpeed = 0.1;
	this.controls.noPan = true;
	this.scene = new THREE.Scene();
	this.globe = new globe_Globe(1);
	this.scene.add(this.globe);
	this.debugInit();
	window.addEventListener("resize",$bind(this,this.onWindowResize),false);
	window.requestAnimationFrame($bind(this,this.update));
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Main.prototype = {
	update: function(t) {
		var time_s = window.performance.now() / 1000;
		this.globe.setSunAngle(time_s / 3);
		this.debugUpdate();
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
	,debugInit: function() {
		console.log(this.renderer.getMaxAnisotropy());
	}
	,debugUpdate: function() {
	}
};
Math.__name__ = true;
var globe_AtmosphereMaterial = function(parameters) {
	this.atmosphere = { Kr : 0.0025, Km : 0.0010, ESun : 1.0, g : -0.990, wavelength : [0.650,0.570,0.475], scaleDepth : 0.25, mieScaleDepth : 0.1};
	this.atmosphereScale = 1.025;
	this.radius = 1;
	var p = parameters != null?parameters:{ };
	var innerRadius = this.radius;
	var outerRadius = this.radius * this.atmosphereScale;
	p.uniforms = p.uniforms != null?p.uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.lights,{ opacity : { type : "f", value : 1.0}, v3InvWavelength : { type : "v3", value : new THREE.Vector3(1 / Math.pow(this.atmosphere.wavelength[0],4),1 / Math.pow(this.atmosphere.wavelength[1],4),1 / Math.pow(this.atmosphere.wavelength[2],4))}, fInnerRadius : { type : "f", value : innerRadius}, fInnerRadius2 : { type : "f", value : innerRadius * innerRadius}, fOuterRadius : { type : "f", value : outerRadius}, fOuterRadius2 : { type : "f", value : outerRadius * outerRadius}, fKrESun : { type : "f", value : this.atmosphere.Kr * this.atmosphere.ESun}, fKmESun : { type : "f", value : this.atmosphere.Km * this.atmosphere.ESun}, fKr4PI : { type : "f", value : this.atmosphere.Kr * 4.0 * Math.PI}, fKm4PI : { type : "f", value : this.atmosphere.Km * 4.0 * Math.PI}, fScale : { type : "f", value : 1 / (outerRadius - innerRadius)}, fScaleDepth : { type : "f", value : this.atmosphere.scaleDepth}, fScaleOverScaleDepth : { type : "f", value : this.atmosphere.scaleDepth / (outerRadius - innerRadius)}, g : { type : "f", value : this.atmosphere.g}, g2 : { type : "f", value : this.atmosphere.g * this.atmosphere.g}}]);
	p.vertexShader = p.vertexShader != null?p.vertexShader:globe_AtmosphereMaterial.vertexShaderStr;
	p.fragmentShader = p.fragmentShader != null?p.fragmentShader:globe_AtmosphereMaterial.fragmentShaderStr;
	p.fog = p.fog != null && p.fog;
	p.lights = p.lights != null?p.lights:true;
	p.transparent = p.transparent != null?p.transparent:true;
	p.side = p.side != null?p.side:THREE.BackSide;
	THREE.ShaderMaterial.call(this,p);
	this.set_opacity_(p.opacity_ != null?p.opacity_:this.get_opacity_());
};
globe_AtmosphereMaterial.__name__ = true;
globe_AtmosphereMaterial.__super__ = THREE.ShaderMaterial;
globe_AtmosphereMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	get_opacity_: function() {
		return this.uniforms.opacity.value;
	}
	,set_opacity_: function(v) {
		this.opacity_ = v;
		return this.uniforms.opacity.value = v;
	}
});
var globe_Globe = function(radius) {
	this.atmosphereSegments = 200;
	this.earthSegments = 80;
	this.atmosphereScale = 1.025;
	this.tilt_deg = 23.4;
	THREE.Object3D.call(this);
	var colorTex = THREE.ImageUtils.loadTexture("assets/earth/color-1_mid.jpg");
	var bumpTex = THREE.ImageUtils.loadTexture("assets/earth/bump-1_mid.jpg");
	var specTex = THREE.ImageUtils.loadTexture("assets/earth/specular-1_mid.png");
	colorTex.anisotropy = 4;
	this.earthContainer = new THREE.Object3D();
	this.earthContainer.rotateZ(-THREE.Math.degToRad(this.tilt_deg));
	this.add(this.earthContainer);
	var earthGeom = new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(radius,this.earthSegments,this.earthSegments));
	var globeMat = new globe_GlobeMaterial({ map : colorTex, bumpMap : bumpTex, bumpScale : 0.0025 * radius, specularMap : specTex, specular : new THREE.Color(3355443), shininess : 25});
	this.earthMesh = new THREE.Mesh(earthGeom,globeMat);
	this.earthContainer.add(this.earthMesh);
	var atmosphereMat = new globe_AtmosphereMaterial({ wireframe : false});
	var atmosphereGeom = new THREE.BufferGeometry().fromGeometry(new THREE.SphereGeometry(radius * this.atmosphereScale,this.atmosphereSegments,this.atmosphereSegments * .5));
	this.atmosphereMesh = new THREE.Mesh(atmosphereGeom,atmosphereMat);
	this.earthContainer.add(this.atmosphereMesh);
	this.sun = new THREE.DirectionalLight(16774642,1.0);
	this.sun.position.set(radius * 2,0,0);
	this.sun.target.position.set(0,0,0);
	this.add(this.sun);
	this.debugMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1 * radius,0.1 * radius,0.02 * radius),new THREE.MeshNormalMaterial());
	this.debugMesh.lookAt(this.sun.target.position);
	this.debugMesh.position.copy(this.sun.position);
	this.add(this.debugMesh);
};
globe_Globe.__name__ = true;
globe_Globe.__super__ = THREE.Object3D;
globe_Globe.prototype = $extend(THREE.Object3D.prototype,{
	setSunAngle: function(radians) {
		var d = this.sun.position.length();
		this.sun.position.set(Math.sin(radians) * d,0,Math.cos(radians) * d);
		this.debugMesh.lookAt(this.sun.target.position);
		this.debugMesh.position.copy(this.sun.position);
	}
});
var globe_GlobeMaterial = function(parameters) {
	var p = parameters != null?parameters:{ };
	p.uniforms = p.uniforms != null?p.uniforms:THREE.UniformsUtils.merge([THREE.UniformsLib.common,THREE.UniformsLib.bump,THREE.UniformsLib.normalmap,THREE.UniformsLib.lights,THREE.UniformsLib.shadowmap,{ 'emissive' : { type : "c", value : new THREE.Color(0)}, 'specular' : { type : "c", value : new THREE.Color(1118481)}, 'shininess' : { type : "f", value : 30}, 'wrapRGB' : { type : "v3", value : new THREE.Vector3(1,1,1)}}]);
	p.vertexShader = p.vertexShader != null?p.vertexShader:globe_GlobeMaterial.vertexShaderStr;
	p.fragmentShader = p.fragmentShader != null?p.fragmentShader:globe_GlobeMaterial.fragmentShaderStr;
	p.fog = p.fog != null && p.fog;
	p.lights = p.lights != null?p.lights:true;
	THREE.ShaderMaterial.call(this,p);
	this.set_opacity_(p.opacity_ != null?p.opacity_:this.get_opacity_());
	this.set_diffuse(p.diffuse != null?p.diffuse:this.get_diffuse());
	this.set_map(p.map != null?p.map:this.get_map());
	this.set_specularMap(p.specularMap != null?p.specularMap:this.get_specularMap());
	this.set_normalMap(p.normalMap != null?p.normalMap:this.get_normalMap());
	this.set_normalScale(p.normalScale != null?p.normalScale:this.get_normalScale());
	this.set_alphaMap(p.alphaMap != null?p.alphaMap:this.get_alphaMap());
	this.set_bumpMap(p.bumpMap != null?p.bumpMap:this.get_bumpMap());
	this.set_bumpScale(p.bumpScale != null?p.bumpScale:this.get_bumpScale());
	this.set_lightMap(p.lightMap != null?p.lightMap:this.get_lightMap());
	this.set_envMap(p.envMap != null?p.envMap:this.get_envMap());
	this.set_reflectivity(p.reflectivity != null?p.reflectivity:this.get_reflectivity());
	this.set_refractionRatio(p.refractionRatio != null?p.refractionRatio:this.get_refractionRatio());
	this.set_shininess(p.shininess != null?p.shininess:this.get_shininess());
	this.set_emissive(p.emissive != null?p.emissive:this.get_emissive());
	this.set_specular(p.specular != null?p.specular:this.get_specular());
	this.set_offsetRepeatOverride(p.offsetRepeatOverride != null?p.offsetRepeatOverride:this.get_offsetRepeatOverride());
};
globe_GlobeMaterial.__name__ = true;
globe_GlobeMaterial.__super__ = THREE.ShaderMaterial;
globe_GlobeMaterial.prototype = $extend(THREE.ShaderMaterial.prototype,{
	get_opacity_: function() {
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
	,get_lightMap: function() {
		return this.uniforms.lightMap.value;
	}
	,set_lightMap: function(v) {
		this.lightMap = v;
		return this.uniforms.lightMap.value = v;
	}
	,get_envMap: function() {
		return this.uniforms.envMap.value;
	}
	,set_envMap: function(v) {
		this.uniforms.flipEnvMap.value = (v instanceof THREE.WebGLRenderTargetCube)?1:-1;
		this.envMap = v;
		return this.uniforms.envMap.value = v;
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
});
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
globe_AtmosphereMaterial.vertexShaderStr = "//\n// Atmospheric scattering vertex shader\n//\n// Author: Sean O'Neil\n//\n// Copyright (c) 2004 Sean O'Neil\n//\n\nuniform vec3 v3InvWavelength;\t// 1 / pow(wavelength, 4) for the red, green, and blue channels\nuniform float fOuterRadius;\t\t// The outer (atmosphere) radius\nuniform float fOuterRadius2;\t// fOuterRadius^2\nuniform float fInnerRadius;\t\t// The inner (planetary) radius\nuniform float fInnerRadius2;\t// fInnerRadius^2\nuniform float fKrESun;\t\t\t// Kr * ESun\nuniform float fKmESun;\t\t\t// Km * ESun\nuniform float fKr4PI;\t\t\t// Kr * 4 * PI\nuniform float fKm4PI;\t\t\t// Km * 4 * PI\nuniform float fScale;\t\t\t// 1 / (fOuterRadius - fInnerRadius)\nuniform float fScaleDepth;\t\t// The scale depth (i.e. the altitude at which the atmosphere's average density is found)\nuniform float fScaleOverScaleDepth;\t// fScale / fScaleDepth\n\nconst int nSamples = 3;\nconst float fSamples = float(nSamples);\n\n//three.js\n#if MAX_DIR_LIGHTS > 0\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n#endif\n\nvarying vec3 v3Direction;\nvarying vec4 secondaryColor;\nvarying vec4 frontColor;\n\nvarying vec3 v3LightPos;\n\n\nfloat scale(float fCos)\n{\n\tfloat x = 1.0 - fCos;\n\treturn fScaleDepth * exp(-0.00287 + x*(0.459 + x*(3.83 + x*(-6.80 + x*5.25))));\n}\n\nvoid main(void)\n{\n\t//compute light position\n\t//apply the models inverse rotation to the light\n\tvec3 v3LightPos = normalize((vec4(directionalLightDirection[0], 1.0) * modelMatrix).xyz);\n\tvec3 cameraPos = (vec4(cameraPosition, 1.0) * modelMatrix).xyz;\n\n\t//compute camera height\n\tvec3 modelPosition = modelMatrix[3].xyz;\n\tfloat fCameraHeight = distance(modelPosition, cameraPos);\n\tfloat fCameraHeight2 = fCameraHeight * fCameraHeight;\n\n\t// Get the ray from the camera to the vertex and its length (which is the far point of the ray passing through the atmosphere)\n\tvec3 v3Ray = position - cameraPos;\n\tfloat fFar = length(v3Ray);\n\tv3Ray /= fFar;\n\n\t// Calculate the closest intersection of the ray with the outer atmosphere (which is the near point of the ray passing through the atmosphere)\n\tfloat B = 2.0 * dot(cameraPos, v3Ray);\n\tfloat C = fCameraHeight2 - fOuterRadius2;\n\tfloat fDet = max(0.0, B*B - 4.0 * C);\n\tfloat fNear = 0.5 * (-B - sqrt(fDet));\n\n\t// Calculate the ray's starting position, then calculate its scattering offset\n\tvec3 v3Start = cameraPos + v3Ray * fNear;\n\tfFar -= fNear;\n\tfloat fStartAngle = dot(v3Ray, v3Start) / fOuterRadius;\n\tfloat fStartDepth = exp(-1.0 / fScaleDepth);\n\tfloat fStartOffset = fStartDepth * scale(fStartAngle);\n\n\t// Initialize the scattering loop variables\n\tfloat fSampleLength = fFar / fSamples;\n\tfloat fScaledLength = fSampleLength * fScale;\n\tvec3 v3SampleRay = v3Ray * fSampleLength;\n\tvec3 v3SamplePoint = v3Start + v3SampleRay * 0.5;\n\n\t// Now loop through the sample rays\n\tvec3 v3FrontColor = vec3(0.0, 0.0, 0.0);\n\tfor(int i=0; i<nSamples; i++)\n\t{\n\t\tfloat fHeight = length(v3SamplePoint);\n\t\tfloat fDepth = exp(fScaleOverScaleDepth * (fInnerRadius - fHeight));\n\t\tfloat fLightAngle = dot(v3LightPos, v3SamplePoint) / fHeight;\n\t\tfloat fCameraAngle = dot(v3Ray, v3SamplePoint) / fHeight;\n\t\tfloat fScatter = (fStartOffset + fDepth * (scale(fLightAngle) - scale(fCameraAngle)));\n\t\tvec3 v3Attenuate = exp(-fScatter * (v3InvWavelength * fKr4PI + fKm4PI));\n\n\t\tv3FrontColor += v3Attenuate * (fDepth * fScaledLength);\n\t\tv3SamplePoint += v3SampleRay;\n\t}\n\n\t// Finally, scale the Mie and Rayleigh colors and set up the varying variables for the pixel shader\n\tsecondaryColor = vec4(v3FrontColor * fKmESun, 1.0);\n\tfrontColor = vec4(v3FrontColor * (v3InvWavelength * fKrESun), 1.0);\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\tv3Direction = cameraPos - position;\n}";
globe_AtmosphereMaterial.fragmentShaderStr = "//\n// Atmospheric scattering fragment shader\n//\n// Author: Sean O'Neil\n//\n// Copyright (c) 2004 Sean O'Neil\n//\n\nuniform vec3 v3LightPosition;\nuniform float g;\nuniform float g2;\n\nvarying vec3 v3Direction;\nvarying vec4 secondaryColor;\nvarying vec4 frontColor;\n\nvoid main (void)\n{\n\tfloat fCos = dot(v3LightPosition, v3Direction) / length(v3Direction);\n\tfloat fMiePhase = 1.5 * ((1.0 - g2) / (2.0 + g2)) * (1.0 + fCos*fCos) / pow(1.0 + g2 - 2.0*g*fCos, 1.5);\n    gl_FragColor = frontColor + fMiePhase * secondaryColor;\n\tgl_FragColor.a = gl_FragColor.b;\n}";
globe_GlobeMaterial.vertexShaderStr = "#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n\n//ShaderChunk.common\n" + THREE.ShaderChunk.common + "\n//ShaderChunk.map_pars_vertex\n" + THREE.ShaderChunk.map_pars_vertex + "\n//ShaderChunk.lightmap_pars_vertex\n" + THREE.ShaderChunk.lightmap_pars_vertex + "\n//ShaderChunk.envmap_pars_vertex\n" + THREE.ShaderChunk.envmap_pars_vertex + "\n//ShaderChunk.lights_phong_pars_vertex\n" + THREE.ShaderChunk.lights_phong_pars_vertex + "\n//ShaderChunk.color_pars_vertex\n" + THREE.ShaderChunk.color_pars_vertex + "\n//ShaderChunk.morphtarget_pars_vertex\n" + THREE.ShaderChunk.morphtarget_pars_vertex + "\n//ShaderChunk.skinning_pars_vertex\n" + THREE.ShaderChunk.skinning_pars_vertex + "\n//ShaderChunk.shadowmap_pars_vertex\n" + THREE.ShaderChunk.shadowmap_pars_vertex + "\n//ShaderChunk.logdepthbuf_pars_vertex\n" + THREE.ShaderChunk.logdepthbuf_pars_vertex + "\n\nvoid main() {\n\n\t//ShaderChunk.map_vertex\n\t" + THREE.ShaderChunk.map_vertex + "\n\t//ShaderChunk.lightmap_vertex\n\t" + THREE.ShaderChunk.lightmap_vertex + "\n\t//ShaderChunk.color_vertex\n\t" + THREE.ShaderChunk.color_vertex + "\n\n\t//ShaderChunk.morphnormal_vertex\n\t" + THREE.ShaderChunk.morphnormal_vertex + "\n\t//ShaderChunk.skinbase_vertex\n\t" + THREE.ShaderChunk.skinbase_vertex + "\n\t//ShaderChunk.skinnormal_vertex\n\t" + THREE.ShaderChunk.skinnormal_vertex + "\n\t//ShaderChunk.defaultnormal_vertex\n\t" + THREE.ShaderChunk.defaultnormal_vertex + "\n\n#ifndef FLAT_SHADED // Normal computed with derivatives when FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\n\t//ShaderChunk.morphtarget_vertex\n\t" + THREE.ShaderChunk.morphtarget_vertex + "\n\t//ShaderChunk.skinning_vertex\n\t" + THREE.ShaderChunk.skinning_vertex + "\n\t//ShaderChunk.default_vertex\n\t" + THREE.ShaderChunk.default_vertex + "\n\t//ShaderChunk.logdepthbuf_vertex\n\t" + THREE.ShaderChunk.logdepthbuf_vertex + "\n\n\tvViewPosition = -mvPosition.xyz;\n\n\t//ShaderChunk.worldpos_vertex\n\t" + THREE.ShaderChunk.worldpos_vertex + "\n\t//ShaderChunk.envmap_vertex\n\t" + THREE.ShaderChunk.envmap_vertex + "\n\t//ShaderChunk.lights_phong_vertex\n\t" + THREE.ShaderChunk.lights_phong_vertex + "\n\t//ShaderChunk.shadowmap_vertex\n\t" + THREE.ShaderChunk.shadowmap_vertex + "\n\n}";
globe_GlobeMaterial.fragmentShaderStr = "#define PHONG\n\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n\n//ShaderChunk.common\n" + THREE.ShaderChunk.common + "\n//ShaderChunk.color_pars_fragment\n" + THREE.ShaderChunk.color_pars_fragment + "\n//ShaderChunk.map_pars_fragment\n" + THREE.ShaderChunk.map_pars_fragment + "\n//ShaderChunk.alphamap_pars_fragment\n" + THREE.ShaderChunk.alphamap_pars_fragment + "\n//ShaderChunk.lightmap_pars_fragment\n" + THREE.ShaderChunk.lightmap_pars_fragment + "\n//ShaderChunk.envmap_pars_fragment\n" + THREE.ShaderChunk.envmap_pars_fragment + "\n//ShaderChunk.lights_phong_pars_fragment\n" + THREE.ShaderChunk.lights_phong_pars_fragment + "\n//ShaderChunk.shadowmap_pars_fragment\n" + THREE.ShaderChunk.shadowmap_pars_fragment + "\n//ShaderChunk.bumpmap_pars_fragment\n" + THREE.ShaderChunk.bumpmap_pars_fragment + "\n//ShaderChunk.normalmap_pars_fragment\n" + THREE.ShaderChunk.normalmap_pars_fragment + "\n//ShaderChunk.specularmap_pars_fragment\n" + THREE.ShaderChunk.specularmap_pars_fragment + "\n//ShaderChunk.logdepthbuf_pars_fragment\n" + THREE.ShaderChunk.logdepthbuf_pars_fragment + "\n\nvoid main() {\n\n\tvec3 outgoingLight = vec3( 0.0 );\t// outgoing light does not have an alpha, the surface does\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\n\t//ShaderChunk.logdepthbuf_fragment\n\t" + THREE.ShaderChunk.logdepthbuf_fragment + "\n\t//ShaderChunk.map_fragment\n\t" + THREE.ShaderChunk.map_fragment + "\n\t//ShaderChunk.color_fragment\n\t" + THREE.ShaderChunk.color_fragment + "\n\t//ShaderChunk.alphamap_fragment\n\t" + THREE.ShaderChunk.alphamap_fragment + "\n\t//ShaderChunk.alphatest_fragment\n\t" + THREE.ShaderChunk.alphatest_fragment + "\n\t//ShaderChunk.specularmap_fragment\n\t" + THREE.ShaderChunk.specularmap_fragment + "\n\n\t//ShaderChunk.lights_phong_fragment\n\t" + THREE.ShaderChunk.lights_phong_fragment + "\n\n\t//ShaderChunk.lightmap_fragment\n\t" + THREE.ShaderChunk.lightmap_fragment + "\n\t//ShaderChunk.envmap_fragment\n\t" + THREE.ShaderChunk.envmap_fragment + "\n\t//ShaderChunk.shadowmap_fragment\n\t" + THREE.ShaderChunk.shadowmap_fragment + "\n\n\t//ShaderChunk.linear_to_gamma_fragment\n\t" + THREE.ShaderChunk.linear_to_gamma_fragment + "\n\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\t// TODO, this should be pre-multiplied to allow for bright highlights on very transparent objects\n\n}";
Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
