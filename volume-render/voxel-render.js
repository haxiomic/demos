(function (console) { "use strict";
var $hxClasses = {};
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var EReg = function(r,opt) {
	opt = opt.split("u").join("");
	this.r = new RegExp(r,opt);
};
$hxClasses["EReg"] = EReg;
EReg.__name__ = ["EReg"];
EReg.prototype = {
	replace: function(s,by) {
		return s.replace(this.r,by);
	}
	,__class__: EReg
};
var HxOverrides = function() { };
$hxClasses["HxOverrides"] = HxOverrides;
HxOverrides.__name__ = ["HxOverrides"];
HxOverrides.strDate = function(s) {
	var _g = s.length;
	switch(_g) {
	case 8:
		var k = s.split(":");
		var d = new Date();
		d.setTime(0);
		d.setUTCHours(k[0]);
		d.setUTCMinutes(k[1]);
		d.setUTCSeconds(k[2]);
		return d;
	case 10:
		var k1 = s.split("-");
		return new Date(k1[0],k1[1] - 1,k1[2],0,0,0);
	case 19:
		var k2 = s.split(" ");
		var y = k2[0].split("-");
		var t = k2[1].split(":");
		return new Date(y[0],y[1] - 1,y[2],t[0],t[1],t[2]);
	default:
		throw new js__$Boot_HaxeError("Invalid date format : " + s);
	}
};
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
HxOverrides.indexOf = function(a,obj,i) {
	var len = a.length;
	if(i < 0) {
		i += len;
		if(i < 0) i = 0;
	}
	while(i < len) {
		if(a[i] === obj) return i;
		i++;
	}
	return -1;
};
HxOverrides.remove = function(a,obj) {
	var i = HxOverrides.indexOf(a,obj,0);
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
var List = function() {
	this.length = 0;
};
$hxClasses["List"] = List;
List.__name__ = ["List"];
List.prototype = {
	add: function(item) {
		var x = [item];
		if(this.h == null) this.h = x; else this.q[1] = x;
		this.q = x;
		this.length++;
	}
	,__class__: List
};
var snow_App = function() {
	this.next_render = 0;
	this.next_tick = 0;
	this.alpha = 1.0;
	this.cur_frame_start = 0.0;
	this.current_time = 0;
	this.last_frame_start = 0.0;
	this.delta_sim = 0.0166666666666666664;
	this.delta_time = 0.0166666666666666664;
	this.max_frame_time = 0.25;
	this.update_rate = 0;
	this.render_rate = 0.0166666666666666664;
	this.fixed_delta = 0;
	this.timescale = 1;
};
$hxClasses["snow.App"] = snow_App;
snow_App.__name__ = ["snow","App"];
snow_App.prototype = {
	config: function(config) {
		return config;
	}
	,ready: function() {
	}
	,update: function(dt) {
	}
	,ondestroy: function() {
	}
	,onevent: function(event) {
	}
	,onkeydown: function(keycode,scancode,repeat,mod,timestamp,window_id) {
	}
	,onkeyup: function(keycode,scancode,repeat,mod,timestamp,window_id) {
	}
	,ontextinput: function(text,start,length,type,timestamp,window_id) {
	}
	,onmousedown: function(x,y,button,timestamp,window_id) {
	}
	,onmouseup: function(x,y,button,timestamp,window_id) {
	}
	,onmousewheel: function(x,y,timestamp,window_id) {
	}
	,onmousemove: function(x,y,xrel,yrel,timestamp,window_id) {
	}
	,ontouchdown: function(x,y,touch_id,timestamp) {
	}
	,ontouchup: function(x,y,touch_id,timestamp) {
	}
	,ontouchmove: function(x,y,dx,dy,touch_id,timestamp) {
	}
	,ongamepadaxis: function(gamepad,axis,value,timestamp) {
	}
	,ongamepaddown: function(gamepad,button,value,timestamp) {
	}
	,ongamepadup: function(gamepad,button,value,timestamp) {
	}
	,ongamepaddevice: function(gamepad,type,timestamp) {
	}
	,on_internal_init: function() {
		this.cur_frame_start = snow_Snow.core.timestamp();
		this.last_frame_start = this.cur_frame_start;
		this.current_time = 0;
		this.delta_time = 0.016;
	}
	,on_internal_update: function() {
		if(this.update_rate != 0) {
			if(this.next_tick < snow_Snow.core.timestamp()) this.next_tick = snow_Snow.core.timestamp() + this.update_rate; else return;
		}
		this.cur_frame_start = snow_Snow.core.timestamp();
		this.delta_time = this.cur_frame_start - this.last_frame_start;
		this.last_frame_start = this.cur_frame_start;
		if(this.delta_time > this.max_frame_time) this.delta_time = this.max_frame_time;
		var used_delta;
		if(this.fixed_delta == 0) used_delta = this.delta_time; else used_delta = this.fixed_delta;
		used_delta *= this.timescale;
		this.delta_sim = used_delta;
		this.current_time += used_delta;
		this.app.do_internal_update(used_delta);
	}
	,on_internal_render: function() {
		if(this.render_rate != 0) {
			if(this.next_render < snow_Snow.core.timestamp()) {
				this.app.windowing.update();
				this.next_render += this.render_rate;
			}
		}
	}
	,__class__: snow_App
};
var Main = function() {
	snow_App.call(this);
};
$hxClasses["Main"] = Main;
Main.__name__ = ["Main"];
Main.__super__ = snow_App;
Main.prototype = $extend(snow_App.prototype,{
	config: function(config) {
		config.web.no_context_menu = false;
		config.window.borderless = true;
		config.window.fullscreen = true;
		config.window.title = "Voxel Render";
		config.render.antialiasing = 0;
		return config;
	}
	,ready: function() {
		var shader = new TestShader();
		this.app.window.onrender = $bind(this,this.render);
	}
	,render: function(w) {
	}
	,__class__: Main
});
var shaderblox_ShaderBase = function() {
	this._textures = [];
	this._attributes = [];
	this._uniforms = [];
	this._name = ("" + Std.string(js_Boot.getClass(this))).split(".").pop();
	this.initSources();
	this.createProperties();
};
$hxClasses["shaderblox.ShaderBase"] = shaderblox_ShaderBase;
shaderblox_ShaderBase.__name__ = ["shaderblox","ShaderBase"];
shaderblox_ShaderBase.prototype = {
	initSources: function() {
	}
	,createProperties: function() {
	}
	,create: function() {
		this.compile(this._vertSource,this._fragSource);
		this._ready = true;
	}
	,destroy: function() {
		snow_modules_opengl_web_GL.deleteShader(this._vert);
		snow_modules_opengl_web_GL.deleteShader(this._frag);
		snow_modules_opengl_web_GL.deleteProgram(this._prog);
		this._prog = null;
		this._vert = null;
		this._frag = null;
		this._ready = false;
	}
	,compile: function(vertSource,fragSource) {
		var vertexShader = snow_modules_opengl_web_GL.createShader(35633);
		snow_modules_opengl_web_GL.shaderSource(vertexShader,vertSource);
		snow_modules_opengl_web_GL.compileShader(vertexShader);
		if(snow_modules_opengl_web_GL.getShaderParameter(vertexShader,35713) == 0) {
			haxe_Log.trace("Error compiling vertex shader: " + snow_modules_opengl_web_GL.getShaderInfoLog(vertexShader),{ fileName : "ShaderBase.hx", lineNumber : 74, className : "shaderblox.ShaderBase", methodName : "compile"});
			haxe_Log.trace("\n" + vertSource,{ fileName : "ShaderBase.hx", lineNumber : 75, className : "shaderblox.ShaderBase", methodName : "compile"});
			throw new js__$Boot_HaxeError("Error compiling vertex shader");
		}
		var fragmentShader = snow_modules_opengl_web_GL.createShader(35632);
		snow_modules_opengl_web_GL.shaderSource(fragmentShader,fragSource);
		snow_modules_opengl_web_GL.compileShader(fragmentShader);
		if(snow_modules_opengl_web_GL.getShaderParameter(fragmentShader,35713) == 0) {
			haxe_Log.trace("Error compiling fragment shader: " + snow_modules_opengl_web_GL.getShaderInfoLog(fragmentShader) + "\n",{ fileName : "ShaderBase.hx", lineNumber : 84, className : "shaderblox.ShaderBase", methodName : "compile"});
			var lines = fragSource.split("\n");
			var i = 0;
			var _g = 0;
			while(_g < lines.length) {
				var l = lines[_g];
				++_g;
				haxe_Log.trace(i++ + " - " + l,{ fileName : "ShaderBase.hx", lineNumber : 88, className : "shaderblox.ShaderBase", methodName : "compile"});
			}
			throw new js__$Boot_HaxeError("Error compiling fragment shader");
		}
		var shaderProgram = snow_modules_opengl_web_GL.createProgram();
		snow_modules_opengl_web_GL.attachShader(shaderProgram,vertexShader);
		snow_modules_opengl_web_GL.attachShader(shaderProgram,fragmentShader);
		snow_modules_opengl_web_GL.linkProgram(shaderProgram);
		if(snow_modules_opengl_web_GL.getProgramParameter(shaderProgram,35714) == 0) throw new js__$Boot_HaxeError("Unable to initialize the shader program.\n" + snow_modules_opengl_web_GL.getProgramInfoLog(shaderProgram));
		var numUniforms = snow_modules_opengl_web_GL.getProgramParameter(shaderProgram,35718);
		var uniformLocations = new haxe_ds_StringMap();
		while(numUniforms-- > 0) {
			var uInfo = snow_modules_opengl_web_GL.getActiveUniform(shaderProgram,numUniforms);
			var loc = snow_modules_opengl_web_GL.getUniformLocation(shaderProgram,uInfo.name);
			{
				uniformLocations.set(uInfo.name,loc);
				loc;
			}
		}
		var numAttributes = snow_modules_opengl_web_GL.getProgramParameter(shaderProgram,35721);
		var attributeLocations = new haxe_ds_StringMap();
		while(numAttributes-- > 0) {
			var aInfo = snow_modules_opengl_web_GL.getActiveAttrib(shaderProgram,numAttributes);
			var loc1 = snow_modules_opengl_web_GL.getAttribLocation(shaderProgram,aInfo.name);
			{
				attributeLocations.set(aInfo.name,loc1);
				loc1;
			}
		}
		this._vert = vertexShader;
		this._frag = fragmentShader;
		this._prog = shaderProgram;
		var count = this._uniforms.length;
		var removeList = [];
		this._numTextures = 0;
		this._textures = [];
		var _g1 = 0;
		var _g11 = this._uniforms;
		while(_g1 < _g11.length) {
			var u = _g11[_g1];
			++_g1;
			var loc2 = uniformLocations.get(u.name);
			if(js_Boot.__instanceof(u,shaderblox_uniforms_UTexture)) {
				var t = u;
				t.samplerIndex = this._numTextures++;
				this._textures[t.samplerIndex] = t;
			}
			if(loc2 != null) u.location = loc2; else removeList.push(u);
		}
		while(removeList.length > 0) {
			var x = removeList.pop();
			HxOverrides.remove(this._uniforms,x);
		}
		var _g2 = 0;
		var _g12 = this._attributes;
		while(_g2 < _g12.length) {
			var a = _g12[_g2];
			++_g2;
			var loc3 = attributeLocations.get(a.name);
			if(loc3 == null) a.location = -1; else a.location = loc3;
		}
	}
	,activate: function(initUniforms,initAttribs) {
		if(initAttribs == null) initAttribs = false;
		if(initUniforms == null) initUniforms = true;
		if(this._active) {
			if(initUniforms) this.setUniforms();
			if(initAttribs) this.setAttributes();
			return;
		}
		if(!this._ready) this.create();
		snow_modules_opengl_web_GL.useProgram(this._prog);
		if(initUniforms) this.setUniforms();
		if(initAttribs) this.setAttributes();
		this._active = true;
	}
	,deactivate: function() {
		if(!this._active) return;
		this._active = false;
		this.disableAttributes();
	}
	,setUniforms: function() {
		var _g = 0;
		var _g1 = this._uniforms;
		while(_g < _g1.length) {
			var u = _g1[_g];
			++_g;
			u.apply();
		}
	}
	,setAttributes: function() {
		var offset = 0;
		var _g1 = 0;
		var _g = this._attributes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var att = this._attributes[i];
			var location = att.location;
			if(location != -1) {
				snow_modules_opengl_web_GL.enableVertexAttribArray(location);
				snow_modules_opengl_web_GL.vertexAttribPointer(location,att.itemCount,att.type,false,this._aStride,offset);
			}
			offset += att.byteSize;
		}
	}
	,disableAttributes: function() {
		var _g1 = 0;
		var _g = this._attributes.length;
		while(_g1 < _g) {
			var i = _g1++;
			var idx = this._attributes[i].location;
			if(idx == -1) continue;
			snow_modules_opengl_web_GL.disableVertexAttribArray(idx);
		}
	}
	,toString: function() {
		return "[Shader(" + this._name + ", attributes:" + this._attributes.length + ", uniforms:" + this._uniforms.length + ")]";
	}
	,__class__: shaderblox_ShaderBase
};
var TestShader = function() {
	shaderblox_ShaderBase.call(this);
};
$hxClasses["TestShader"] = TestShader;
TestShader.__name__ = ["TestShader"];
TestShader.__super__ = shaderblox_ShaderBase;
TestShader.prototype = $extend(shaderblox_ShaderBase.prototype,{
	createProperties: function() {
		shaderblox_ShaderBase.prototype.createProperties.call(this);
		var instance = Type.createInstance(Type.resolveClass("shaderblox.attributes.FloatAttribute"),["vertexPosition",0,2]);
		this.vertexPosition = instance;
		this._attributes.push(instance);
		this._aStride += 8;
	}
	,initSources: function() {
		this._vertSource = "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nattribute vec2 vertexPosition;\nvarying vec2 texelCoord;\nvoid main() {\n\ttexelCoord = vertexPosition;\n\tgl_Position = vec4(vertexPosition*2.0 - vec2(1.0, 1.0), 0.0, 1.0 );\n}\n";
		this._fragSource = "\n#ifdef GL_ES\nprecision mediump float;\n#endif\n\nvarying vec2 texelCoord;\nvoid main(void){\n\tgl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n}\n";
	}
	,__class__: TestShader
});
Math.__name__ = ["Math"];
var Reflect = function() { };
$hxClasses["Reflect"] = Reflect;
Reflect.__name__ = ["Reflect"];
Reflect.field = function(o,field) {
	try {
		return o[field];
	} catch( e ) {
		if (e instanceof js__$Boot_HaxeError) e = e.val;
		return null;
	}
};
Reflect.callMethod = function(o,func,args) {
	return func.apply(o,args);
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
Reflect.isFunction = function(f) {
	return typeof(f) == "function" && !(f.__name__ || f.__ename__);
};
Reflect.deleteField = function(o,field) {
	if(!Object.prototype.hasOwnProperty.call(o,field)) return false;
	delete(o[field]);
	return true;
};
var SnowApp = function() { };
$hxClasses["SnowApp"] = SnowApp;
SnowApp.__name__ = ["SnowApp"];
SnowApp.main = function() {
	SnowApp._snow = new snow_Snow();
	SnowApp._host = new Main();
	var _snow_config = { has_loop : true, config_custom_assets : false, config_custom_runtime : false, config_runtime_path : "config.json", config_assets_path : "manifest", app_package : "com.haxiomic.voxelrender"};
	SnowApp._snow.init(_snow_config,SnowApp._host);
};
var Std = function() { };
$hxClasses["Std"] = Std;
Std.__name__ = ["Std"];
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std.parseFloat = function(x) {
	return parseFloat(x);
};
Std.random = function(x) {
	if(x <= 0) return 0; else return Math.floor(Math.random() * x);
};
var StringBuf = function() {
	this.b = "";
};
$hxClasses["StringBuf"] = StringBuf;
StringBuf.__name__ = ["StringBuf"];
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,__class__: StringBuf
};
var StringTools = function() { };
$hxClasses["StringTools"] = StringTools;
StringTools.__name__ = ["StringTools"];
StringTools.fastCodeAt = function(s,index) {
	return s.charCodeAt(index);
};
var ValueType = $hxClasses["ValueType"] = { __ename__ : ["ValueType"], __constructs__ : ["TNull","TInt","TFloat","TBool","TObject","TFunction","TClass","TEnum","TUnknown"] };
ValueType.TNull = ["TNull",0];
ValueType.TNull.__enum__ = ValueType;
ValueType.TInt = ["TInt",1];
ValueType.TInt.__enum__ = ValueType;
ValueType.TFloat = ["TFloat",2];
ValueType.TFloat.__enum__ = ValueType;
ValueType.TBool = ["TBool",3];
ValueType.TBool.__enum__ = ValueType;
ValueType.TObject = ["TObject",4];
ValueType.TObject.__enum__ = ValueType;
ValueType.TFunction = ["TFunction",5];
ValueType.TFunction.__enum__ = ValueType;
ValueType.TClass = function(c) { var $x = ["TClass",6,c]; $x.__enum__ = ValueType; return $x; };
ValueType.TEnum = function(e) { var $x = ["TEnum",7,e]; $x.__enum__ = ValueType; return $x; };
ValueType.TUnknown = ["TUnknown",8];
ValueType.TUnknown.__enum__ = ValueType;
var Type = function() { };
$hxClasses["Type"] = Type;
Type.__name__ = ["Type"];
Type.getClass = function(o) {
	if(o == null) return null; else return js_Boot.getClass(o);
};
Type.getClassName = function(c) {
	var a = c.__name__;
	if(a == null) return null;
	return a.join(".");
};
Type.getEnumName = function(e) {
	var a = e.__ename__;
	return a.join(".");
};
Type.resolveClass = function(name) {
	var cl = $hxClasses[name];
	if(cl == null || !cl.__name__) return null;
	return cl;
};
Type.resolveEnum = function(name) {
	var e = $hxClasses[name];
	if(e == null || !e.__ename__) return null;
	return e;
};
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
Type.createEmptyInstance = function(cl) {
	function empty() {}; empty.prototype = cl.prototype;
	return new empty();
};
Type.createEnum = function(e,constr,params) {
	var f = Reflect.field(e,constr);
	if(f == null) throw new js__$Boot_HaxeError("No such constructor " + constr);
	if(Reflect.isFunction(f)) {
		if(params == null) throw new js__$Boot_HaxeError("Constructor " + constr + " need parameters");
		return Reflect.callMethod(e,f,params);
	}
	if(params != null && params.length != 0) throw new js__$Boot_HaxeError("Constructor " + constr + " does not need parameters");
	return f;
};
Type.getEnumConstructs = function(e) {
	var a = e.__constructs__;
	return a.slice();
};
Type["typeof"] = function(v) {
	var _g = typeof(v);
	switch(_g) {
	case "boolean":
		return ValueType.TBool;
	case "string":
		return ValueType.TClass(String);
	case "number":
		if(Math.ceil(v) == v % 2147483648.0) return ValueType.TInt;
		return ValueType.TFloat;
	case "object":
		if(v == null) return ValueType.TNull;
		var e = v.__enum__;
		if(e != null) return ValueType.TEnum(e);
		var c = js_Boot.getClass(v);
		if(c != null) return ValueType.TClass(c);
		return ValueType.TObject;
	case "function":
		if(v.__name__ || v.__ename__) return ValueType.TObject;
		return ValueType.TFunction;
	case "undefined":
		return ValueType.TNull;
	default:
		return ValueType.TUnknown;
	}
};
var haxe_IMap = function() { };
$hxClasses["haxe.IMap"] = haxe_IMap;
haxe_IMap.__name__ = ["haxe","IMap"];
haxe_IMap.prototype = {
	__class__: haxe_IMap
};
var haxe__$Int64__$_$_$Int64 = function(high,low) {
	this.high = high;
	this.low = low;
};
$hxClasses["haxe._Int64.___Int64"] = haxe__$Int64__$_$_$Int64;
haxe__$Int64__$_$_$Int64.__name__ = ["haxe","_Int64","___Int64"];
haxe__$Int64__$_$_$Int64.prototype = {
	__class__: haxe__$Int64__$_$_$Int64
};
var haxe_Log = function() { };
$hxClasses["haxe.Log"] = haxe_Log;
haxe_Log.__name__ = ["haxe","Log"];
haxe_Log.trace = function(v,infos) {
	js_Boot.__trace(v,infos);
};
var haxe_Serializer = function() {
	this.buf = new StringBuf();
	this.cache = [];
	this.useCache = haxe_Serializer.USE_CACHE;
	this.useEnumIndex = haxe_Serializer.USE_ENUM_INDEX;
	this.shash = new haxe_ds_StringMap();
	this.scount = 0;
};
$hxClasses["haxe.Serializer"] = haxe_Serializer;
haxe_Serializer.__name__ = ["haxe","Serializer"];
haxe_Serializer.run = function(v) {
	var s = new haxe_Serializer();
	s.serialize(v);
	return s.toString();
};
haxe_Serializer.prototype = {
	toString: function() {
		return this.buf.b;
	}
	,serializeString: function(s) {
		var x = this.shash.get(s);
		if(x != null) {
			this.buf.b += "R";
			if(x == null) this.buf.b += "null"; else this.buf.b += "" + x;
			return;
		}
		this.shash.set(s,this.scount++);
		this.buf.b += "y";
		s = encodeURIComponent(s);
		if(s.length == null) this.buf.b += "null"; else this.buf.b += "" + s.length;
		this.buf.b += ":";
		if(s == null) this.buf.b += "null"; else this.buf.b += "" + s;
	}
	,serializeRef: function(v) {
		var vt = typeof(v);
		var _g1 = 0;
		var _g = this.cache.length;
		while(_g1 < _g) {
			var i = _g1++;
			var ci = this.cache[i];
			if(typeof(ci) == vt && ci == v) {
				this.buf.b += "r";
				if(i == null) this.buf.b += "null"; else this.buf.b += "" + i;
				return true;
			}
		}
		this.cache.push(v);
		return false;
	}
	,serializeFields: function(v) {
		var _g = 0;
		var _g1 = Reflect.fields(v);
		while(_g < _g1.length) {
			var f = _g1[_g];
			++_g;
			this.serializeString(f);
			this.serialize(Reflect.field(v,f));
		}
		this.buf.b += "g";
	}
	,serialize: function(v) {
		{
			var _g = Type["typeof"](v);
			switch(_g[1]) {
			case 0:
				this.buf.b += "n";
				break;
			case 1:
				var v1 = v;
				if(v1 == 0) {
					this.buf.b += "z";
					return;
				}
				this.buf.b += "i";
				if(v1 == null) this.buf.b += "null"; else this.buf.b += "" + v1;
				break;
			case 2:
				var v2 = v;
				if(isNaN(v2)) this.buf.b += "k"; else if(!isFinite(v2)) if(v2 < 0) this.buf.b += "m"; else this.buf.b += "p"; else {
					this.buf.b += "d";
					if(v2 == null) this.buf.b += "null"; else this.buf.b += "" + v2;
				}
				break;
			case 3:
				if(v) this.buf.b += "t"; else this.buf.b += "f";
				break;
			case 6:
				var c = _g[2];
				if(c == String) {
					this.serializeString(v);
					return;
				}
				if(this.useCache && this.serializeRef(v)) return;
				switch(c) {
				case Array:
					var ucount = 0;
					this.buf.b += "a";
					var l = v.length;
					var _g1 = 0;
					while(_g1 < l) {
						var i = _g1++;
						if(v[i] == null) ucount++; else {
							if(ucount > 0) {
								if(ucount == 1) this.buf.b += "n"; else {
									this.buf.b += "u";
									if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
								}
								ucount = 0;
							}
							this.serialize(v[i]);
						}
					}
					if(ucount > 0) {
						if(ucount == 1) this.buf.b += "n"; else {
							this.buf.b += "u";
							if(ucount == null) this.buf.b += "null"; else this.buf.b += "" + ucount;
						}
					}
					this.buf.b += "h";
					break;
				case List:
					this.buf.b += "l";
					var v3 = v;
					var _g1_head = v3.h;
					var _g1_val = null;
					while(_g1_head != null) {
						var i1;
						_g1_val = _g1_head[0];
						_g1_head = _g1_head[1];
						i1 = _g1_val;
						this.serialize(i1);
					}
					this.buf.b += "h";
					break;
				case Date:
					var d = v;
					this.buf.b += "v";
					this.buf.add(d.getTime());
					break;
				case haxe_ds_StringMap:
					this.buf.b += "b";
					var v4 = v;
					var $it0 = v4.keys();
					while( $it0.hasNext() ) {
						var k = $it0.next();
						this.serializeString(k);
						this.serialize(__map_reserved[k] != null?v4.getReserved(k):v4.h[k]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_IntMap:
					this.buf.b += "q";
					var v5 = v;
					var $it1 = v5.keys();
					while( $it1.hasNext() ) {
						var k1 = $it1.next();
						this.buf.b += ":";
						if(k1 == null) this.buf.b += "null"; else this.buf.b += "" + k1;
						this.serialize(v5.h[k1]);
					}
					this.buf.b += "h";
					break;
				case haxe_ds_ObjectMap:
					this.buf.b += "M";
					var v6 = v;
					var $it2 = v6.keys();
					while( $it2.hasNext() ) {
						var k2 = $it2.next();
						var id = Reflect.field(k2,"__id__");
						Reflect.deleteField(k2,"__id__");
						this.serialize(k2);
						k2.__id__ = id;
						this.serialize(v6.h[k2.__id__]);
					}
					this.buf.b += "h";
					break;
				case haxe_io_Bytes:
					var v7 = v;
					var i2 = 0;
					var max = v7.length - 2;
					var charsBuf = new StringBuf();
					var b64 = haxe_Serializer.BASE64;
					while(i2 < max) {
						var b1 = v7.get(i2++);
						var b2 = v7.get(i2++);
						var b3 = v7.get(i2++);
						charsBuf.add(b64.charAt(b1 >> 2));
						charsBuf.add(b64.charAt((b1 << 4 | b2 >> 4) & 63));
						charsBuf.add(b64.charAt((b2 << 2 | b3 >> 6) & 63));
						charsBuf.add(b64.charAt(b3 & 63));
					}
					if(i2 == max) {
						var b11 = v7.get(i2++);
						var b21 = v7.get(i2++);
						charsBuf.add(b64.charAt(b11 >> 2));
						charsBuf.add(b64.charAt((b11 << 4 | b21 >> 4) & 63));
						charsBuf.add(b64.charAt(b21 << 2 & 63));
					} else if(i2 == max + 1) {
						var b12 = v7.get(i2++);
						charsBuf.add(b64.charAt(b12 >> 2));
						charsBuf.add(b64.charAt(b12 << 4 & 63));
					}
					var chars = charsBuf.b;
					this.buf.b += "s";
					if(chars.length == null) this.buf.b += "null"; else this.buf.b += "" + chars.length;
					this.buf.b += ":";
					if(chars == null) this.buf.b += "null"; else this.buf.b += "" + chars;
					break;
				default:
					if(this.useCache) this.cache.pop();
					if(v.hxSerialize != null) {
						this.buf.b += "C";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						v.hxSerialize(this);
						this.buf.b += "g";
					} else {
						this.buf.b += "c";
						this.serializeString(Type.getClassName(c));
						if(this.useCache) this.cache.push(v);
						this.serializeFields(v);
					}
				}
				break;
			case 4:
				if(js_Boot.__instanceof(v,Class)) {
					var className = Type.getClassName(v);
					this.buf.b += "A";
					this.serializeString(className);
				} else if(js_Boot.__instanceof(v,Enum)) {
					this.buf.b += "B";
					this.serializeString(Type.getEnumName(v));
				} else {
					if(this.useCache && this.serializeRef(v)) return;
					this.buf.b += "o";
					this.serializeFields(v);
				}
				break;
			case 7:
				var e = _g[2];
				if(this.useCache) {
					if(this.serializeRef(v)) return;
					this.cache.pop();
				}
				if(this.useEnumIndex) this.buf.b += "j"; else this.buf.b += "w";
				this.serializeString(Type.getEnumName(e));
				if(this.useEnumIndex) {
					this.buf.b += ":";
					this.buf.b += Std.string(v[1]);
				} else this.serializeString(v[0]);
				this.buf.b += ":";
				var l1 = v.length;
				this.buf.b += Std.string(l1 - 2);
				var _g11 = 2;
				while(_g11 < l1) {
					var i3 = _g11++;
					this.serialize(v[i3]);
				}
				if(this.useCache) this.cache.push(v);
				break;
			case 5:
				throw new js__$Boot_HaxeError("Cannot serialize function");
				break;
			default:
				throw new js__$Boot_HaxeError("Cannot serialize " + Std.string(v));
			}
		}
	}
	,__class__: haxe_Serializer
};
var haxe_Timer = function() { };
$hxClasses["haxe.Timer"] = haxe_Timer;
haxe_Timer.__name__ = ["haxe","Timer"];
haxe_Timer.stamp = function() {
	return new Date().getTime() / 1000;
};
var haxe_Unserializer = function(buf) {
	this.buf = buf;
	this.length = buf.length;
	this.pos = 0;
	this.scache = [];
	this.cache = [];
	var r = haxe_Unserializer.DEFAULT_RESOLVER;
	if(r == null) {
		r = Type;
		haxe_Unserializer.DEFAULT_RESOLVER = r;
	}
	this.setResolver(r);
};
$hxClasses["haxe.Unserializer"] = haxe_Unserializer;
haxe_Unserializer.__name__ = ["haxe","Unserializer"];
haxe_Unserializer.initCodes = function() {
	var codes = [];
	var _g1 = 0;
	var _g = haxe_Unserializer.BASE64.length;
	while(_g1 < _g) {
		var i = _g1++;
		codes[haxe_Unserializer.BASE64.charCodeAt(i)] = i;
	}
	return codes;
};
haxe_Unserializer.run = function(v) {
	return new haxe_Unserializer(v).unserialize();
};
haxe_Unserializer.prototype = {
	setResolver: function(r) {
		if(r == null) this.resolver = { resolveClass : function(_) {
			return null;
		}, resolveEnum : function(_1) {
			return null;
		}}; else this.resolver = r;
	}
	,get: function(p) {
		return this.buf.charCodeAt(p);
	}
	,readDigits: function() {
		var k = 0;
		var s = false;
		var fpos = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c != c) break;
			if(c == 45) {
				if(this.pos != fpos) break;
				s = true;
				this.pos++;
				continue;
			}
			if(c < 48 || c > 57) break;
			k = k * 10 + (c - 48);
			this.pos++;
		}
		if(s) k *= -1;
		return k;
	}
	,readFloat: function() {
		var p1 = this.pos;
		while(true) {
			var c = this.buf.charCodeAt(this.pos);
			if(c >= 43 && c < 58 || c == 101 || c == 69) this.pos++; else break;
		}
		return Std.parseFloat(HxOverrides.substr(this.buf,p1,this.pos - p1));
	}
	,unserializeObject: function(o) {
		while(true) {
			if(this.pos >= this.length) throw new js__$Boot_HaxeError("Invalid object");
			if(this.buf.charCodeAt(this.pos) == 103) break;
			var k = this.unserialize();
			if(!(typeof(k) == "string")) throw new js__$Boot_HaxeError("Invalid object key");
			var v = this.unserialize();
			o[k] = v;
		}
		this.pos++;
	}
	,unserializeEnum: function(edecl,tag) {
		if(this.get(this.pos++) != 58) throw new js__$Boot_HaxeError("Invalid enum format");
		var nargs = this.readDigits();
		if(nargs == 0) return Type.createEnum(edecl,tag);
		var args = [];
		while(nargs-- > 0) args.push(this.unserialize());
		return Type.createEnum(edecl,tag,args);
	}
	,unserialize: function() {
		var _g = this.get(this.pos++);
		switch(_g) {
		case 110:
			return null;
		case 116:
			return true;
		case 102:
			return false;
		case 122:
			return 0;
		case 105:
			return this.readDigits();
		case 100:
			return this.readFloat();
		case 121:
			var len = this.readDigits();
			if(this.get(this.pos++) != 58 || this.length - this.pos < len) throw new js__$Boot_HaxeError("Invalid string length");
			var s = HxOverrides.substr(this.buf,this.pos,len);
			this.pos += len;
			s = decodeURIComponent(s.split("+").join(" "));
			this.scache.push(s);
			return s;
		case 107:
			return NaN;
		case 109:
			return -Infinity;
		case 112:
			return Infinity;
		case 97:
			var buf = this.buf;
			var a = [];
			this.cache.push(a);
			while(true) {
				var c = this.buf.charCodeAt(this.pos);
				if(c == 104) {
					this.pos++;
					break;
				}
				if(c == 117) {
					this.pos++;
					var n = this.readDigits();
					a[a.length + n - 1] = null;
				} else a.push(this.unserialize());
			}
			return a;
		case 111:
			var o = { };
			this.cache.push(o);
			this.unserializeObject(o);
			return o;
		case 114:
			var n1 = this.readDigits();
			if(n1 < 0 || n1 >= this.cache.length) throw new js__$Boot_HaxeError("Invalid reference");
			return this.cache[n1];
		case 82:
			var n2 = this.readDigits();
			if(n2 < 0 || n2 >= this.scache.length) throw new js__$Boot_HaxeError("Invalid string reference");
			return this.scache[n2];
		case 120:
			throw new js__$Boot_HaxeError(this.unserialize());
			break;
		case 99:
			var name = this.unserialize();
			var cl = this.resolver.resolveClass(name);
			if(cl == null) throw new js__$Boot_HaxeError("Class not found " + name);
			var o1 = Type.createEmptyInstance(cl);
			this.cache.push(o1);
			this.unserializeObject(o1);
			return o1;
		case 119:
			var name1 = this.unserialize();
			var edecl = this.resolver.resolveEnum(name1);
			if(edecl == null) throw new js__$Boot_HaxeError("Enum not found " + name1);
			var e = this.unserializeEnum(edecl,this.unserialize());
			this.cache.push(e);
			return e;
		case 106:
			var name2 = this.unserialize();
			var edecl1 = this.resolver.resolveEnum(name2);
			if(edecl1 == null) throw new js__$Boot_HaxeError("Enum not found " + name2);
			this.pos++;
			var index = this.readDigits();
			var tag = Type.getEnumConstructs(edecl1)[index];
			if(tag == null) throw new js__$Boot_HaxeError("Unknown enum index " + name2 + "@" + index);
			var e1 = this.unserializeEnum(edecl1,tag);
			this.cache.push(e1);
			return e1;
		case 108:
			var l = new List();
			this.cache.push(l);
			var buf1 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) l.add(this.unserialize());
			this.pos++;
			return l;
		case 98:
			var h = new haxe_ds_StringMap();
			this.cache.push(h);
			var buf2 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s1 = this.unserialize();
				h.set(s1,this.unserialize());
			}
			this.pos++;
			return h;
		case 113:
			var h1 = new haxe_ds_IntMap();
			this.cache.push(h1);
			var buf3 = this.buf;
			var c1 = this.get(this.pos++);
			while(c1 == 58) {
				var i = this.readDigits();
				h1.set(i,this.unserialize());
				c1 = this.get(this.pos++);
			}
			if(c1 != 104) throw new js__$Boot_HaxeError("Invalid IntMap format");
			return h1;
		case 77:
			var h2 = new haxe_ds_ObjectMap();
			this.cache.push(h2);
			var buf4 = this.buf;
			while(this.buf.charCodeAt(this.pos) != 104) {
				var s2 = this.unserialize();
				h2.set(s2,this.unserialize());
			}
			this.pos++;
			return h2;
		case 118:
			var d;
			if(this.buf.charCodeAt(this.pos) >= 48 && this.buf.charCodeAt(this.pos) <= 57 && this.buf.charCodeAt(this.pos + 1) >= 48 && this.buf.charCodeAt(this.pos + 1) <= 57 && this.buf.charCodeAt(this.pos + 2) >= 48 && this.buf.charCodeAt(this.pos + 2) <= 57 && this.buf.charCodeAt(this.pos + 3) >= 48 && this.buf.charCodeAt(this.pos + 3) <= 57 && this.buf.charCodeAt(this.pos + 4) == 45) {
				var s3 = HxOverrides.substr(this.buf,this.pos,19);
				d = HxOverrides.strDate(s3);
				this.pos += 19;
			} else {
				var t = this.readFloat();
				var d1 = new Date();
				d1.setTime(t);
				d = d1;
			}
			this.cache.push(d);
			return d;
		case 115:
			var len1 = this.readDigits();
			var buf5 = this.buf;
			if(this.get(this.pos++) != 58 || this.length - this.pos < len1) throw new js__$Boot_HaxeError("Invalid bytes length");
			var codes = haxe_Unserializer.CODES;
			if(codes == null) {
				codes = haxe_Unserializer.initCodes();
				haxe_Unserializer.CODES = codes;
			}
			var i1 = this.pos;
			var rest = len1 & 3;
			var size;
			size = (len1 >> 2) * 3 + (rest >= 2?rest - 1:0);
			var max = i1 + (len1 - rest);
			var bytes = haxe_io_Bytes.alloc(size);
			var bpos = 0;
			while(i1 < max) {
				var c11 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c2 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c11 << 2 | c2 >> 4);
				var c3 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c2 << 4 | c3 >> 2);
				var c4 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c3 << 6 | c4);
			}
			if(rest >= 2) {
				var c12 = codes[StringTools.fastCodeAt(buf5,i1++)];
				var c21 = codes[StringTools.fastCodeAt(buf5,i1++)];
				bytes.set(bpos++,c12 << 2 | c21 >> 4);
				if(rest == 3) {
					var c31 = codes[StringTools.fastCodeAt(buf5,i1++)];
					bytes.set(bpos++,c21 << 4 | c31 >> 2);
				}
			}
			this.pos += len1;
			this.cache.push(bytes);
			return bytes;
		case 67:
			var name3 = this.unserialize();
			var cl1 = this.resolver.resolveClass(name3);
			if(cl1 == null) throw new js__$Boot_HaxeError("Class not found " + name3);
			var o2 = Type.createEmptyInstance(cl1);
			this.cache.push(o2);
			o2.hxUnserialize(this);
			if(this.get(this.pos++) != 103) throw new js__$Boot_HaxeError("Invalid custom data");
			return o2;
		case 65:
			var name4 = this.unserialize();
			var cl2 = this.resolver.resolveClass(name4);
			if(cl2 == null) throw new js__$Boot_HaxeError("Class not found " + name4);
			return cl2;
		case 66:
			var name5 = this.unserialize();
			var e2 = this.resolver.resolveEnum(name5);
			if(e2 == null) throw new js__$Boot_HaxeError("Enum not found " + name5);
			return e2;
		default:
		}
		this.pos--;
		throw new js__$Boot_HaxeError("Invalid char " + this.buf.charAt(this.pos) + " at position " + this.pos);
	}
	,__class__: haxe_Unserializer
};
var haxe_Utf8 = function(size) {
	this.__b = "";
};
$hxClasses["haxe.Utf8"] = haxe_Utf8;
haxe_Utf8.__name__ = ["haxe","Utf8"];
haxe_Utf8.prototype = {
	__class__: haxe_Utf8
};
var haxe_ds_IntMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.IntMap"] = haxe_ds_IntMap;
haxe_ds_IntMap.__name__ = ["haxe","ds","IntMap"];
haxe_ds_IntMap.__interfaces__ = [haxe_IMap];
haxe_ds_IntMap.prototype = {
	set: function(key,value) {
		this.h[key] = value;
	}
	,remove: function(key) {
		if(!this.h.hasOwnProperty(key)) return false;
		delete(this.h[key]);
		return true;
	}
	,keys: function() {
		var a = [];
		for( var key in this.h ) {
		if(this.h.hasOwnProperty(key)) a.push(key | 0);
		}
		return HxOverrides.iter(a);
	}
	,iterator: function() {
		return { ref : this.h, it : this.keys(), hasNext : function() {
			return this.it.hasNext();
		}, next : function() {
			var i = this.it.next();
			return this.ref[i];
		}};
	}
	,__class__: haxe_ds_IntMap
};
var haxe_ds_ObjectMap = function() {
	this.h = { };
	this.h.__keys__ = { };
};
$hxClasses["haxe.ds.ObjectMap"] = haxe_ds_ObjectMap;
haxe_ds_ObjectMap.__name__ = ["haxe","ds","ObjectMap"];
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
var haxe_ds__$StringMap_StringMapIterator = function(map,keys) {
	this.map = map;
	this.keys = keys;
	this.index = 0;
	this.count = keys.length;
};
$hxClasses["haxe.ds._StringMap.StringMapIterator"] = haxe_ds__$StringMap_StringMapIterator;
haxe_ds__$StringMap_StringMapIterator.__name__ = ["haxe","ds","_StringMap","StringMapIterator"];
haxe_ds__$StringMap_StringMapIterator.prototype = {
	hasNext: function() {
		return this.index < this.count;
	}
	,next: function() {
		return this.map.get(this.keys[this.index++]);
	}
	,__class__: haxe_ds__$StringMap_StringMapIterator
};
var haxe_ds_StringMap = function() {
	this.h = { };
};
$hxClasses["haxe.ds.StringMap"] = haxe_ds_StringMap;
haxe_ds_StringMap.__name__ = ["haxe","ds","StringMap"];
haxe_ds_StringMap.__interfaces__ = [haxe_IMap];
haxe_ds_StringMap.prototype = {
	set: function(key,value) {
		if(__map_reserved[key] != null) this.setReserved(key,value); else this.h[key] = value;
	}
	,get: function(key) {
		if(__map_reserved[key] != null) return this.getReserved(key);
		return this.h[key];
	}
	,exists: function(key) {
		if(__map_reserved[key] != null) return this.existsReserved(key);
		return this.h.hasOwnProperty(key);
	}
	,setReserved: function(key,value) {
		if(this.rh == null) this.rh = { };
		this.rh["$" + key] = value;
	}
	,getReserved: function(key) {
		if(this.rh == null) return null; else return this.rh["$" + key];
	}
	,existsReserved: function(key) {
		if(this.rh == null) return false;
		return this.rh.hasOwnProperty("$" + key);
	}
	,remove: function(key) {
		if(__map_reserved[key] != null) {
			key = "$" + key;
			if(this.rh == null || !this.rh.hasOwnProperty(key)) return false;
			delete(this.rh[key]);
			return true;
		} else {
			if(!this.h.hasOwnProperty(key)) return false;
			delete(this.h[key]);
			return true;
		}
	}
	,keys: function() {
		var _this = this.arrayKeys();
		return HxOverrides.iter(_this);
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
	,iterator: function() {
		return new haxe_ds__$StringMap_StringMapIterator(this,this.arrayKeys());
	}
	,__class__: haxe_ds_StringMap
};
var haxe_io_Bytes = function(data) {
	this.length = data.byteLength;
	this.b = new Uint8Array(data);
	data.hxBytes = this;
	data.bytes = this.b;
};
$hxClasses["haxe.io.Bytes"] = haxe_io_Bytes;
haxe_io_Bytes.__name__ = ["haxe","io","Bytes"];
haxe_io_Bytes.alloc = function(length) {
	return new haxe_io_Bytes(new ArrayBuffer(length));
};
haxe_io_Bytes.prototype = {
	get: function(pos) {
		return this.b[pos];
	}
	,set: function(pos,v) {
		this.b[pos] = v & 255;
	}
	,getString: function(pos,len) {
		if(pos < 0 || len < 0 || pos + len > this.length) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
		var s = "";
		var b = this.b;
		var fcc = String.fromCharCode;
		var i = pos;
		var max = pos + len;
		while(i < max) {
			var c = b[i++];
			if(c < 128) {
				if(c == 0) break;
				s += fcc(c);
			} else if(c < 224) s += fcc((c & 63) << 6 | b[i++] & 127); else if(c < 240) {
				var c2 = b[i++];
				s += fcc((c & 31) << 12 | (c2 & 127) << 6 | b[i++] & 127);
			} else {
				var c21 = b[i++];
				var c3 = b[i++];
				var u = (c & 15) << 18 | (c21 & 127) << 12 | (c3 & 127) << 6 | b[i++] & 127;
				s += fcc((u >> 10) + 55232);
				s += fcc(u & 1023 | 56320);
			}
		}
		return s;
	}
	,toString: function() {
		return this.getString(0,this.length);
	}
	,__class__: haxe_io_Bytes
};
var haxe_io_Error = $hxClasses["haxe.io.Error"] = { __ename__ : ["haxe","io","Error"], __constructs__ : ["Blocked","Overflow","OutsideBounds","Custom"] };
haxe_io_Error.Blocked = ["Blocked",0];
haxe_io_Error.Blocked.__enum__ = haxe_io_Error;
haxe_io_Error.Overflow = ["Overflow",1];
haxe_io_Error.Overflow.__enum__ = haxe_io_Error;
haxe_io_Error.OutsideBounds = ["OutsideBounds",2];
haxe_io_Error.OutsideBounds.__enum__ = haxe_io_Error;
haxe_io_Error.Custom = function(e) { var $x = ["Custom",3,e]; $x.__enum__ = haxe_io_Error; return $x; };
var haxe_io_FPHelper = function() { };
$hxClasses["haxe.io.FPHelper"] = haxe_io_FPHelper;
haxe_io_FPHelper.__name__ = ["haxe","io","FPHelper"];
haxe_io_FPHelper.i32ToFloat = function(i) {
	var sign = 1 - (i >>> 31 << 1);
	var exp = i >>> 23 & 255;
	var sig = i & 8388607;
	if(sig == 0 && exp == 0) return 0.0;
	return sign * (1 + Math.pow(2,-23) * sig) * Math.pow(2,exp - 127);
};
haxe_io_FPHelper.floatToI32 = function(f) {
	if(f == 0) return 0;
	var af;
	if(f < 0) af = -f; else af = f;
	var exp = Math.floor(Math.log(af) / 0.6931471805599453);
	if(exp < -127) exp = -127; else if(exp > 128) exp = 128;
	var sig = Math.round((af / Math.pow(2,exp) - 1) * 8388608) & 8388607;
	return (f < 0?-2147483648:0) | exp + 127 << 23 | sig;
};
haxe_io_FPHelper.i64ToDouble = function(low,high) {
	var sign = 1 - (high >>> 31 << 1);
	var exp = (high >> 20 & 2047) - 1023;
	var sig = (high & 1048575) * 4294967296. + (low >>> 31) * 2147483648. + (low & 2147483647);
	if(sig == 0 && exp == -1023) return 0.0;
	return sign * (1.0 + Math.pow(2,-52) * sig) * Math.pow(2,exp);
};
haxe_io_FPHelper.doubleToI64 = function(v) {
	var i64 = haxe_io_FPHelper.i64tmp;
	if(v == 0) {
		i64.low = 0;
		i64.high = 0;
	} else {
		var av;
		if(v < 0) av = -v; else av = v;
		var exp = Math.floor(Math.log(av) / 0.6931471805599453);
		var sig;
		var v1 = (av / Math.pow(2,exp) - 1) * 4503599627370496.;
		sig = Math.round(v1);
		var sig_l = sig | 0;
		var sig_h = sig / 4294967296.0 | 0;
		i64.low = sig_l;
		i64.high = (v < 0?-2147483648:0) | exp + 1023 << 20 | sig_h;
	}
	return i64;
};
var haxe_io_Path = function(path) {
	switch(path) {
	case ".":case "..":
		this.dir = path;
		this.file = "";
		return;
	}
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		this.dir = HxOverrides.substr(path,0,c2);
		path = HxOverrides.substr(path,c2 + 1,null);
		this.backslash = true;
	} else if(c2 < c1) {
		this.dir = HxOverrides.substr(path,0,c1);
		path = HxOverrides.substr(path,c1 + 1,null);
	} else this.dir = null;
	var cp = path.lastIndexOf(".");
	if(cp != -1) {
		this.ext = HxOverrides.substr(path,cp + 1,null);
		this.file = HxOverrides.substr(path,0,cp);
	} else {
		this.ext = null;
		this.file = path;
	}
};
$hxClasses["haxe.io.Path"] = haxe_io_Path;
haxe_io_Path.__name__ = ["haxe","io","Path"];
haxe_io_Path.extension = function(path) {
	var s = new haxe_io_Path(path);
	if(s.ext == null) return "";
	return s.ext;
};
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
	var slash = "/";
	path = path.split("\\").join("/");
	if(path == null || path == slash) return slash;
	var target = [];
	var _g = 0;
	var _g1 = path.split(slash);
	while(_g < _g1.length) {
		var token = _g1[_g];
		++_g;
		if(token == ".." && target.length > 0 && target[target.length - 1] != "..") target.pop(); else if(token != ".") target.push(token);
	}
	var tmp = target.join(slash);
	var regex = new EReg("([^:])/+","g");
	var result = regex.replace(tmp,"$1" + slash);
	var acc = new StringBuf();
	var colon = false;
	var slashes = false;
	var _g11 = 0;
	var _g2 = tmp.length;
	while(_g11 < _g2) {
		var i = _g11++;
		var _g21 = HxOverrides.cca(tmp,i);
		var i1 = _g21;
		if(_g21 != null) switch(_g21) {
		case 58:
			acc.b += ":";
			colon = true;
			break;
		case 47:
			if(colon == false) slashes = true; else {
				colon = false;
				if(slashes) {
					acc.b += "/";
					slashes = false;
				}
				acc.add(String.fromCharCode(i1));
			}
			break;
		default:
			colon = false;
			if(slashes) {
				acc.b += "/";
				slashes = false;
			}
			acc.add(String.fromCharCode(i1));
		} else {
			colon = false;
			if(slashes) {
				acc.b += "/";
				slashes = false;
			}
			acc.add(String.fromCharCode(i1));
		}
	}
	var result1 = acc.b;
	return result1;
};
haxe_io_Path.addTrailingSlash = function(path) {
	if(path.length == 0) return "/";
	var c1 = path.lastIndexOf("/");
	var c2 = path.lastIndexOf("\\");
	if(c1 < c2) {
		if(c2 != path.length - 1) return path + "\\"; else return path;
	} else if(c1 != path.length - 1) return path + "/"; else return path;
};
haxe_io_Path.prototype = {
	__class__: haxe_io_Path
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
$hxClasses["js._Boot.HaxeError"] = js__$Boot_HaxeError;
js__$Boot_HaxeError.__name__ = ["js","_Boot","HaxeError"];
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
	__class__: js__$Boot_HaxeError
});
var js_Boot = function() { };
$hxClasses["js.Boot"] = js_Boot;
js_Boot.__name__ = ["js","Boot"];
js_Boot.__unhtml = function(s) {
	return s.split("&").join("&amp;").split("<").join("&lt;").split(">").join("&gt;");
};
js_Boot.__trace = function(v,i) {
	var msg;
	if(i != null) msg = i.fileName + ":" + i.lineNumber + ": "; else msg = "";
	msg += js_Boot.__string_rec(v,"");
	if(i != null && i.customParams != null) {
		var _g = 0;
		var _g1 = i.customParams;
		while(_g < _g1.length) {
			var v1 = _g1[_g];
			++_g;
			msg += "," + js_Boot.__string_rec(v1,"");
		}
	}
	var d;
	if(typeof(document) != "undefined" && (d = document.getElementById("haxe:trace")) != null) d.innerHTML += js_Boot.__unhtml(msg) + "<br/>"; else if(typeof console != "undefined" && console.log != null) console.log(msg);
};
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
js_Boot.__nativeClassName = function(o) {
	var name = js_Boot.__toStr.call(o).slice(8,-1);
	if(name == "Object" || name == "Function" || name == "Math" || name == "JSON") return null;
	return name;
};
js_Boot.__isNativeObj = function(o) {
	return js_Boot.__nativeClassName(o) != null;
};
js_Boot.__resolveNativeClass = function(name) {
	if(typeof window != "undefined") return window[name]; else return global[name];
};
var js_html__$CanvasElement_CanvasUtil = function() { };
$hxClasses["js.html._CanvasElement.CanvasUtil"] = js_html__$CanvasElement_CanvasUtil;
js_html__$CanvasElement_CanvasUtil.__name__ = ["js","html","_CanvasElement","CanvasUtil"];
js_html__$CanvasElement_CanvasUtil.getContextWebGL = function(canvas,attribs) {
	var _g = 0;
	var _g1 = ["webgl","experimental-webgl"];
	while(_g < _g1.length) {
		var name = _g1[_g];
		++_g;
		var ctx = canvas.getContext(name,attribs);
		if(ctx != null) return ctx;
	}
	return null;
};
var js_html_compat_ArrayBuffer = function(a) {
	if((a instanceof Array) && a.__enum__ == null) {
		this.a = a;
		this.byteLength = a.length;
	} else {
		var len = a;
		this.a = [];
		var _g = 0;
		while(_g < len) {
			var i = _g++;
			this.a[i] = 0;
		}
		this.byteLength = len;
	}
};
$hxClasses["js.html.compat.ArrayBuffer"] = js_html_compat_ArrayBuffer;
js_html_compat_ArrayBuffer.__name__ = ["js","html","compat","ArrayBuffer"];
js_html_compat_ArrayBuffer.sliceImpl = function(begin,end) {
	var u = new Uint8Array(this,begin,end == null?null:end - begin);
	var result = new ArrayBuffer(u.byteLength);
	var resultArray = new Uint8Array(result);
	resultArray.set(u);
	return result;
};
js_html_compat_ArrayBuffer.prototype = {
	slice: function(begin,end) {
		return new js_html_compat_ArrayBuffer(this.a.slice(begin,end));
	}
	,__class__: js_html_compat_ArrayBuffer
};
var js_html_compat_DataView = function(buffer,byteOffset,byteLength) {
	this.buf = buffer;
	if(byteOffset == null) this.offset = 0; else this.offset = byteOffset;
	if(byteLength == null) this.length = buffer.byteLength - this.offset; else this.length = byteLength;
	if(this.offset < 0 || this.length < 0 || this.offset + this.length > buffer.byteLength) throw new js__$Boot_HaxeError(haxe_io_Error.OutsideBounds);
};
$hxClasses["js.html.compat.DataView"] = js_html_compat_DataView;
js_html_compat_DataView.__name__ = ["js","html","compat","DataView"];
js_html_compat_DataView.prototype = {
	getInt8: function(byteOffset) {
		var v = this.buf.a[this.offset + byteOffset];
		if(v >= 128) return v - 256; else return v;
	}
	,getUint8: function(byteOffset) {
		return this.buf.a[this.offset + byteOffset];
	}
	,getInt16: function(byteOffset,littleEndian) {
		var v = this.getUint16(byteOffset,littleEndian);
		if(v >= 32768) return v - 65536; else return v;
	}
	,getUint16: function(byteOffset,littleEndian) {
		if(littleEndian) return this.buf.a[this.offset + byteOffset] | this.buf.a[this.offset + byteOffset + 1] << 8; else return this.buf.a[this.offset + byteOffset] << 8 | this.buf.a[this.offset + byteOffset + 1];
	}
	,getInt32: function(byteOffset,littleEndian) {
		var p = this.offset + byteOffset;
		var a = this.buf.a[p++];
		var b = this.buf.a[p++];
		var c = this.buf.a[p++];
		var d = this.buf.a[p++];
		if(littleEndian) return a | b << 8 | c << 16 | d << 24; else return d | c << 8 | b << 16 | a << 24;
	}
	,getUint32: function(byteOffset,littleEndian) {
		var v = this.getInt32(byteOffset,littleEndian);
		if(v < 0) return v + 4294967296.; else return v;
	}
	,getFloat32: function(byteOffset,littleEndian) {
		return haxe_io_FPHelper.i32ToFloat(this.getInt32(byteOffset,littleEndian));
	}
	,getFloat64: function(byteOffset,littleEndian) {
		var a = this.getInt32(byteOffset,littleEndian);
		var b = this.getInt32(byteOffset + 4,littleEndian);
		return haxe_io_FPHelper.i64ToDouble(littleEndian?a:b,littleEndian?b:a);
	}
	,setInt8: function(byteOffset,value) {
		if(value < 0) this.buf.a[byteOffset + this.offset] = value + 128 & 255; else this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setUint8: function(byteOffset,value) {
		this.buf.a[byteOffset + this.offset] = value & 255;
	}
	,setInt16: function(byteOffset,value,littleEndian) {
		this.setUint16(byteOffset,value < 0?value + 65536:value,littleEndian);
	}
	,setUint16: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
		} else {
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p] = value & 255;
		}
	}
	,setInt32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,value,littleEndian);
	}
	,setUint32: function(byteOffset,value,littleEndian) {
		var p = byteOffset + this.offset;
		if(littleEndian) {
			this.buf.a[p++] = value & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >>> 24;
		} else {
			this.buf.a[p++] = value >>> 24;
			this.buf.a[p++] = value >> 16 & 255;
			this.buf.a[p++] = value >> 8 & 255;
			this.buf.a[p++] = value & 255;
		}
	}
	,setFloat32: function(byteOffset,value,littleEndian) {
		this.setUint32(byteOffset,haxe_io_FPHelper.floatToI32(value),littleEndian);
	}
	,setFloat64: function(byteOffset,value,littleEndian) {
		var i64 = haxe_io_FPHelper.doubleToI64(value);
		if(littleEndian) {
			this.setUint32(byteOffset,i64.low);
			this.setUint32(byteOffset,i64.high);
		} else {
			this.setUint32(byteOffset,i64.high);
			this.setUint32(byteOffset,i64.low);
		}
	}
	,__class__: js_html_compat_DataView
};
var js_html_compat_Uint8Array = function() { };
$hxClasses["js.html.compat.Uint8Array"] = js_html_compat_Uint8Array;
js_html_compat_Uint8Array.__name__ = ["js","html","compat","Uint8Array"];
js_html_compat_Uint8Array._new = function(arg1,offset,length) {
	var arr;
	if(typeof(arg1) == "number") {
		arr = [];
		var _g = 0;
		while(_g < arg1) {
			var i = _g++;
			arr[i] = 0;
		}
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else if(js_Boot.__instanceof(arg1,js_html_compat_ArrayBuffer)) {
		var buffer = arg1;
		if(offset == null) offset = 0;
		if(length == null) length = buffer.byteLength - offset;
		if(offset == 0) arr = buffer.a; else arr = buffer.a.slice(offset,offset + length);
		arr.byteLength = arr.length;
		arr.byteOffset = offset;
		arr.buffer = buffer;
	} else if((arg1 instanceof Array) && arg1.__enum__ == null) {
		arr = arg1.slice();
		arr.byteLength = arr.length;
		arr.byteOffset = 0;
		arr.buffer = new js_html_compat_ArrayBuffer(arr);
	} else throw new js__$Boot_HaxeError("TODO " + Std.string(arg1));
	arr.subarray = js_html_compat_Uint8Array._subarray;
	arr.set = js_html_compat_Uint8Array._set;
	return arr;
};
js_html_compat_Uint8Array._set = function(arg,offset) {
	var t = this;
	if(js_Boot.__instanceof(arg.buffer,js_html_compat_ArrayBuffer)) {
		var a = arg;
		if(arg.byteLength + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g1 = 0;
		var _g = arg.byteLength;
		while(_g1 < _g) {
			var i = _g1++;
			t[i + offset] = a[i];
		}
	} else if((arg instanceof Array) && arg.__enum__ == null) {
		var a1 = arg;
		if(a1.length + offset > t.byteLength) throw new js__$Boot_HaxeError("set() outside of range");
		var _g11 = 0;
		var _g2 = a1.length;
		while(_g11 < _g2) {
			var i1 = _g11++;
			t[i1 + offset] = a1[i1];
		}
	} else throw new js__$Boot_HaxeError("TODO");
};
js_html_compat_Uint8Array._subarray = function(start,end) {
	var t = this;
	var a = js_html_compat_Uint8Array._new(t.slice(start,end));
	a.byteOffset = start;
	return a;
};
var shaderblox_attributes_Attribute = function() { };
$hxClasses["shaderblox.attributes.Attribute"] = shaderblox_attributes_Attribute;
shaderblox_attributes_Attribute.__name__ = ["shaderblox","attributes","Attribute"];
shaderblox_attributes_Attribute.prototype = {
	__class__: shaderblox_attributes_Attribute
};
var shaderblox_attributes_FloatAttribute = function(name,location,nFloats) {
	if(nFloats == null) nFloats = 1;
	this.name = name;
	this.location = location;
	this.byteSize = nFloats * 4;
	this.itemCount = nFloats;
	this.type = 5126;
};
$hxClasses["shaderblox.attributes.FloatAttribute"] = shaderblox_attributes_FloatAttribute;
shaderblox_attributes_FloatAttribute.__name__ = ["shaderblox","attributes","FloatAttribute"];
shaderblox_attributes_FloatAttribute.__super__ = shaderblox_attributes_Attribute;
shaderblox_attributes_FloatAttribute.prototype = $extend(shaderblox_attributes_Attribute.prototype,{
	toString: function() {
		return "[FloatAttribute itemCount=" + this.itemCount + " byteSize=" + this.byteSize + " location=" + this.location + " name=" + this.name + "]";
	}
	,__class__: shaderblox_attributes_FloatAttribute
});
var shaderblox_helpers_GLUniformLocationHelper = function() { };
$hxClasses["shaderblox.helpers.GLUniformLocationHelper"] = shaderblox_helpers_GLUniformLocationHelper;
shaderblox_helpers_GLUniformLocationHelper.__name__ = ["shaderblox","helpers","GLUniformLocationHelper"];
shaderblox_helpers_GLUniformLocationHelper.isValid = function(u) {
	return u != null;
};
var shaderblox_uniforms_IAppliable = function() { };
$hxClasses["shaderblox.uniforms.IAppliable"] = shaderblox_uniforms_IAppliable;
shaderblox_uniforms_IAppliable.__name__ = ["shaderblox","uniforms","IAppliable"];
shaderblox_uniforms_IAppliable.prototype = {
	__class__: shaderblox_uniforms_IAppliable
};
var shaderblox_uniforms_UniformBase_$js_$html_$webgl_$Texture = function(name,index,data) {
	this.name = name;
	this.location = index;
	{
		this.dirty = true;
		this.data = data;
	}
	this.dirty = true;
};
$hxClasses["shaderblox.uniforms.UniformBase_js_html_webgl_Texture"] = shaderblox_uniforms_UniformBase_$js_$html_$webgl_$Texture;
shaderblox_uniforms_UniformBase_$js_$html_$webgl_$Texture.__name__ = ["shaderblox","uniforms","UniformBase_js_html_webgl_Texture"];
shaderblox_uniforms_UniformBase_$js_$html_$webgl_$Texture.prototype = {
	set: function(data) {
		this.dirty = true;
		return (function($this) {
			var $r;
			$this.dirty = true;
			$r = $this.data = data;
			return $r;
		}(this));
	}
	,setDirty: function() {
		this.dirty = true;
	}
	,set_data: function(data) {
		this.dirty = true;
		return this.data = data;
	}
	,__class__: shaderblox_uniforms_UniformBase_$js_$html_$webgl_$Texture
};
var shaderblox_uniforms_UTexture = function(name,index,cube) {
	if(cube == null) cube = false;
	this.cube = cube;
	if(cube) this.type = 34067; else this.type = 3553;
	shaderblox_uniforms_UniformBase_$js_$html_$webgl_$Texture.call(this,name,index,null);
};
$hxClasses["shaderblox.uniforms.UTexture"] = shaderblox_uniforms_UTexture;
shaderblox_uniforms_UTexture.__name__ = ["shaderblox","uniforms","UTexture"];
shaderblox_uniforms_UTexture.__interfaces__ = [shaderblox_uniforms_IAppliable];
shaderblox_uniforms_UTexture.__super__ = shaderblox_uniforms_UniformBase_$js_$html_$webgl_$Texture;
shaderblox_uniforms_UTexture.prototype = $extend(shaderblox_uniforms_UniformBase_$js_$html_$webgl_$Texture.prototype,{
	apply: function() {
		if(this.data == null) return;
		var idx = 33984 + this.samplerIndex;
		if(shaderblox_uniforms_UTexture.lastActiveTexture != idx) snow_modules_opengl_web_GL.activeTexture(shaderblox_uniforms_UTexture.lastActiveTexture = idx);
		snow_modules_opengl_web_GL.uniform1i(this.location,this.samplerIndex);
		snow_modules_opengl_web_GL.bindTexture(this.type,this.data);
		this.dirty = false;
	}
	,__class__: shaderblox_uniforms_UTexture
});
var snow_AppFixedTimestep = function() {
	this.overflow = 0.0;
	this.frame_time = 0.0167;
	snow_App.call(this);
};
$hxClasses["snow.AppFixedTimestep"] = snow_AppFixedTimestep;
snow_AppFixedTimestep.__name__ = ["snow","AppFixedTimestep"];
snow_AppFixedTimestep.__super__ = snow_App;
snow_AppFixedTimestep.prototype = $extend(snow_App.prototype,{
	on_internal_init: function() {
		snow_App.prototype.on_internal_init.call(this);
		this.frame_time = 0.0166666666666666664;
		this.last_frame_start = snow_Snow.core.timestamp();
	}
	,on_internal_update: function() {
		this.cur_frame_start = snow_Snow.core.timestamp();
		this.delta_time = this.cur_frame_start - this.last_frame_start;
		this.delta_sim = this.delta_time * this.timescale;
		if(this.delta_sim > this.max_frame_time) this.delta_sim = this.max_frame_time;
		this.last_frame_start = this.cur_frame_start;
		this.overflow += this.delta_sim;
		while(this.overflow >= this.frame_time) {
			this.app.do_internal_update(this.frame_time * this.timescale);
			this.current_time += this.frame_time * this.timescale;
			this.overflow -= this.frame_time * this.timescale;
		}
		this.alpha = this.overflow / this.frame_time;
	}
	,__class__: snow_AppFixedTimestep
});
var snow_Snow = function() {
	this.is_ready = false;
	this.was_ready = false;
	this.has_shutdown = false;
	this.shutting_down = false;
	this.platform = "unknown";
	this.freeze = false;
	this.platform = "web";
	snow_Snow.core = new snow_core_web_Core(this);
	snow_Snow.next_queue = [];
};
$hxClasses["snow.Snow"] = snow_Snow;
snow_Snow.__name__ = ["snow","Snow"];
snow_Snow.next = function(func) {
	if(func != null) snow_Snow.next_queue.push(func);
};
snow_Snow.get_timestamp = function() {
	return snow_Snow.core.timestamp();
};
snow_Snow.prototype = {
	shutdown: function() {
		this.shutting_down = true;
		this.host.ondestroy();
		this.io.module.destroy();
		this.audio.destroy();
		this.input.destroy();
		this.windowing.destroy();
		snow_Snow.core.shutdown();
		this.has_shutdown = true;
	}
	,render: function() {
		this.windowing.update();
	}
	,dispatch_system_event: function(_event) {
		this.on_event(_event);
	}
	,init: function(_snow_config,_host) {
		this.snow_config = _snow_config;
		if(this.snow_config.app_package == null) this.snow_config.app_package = "org.snowkit.snowdefault";
		this.config = this.default_config();
		this.host = _host;
		this.host.app = this;
		snow_Snow.core.init($bind(this,this.on_event));
	}
	,on_snow_init: function() {
		this.host.on_internal_init();
	}
	,on_snow_ready: function() {
		var _g = this;
		if(this.was_ready) throw new js__$Boot_HaxeError(snow_types_Error.error("firing ready event more than once is invalid usage"));
		this.io = new snow_system_io_IO(this);
		this.input = new snow_system_input_Input(this);
		this.audio = new snow_system_audio_Audio(this);
		this.assets = new snow_system_assets_Assets(this);
		this.windowing = new snow_system_window_Windowing(this);
		this.was_ready = true;
		this.setup_app_path();
		this.setup_default_assets().then(function(_) {
			_g.setup_configs().then(function(_1) {
				_g.setup_default_window();
				snow_Snow.next($bind(_g,_g.on_ready));
			});
		}).error(function(e) {
			throw new js__$Boot_HaxeError(snow_types_Error.init("snow / cannot recover from error: " + e));
		});
		snow_api_Promises.step();
		while(snow_Snow.next_queue.length > 0) this.cycle_next_queue();
	}
	,do_internal_update: function(dt) {
		this.io.module.update();
		this.input.update();
		this.audio.update();
		this.host.update(dt);
	}
	,on_ready: function() {
		this.is_ready = true;
		this.host.ready();
	}
	,on_snow_update: function() {
		if(this.freeze) return;
		snow_api_Timer.update();
		snow_api_Promises.step();
		this.cycle_next_queue();
		if(!this.is_ready) return;
		this.host.on_internal_update();
		this.host.on_internal_render();
	}
	,on_event: function(_event) {
		if(_event.type != 3 && _event.type != 0 && _event.type != 5 && _event.type != 6) null;
		if(_event.type != 3) null;
		if(this.is_ready) {
			this.io.module.on_event(_event);
			this.audio.on_event(_event);
			this.windowing.on_event(_event);
			this.input.on_event(_event);
			this.host.onevent(_event);
		}
		var _g = _event.type;
		if(_g != null) switch(_g) {
		case 1:
			this.on_snow_init();
			break;
		case 2:
			this.on_snow_ready();
			break;
		case 3:
			this.on_snow_update();
			break;
		case 7:case 8:
			this.shutdown();
			break;
		case 4:
			haxe_Log.trace("     i / snow / " + "Goodbye.",{ fileName : "Snow.hx", lineNumber : 319, className : "snow.Snow", methodName : "on_event"});
			break;
		default:
		} else {
		}
	}
	,cycle_next_queue: function() {
		var count = snow_Snow.next_queue.length;
		if(count > 0) {
			var _g = 0;
			while(_g < count) {
				var i = _g++;
				(snow_Snow.next_queue.shift())();
			}
		}
	}
	,setup_app_path: function() {
	}
	,setup_default_assets: function() {
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			if(!_g.snow_config.config_custom_assets) {
				_g.assets.manifest_path = _g.snow_config.config_assets_path;
				_g.default_asset_list().then(function(list) {
					_g.assets.list = list;
				}).error(function(e) {
					null;
				}).then(resolve);
			}
		});
	}
	,setup_configs: function() {
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			if(!_g.snow_config.config_custom_runtime) _g.default_runtime_config().then(function(_runtime_conf) {
				_g.config.runtime = _runtime_conf;
			}).error(function(error) {
				throw new js__$Boot_HaxeError(snow_types_Error.init("config / failed / default runtime config failed to parse as JSON. cannot recover. " + error));
			}).then(function() {
				_g.setup_host_config();
				resolve();
			}); else {
				_g.setup_host_config();
				resolve();
			}
		});
	}
	,setup_host_config: function() {
		this.config = this.host.config(this.config);
	}
	,setup_default_window: function() {
		if(this.config.has_window == true) {
			this.window = this.windowing.create(this.config.window);
			if(this.window.handle == null) throw new js__$Boot_HaxeError(snow_types_Error.windowing("requested default window cannot be created. cannot continue"));
		} else null;
	}
	,default_config: function() {
		return { has_window : true, runtime : { }, window : this.default_window_config(), render : this.default_render_config(), web : { no_context_menu : true, prevent_default_keys : [snow_system_input_Keycodes.left,snow_system_input_Keycodes.right,snow_system_input_Keycodes.up,snow_system_input_Keycodes.down,snow_system_input_Keycodes.backspace,snow_system_input_Keycodes.tab,snow_system_input_Keycodes["delete"]], prevent_default_mouse_wheel : true, true_fullscreen : false}, 'native' : { audio_buffer_length : 176400, audio_buffer_count : 4}};
	}
	,default_runtime_config: function() {
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			var load = _g.io.data_flow(_g.snow_config.config_runtime_path,snow_system_assets_AssetJSON.processor);
			load.then(resolve).error(function(error) {
				switch(error[1]) {
				case 3:
					var val = error[2];
					reject(error);
					break;
				default:
					resolve();
				}
			});
		});
	}
	,default_asset_list: function() {
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			var list_path = _g.assets.root + _g.assets.manifest_path;
			var load = _g.io.data_flow(list_path,snow_system_assets_AssetJSON.processor);
			load.then(function(json) {
				var _list = json;
				resolve(_list);
			}).error(reject);
		});
	}
	,default_render_config: function() {
		return { depth : false, stencil : false, antialiasing : 0, red_bits : 8, green_bits : 8, blue_bits : 8, alpha_bits : 8, depth_bits : 0, stencil_bits : 0, opengl : { minor : 0, major : 0, profile : 0}};
	}
	,default_window_config: function() {
		var conf = { fullscreen_desktop : true, fullscreen : false, borderless : false, resizable : true, x : 536805376, y : 536805376, width : 960, height : 640, title : "snow app"};
		return conf;
	}
	,set_freeze: function(_freeze) {
		this.freeze = _freeze;
		if(_freeze) this.audio.suspend(); else this.audio.resume();
		return this.freeze;
	}
	,get_time: function() {
		return snow_Snow.core.timestamp();
	}
	,get_uniqueid: function() {
		return this.make_uniqueid();
	}
	,make_uniqueid: function(val) {
		if(val == null) val = Std.random(2147483647);
		var r = val % 62 | 0;
		var q = val / 62 | 0;
		if(q > 0) return this.make_uniqueid(q) + (r > 9?(function($this) {
			var $r;
			var ascii = 65 + (r - 10);
			if(ascii > 90) ascii += 6;
			$r = String.fromCharCode(ascii);
			return $r;
		}(this)):(r == null?"null":"" + r).charAt(0));
		return Std.string(r > 9?(function($this) {
			var $r;
			var ascii1 = 65 + (r - 10);
			if(ascii1 > 90) ascii1 += 6;
			$r = String.fromCharCode(ascii1);
			return $r;
		}(this)):(r == null?"null":"" + r).charAt(0));
	}
	,typename: function(t) {
		return Type.getClassName(Type.getClass(t));
	}
	,__class__: snow_Snow
};
var snow_api__$Debug_LogError = $hxClasses["snow.api._Debug.LogError"] = { __ename__ : ["snow","api","_Debug","LogError"], __constructs__ : ["RequireString"] };
snow_api__$Debug_LogError.RequireString = function(detail) { var $x = ["RequireString",0,detail]; $x.__enum__ = snow_api__$Debug_LogError; return $x; };
var snow_api_Debug = function() { };
$hxClasses["snow.api.Debug"] = snow_api_Debug;
snow_api_Debug.__name__ = ["snow","api","Debug"];
snow_api_Debug._get_spacing = function(_file) {
	var _spaces = "";
	var _trace_length = _file.length + 4;
	var _diff = snow_api_Debug._log_width - _trace_length;
	if(_diff > 0) {
		var _g = 0;
		while(_g < _diff) {
			var i = _g++;
			_spaces += " ";
		}
	}
	return _spaces;
};
var snow_api_DebugError = $hxClasses["snow.api.DebugError"] = { __ename__ : ["snow","api","DebugError"], __constructs__ : ["assertion","null_assertion"] };
snow_api_DebugError.assertion = function(expr) { var $x = ["assertion",0,expr]; $x.__enum__ = snow_api_DebugError; return $x; };
snow_api_DebugError.null_assertion = function(expr) { var $x = ["null_assertion",1,expr]; $x.__enum__ = snow_api_DebugError; return $x; };
var snow_api_Promise = function(func) {
	this.was_caught = false;
	var _g = this;
	this.state = 0;
	this.reject_reactions = [];
	this.fulfill_reactions = [];
	this.settle_reactions = [];
	snow_api_Promises.queue(function() {
		func($bind(_g,_g.onfulfill),$bind(_g,_g.onreject));
		snow_api_Promises.defer(snow_api_Promises.next);
	});
};
$hxClasses["snow.api.Promise"] = snow_api_Promise;
snow_api_Promise.__name__ = ["snow","api","Promise"];
snow_api_Promise.all = function(list) {
	return new snow_api_Promise(function(ok,no) {
		var current = 0;
		var total = list.length;
		var fulfill_result = [];
		var reject_result = null;
		var all_state = 0;
		var single_ok = function(index,val) {
			if(all_state != 0) return;
			current++;
			fulfill_result[index] = val;
			if(total == current) {
				all_state = 1;
				ok(fulfill_result);
			}
		};
		var single_err = function(val1) {
			if(all_state != 0) return;
			all_state = 2;
			reject_result = val1;
			no(reject_result);
		};
		var index1 = 0;
		var _g = 0;
		while(_g < list.length) {
			var promise = list[_g];
			++_g;
			promise.then((function(f,a1) {
				return function(a2) {
					f(a1,a2);
				};
			})(single_ok,index1)).error(single_err);
			index1++;
		}
	});
};
snow_api_Promise.race = function(list) {
	return new snow_api_Promise(function(ok,no) {
		var settled = false;
		var single_ok = function(val) {
			if(settled) return;
			settled = true;
			ok(val);
		};
		var single_err = function(val1) {
			if(settled) return;
			settled = true;
			no(val1);
		};
		var _g = 0;
		while(_g < list.length) {
			var promise = list[_g];
			++_g;
			promise.then(single_ok).error(single_err);
		}
	});
};
snow_api_Promise.reject = function(reason) {
	return new snow_api_Promise(function(ok,no) {
		no(reason);
	});
};
snow_api_Promise.resolve = function(val) {
	return new snow_api_Promise(function(ok,no) {
		ok(val);
	});
};
snow_api_Promise.prototype = {
	then: function(on_fulfilled,on_rejected) {
		var _g = this.state;
		switch(_g) {
		case 0:
			this.add_fulfill(on_fulfilled);
			this.add_reject(on_rejected);
			return this.new_linked_promise();
		case 1:
			snow_api_Promises.defer(on_fulfilled,this.result);
			return snow_api_Promise.resolve(this.result);
		case 2:
			snow_api_Promises.defer(on_rejected,this.result);
			return snow_api_Promise.reject(this.result);
		}
	}
	,error: function(on_rejected) {
		var _g = this.state;
		switch(_g) {
		case 0:
			this.add_reject(on_rejected);
			return this.new_linked_resolve_empty();
		case 1:
			return snow_api_Promise.resolve(this.result);
		case 2:
			snow_api_Promises.defer(on_rejected,this.result);
			return snow_api_Promise.reject(this.result);
		}
	}
	,toString: function() {
		return "Promise { state:" + this.state_string() + ", result:" + Std.string(this.result) + " }";
	}
	,add_settle: function(f) {
		if(this.state == 0) this.settle_reactions.push(f); else snow_api_Promises.defer(f,this.result);
	}
	,new_linked_promise: function() {
		var _g = this;
		return new snow_api_Promise(function(f,r) {
			_g.add_settle(function(_) {
				if(_g.state == 1) f(_g.result); else r(_g.result);
			});
		});
	}
	,new_linked_resolve: function() {
		var _g = this;
		return new snow_api_Promise(function(f,r) {
			_g.add_settle(function(val) {
				f(val);
			});
		});
	}
	,new_linked_reject: function() {
		var _g = this;
		return new snow_api_Promise(function(f,r) {
			_g.add_settle(function(val) {
				r(val);
			});
		});
	}
	,new_linked_resolve_empty: function() {
		var _g = this;
		return new snow_api_Promise(function(f,r) {
			_g.add_settle(function(_) {
				f();
			});
		});
	}
	,new_linked_reject_empty: function() {
		var _g = this;
		return new snow_api_Promise(function(f,r) {
			_g.add_settle(function(_) {
				r();
			});
		});
	}
	,add_fulfill: function(f) {
		if(f != null) this.fulfill_reactions.push(f);
	}
	,add_reject: function(f) {
		if(f != null) {
			this.was_caught = true;
			this.reject_reactions.push(f);
		}
	}
	,onfulfill: function(val) {
		this.state = 1;
		this.result = val;
		while(this.fulfill_reactions.length > 0) {
			var fn = this.fulfill_reactions.shift();
			fn(this.result);
		}
		this.onsettle();
	}
	,onreject: function(reason) {
		this.state = 2;
		this.result = reason;
		while(this.reject_reactions.length > 0) {
			var fn = this.reject_reactions.shift();
			fn(this.result);
		}
		this.onsettle();
	}
	,onsettle: function() {
		while(this.settle_reactions.length > 0) {
			var fn = this.settle_reactions.shift();
			fn(this.result);
		}
	}
	,onexception: function(err) {
		var _g = this;
		this.add_settle(function(_) {
			if(!_g.was_caught) {
				if(_g.state == 2) {
					throw new js__$Boot_HaxeError(snow_api_PromiseError.UnhandledPromiseRejection(_g.toString()));
					return;
				}
			}
		});
		if(this.state == 0) this.onreject(err);
	}
	,state_string: function() {
		var _g = this.state;
		switch(_g) {
		case 0:
			return "pending";
		case 1:
			return "fulfilled";
		case 2:
			return "rejected";
		}
	}
	,__class__: snow_api_Promise
};
var snow_api_Promises = function() { };
$hxClasses["snow.api.Promises"] = snow_api_Promises;
snow_api_Promises.__name__ = ["snow","api","Promises"];
snow_api_Promises.step = function() {
	snow_api_Promises.next();
	while(snow_api_Promises.defers.length > 0) {
		var defer = snow_api_Promises.defers.shift();
		defer.f(defer.a);
	}
};
snow_api_Promises.next = function() {
	if(snow_api_Promises.calls.length > 0) (snow_api_Promises.calls.shift())();
};
snow_api_Promises.defer = function(f,a) {
	if(f == null) return;
	snow_api_Promises.defers.push({ f : f, a : a});
};
snow_api_Promises.queue = function(f) {
	if(f == null) return;
	snow_api_Promises.calls.push(f);
};
var snow_api_PromiseError = $hxClasses["snow.api.PromiseError"] = { __ename__ : ["snow","api","PromiseError"], __constructs__ : ["UnhandledPromiseRejection"] };
snow_api_PromiseError.UnhandledPromiseRejection = function(err) { var $x = ["UnhandledPromiseRejection",0,err]; $x.__enum__ = snow_api_PromiseError; return $x; };
var snow_api_Timer = function(_time) {
	this.time = _time;
	snow_api_Timer.running_timers.push(this);
	this.fire_at = snow_Snow.core.timestamp() + this.time;
	this.running = true;
};
$hxClasses["snow.api.Timer"] = snow_api_Timer;
snow_api_Timer.__name__ = ["snow","api","Timer"];
snow_api_Timer.measure = function(f,pos) {
	var t0 = snow_Snow.core.timestamp();
	var r = f();
	haxe_Log.trace(snow_Snow.core.timestamp() - t0 + "s",pos);
	return r;
};
snow_api_Timer.update = function() {
	var now = snow_Snow.core.timestamp();
	var _g = 0;
	var _g1 = snow_api_Timer.running_timers;
	while(_g < _g1.length) {
		var timer = _g1[_g];
		++_g;
		if(timer.running) {
			if(timer.fire_at < now) {
				timer.fire_at += timer.time;
				timer.run();
			}
		}
	}
};
snow_api_Timer.delay = function(_time,_f) {
	var t = new snow_api_Timer(_time);
	t.run = function() {
		t.stop();
		_f();
	};
	return t;
};
snow_api_Timer.prototype = {
	run: function() {
	}
	,stop: function() {
		if(this.running) {
			this.running = false;
			HxOverrides.remove(snow_api_Timer.running_timers,this);
		}
	}
	,__class__: snow_api_Timer
};
var snow_api_buffers__$Float32Array_Float32Array_$Impl_$ = {};
$hxClasses["snow.api.buffers._Float32Array.Float32Array_Impl_"] = snow_api_buffers__$Float32Array_Float32Array_$Impl_$;
snow_api_buffers__$Float32Array_Float32Array_$Impl_$.__name__ = ["snow","api","buffers","_Float32Array","Float32Array_Impl_"];
snow_api_buffers__$Float32Array_Float32Array_$Impl_$.__set = function(this1,idx,val) {
	return this1[idx] = val;
};
snow_api_buffers__$Float32Array_Float32Array_$Impl_$.__get = function(this1,idx) {
	return this1[idx];
};
snow_api_buffers__$Float32Array_Float32Array_$Impl_$.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) byteOffset = 0;
	if(byteOffset == null) return new Float32Array(bytes.b.buffer);
	if(len == null) return new Float32Array(bytes.b.buffer,byteOffset);
	return new Float32Array(bytes.b.buffer,byteOffset,len);
};
snow_api_buffers__$Float32Array_Float32Array_$Impl_$.toBytes = function(this1) {
	return new haxe_io_Bytes(new Uint8Array(this1.buffer));
};
snow_api_buffers__$Float32Array_Float32Array_$Impl_$.toString = function(this1) {
	return "Float32Array [byteLength:" + this1.byteLength + ", length:" + this1.length + "]";
};
var snow_api_buffers__$Int32Array_Int32Array_$Impl_$ = {};
$hxClasses["snow.api.buffers._Int32Array.Int32Array_Impl_"] = snow_api_buffers__$Int32Array_Int32Array_$Impl_$;
snow_api_buffers__$Int32Array_Int32Array_$Impl_$.__name__ = ["snow","api","buffers","_Int32Array","Int32Array_Impl_"];
snow_api_buffers__$Int32Array_Int32Array_$Impl_$.__set = function(this1,idx,val) {
	return this1[idx] = val;
};
snow_api_buffers__$Int32Array_Int32Array_$Impl_$.__get = function(this1,idx) {
	return this1[idx];
};
snow_api_buffers__$Int32Array_Int32Array_$Impl_$.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) byteOffset = 0;
	if(byteOffset == null) return new Int32Array(bytes.b.buffer);
	if(len == null) return new Int32Array(bytes.b.buffer,byteOffset);
	return new Int32Array(bytes.b.buffer,byteOffset,len);
};
snow_api_buffers__$Int32Array_Int32Array_$Impl_$.toBytes = function(this1) {
	return new haxe_io_Bytes(new Uint8Array(this1.buffer));
};
snow_api_buffers__$Int32Array_Int32Array_$Impl_$.toString = function(this1) {
	return "Int32Array [byteLength:" + this1.byteLength + ", length:" + this1.length + "]";
};
var snow_api_buffers__$Uint8Array_Uint8Array_$Impl_$ = {};
$hxClasses["snow.api.buffers._Uint8Array.Uint8Array_Impl_"] = snow_api_buffers__$Uint8Array_Uint8Array_$Impl_$;
snow_api_buffers__$Uint8Array_Uint8Array_$Impl_$.__name__ = ["snow","api","buffers","_Uint8Array","Uint8Array_Impl_"];
snow_api_buffers__$Uint8Array_Uint8Array_$Impl_$.__set = function(this1,idx,val) {
	return this1[idx] = val;
};
snow_api_buffers__$Uint8Array_Uint8Array_$Impl_$.__get = function(this1,idx) {
	return this1[idx];
};
snow_api_buffers__$Uint8Array_Uint8Array_$Impl_$.fromBytes = function(bytes,byteOffset,len) {
	if(byteOffset == null) return new Uint8Array(bytes.b.buffer);
	if(len == null) return new Uint8Array(bytes.b.buffer,byteOffset);
	return new Uint8Array(bytes.b.buffer,byteOffset,len);
};
snow_api_buffers__$Uint8Array_Uint8Array_$Impl_$.toBytes = function(this1) {
	return new haxe_io_Bytes(new Uint8Array(this1.buffer));
};
snow_api_buffers__$Uint8Array_Uint8Array_$Impl_$.toString = function(this1) {
	return "Uint8Array [byteLength:" + this1.byteLength + ", length:" + this1.length + "]";
};
var snow_core_web_Core = function(_app) {
	this._time_now = 0.0;
	this._lf_timestamp = 0.016;
	this.start_timestamp = 0.0;
	this.app = _app;
	this.start_timestamp = this.timestamp();
};
$hxClasses["snow.core.web.Core"] = snow_core_web_Core;
snow_core_web_Core.__name__ = ["snow","core","web","Core"];
snow_core_web_Core.prototype = {
	init: function(_event_handler) {
		this.app.on_event({ type : 1});
		this.app.on_event({ type : 2});
		if(this.app.snow_config.has_loop) this.request_update();
	}
	,shutdown: function() {
	}
	,timestamp: function() {
		var now;
		if(window.performance != null) now = window.performance.now() / 1000.0; else now = haxe_Timer.stamp();
		return now - this.start_timestamp;
	}
	,request_update: function() {
		var _g = this;
		if(($_=window,$bind($_,$_.requestAnimationFrame)) != null) window.requestAnimationFrame($bind(this,this.snow_core_loop)); else {
			haxe_Log.trace("     i / core / " + ("warning : requestAnimationFrame not found, falling back to render_rate! render_rate:" + this.app.host.render_rate),{ fileName : "Core.hx", lineNumber : 76, className : "snow.core.web.Core", methodName : "request_update"});
			window.setTimeout(function() {
				var _now = _g.timestamp();
				_g._time_now += _now - _g._lf_timestamp;
				_g.snow_core_loop(_g._time_now * 1000.0);
				_g._lf_timestamp = _now;
			},this.app.host.render_rate * 1000.0 | 0);
		}
	}
	,snow_core_loop: function(_t) {
		if(_t == null) _t = 0.016;
		this.update();
		this.app.on_event({ type : 3});
		this.request_update();
		return true;
	}
	,update: function() {
	}
	,__class__: snow_core_web_Core
};
var snow_modules_interfaces_Assets = function() { };
$hxClasses["snow.modules.interfaces.Assets"] = snow_modules_interfaces_Assets;
snow_modules_interfaces_Assets.__name__ = ["snow","modules","interfaces","Assets"];
snow_modules_interfaces_Assets.prototype = {
	__class__: snow_modules_interfaces_Assets
};
var snow_core_web_assets_Assets = function(_system) {
	this.system = _system;
};
$hxClasses["snow.core.web.assets.Assets"] = snow_core_web_assets_Assets;
snow_core_web_assets_Assets.__name__ = ["snow","core","web","assets","Assets"];
snow_core_web_assets_Assets.__interfaces__ = [snow_modules_interfaces_Assets];
snow_core_web_assets_Assets.prototype = {
	init: function() {
	}
	,update: function() {
	}
	,destroy: function() {
	}
	,on_event: function(event) {
	}
	,image_load_info: function(_id,_components) {
		if(_components == null) _components = 4;
		return this.system.app.io.data_flow(_id,snow_system_assets_AssetImage.processor);
	}
	,image_info_from_element: function(_id,_elem) {
		var width_pot = this.nearest_power_of_two(_elem.width);
		var height_pot = this.nearest_power_of_two(_elem.height);
		var image_bytes = this.POT_bytes_from_element(_elem.width,_elem.height,width_pot,height_pot,_elem);
		var info = { id : _id, bpp : 4, width : _elem.width, height : _elem.height, width_actual : width_pot, height_actual : height_pot, bpp_source : 4, pixels : image_bytes};
		image_bytes = null;
		return info;
	}
	,image_info_from_pixels: function(_id,_width,_height,_pixels) {
		var width_pot = this.nearest_power_of_two(_width);
		var height_pot = this.nearest_power_of_two(_height);
		var image_bytes = this.POT_bytes_from_pixels(_width,_height,width_pot,height_pot,_pixels);
		var info = { id : _id, bpp : 4, width : _width, height : _height, width_actual : width_pot, height_actual : height_pot, bpp_source : 4, pixels : image_bytes};
		image_bytes = null;
		return info;
	}
	,image_info_from_bytes: function(_id,_bytes,_components) {
		if(_components == null) _components = 4;
		var _g = this;
		if(_id == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_id == null"));
		if(_bytes == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_bytes == null"));
		if(!(_bytes.length != 0)) throw new js__$Boot_HaxeError(snow_api_DebugError.assertion("_bytes.length != 0"));
		var ext = haxe_io_Path.extension(_id);
		return new snow_api_Promise(function(resolve,reject) {
			var str = "";
			var i = 0;
			var len = _bytes.length;
			while(i < len) str += String.fromCharCode((function($this) {
				var $r;
				var a;
				{
					var idx = i++;
					a = _bytes[idx];
				}
				$r = a & 255;
				return $r;
			}(this)));
			var b64 = window.btoa(str);
			var src = "data:image/" + ext + ";base64," + b64;
			var _img = new Image();
			_img.onload = function(_) {
				var info = _g.image_info_from_element(_id,_img);
				resolve(info);
			};
			_img.onerror = function(e) {
				reject(snow_types_Error.error("failed to load image from bytes, on error: " + e));
			};
			_img.src = src;
		});
	}
	,POT_bytes_from_pixels: function(_width,_height,_width_pot,_height_pot,_source) {
		var tmp_canvas;
		var _this = window.document;
		tmp_canvas = _this.createElement("canvas");
		tmp_canvas.width = _width_pot;
		tmp_canvas.height = _height_pot;
		var tmp_context = tmp_canvas.getContext("2d",null);
		tmp_context.clearRect(0,0,tmp_canvas.width,tmp_canvas.height);
		var image_bytes = null;
		var _pixels = new Uint8ClampedArray(_source.buffer);
		var _imgdata = tmp_context.createImageData(_width,_height);
		_imgdata.data.set(_pixels);
		try {
			tmp_context.putImageData(_imgdata,0,0);
			image_bytes = tmp_context.getImageData(0,0,tmp_canvas.width,tmp_canvas.height);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			var tips = "- textures served from file:/// throw security errors\n";
			tips += "- textures served over http:// work for cross origin byte requests";
			haxe_Log.trace("   i / assets / " + tips,{ fileName : "Assets.hx", lineNumber : 197, className : "snow.core.web.assets.Assets", methodName : "POT_bytes_from_pixels"});
			throw new js__$Boot_HaxeError(e);
		}
		tmp_canvas = null;
		tmp_context = null;
		_imgdata = null;
		var view = image_bytes.data;
		var len = null;
		var this1;
		if(view != null) this1 = new Uint8Array(view); else this1 = null;
		return this1;
	}
	,POT_bytes_from_element: function(_width,_height,_width_pot,_height_pot,_source) {
		var tmp_canvas;
		var _this = window.document;
		tmp_canvas = _this.createElement("canvas");
		tmp_canvas.width = _width_pot;
		tmp_canvas.height = _height_pot;
		var tmp_context = tmp_canvas.getContext("2d",null);
		tmp_context.clearRect(0,0,tmp_canvas.width,tmp_canvas.height);
		tmp_context.drawImage(_source,0,0,_width,_height);
		var image_bytes = null;
		try {
			image_bytes = tmp_context.getImageData(0,0,tmp_canvas.width,tmp_canvas.height);
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			var tips = "- textures served from file:/// throw security errors\n";
			tips += "- textures served over http:// work for cross origin byte requests";
			haxe_Log.trace("   i / assets / " + tips,{ fileName : "Assets.hx", lineNumber : 233, className : "snow.core.web.assets.Assets", methodName : "POT_bytes_from_element"});
			throw new js__$Boot_HaxeError(e);
		}
		tmp_canvas = null;
		tmp_context = null;
		var view = image_bytes.data;
		var len = null;
		var this1;
		if(view != null) this1 = new Uint8Array(view); else this1 = null;
		return this1;
	}
	,nearest_power_of_two: function(_value) {
		if(!snow_core_web_assets_Assets.POT) return _value;
		_value--;
		_value |= _value >> 1;
		_value |= _value >> 2;
		_value |= _value >> 4;
		_value |= _value >> 8;
		_value |= _value >> 16;
		_value++;
		return _value;
	}
	,__class__: snow_core_web_assets_Assets
};
var snow_core_web_input_DOMKeys = function() { };
$hxClasses["snow.core.web.input.DOMKeys"] = snow_core_web_input_DOMKeys;
snow_core_web_input_DOMKeys.__name__ = ["snow","core","web","input","DOMKeys"];
snow_core_web_input_DOMKeys.dom_key_to_keycode = function(_keycode) {
	switch(_keycode) {
	case 16:
		return snow_system_input_Keycodes.lshift;
	case 17:
		return snow_system_input_Keycodes.lctrl;
	case 18:
		return snow_system_input_Keycodes.lalt;
	case 20:
		return snow_system_input_Keycodes.capslock;
	case 33:
		return snow_system_input_Keycodes.pageup;
	case 34:
		return snow_system_input_Keycodes.pagedown;
	case 35:
		return snow_system_input_Keycodes.end;
	case 36:
		return snow_system_input_Keycodes.home;
	case 37:
		return snow_system_input_Keycodes.left;
	case 38:
		return snow_system_input_Keycodes.up;
	case 39:
		return snow_system_input_Keycodes.right;
	case 40:
		return snow_system_input_Keycodes.down;
	case 44:
		return snow_system_input_Keycodes.printscreen;
	case 45:
		return snow_system_input_Keycodes.insert;
	case 46:
		return snow_system_input_Keycodes["delete"];
	case 91:
		return snow_system_input_Keycodes.lmeta;
	case 93:
		return snow_system_input_Keycodes.rmeta;
	case 224:
		return snow_system_input_Keycodes.lmeta;
	case 96:
		return snow_system_input_Keycodes.kp_0;
	case 97:
		return snow_system_input_Keycodes.kp_1;
	case 98:
		return snow_system_input_Keycodes.kp_2;
	case 99:
		return snow_system_input_Keycodes.kp_3;
	case 100:
		return snow_system_input_Keycodes.kp_4;
	case 101:
		return snow_system_input_Keycodes.kp_5;
	case 102:
		return snow_system_input_Keycodes.kp_6;
	case 103:
		return snow_system_input_Keycodes.kp_7;
	case 104:
		return snow_system_input_Keycodes.kp_8;
	case 105:
		return snow_system_input_Keycodes.kp_9;
	case 106:
		return snow_system_input_Keycodes.kp_multiply;
	case 107:
		return snow_system_input_Keycodes.kp_plus;
	case 109:
		return snow_system_input_Keycodes.kp_minus;
	case 110:
		return snow_system_input_Keycodes.kp_decimal;
	case 111:
		return snow_system_input_Keycodes.kp_divide;
	case 144:
		return snow_system_input_Keycodes.numlockclear;
	case 112:
		return snow_system_input_Keycodes.f1;
	case 113:
		return snow_system_input_Keycodes.f2;
	case 114:
		return snow_system_input_Keycodes.f3;
	case 115:
		return snow_system_input_Keycodes.f4;
	case 116:
		return snow_system_input_Keycodes.f5;
	case 117:
		return snow_system_input_Keycodes.f6;
	case 118:
		return snow_system_input_Keycodes.f7;
	case 119:
		return snow_system_input_Keycodes.f8;
	case 120:
		return snow_system_input_Keycodes.f9;
	case 121:
		return snow_system_input_Keycodes.f10;
	case 122:
		return snow_system_input_Keycodes.f11;
	case 123:
		return snow_system_input_Keycodes.f12;
	case 124:
		return snow_system_input_Keycodes.f13;
	case 125:
		return snow_system_input_Keycodes.f14;
	case 126:
		return snow_system_input_Keycodes.f15;
	case 127:
		return snow_system_input_Keycodes.f16;
	case 128:
		return snow_system_input_Keycodes.f17;
	case 129:
		return snow_system_input_Keycodes.f18;
	case 130:
		return snow_system_input_Keycodes.f19;
	case 131:
		return snow_system_input_Keycodes.f20;
	case 132:
		return snow_system_input_Keycodes.f21;
	case 133:
		return snow_system_input_Keycodes.f22;
	case 134:
		return snow_system_input_Keycodes.f23;
	case 135:
		return snow_system_input_Keycodes.f24;
	case 160:
		return snow_system_input_Keycodes.caret;
	case 161:
		return snow_system_input_Keycodes.exclaim;
	case 162:
		return snow_system_input_Keycodes.quotedbl;
	case 163:
		return snow_system_input_Keycodes.hash;
	case 164:
		return snow_system_input_Keycodes.dollar;
	case 165:
		return snow_system_input_Keycodes.percent;
	case 166:
		return snow_system_input_Keycodes.ampersand;
	case 167:
		return snow_system_input_Keycodes.underscore;
	case 168:
		return snow_system_input_Keycodes.leftparen;
	case 169:
		return snow_system_input_Keycodes.rightparen;
	case 170:
		return snow_system_input_Keycodes.asterisk;
	case 171:
		return snow_system_input_Keycodes.plus;
	case 172:
		return snow_system_input_Keycodes.backslash;
	case 173:
		return snow_system_input_Keycodes.minus;
	case 174:
		return snow_system_input_Keycodes.leftbracket;
	case 175:
		return snow_system_input_Keycodes.rightbracket;
	case 176:
		return snow_system_input_Keycodes.backquote;
	case 181:
		return snow_system_input_Keycodes.audiomute;
	case 182:
		return snow_system_input_Keycodes.volumedown;
	case 183:
		return snow_system_input_Keycodes.volumeup;
	case 188:
		return snow_system_input_Keycodes.comma;
	case 190:
		return snow_system_input_Keycodes.period;
	case 191:
		return snow_system_input_Keycodes.slash;
	case 192:
		return snow_system_input_Keycodes.backquote;
	case 219:
		return snow_system_input_Keycodes.leftbracket;
	case 221:
		return snow_system_input_Keycodes.rightbracket;
	case 220:
		return snow_system_input_Keycodes.backslash;
	case 222:
		return snow_system_input_Keycodes.quote;
	}
	return _keycode;
};
var snow_modules_interfaces_Input = function() { };
$hxClasses["snow.modules.interfaces.Input"] = snow_modules_interfaces_Input;
snow_modules_interfaces_Input.__name__ = ["snow","modules","interfaces","Input"];
snow_modules_interfaces_Input.prototype = {
	__class__: snow_modules_interfaces_Input
};
var snow_system_input_Scancodes = function() { };
$hxClasses["snow.system.input.Scancodes"] = snow_system_input_Scancodes;
snow_system_input_Scancodes.__name__ = ["snow","system","input","Scancodes"];
snow_system_input_Scancodes.$name = function(scancode) {
	var res = null;
	if(scancode >= 0 && scancode < snow_system_input_Scancodes.scancode_names.length) res = snow_system_input_Scancodes.scancode_names[scancode];
	if(res != null) return res; else return "";
};
var snow_system_input_Keycodes = function() { };
$hxClasses["snow.system.input.Keycodes"] = snow_system_input_Keycodes;
snow_system_input_Keycodes.__name__ = ["snow","system","input","Keycodes"];
snow_system_input_Keycodes.from_scan = function(scancode) {
	return scancode | snow_system_input_Scancodes.MASK;
};
snow_system_input_Keycodes.to_scan = function(keycode) {
	if((keycode & snow_system_input_Scancodes.MASK) != 0) return keycode & ~snow_system_input_Scancodes.MASK;
	switch(keycode) {
	case snow_system_input_Keycodes.enter:
		return snow_system_input_Scancodes.enter;
	case snow_system_input_Keycodes.escape:
		return snow_system_input_Scancodes.escape;
	case snow_system_input_Keycodes.backspace:
		return snow_system_input_Scancodes.backspace;
	case snow_system_input_Keycodes.tab:
		return snow_system_input_Scancodes.tab;
	case snow_system_input_Keycodes.space:
		return snow_system_input_Scancodes.space;
	case snow_system_input_Keycodes.slash:
		return snow_system_input_Scancodes.slash;
	case snow_system_input_Keycodes.key_0:
		return snow_system_input_Scancodes.key_0;
	case snow_system_input_Keycodes.key_1:
		return snow_system_input_Scancodes.key_1;
	case snow_system_input_Keycodes.key_2:
		return snow_system_input_Scancodes.key_2;
	case snow_system_input_Keycodes.key_3:
		return snow_system_input_Scancodes.key_3;
	case snow_system_input_Keycodes.key_4:
		return snow_system_input_Scancodes.key_4;
	case snow_system_input_Keycodes.key_5:
		return snow_system_input_Scancodes.key_5;
	case snow_system_input_Keycodes.key_6:
		return snow_system_input_Scancodes.key_6;
	case snow_system_input_Keycodes.key_7:
		return snow_system_input_Scancodes.key_7;
	case snow_system_input_Keycodes.key_8:
		return snow_system_input_Scancodes.key_8;
	case snow_system_input_Keycodes.key_9:
		return snow_system_input_Scancodes.key_9;
	case snow_system_input_Keycodes.semicolon:
		return snow_system_input_Scancodes.semicolon;
	case snow_system_input_Keycodes.equals:
		return snow_system_input_Scancodes.equals;
	case snow_system_input_Keycodes.leftbracket:
		return snow_system_input_Scancodes.leftbracket;
	case snow_system_input_Keycodes.backslash:
		return snow_system_input_Scancodes.backslash;
	case snow_system_input_Keycodes.rightbracket:
		return snow_system_input_Scancodes.rightbracket;
	case snow_system_input_Keycodes.backquote:
		return snow_system_input_Scancodes.grave;
	case snow_system_input_Keycodes.key_a:
		return snow_system_input_Scancodes.key_a;
	case snow_system_input_Keycodes.key_b:
		return snow_system_input_Scancodes.key_b;
	case snow_system_input_Keycodes.key_c:
		return snow_system_input_Scancodes.key_c;
	case snow_system_input_Keycodes.key_d:
		return snow_system_input_Scancodes.key_d;
	case snow_system_input_Keycodes.key_e:
		return snow_system_input_Scancodes.key_e;
	case snow_system_input_Keycodes.key_f:
		return snow_system_input_Scancodes.key_f;
	case snow_system_input_Keycodes.key_g:
		return snow_system_input_Scancodes.key_g;
	case snow_system_input_Keycodes.key_h:
		return snow_system_input_Scancodes.key_h;
	case snow_system_input_Keycodes.key_i:
		return snow_system_input_Scancodes.key_i;
	case snow_system_input_Keycodes.key_j:
		return snow_system_input_Scancodes.key_j;
	case snow_system_input_Keycodes.key_k:
		return snow_system_input_Scancodes.key_k;
	case snow_system_input_Keycodes.key_l:
		return snow_system_input_Scancodes.key_l;
	case snow_system_input_Keycodes.key_m:
		return snow_system_input_Scancodes.key_m;
	case snow_system_input_Keycodes.key_n:
		return snow_system_input_Scancodes.key_n;
	case snow_system_input_Keycodes.key_o:
		return snow_system_input_Scancodes.key_o;
	case snow_system_input_Keycodes.key_p:
		return snow_system_input_Scancodes.key_p;
	case snow_system_input_Keycodes.key_q:
		return snow_system_input_Scancodes.key_q;
	case snow_system_input_Keycodes.key_r:
		return snow_system_input_Scancodes.key_r;
	case snow_system_input_Keycodes.key_s:
		return snow_system_input_Scancodes.key_s;
	case snow_system_input_Keycodes.key_t:
		return snow_system_input_Scancodes.key_t;
	case snow_system_input_Keycodes.key_u:
		return snow_system_input_Scancodes.key_u;
	case snow_system_input_Keycodes.key_v:
		return snow_system_input_Scancodes.key_v;
	case snow_system_input_Keycodes.key_w:
		return snow_system_input_Scancodes.key_w;
	case snow_system_input_Keycodes.key_x:
		return snow_system_input_Scancodes.key_x;
	case snow_system_input_Keycodes.key_y:
		return snow_system_input_Scancodes.key_y;
	case snow_system_input_Keycodes.key_z:
		return snow_system_input_Scancodes.key_z;
	}
	return snow_system_input_Scancodes.unknown;
};
snow_system_input_Keycodes.$name = function(keycode) {
	if((keycode & snow_system_input_Scancodes.MASK) != 0) return snow_system_input_Scancodes.$name(keycode & ~snow_system_input_Scancodes.MASK);
	switch(keycode) {
	case snow_system_input_Keycodes.enter:
		return snow_system_input_Scancodes.$name(snow_system_input_Scancodes.enter);
	case snow_system_input_Keycodes.escape:
		return snow_system_input_Scancodes.$name(snow_system_input_Scancodes.escape);
	case snow_system_input_Keycodes.backspace:
		return snow_system_input_Scancodes.$name(snow_system_input_Scancodes.backspace);
	case snow_system_input_Keycodes.tab:
		return snow_system_input_Scancodes.$name(snow_system_input_Scancodes.tab);
	case snow_system_input_Keycodes.space:
		return snow_system_input_Scancodes.$name(snow_system_input_Scancodes.space);
	case snow_system_input_Keycodes["delete"]:
		return snow_system_input_Scancodes.$name(snow_system_input_Scancodes["delete"]);
	default:
		var decoder = new haxe_Utf8();
		decoder.__b += String.fromCharCode(keycode);
		return decoder.__b;
	}
};
var snow_core_web_input_Input = function(_system) {
	this.gamepads_supported = false;
	this.system = _system;
};
$hxClasses["snow.core.web.input.Input"] = snow_core_web_input_Input;
snow_core_web_input_Input.__name__ = ["snow","core","web","input","Input"];
snow_core_web_input_Input.__interfaces__ = [snow_modules_interfaces_Input];
snow_core_web_input_Input.prototype = {
	init: function() {
		window.document.addEventListener("keypress",$bind(this,this.on_keypress));
		window.document.addEventListener("keydown",$bind(this,this.on_keydown));
		window.document.addEventListener("keyup",$bind(this,this.on_keyup));
		this.active_gamepads = new haxe_ds_IntMap();
		this.gamepads_supported = this.get_gamepad_list() != null;
		haxe_Log.trace("    i / input / " + ("Gamepads supported: " + Std.string(this.gamepads_supported)),{ fileName : "Input.hx", lineNumber : 42, className : "snow.core.web.input.Input", methodName : "init"});
	}
	,update: function() {
		if(this.gamepads_supported) this.poll_gamepads();
	}
	,destroy: function() {
	}
	,listen: function(window) {
		window.handle.addEventListener("contextmenu",$bind(this,this.on_contextmenu));
		window.handle.addEventListener("mousedown",$bind(this,this.on_mousedown));
		window.handle.addEventListener("mouseup",$bind(this,this.on_mouseup));
		window.handle.addEventListener("mousemove",$bind(this,this.on_mousemove));
		window.handle.addEventListener("mousewheel",$bind(this,this.on_mousewheel));
		window.handle.addEventListener("wheel",$bind(this,this.on_mousewheel));
		window.handle.addEventListener("touchstart",$bind(this,this.on_touchdown));
		window.handle.addEventListener("touchend",$bind(this,this.on_touchup));
		window.handle.addEventListener("touchmove",$bind(this,this.on_touchmove));
	}
	,unlisten: function(window) {
	}
	,on_event: function(_event) {
	}
	,text_input_start: function() {
	}
	,text_input_stop: function() {
	}
	,text_input_rect: function(x,y,w,h) {
	}
	,gamepad_add: function(id) {
	}
	,gamepad_remove: function(id) {
	}
	,poll_gamepads: function() {
		if(!this.gamepads_supported) return;
		var list = this.get_gamepad_list();
		if(list != null) {
			var _g1 = 0;
			var _g = list.length;
			while(_g1 < _g) {
				var i = _g1++;
				if(list[i] != null) this.handle_gamepad(list[i]); else {
					var _gamepad = this.active_gamepads.h[i];
					if(_gamepad != null) this.system.dispatch_gamepad_device_event(_gamepad.index,2,snow_Snow.core.timestamp());
					this.active_gamepads.remove(i);
				}
			}
		}
	}
	,handle_gamepad: function(_gamepad) {
		if(_gamepad == null) return;
		if(!(function($this) {
			var $r;
			var key = _gamepad.index;
			$r = $this.active_gamepads.h.hasOwnProperty(key);
			return $r;
		}(this))) {
			var _new_gamepad = { id : _gamepad.id, index : _gamepad.index, axes : [], buttons : [], timestamp : snow_Snow.core.timestamp()};
			var axes = _gamepad.axes;
			var _g = 0;
			while(_g < axes.length) {
				var value = axes[_g];
				++_g;
				_new_gamepad.axes.push(value);
			}
			var _button_list = _gamepad.buttons;
			var _g1 = 0;
			while(_g1 < _button_list.length) {
				var _button = _button_list[_g1];
				++_g1;
				_new_gamepad.buttons.push({ pressed : false, value : 0});
			}
			this.active_gamepads.h[_new_gamepad.index] = _new_gamepad;
			this.system.dispatch_gamepad_device_event(_new_gamepad.index,1,_new_gamepad.timestamp);
		} else {
			var gamepad;
			var key1 = _gamepad.index;
			gamepad = this.active_gamepads.h[key1];
			if(gamepad.id != _gamepad.id) gamepad.id = _gamepad.id;
			var axes_changed = [];
			var buttons_changed = [];
			var last_axes = gamepad.axes;
			var last_buttons = gamepad.buttons;
			var new_axes = _gamepad.axes;
			var new_buttons = _gamepad.buttons;
			var axis_index = 0;
			var _g2 = 0;
			while(_g2 < new_axes.length) {
				var axis = new_axes[_g2];
				++_g2;
				if(axis != last_axes[axis_index]) {
					axes_changed.push(axis_index);
					gamepad.axes[axis_index] = axis;
				}
				axis_index++;
			}
			var button_index = 0;
			var _g3 = 0;
			while(_g3 < new_buttons.length) {
				var button = new_buttons[_g3];
				++_g3;
				if(button.value != last_buttons[button_index].value) {
					buttons_changed.push(button_index);
					gamepad.buttons[button_index].pressed = button.pressed;
					gamepad.buttons[button_index].value = button.value;
				}
				button_index++;
			}
			var _g4 = 0;
			while(_g4 < axes_changed.length) {
				var index = axes_changed[_g4];
				++_g4;
				this.system.dispatch_gamepad_axis_event(gamepad.index,index,new_axes[index],gamepad.timestamp);
			}
			var _g5 = 0;
			while(_g5 < buttons_changed.length) {
				var index1 = buttons_changed[_g5];
				++_g5;
				if(new_buttons[index1].pressed == true) this.system.dispatch_gamepad_button_down_event(gamepad.index,index1,new_buttons[index1].value,gamepad.timestamp); else this.system.dispatch_gamepad_button_up_event(gamepad.index,index1,new_buttons[index1].value,gamepad.timestamp);
			}
		}
	}
	,fail_gamepads: function() {
		this.gamepads_supported = false;
		haxe_Log.trace("    i / input / " + "Gamepads are not supported in this browser :(",{ fileName : "Input.hx", lineNumber : 262, className : "snow.core.web.input.Input", methodName : "fail_gamepads"});
	}
	,get_gamepad_list: function() {
		var modernizr = window.Modernizr;
		if(modernizr != null) {
			if(modernizr.gamepads == true) {
				if(($_=window.navigator,$bind($_,$_.getGamepads)) != null) return window.navigator.getGamepads();
				if(window.navigator.webkitGetGamepads != null) return window.navigator.webkitGetGamepads();
				this.fail_gamepads();
			} else this.fail_gamepads();
		}
		return null;
	}
	,on_mousedown: function(_mouse_event) {
		var _window = this.system.app.windowing.window_from_handle(_mouse_event.target);
		this.system.dispatch_mouse_down_event(_mouse_event.pageX - window.pageXOffset - _window.x,_mouse_event.pageY - window.pageYOffset - _window.y,_mouse_event.button + 1,_mouse_event.timeStamp,_window.id);
	}
	,on_mouseup: function(_mouse_event) {
		var _window = this.system.app.windowing.window_from_handle(_mouse_event.target);
		this.system.dispatch_mouse_up_event(_mouse_event.pageX - window.pageXOffset - _window.x,_mouse_event.pageY - window.pageYOffset - _window.y,_mouse_event.button + 1,_mouse_event.timeStamp,_window.id);
	}
	,on_mousemove: function(_mouse_event) {
		var _window = this.system.app.windowing.window_from_handle(_mouse_event.target);
		var _movement_x = _mouse_event.movementX;
		var _movement_y = _mouse_event.movementY;
		if(_mouse_event.webkitMovementX != null) {
			_movement_x = _mouse_event.webkitMovementX;
			_movement_y = _mouse_event.webkitMovementY;
		} else if(_mouse_event.mozMovementX != null) {
			_movement_x = _mouse_event.mozMovementX;
			_movement_y = _mouse_event.mozMovementY;
		}
		this.system.dispatch_mouse_move_event(_mouse_event.pageX - window.pageXOffset - _window.x,_mouse_event.pageY - window.pageYOffset - _window.y,_movement_x,_movement_y,_mouse_event.timeStamp,_window.id);
	}
	,on_mousewheel: function(_wheel_event) {
		if(this.system.app.config.web.prevent_default_mouse_wheel) _wheel_event.preventDefault();
		var _window = this.system.app.windowing.window_from_handle(_wheel_event.target);
		var _x = 0;
		var _y = 0;
		if(_wheel_event.deltaY != null) _y = _wheel_event.deltaY; else if(_wheel_event.wheelDeltaY != null) _y = -_wheel_event.wheelDeltaY / 3 | 0;
		if(_wheel_event.deltaX != null) _x = _wheel_event.deltaX; else if(_wheel_event.wheelDeltaX != null) _x = -_wheel_event.wheelDeltaX / 3 | 0;
		this.system.dispatch_mouse_wheel_event(Math.round(_x / 16),Math.round(_y / 16),_wheel_event.timeStamp,_window.id);
	}
	,on_contextmenu: function(_event) {
		if(this.system.app.config.web.no_context_menu) _event.preventDefault();
	}
	,on_keypress: function(_key_event) {
		if(_key_event.which != 0 && HxOverrides.indexOf(snow_core_web_input_Input._keypress_blacklist,_key_event.keyCode,0) == -1) {
			var _text = String.fromCharCode(_key_event.charCode);
			this.system.dispatch_text_event(_text,0,_text.length,2,_key_event.timeStamp,1);
		}
	}
	,on_keydown: function(_key_event) {
		var _keycode = this.convert_keycode(_key_event.keyCode);
		var _scancode = snow_system_input_Keycodes.to_scan(_keycode);
		var _mod_state = this.mod_state_from_event(_key_event);
		if(HxOverrides.indexOf(this.system.app.config.web.prevent_default_keys,_keycode,0) != -1) _key_event.preventDefault();
		this.system.dispatch_key_down_event(_keycode,_scancode,_key_event.repeat,_mod_state,_key_event.timeStamp,1);
	}
	,on_keyup: function(_key_event) {
		var _keycode = this.convert_keycode(_key_event.keyCode);
		var _scancode = snow_system_input_Keycodes.to_scan(_keycode);
		var _mod_state = this.mod_state_from_event(_key_event);
		if(HxOverrides.indexOf(this.system.app.config.web.prevent_default_keys,_keycode,0) != -1) _key_event.preventDefault();
		this.system.dispatch_key_up_event(_keycode,_scancode,_key_event.repeat,_mod_state,_key_event.timeStamp,1);
	}
	,mod_state_from_event: function(_key_event) {
		var _none = !_key_event.altKey && !_key_event.ctrlKey && !_key_event.metaKey && !_key_event.shiftKey;
		return { none : _none, lshift : _key_event.shiftKey, rshift : _key_event.shiftKey, lctrl : _key_event.ctrlKey, rctrl : _key_event.ctrlKey, lalt : _key_event.altKey, ralt : _key_event.altKey, lmeta : _key_event.metaKey, rmeta : _key_event.metaKey, num : false, caps : false, mode : false, ctrl : _key_event.ctrlKey, shift : _key_event.shiftKey, alt : _key_event.altKey, meta : _key_event.metaKey};
	}
	,convert_keycode: function(dom_keycode) {
		if(dom_keycode >= 65 && dom_keycode <= 90) return dom_keycode + 32;
		return snow_core_web_input_DOMKeys.dom_key_to_keycode(dom_keycode);
	}
	,on_touchdown: function(_touch_event) {
		var _window = this.system.app.windowing.window_from_handle(_touch_event.target);
		var _g = 0;
		var _g1 = _touch_event.changedTouches;
		while(_g < _g1.length) {
			var touch = _g1[_g];
			++_g;
			var _x = touch.pageX - window.pageXOffset - _window.x;
			var _y = touch.pageY - window.pageYOffset - _window.y;
			_x = _x / _window.width;
			_y = _y / _window.height;
			this.system.dispatch_touch_down_event(_x,_y,touch.identifier,snow_Snow.core.timestamp());
		}
	}
	,on_touchup: function(_touch_event) {
		var _window = this.system.app.windowing.window_from_handle(_touch_event.target);
		var _g = 0;
		var _g1 = _touch_event.changedTouches;
		while(_g < _g1.length) {
			var touch = _g1[_g];
			++_g;
			var _x = touch.pageX - window.pageXOffset - _window.x;
			var _y = touch.pageY - window.pageYOffset - _window.y;
			_x = _x / _window.width;
			_y = _y / _window.height;
			this.system.dispatch_touch_up_event(_x,_y,touch.identifier,snow_Snow.core.timestamp());
		}
	}
	,on_touchmove: function(_touch_event) {
		var _window = this.system.app.windowing.window_from_handle(_touch_event.target);
		var _g = 0;
		var _g1 = _touch_event.changedTouches;
		while(_g < _g1.length) {
			var touch = _g1[_g];
			++_g;
			var _x = touch.pageX - window.pageXOffset - _window.x;
			var _y = touch.pageY - window.pageYOffset - _window.y;
			_x = _x / _window.width;
			_y = _y / _window.height;
			this.system.dispatch_touch_move_event(_x,_y,0,0,touch.identifier,snow_Snow.core.timestamp());
		}
	}
	,__class__: snow_core_web_input_Input
};
var snow_modules_interfaces_IO = function() { };
$hxClasses["snow.modules.interfaces.IO"] = snow_modules_interfaces_IO;
snow_modules_interfaces_IO.__name__ = ["snow","modules","interfaces","IO"];
snow_modules_interfaces_IO.prototype = {
	__class__: snow_modules_interfaces_IO
};
var snow_core_web_io_IO = function(_system) {
	this.system = _system;
};
$hxClasses["snow.core.web.io.IO"] = snow_core_web_io_IO;
snow_core_web_io_IO.__name__ = ["snow","core","web","io","IO"];
snow_core_web_io_IO.__interfaces__ = [snow_modules_interfaces_IO];
snow_core_web_io_IO.prototype = {
	url_open: function(_url) {
		if(_url != null && _url.length > 0) window.open(_url,"_blank");
	}
	,data_load: function(_path,_options) {
		return new snow_api_Promise(function(resolve,reject) {
			var _async = true;
			var _binary = true;
			if(_options != null) {
				if(_options.binary != null) _binary = _options.binary;
			}
			var request = new XMLHttpRequest();
			request.open("GET",_path,_async);
			if(_binary) request.overrideMimeType("text/plain; charset=x-user-defined"); else request.overrideMimeType("text/plain; charset=UTF-8");
			if(_async) request.responseType = "arraybuffer";
			request.onload = function(data) {
				if(request.status == 200) resolve((function($this) {
					var $r;
					var elements = request.response;
					var len = null;
					var this1;
					if(elements != null) this1 = new Uint8Array(elements); else this1 = null;
					$r = this1;
					return $r;
				}(this))); else reject(snow_types_Error.error("request status was " + request.status + " / " + request.statusText));
			};
			request.send();
		});
	}
	,data_save: function(_path,_data,_options) {
		return false;
	}
	,string_save_path: function(_slot) {
		if(_slot == null) _slot = 0;
		var _pref_path = "<localstorage>";
		var _slot_path = this.string_slot_id(_slot);
		var _path = haxe_io_Path.join([_pref_path,_slot_path]);
		return haxe_io_Path.normalize(_path);
	}
	,init: function() {
	}
	,update: function() {
	}
	,destroy: function() {
	}
	,on_event: function(_event) {
	}
	,string_slot_id: function(_slot) {
		if(_slot == null) _slot = 0;
		var _parts = this.system.app.snow_config.app_package.split(".");
		var _appname = _parts.pop();
		var _org = _parts.join(".");
		return "" + _org + "/" + _appname + "/" + this.system.string_save_prefix + "." + _slot;
	}
	,string_slot_save: function(_slot,_contents) {
		if(_slot == null) _slot = 0;
		var storage = window.localStorage;
		if(storage == null) {
			haxe_Log.trace("       i / io / " + "localStorage isnt supported in this browser?!",{ fileName : "IO.hx", lineNumber : 114, className : "snow.core.web.io.IO", methodName : "string_slot_save"});
			return false;
		}
		var _id = this.string_slot_id(_slot);
		storage.setItem(_id,_contents);
		return true;
	}
	,string_slot_load: function(_slot) {
		if(_slot == null) _slot = 0;
		var storage = window.localStorage;
		if(storage == null) {
			haxe_Log.trace("       i / io / " + "localStorage isnt supported in this browser?!",{ fileName : "IO.hx", lineNumber : 132, className : "snow.core.web.io.IO", methodName : "string_slot_load"});
			return null;
		}
		var _id = this.string_slot_id(_slot);
		return storage.getItem(_id);
	}
	,string_slot_encode: function(_string) {
		return window.btoa(_string);
	}
	,string_slot_decode: function(_string) {
		return window.atob(_string);
	}
	,__class__: snow_core_web_io_IO
};
var snow_modules_interfaces_Windowing = function() { };
$hxClasses["snow.modules.interfaces.Windowing"] = snow_modules_interfaces_Windowing;
snow_modules_interfaces_Windowing.__name__ = ["snow","modules","interfaces","Windowing"];
snow_modules_interfaces_Windowing.prototype = {
	__class__: snow_modules_interfaces_Windowing
};
var snow_core_web_window_Windowing = function(_system) {
	this._hidden_event_name = "";
	this._hidden_name = "";
	this._cursor_visible = true;
	this._pre_fs_body_margin = "0";
	this._pre_fs_body_overflow = "0";
	this._pre_fs_height = 0;
	this._pre_fs_width = 0;
	this._pre_fs_s_height = "";
	this._pre_fs_s_width = "";
	this._pre_fs_margin = "0";
	this._pre_fs_padding = "0";
	this.seq_window = 1;
	this.system = _system;
	this.fs_windows = [];
	this.gl_contexts = new haxe_ds_IntMap();
};
$hxClasses["snow.core.web.window.Windowing"] = snow_core_web_window_Windowing;
snow_core_web_window_Windowing.__name__ = ["snow","core","web","window","Windowing"];
snow_core_web_window_Windowing.__interfaces__ = [snow_modules_interfaces_Windowing];
snow_core_web_window_Windowing.prototype = {
	init: function() {
		this.listen_for_visibility();
		this.listen_for_resize();
	}
	,update: function() {
	}
	,destroy: function() {
	}
	,on_event: function(event) {
	}
	,_copy_config: function(_config) {
		return { borderless : _config.borderless, fullscreen : _config.fullscreen, fullscreen_desktop : _config.fullscreen_desktop, height : _config.height, no_input : _config.no_input, resizable : _config.resizable, title : _config.title, width : _config.width, x : _config.x, y : _config.y};
	}
	,create: function(render_config,_config,on_created) {
		var _window_id = this.seq_window;
		var _handle;
		var _this = window.document;
		_handle = _this.createElement("canvas");
		var config = this._copy_config(_config);
		_handle.width = config.width;
		_handle.height = config.height;
		_handle.style.display = "block";
		_handle.style.position = "relative";
		_handle.style.background = "#000";
		window.document.body.appendChild(_handle);
		var _gl_context = js_html__$CanvasElement_CanvasUtil.getContextWebGL(_handle,{ alpha : false, premultipliedAlpha : false, antialias : render_config.antialiasing > 0});
		if(_gl_context == null) {
			var msg = "WebGL is required to run this!<br/><br/>";
			msg += "visit http://get.webgl.org/ for help <br/>";
			msg += "and contact the developer of the application";
			this.internal_fallback(msg);
			throw new js__$Boot_HaxeError(snow_types_Error.windowing(msg));
		}
		if(snow_modules_opengl_web_GL.current_context == null) snow_modules_opengl_web_GL.current_context = _gl_context;
		this.gl_contexts.h[_window_id] = _gl_context;
		var _window_pos = this.get_real_window_position(_handle);
		config.x = _window_pos.x;
		config.y = _window_pos.y;
		if(config.title != null && config.title != "") window.document.title = config.title;
		on_created(_handle,_window_id,{ config : config, render_config : render_config});
		_handle.setAttribute("id","window" + _window_id);
		this.seq_window++;
	}
	,destroy_window: function(_window) {
		window.document.body.removeChild(_window.handle);
	}
	,close: function(_window) {
		_window.handle.style.display = "none";
	}
	,show: function(_window) {
		_window.handle.style.display = null;
	}
	,internal_resize: function(_window,_w,_h) {
		this.system.app.dispatch_system_event({ type : 5, window : { type : 7, timestamp : snow_Snow.core.timestamp(), window_id : _window.id, event : { x : _w, y : _h}}});
		this.system.app.dispatch_system_event({ type : 5, window : { type : 6, timestamp : snow_Snow.core.timestamp(), window_id : _window.id, event : { x : _w, y : _h}}});
	}
	,update_window: function(_window) {
		var _rect = _window.handle.getBoundingClientRect();
		if(_rect.left != _window.x || _rect.top != _window.y) this.system.app.dispatch_system_event({ type : 5, window : { type : 5, timestamp : snow_Snow.core.timestamp(), window_id : _window.id, event : { x : _rect.left, y : _rect.top}}});
		if(_rect.width != _window.width || _rect.height != _window.height) this.internal_resize(_window,_rect.width,_rect.height);
		_rect = null;
	}
	,render: function(_window) {
		var _window_gl_context = this.gl_contexts.h[_window.id];
		if(snow_modules_opengl_web_GL.current_context != _window_gl_context) snow_modules_opengl_web_GL.current_context = _window_gl_context;
	}
	,swap: function(_window) {
	}
	,simple_message: function(_window,message,title) {
		if(title == null) title = "";
		window.alert(message);
	}
	,set_size: function(_window,w,h) {
		_window.handle.width = w;
		_window.handle.height = h;
		_window.handle.style.width = "" + w + "px";
		_window.handle.style.height = "" + h + "px";
		this.internal_resize(_window,w,h);
	}
	,set_position: function(_window,x,y) {
		_window.handle.style.left = "" + x + "px";
		_window.handle.style.top = "" + y + "px";
	}
	,get_real_window_position: function(handle) {
		var curleft = 0;
		var curtop = 0;
		var _obj = handle;
		var _has_parent = true;
		var _max_count = 0;
		while(_has_parent == true) {
			_max_count++;
			if(_max_count > 100) {
				_has_parent = false;
				break;
			}
			if(_obj.offsetParent != null) {
				curleft += _obj.offsetLeft;
				curtop += _obj.offsetTop;
				_obj = _obj.offsetParent;
			} else _has_parent = false;
		}
		return { x : curleft, y : curtop};
	}
	,set_title: function(_window,title) {
		window.document.title = title;
	}
	,set_max_size: function(_window,w,h) {
		_window.handle.style.maxWidth = "" + w + "px";
		_window.handle.style.maxHeight = "" + h + "px";
	}
	,set_min_size: function(_window,w,h) {
		_window.handle.style.minWidth = "" + w + "px";
		_window.handle.style.minHeight = "" + h + "px";
	}
	,internal_fullscreen: function(_window,fullscreen) {
		var _handle = _window.handle;
		if(fullscreen) {
			if(HxOverrides.indexOf(this.fs_windows,_window,0) == -1) this.fs_windows.push(_window);
		} else HxOverrides.remove(this.fs_windows,_window);
		var true_fullscreen = this.system.app.config.web.true_fullscreen;
		if(fullscreen) {
			if(true_fullscreen) {
				if($bind(_handle,_handle.requestFullscreen) == null) {
					if(_handle.requestFullScreen == null) {
						if(_handle.webkitRequestFullscreen == null) {
							if(_handle.mozRequestFullScreen == null) {
							} else _handle.mozRequestFullScreen();
						} else _handle.webkitRequestFullscreen();
					} else _handle.requestFullScreen(null);
				} else _handle.requestFullscreen();
			} else {
				this._pre_fs_padding = _handle.style.padding;
				this._pre_fs_margin = _handle.style.margin;
				this._pre_fs_s_width = _handle.style.width;
				this._pre_fs_s_height = _handle.style.height;
				this._pre_fs_width = _handle.width;
				this._pre_fs_height = _handle.height;
				this._pre_fs_body_margin = window.document.body.style.margin;
				this._pre_fs_body_overflow = window.document.body.style.overflow;
				_handle.style.margin = "0";
				_handle.style.padding = "0";
				_handle.style.width = window.innerWidth + "px";
				_handle.style.height = window.innerHeight + "px";
				_handle.width = window.innerWidth;
				_handle.height = window.innerHeight;
				window.document.body.style.margin = "0";
				window.document.body.style.overflow = "hidden";
			}
		} else if(true_fullscreen) {
		} else {
			_handle.style.padding = this._pre_fs_padding;
			_handle.style.margin = this._pre_fs_margin;
			_handle.style.width = this._pre_fs_s_width;
			_handle.style.height = this._pre_fs_s_height;
			_handle.width = this._pre_fs_width;
			_handle.height = this._pre_fs_height;
			window.document.body.style.margin = this._pre_fs_body_margin;
			window.document.body.style.overflow = this._pre_fs_body_overflow;
		}
	}
	,fullscreen: function(_window,fullscreen) {
		this.internal_fullscreen(_window,fullscreen);
	}
	,bordered: function(_window,bordered) {
	}
	,grab: function(_window,grabbed) {
		if(grabbed) {
			if(($_=_window.handle,$bind($_,$_.requestPointerLock)) == null) {
				if(_window.handle.webkitRequestPointerLock == null) {
					if(_window.handle.mozRequestPointerLock == null) {
					} else _window.handle.mozRequestPointerLock();
				} else _window.handle.webkitRequestPointerLock();
			} else _window.handle.requestPointerLock();
		} else {
		}
	}
	,set_cursor_position: function(_window,x,y) {
	}
	,system_enable_cursor: function(enable) {
		if(this.cursor_style == null) {
			var _this = window.document;
			this.cursor_style = _this.createElement("style");
			this.cursor_style.innerHTML = "* { cursor:none; }";
		}
		if(enable && !this._cursor_visible) {
			this._cursor_visible = true;
			window.document.body.removeChild(this.cursor_style);
		} else if(!enable && this._cursor_visible) {
			this._cursor_visible = false;
			window.document.body.appendChild(this.cursor_style);
		}
	}
	,system_lock_cursor: function(enable) {
		if(this.system.app.window != null) this.grab(this.system.app.window,enable);
	}
	,system_enable_vsync: function(enable) {
		return -1;
	}
	,display_count: function() {
		return 1;
	}
	,display_mode_count: function(display) {
		return 1;
	}
	,display_native_mode: function(display) {
		return { format : 0, refresh_rate : 0, width : window.screen.width, height : window.screen.height};
	}
	,display_current_mode: function(display) {
		return this.display_native_mode(display);
	}
	,display_mode: function(display,mode_index) {
		return this.display_native_mode(display);
	}
	,display_bounds: function(display) {
		return { x : 0, y : 0, width : window.innerWidth, height : window.innerHeight};
	}
	,display_name: function(display) {
		return window.navigator.vendor;
	}
	,listen: function(_window) {
		_window.handle.addEventListener("mouseleave",$bind(this,this.on_internal_leave));
		_window.handle.addEventListener("mouseenter",$bind(this,this.on_internal_enter));
		if(_window.config.fullscreen) {
			this.internal_fullscreen(_window,_window.config.fullscreen);
			_window.config.width = _window.handle.width;
			_window.config.height = _window.handle.height;
		}
	}
	,unlisten: function(_window) {
		_window.handle.removeEventListener("mouseleave",$bind(this,this.on_internal_leave));
		_window.handle.removeEventListener("mouseenter",$bind(this,this.on_internal_enter));
		HxOverrides.remove(this.fs_windows,_window);
	}
	,on_internal_leave: function(_mouse_event) {
		var _window = this.system.window_from_handle(_mouse_event.target);
		this.system.app.dispatch_system_event({ type : 5, window : { type : 12, timestamp : _mouse_event.timeStamp, window_id : _window.id, event : _mouse_event}});
	}
	,on_internal_enter: function(_mouse_event) {
		var _window = this.system.window_from_handle(_mouse_event.target);
		this.system.app.dispatch_system_event({ type : 5, window : { type : 11, timestamp : _mouse_event.timeStamp, window_id : _window.id, event : _mouse_event}});
	}
	,listen_for_resize: function() {
		var _g = this;
		window.onresize = function(e) {
			if(!_g.system.app.config.web.true_fullscreen) {
				var _g1 = 0;
				var _g2 = _g.fs_windows;
				while(_g1 < _g2.length) {
					var $window = _g2[_g1];
					++_g1;
					$window.set_size(window.innerWidth,window.innerHeight);
					_g.internal_resize($window,$window.width,$window.height);
				}
			}
		};
	}
	,listen_for_visibility: function() {
		if(typeof document.hidden !== undefined) {
			this._hidden_name = "hidden";
			this._hidden_event_name = "visibilitychange";
		} else if(typeof document.mozHidden !== undefined ) {
			this._hidden_name = "mozHidden";
			this._hidden_name = "mozvisibilitychange";
		} else if(typeof document.msHidden !== "undefined") {
			this._hidden_name = "msHidden";
			this._hidden_event_name = "msvisibilitychange";
		} else if(typeof document.webkitHidden !== "undefined") {
			this._hidden_name = "webkitHidden";
			this._hidden_event_name = "webkitvisibilitychange";
		}
		if(this._hidden_name != "" && this._hidden_event_name != "") window.document.addEventListener(this._hidden_event_name,$bind(this,this.on_visibility_change));
	}
	,on_visibility_change: function(jsevent) {
		var _event = { type : 5, window : { type : 2, timestamp : snow_Snow.core.timestamp(), window_id : 1, event : jsevent}};
		if(document[this._hidden_name]) {
			_event.window.type = 3;
			this.system.app.on_event(_event);
			_event.window.type = 8;
			this.system.app.on_event(_event);
			_event.window.type = 14;
			this.system.app.on_event(_event);
		} else {
			_event.window.type = 2;
			this.system.app.on_event(_event);
			_event.window.type = 10;
			this.system.app.on_event(_event);
			_event.window.type = 13;
			this.system.app.on_event(_event);
		}
	}
	,internal_fallback: function(message) {
		var text_el;
		var overlay_el;
		var _this = window.document;
		text_el = _this.createElement("div");
		var _this1 = window.document;
		overlay_el = _this1.createElement("div");
		text_el.style.marginLeft = "auto";
		text_el.style.marginRight = "auto";
		text_el.style.color = "#d3d3d3";
		text_el.style.marginTop = "5em";
		text_el.style.fontSize = "1.4em";
		text_el.style.fontFamily = "helvetica,sans-serif";
		text_el.innerHTML = message;
		overlay_el.style.top = "0";
		overlay_el.style.left = "0";
		overlay_el.style.width = "100%";
		overlay_el.style.height = "100%";
		overlay_el.style.display = "block";
		overlay_el.style.minWidth = "100%";
		overlay_el.style.minHeight = "100%";
		overlay_el.style.textAlign = "center";
		overlay_el.style.position = "absolute";
		overlay_el.style.background = "rgba(1,1,1,0.90)";
		overlay_el.appendChild(text_el);
		window.document.body.appendChild(overlay_el);
	}
	,__class__: snow_core_web_window_Windowing
};
var snow_modules_interfaces_Audio = function() { };
$hxClasses["snow.modules.interfaces.Audio"] = snow_modules_interfaces_Audio;
snow_modules_interfaces_Audio.__name__ = ["snow","modules","interfaces","Audio"];
snow_modules_interfaces_Audio.prototype = {
	__class__: snow_modules_interfaces_Audio
};
var snow_modules_howlerjs_Audio = function(_system) {
	this.system = _system;
	this.suspended_sounds = [];
	this.handles = new haxe_ds_ObjectMap();
};
$hxClasses["snow.modules.howlerjs.Audio"] = snow_modules_howlerjs_Audio;
snow_modules_howlerjs_Audio.__name__ = ["snow","modules","howlerjs","Audio"];
snow_modules_howlerjs_Audio.__interfaces__ = [snow_modules_interfaces_Audio];
snow_modules_howlerjs_Audio.prototype = {
	init: function() {
	}
	,update: function() {
	}
	,destroy: function() {
	}
	,on_event: function(event) {
	}
	,suspend: function() {
		var $it0 = this.handles.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			if(sound.get_playing()) {
				sound.toggle();
				this.suspended_sounds.push(sound);
			}
		}
	}
	,resume: function() {
		while(this.suspended_sounds.length > 0) {
			var sound = this.suspended_sounds.pop();
			sound.toggle();
		}
	}
	,info_from_id: function(_id,_format) {
		if(_format == null) {
			var _ext = haxe_io_Path.extension(_id);
			switch(_ext) {
			case "wav":
				_format = 2;
				break;
			case "ogg":
				_format = 1;
				break;
			case "pcm":
				_format = 3;
				break;
			default:
				_format = 0;
			}
		}
		return { format : _format, id : _id, handle : null, data : null};
	}
	,create_sound: function(_id,_name,_streaming,_format) {
		if(_streaming == null) _streaming = false;
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			var _path = _g.system.app.assets.root + _id;
			var info = _g.info_from_id(_path,_format);
			var sound = new snow_modules_howlerjs_sound_Sound(_g.system,_name,_streaming);
			info.handle = new window.Howl({ urls : [_path], onend : function() {
				_g.system.app.audio.module._on_end(info.handle);
			}, onloaderror : function() {
				reject(snow_types_Error.error("failed to create sound " + _name + " from " + _id));
			}, onload : function() {
				info.handle = this;
				sound.set_info(info);
				var key = info.handle;
				_g.handles.set(key,sound);
				resolve(sound);
			}});
		});
	}
	,create_sound_from_bytes: function(_name,_bytes,_format) {
		throw new js__$Boot_HaxeError(snow_types_Error.error("unimplemented / wip"));
	}
	,_on_end: function(handle) {
		var sound;
		var key = handle;
		sound = this.handles.h[key.__id__];
		if(sound != null) sound.emit("end");
	}
	,__class__: snow_modules_howlerjs_Audio
};
var snow_system_audio_Sound = function(_system,_name,_is_stream) {
	if(_is_stream == null) _is_stream = false;
	this.is_stream = false;
	this.position_bytes = 0;
	this.length_bytes = 0;
	this.duration = 0.0;
	this.position = 0.0;
	this.looping = false;
	this.pan = 0.0;
	this.volume = 1.0;
	this.pitch = 1.0;
	this.loaded = false;
	this.paused = false;
	this.playing = false;
	this.name = "";
	this.name = _name;
	this.system = _system;
	this.is_stream = _is_stream;
};
$hxClasses["snow.system.audio.Sound"] = snow_system_audio_Sound;
snow_system_audio_Sound.__name__ = ["snow","system","audio","Sound"];
snow_system_audio_Sound.prototype = {
	emit: function(_event) {
		this.system.sound_event(this,_event);
	}
	,on: function(_event,_handler) {
		this.system.on(this.name,_event,_handler);
	}
	,off: function(_event,_handler) {
		this.system.off(this.name,_event,_handler);
	}
	,play: function() {
		haxe_Log.trace("    i / sound / " + "Sound:play called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 102, className : "snow.system.audio.Sound", methodName : "play"});
	}
	,loop: function() {
		haxe_Log.trace("    i / sound / " + "Sound:loop called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 104, className : "snow.system.audio.Sound", methodName : "loop"});
	}
	,stop: function() {
		haxe_Log.trace("    i / sound / " + "Sound:stop called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 106, className : "snow.system.audio.Sound", methodName : "stop"});
	}
	,pause: function() {
		haxe_Log.trace("    i / sound / " + "Sound:pause called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 108, className : "snow.system.audio.Sound", methodName : "pause"});
	}
	,destroy: function() {
		haxe_Log.trace("    i / sound / " + "Sound:destroy called in root Sound module. Nothing will happen.",{ fileName : "Sound.hx", lineNumber : 110, className : "snow.system.audio.Sound", methodName : "destroy"});
	}
	,internal_update: function() {
	}
	,internal_play: function() {
	}
	,internal_loop: function() {
	}
	,internal_stop: function() {
	}
	,internal_pause: function() {
	}
	,toggle: function() {
		this.set_playing(!this.get_playing());
		if(this.get_playing()) {
			if(this.get_looping()) this.loop(); else this.play();
		} else this.pause();
	}
	,get_playing: function() {
		return this.playing;
	}
	,get_paused: function() {
		return this.paused;
	}
	,get_loaded: function() {
		return this.loaded;
	}
	,get_info: function() {
		return this.info;
	}
	,set_info: function(_info) {
		return this.info = _info;
	}
	,get_pan: function() {
		return this.pan;
	}
	,get_pitch: function() {
		return this.pitch;
	}
	,get_volume: function() {
		return this.volume;
	}
	,get_looping: function() {
		return this.looping;
	}
	,get_position: function() {
		return this.position;
	}
	,get_position_bytes: function() {
		return this.position_bytes;
	}
	,get_length_bytes: function() {
		return this.length_bytes;
	}
	,get_duration: function() {
		return 0;
	}
	,set_playing: function(_playing) {
		return this.playing = _playing;
	}
	,set_paused: function(_paused) {
		return this.paused = _paused;
	}
	,set_loaded: function(_loaded) {
		return this.loaded = _loaded;
	}
	,set_pan: function(_pan) {
		return this.pan = _pan;
	}
	,set_pitch: function(_pitch) {
		return this.pitch = _pitch;
	}
	,set_volume: function(_volume) {
		return this.volume = _volume;
	}
	,set_position: function(_position) {
		return this.position = _position;
	}
	,set_looping: function(_looping) {
		return this.looping = _looping;
	}
	,set_position_bytes: function(_position_bytes) {
		return this.position_bytes = _position_bytes;
	}
	,__class__: snow_system_audio_Sound
};
var snow_modules_howlerjs_sound_Sound = function(_system,_name,_is_stream) {
	if(_is_stream == null) _is_stream = false;
	snow_system_audio_Sound.call(this,_system,_name,_is_stream);
};
$hxClasses["snow.modules.howlerjs.sound.Sound"] = snow_modules_howlerjs_sound_Sound;
snow_modules_howlerjs_sound_Sound.__name__ = ["snow","modules","howlerjs","sound","Sound"];
snow_modules_howlerjs_sound_Sound.__super__ = snow_system_audio_Sound;
snow_modules_howlerjs_sound_Sound.prototype = $extend(snow_system_audio_Sound.prototype,{
	set_info: function(_info) {
		if(this.get_info() != null) this.destroy();
		this.info = null;
		if(_info == null) {
			haxe_Log.trace("    i / sound / " + "not creating sound, info was null",{ fileName : "Sound.hx", lineNumber : 27, className : "snow.modules.howlerjs.sound.Sound", methodName : "set_info"});
			return this.get_info();
		}
		this.info = _info;
		this.set_loaded(true);
		return this.get_info();
	}
	,set_pan: function(_pan) {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.pos3d(this.get_pan());
		return this.pan = _pan;
	}
	,set_volume: function(_volume) {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.volume(_volume);
		return this.volume = _volume;
	}
	,set_pitch: function(_pitch) {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.rate(_pitch);
		return this.pitch = _pitch;
	}
	,set_position: function(_position) {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.pos(_position);
		return this.position = _position;
	}
	,get_position: function() {
		if(this.get_info() != null && this.get_info().handle != null) return this.get_info().handle.pos();
		return this.position;
	}
	,get_duration: function() {
		if(this.get_info() != null && this.get_info().handle != null) return this.get_info().handle._duration;
		return 0;
	}
	,play: function() {
		if(this.get_info() != null && this.get_info().handle != null) {
			this.set_playing(true);
			this.set_looping(false);
			this.get_info().handle.loop(false);
			this.get_info().handle.play();
			if(this.get_info() != null && this.get_info().handle != null) {
				this.get_info().handle.rate(this.get_pitch());
				this.get_info().handle.volume(this.get_volume());
				this.get_info().handle.pos3d(this.get_pan());
			}
		}
	}
	,loop: function() {
		if(this.get_info() != null && this.get_info().handle != null) {
			this.set_playing(true);
			this.set_looping(true);
			this.get_info().handle.loop(true);
			this.get_info().handle.play();
			if(this.get_info() != null && this.get_info().handle != null) {
				this.get_info().handle.rate(this.get_pitch());
				this.get_info().handle.volume(this.get_volume());
				this.get_info().handle.pos3d(this.get_pan());
			}
		}
	}
	,stop: function() {
		this.set_playing(false);
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.stop();
	}
	,pause: function() {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.pause();
	}
	,destroy: function() {
		if(this.get_info() != null && this.get_info().handle != null) this.get_info().handle.unload();
		this.system.kill(this);
	}
	,ensure_parameters: function() {
		if(this.get_info() != null && this.get_info().handle != null) {
			this.get_info().handle.rate(this.get_pitch());
			this.get_info().handle.volume(this.get_volume());
			this.get_info().handle.pos3d(this.get_pan());
		}
	}
	,__class__: snow_modules_howlerjs_sound_Sound
});
var snow_modules_opengl_web_GL = function() { };
$hxClasses["snow.modules.opengl.web.GL"] = snow_modules_opengl_web_GL;
snow_modules_opengl_web_GL.__name__ = ["snow","modules","opengl","web","GL"];
snow_modules_opengl_web_GL.versionString = function() {
	var ver = snow_modules_opengl_web_GL.current_context.getParameter(7938);
	var slver = snow_modules_opengl_web_GL.current_context.getParameter(35724);
	var ren = snow_modules_opengl_web_GL.current_context.getParameter(7937);
	var ven = snow_modules_opengl_web_GL.current_context.getParameter(7936);
	return "/ " + ver + " / " + slver + " / " + ren + " / " + ven + " /";
};
snow_modules_opengl_web_GL.activeTexture = function(texture) {
	snow_modules_opengl_web_GL.current_context.activeTexture(texture);
};
snow_modules_opengl_web_GL.attachShader = function(program,shader) {
	snow_modules_opengl_web_GL.current_context.attachShader(program,shader);
};
snow_modules_opengl_web_GL.bindAttribLocation = function(program,index,name) {
	snow_modules_opengl_web_GL.current_context.bindAttribLocation(program,index,name);
};
snow_modules_opengl_web_GL.bindBuffer = function(target,buffer) {
	snow_modules_opengl_web_GL.current_context.bindBuffer(target,buffer);
};
snow_modules_opengl_web_GL.bindFramebuffer = function(target,framebuffer) {
	snow_modules_opengl_web_GL.current_context.bindFramebuffer(target,framebuffer);
};
snow_modules_opengl_web_GL.bindRenderbuffer = function(target,renderbuffer) {
	snow_modules_opengl_web_GL.current_context.bindRenderbuffer(target,renderbuffer);
};
snow_modules_opengl_web_GL.bindTexture = function(target,texture) {
	snow_modules_opengl_web_GL.current_context.bindTexture(target,texture);
};
snow_modules_opengl_web_GL.blendColor = function(red,green,blue,alpha) {
	snow_modules_opengl_web_GL.current_context.blendColor(red,green,blue,alpha);
};
snow_modules_opengl_web_GL.blendEquation = function(mode) {
	snow_modules_opengl_web_GL.current_context.blendEquation(mode);
};
snow_modules_opengl_web_GL.blendEquationSeparate = function(modeRGB,modeAlpha) {
	snow_modules_opengl_web_GL.current_context.blendEquationSeparate(modeRGB,modeAlpha);
};
snow_modules_opengl_web_GL.blendFunc = function(sfactor,dfactor) {
	snow_modules_opengl_web_GL.current_context.blendFunc(sfactor,dfactor);
};
snow_modules_opengl_web_GL.blendFuncSeparate = function(srcRGB,dstRGB,srcAlpha,dstAlpha) {
	snow_modules_opengl_web_GL.current_context.blendFuncSeparate(srcRGB,dstRGB,srcAlpha,dstAlpha);
};
snow_modules_opengl_web_GL.bufferData = function(target,data,usage) {
	snow_modules_opengl_web_GL.current_context.bufferData(target,data,usage);
};
snow_modules_opengl_web_GL.bufferSubData = function(target,offset,data) {
	snow_modules_opengl_web_GL.current_context.bufferSubData(target,offset,data);
};
snow_modules_opengl_web_GL.checkFramebufferStatus = function(target) {
	return snow_modules_opengl_web_GL.current_context.checkFramebufferStatus(target);
};
snow_modules_opengl_web_GL.clear = function(mask) {
	snow_modules_opengl_web_GL.current_context.clear(mask);
};
snow_modules_opengl_web_GL.clearColor = function(red,green,blue,alpha) {
	snow_modules_opengl_web_GL.current_context.clearColor(red,green,blue,alpha);
};
snow_modules_opengl_web_GL.clearDepth = function(depth) {
	snow_modules_opengl_web_GL.current_context.clearDepth(depth);
};
snow_modules_opengl_web_GL.clearStencil = function(s) {
	snow_modules_opengl_web_GL.current_context.clearStencil(s);
};
snow_modules_opengl_web_GL.colorMask = function(red,green,blue,alpha) {
	snow_modules_opengl_web_GL.current_context.colorMask(red,green,blue,alpha);
};
snow_modules_opengl_web_GL.compileShader = function(shader) {
	snow_modules_opengl_web_GL.current_context.compileShader(shader);
};
snow_modules_opengl_web_GL.compressedTexImage2D = function(target,level,internalformat,width,height,border,data) {
	snow_modules_opengl_web_GL.current_context.compressedTexImage2D(target,level,internalformat,width,height,border,data);
};
snow_modules_opengl_web_GL.compressedTexSubImage2D = function(target,level,xoffset,yoffset,width,height,format,data) {
	snow_modules_opengl_web_GL.current_context.compressedTexSubImage2D(target,level,xoffset,yoffset,width,height,format,data);
};
snow_modules_opengl_web_GL.copyTexImage2D = function(target,level,internalformat,x,y,width,height,border) {
	snow_modules_opengl_web_GL.current_context.copyTexImage2D(target,level,internalformat,x,y,width,height,border);
};
snow_modules_opengl_web_GL.copyTexSubImage2D = function(target,level,xoffset,yoffset,x,y,width,height) {
	snow_modules_opengl_web_GL.current_context.copyTexSubImage2D(target,level,xoffset,yoffset,x,y,width,height);
};
snow_modules_opengl_web_GL.createBuffer = function() {
	return snow_modules_opengl_web_GL.current_context.createBuffer();
};
snow_modules_opengl_web_GL.createFramebuffer = function() {
	return snow_modules_opengl_web_GL.current_context.createFramebuffer();
};
snow_modules_opengl_web_GL.createProgram = function() {
	return snow_modules_opengl_web_GL.current_context.createProgram();
};
snow_modules_opengl_web_GL.createRenderbuffer = function() {
	return snow_modules_opengl_web_GL.current_context.createRenderbuffer();
};
snow_modules_opengl_web_GL.createShader = function(type) {
	return snow_modules_opengl_web_GL.current_context.createShader(type);
};
snow_modules_opengl_web_GL.createTexture = function() {
	return snow_modules_opengl_web_GL.current_context.createTexture();
};
snow_modules_opengl_web_GL.cullFace = function(mode) {
	snow_modules_opengl_web_GL.current_context.cullFace(mode);
};
snow_modules_opengl_web_GL.deleteBuffer = function(buffer) {
	snow_modules_opengl_web_GL.current_context.deleteBuffer(buffer);
};
snow_modules_opengl_web_GL.deleteFramebuffer = function(framebuffer) {
	snow_modules_opengl_web_GL.current_context.deleteFramebuffer(framebuffer);
};
snow_modules_opengl_web_GL.deleteProgram = function(program) {
	snow_modules_opengl_web_GL.current_context.deleteProgram(program);
};
snow_modules_opengl_web_GL.deleteRenderbuffer = function(renderbuffer) {
	snow_modules_opengl_web_GL.current_context.deleteRenderbuffer(renderbuffer);
};
snow_modules_opengl_web_GL.deleteShader = function(shader) {
	snow_modules_opengl_web_GL.current_context.deleteShader(shader);
};
snow_modules_opengl_web_GL.deleteTexture = function(texture) {
	snow_modules_opengl_web_GL.current_context.deleteTexture(texture);
};
snow_modules_opengl_web_GL.depthFunc = function(func) {
	snow_modules_opengl_web_GL.current_context.depthFunc(func);
};
snow_modules_opengl_web_GL.depthMask = function(flag) {
	snow_modules_opengl_web_GL.current_context.depthMask(flag);
};
snow_modules_opengl_web_GL.depthRange = function(zNear,zFar) {
	snow_modules_opengl_web_GL.current_context.depthRange(zNear,zFar);
};
snow_modules_opengl_web_GL.detachShader = function(program,shader) {
	snow_modules_opengl_web_GL.current_context.detachShader(program,shader);
};
snow_modules_opengl_web_GL.disable = function(cap) {
	snow_modules_opengl_web_GL.current_context.disable(cap);
};
snow_modules_opengl_web_GL.disableVertexAttribArray = function(index) {
	snow_modules_opengl_web_GL.current_context.disableVertexAttribArray(index);
};
snow_modules_opengl_web_GL.drawArrays = function(mode,first,count) {
	snow_modules_opengl_web_GL.current_context.drawArrays(mode,first,count);
};
snow_modules_opengl_web_GL.drawElements = function(mode,count,type,offset) {
	snow_modules_opengl_web_GL.current_context.drawElements(mode,count,type,offset);
};
snow_modules_opengl_web_GL.enable = function(cap) {
	snow_modules_opengl_web_GL.current_context.enable(cap);
};
snow_modules_opengl_web_GL.enableVertexAttribArray = function(index) {
	snow_modules_opengl_web_GL.current_context.enableVertexAttribArray(index);
};
snow_modules_opengl_web_GL.finish = function() {
	snow_modules_opengl_web_GL.current_context.finish();
};
snow_modules_opengl_web_GL.flush = function() {
	snow_modules_opengl_web_GL.current_context.flush();
};
snow_modules_opengl_web_GL.framebufferRenderbuffer = function(target,attachment,renderbuffertarget,renderbuffer) {
	snow_modules_opengl_web_GL.current_context.framebufferRenderbuffer(target,attachment,renderbuffertarget,renderbuffer);
};
snow_modules_opengl_web_GL.framebufferTexture2D = function(target,attachment,textarget,texture,level) {
	snow_modules_opengl_web_GL.current_context.framebufferTexture2D(target,attachment,textarget,texture,level);
};
snow_modules_opengl_web_GL.frontFace = function(mode) {
	snow_modules_opengl_web_GL.current_context.frontFace(mode);
};
snow_modules_opengl_web_GL.generateMipmap = function(target) {
	snow_modules_opengl_web_GL.current_context.generateMipmap(target);
};
snow_modules_opengl_web_GL.getActiveAttrib = function(program,index) {
	return snow_modules_opengl_web_GL.current_context.getActiveAttrib(program,index);
};
snow_modules_opengl_web_GL.getActiveUniform = function(program,index) {
	return snow_modules_opengl_web_GL.current_context.getActiveUniform(program,index);
};
snow_modules_opengl_web_GL.getAttachedShaders = function(program) {
	return snow_modules_opengl_web_GL.current_context.getAttachedShaders(program);
};
snow_modules_opengl_web_GL.getAttribLocation = function(program,name) {
	return snow_modules_opengl_web_GL.current_context.getAttribLocation(program,name);
};
snow_modules_opengl_web_GL.getBufferParameter = function(target,pname) {
	return snow_modules_opengl_web_GL.current_context.getBufferParameter(target,pname);
};
snow_modules_opengl_web_GL.getContextAttributes = function() {
	return snow_modules_opengl_web_GL.current_context.getContextAttributes();
};
snow_modules_opengl_web_GL.getError = function() {
	return snow_modules_opengl_web_GL.current_context.getError();
};
snow_modules_opengl_web_GL.getExtension = function(name) {
	return snow_modules_opengl_web_GL.current_context.getExtension(name);
};
snow_modules_opengl_web_GL.getFramebufferAttachmentParameter = function(target,attachment,pname) {
	return snow_modules_opengl_web_GL.current_context.getFramebufferAttachmentParameter(target,attachment,pname);
};
snow_modules_opengl_web_GL.getParameter = function(pname) {
	return snow_modules_opengl_web_GL.current_context.getParameter(pname);
};
snow_modules_opengl_web_GL.getProgramInfoLog = function(program) {
	return snow_modules_opengl_web_GL.current_context.getProgramInfoLog(program);
};
snow_modules_opengl_web_GL.getProgramParameter = function(program,pname) {
	return snow_modules_opengl_web_GL.current_context.getProgramParameter(program,pname);
};
snow_modules_opengl_web_GL.getRenderbufferParameter = function(target,pname) {
	return snow_modules_opengl_web_GL.current_context.getRenderbufferParameter(target,pname);
};
snow_modules_opengl_web_GL.getShaderInfoLog = function(shader) {
	return snow_modules_opengl_web_GL.current_context.getShaderInfoLog(shader);
};
snow_modules_opengl_web_GL.getShaderParameter = function(shader,pname) {
	return snow_modules_opengl_web_GL.current_context.getShaderParameter(shader,pname);
};
snow_modules_opengl_web_GL.getShaderPrecisionFormat = function(shadertype,precisiontype) {
	return snow_modules_opengl_web_GL.current_context.getShaderPrecisionFormat(shadertype,precisiontype);
};
snow_modules_opengl_web_GL.getShaderSource = function(shader) {
	return snow_modules_opengl_web_GL.current_context.getShaderSource(shader);
};
snow_modules_opengl_web_GL.getSupportedExtensions = function() {
	return snow_modules_opengl_web_GL.current_context.getSupportedExtensions();
};
snow_modules_opengl_web_GL.getTexParameter = function(target,pname) {
	return snow_modules_opengl_web_GL.current_context.getTexParameter(target,pname);
};
snow_modules_opengl_web_GL.getUniform = function(program,location) {
	return snow_modules_opengl_web_GL.current_context.getUniform(program,location);
};
snow_modules_opengl_web_GL.getUniformLocation = function(program,name) {
	return snow_modules_opengl_web_GL.current_context.getUniformLocation(program,name);
};
snow_modules_opengl_web_GL.getVertexAttrib = function(index,pname) {
	return snow_modules_opengl_web_GL.current_context.getVertexAttrib(index,pname);
};
snow_modules_opengl_web_GL.getVertexAttribOffset = function(index,pname) {
	return snow_modules_opengl_web_GL.current_context.getVertexAttribOffset(index,pname);
};
snow_modules_opengl_web_GL.hint = function(target,mode) {
	snow_modules_opengl_web_GL.current_context.hint(target,mode);
};
snow_modules_opengl_web_GL.isBuffer = function(buffer) {
	return snow_modules_opengl_web_GL.current_context.isBuffer(buffer);
};
snow_modules_opengl_web_GL.isEnabled = function(cap) {
	return snow_modules_opengl_web_GL.current_context.isEnabled(cap);
};
snow_modules_opengl_web_GL.isFramebuffer = function(framebuffer) {
	return snow_modules_opengl_web_GL.current_context.isFramebuffer(framebuffer);
};
snow_modules_opengl_web_GL.isProgram = function(program) {
	return snow_modules_opengl_web_GL.current_context.isProgram(program);
};
snow_modules_opengl_web_GL.isRenderbuffer = function(renderbuffer) {
	return snow_modules_opengl_web_GL.current_context.isRenderbuffer(renderbuffer);
};
snow_modules_opengl_web_GL.isShader = function(shader) {
	return snow_modules_opengl_web_GL.current_context.isShader(shader);
};
snow_modules_opengl_web_GL.isTexture = function(texture) {
	return snow_modules_opengl_web_GL.current_context.isTexture(texture);
};
snow_modules_opengl_web_GL.lineWidth = function(width) {
	snow_modules_opengl_web_GL.current_context.lineWidth(width);
};
snow_modules_opengl_web_GL.linkProgram = function(program) {
	snow_modules_opengl_web_GL.current_context.linkProgram(program);
};
snow_modules_opengl_web_GL.pixelStorei = function(pname,param) {
	snow_modules_opengl_web_GL.current_context.pixelStorei(pname,param);
};
snow_modules_opengl_web_GL.polygonOffset = function(factor,units) {
	snow_modules_opengl_web_GL.current_context.polygonOffset(factor,units);
};
snow_modules_opengl_web_GL.readPixels = function(x,y,width,height,format,type,data) {
	snow_modules_opengl_web_GL.current_context.readPixels(x,y,width,height,format,type,data);
};
snow_modules_opengl_web_GL.renderbufferStorage = function(target,internalformat,width,height) {
	snow_modules_opengl_web_GL.current_context.renderbufferStorage(target,internalformat,width,height);
};
snow_modules_opengl_web_GL.sampleCoverage = function(value,invert) {
	snow_modules_opengl_web_GL.current_context.sampleCoverage(value,invert);
};
snow_modules_opengl_web_GL.scissor = function(x,y,width,height) {
	snow_modules_opengl_web_GL.current_context.scissor(x,y,width,height);
};
snow_modules_opengl_web_GL.shaderSource = function(shader,source) {
	snow_modules_opengl_web_GL.current_context.shaderSource(shader,source);
};
snow_modules_opengl_web_GL.stencilFunc = function(func,ref,mask) {
	snow_modules_opengl_web_GL.current_context.stencilFunc(func,ref,mask);
};
snow_modules_opengl_web_GL.stencilFuncSeparate = function(face,func,ref,mask) {
	snow_modules_opengl_web_GL.current_context.stencilFuncSeparate(face,func,ref,mask);
};
snow_modules_opengl_web_GL.stencilMask = function(mask) {
	snow_modules_opengl_web_GL.current_context.stencilMask(mask);
};
snow_modules_opengl_web_GL.stencilMaskSeparate = function(face,mask) {
	snow_modules_opengl_web_GL.current_context.stencilMaskSeparate(face,mask);
};
snow_modules_opengl_web_GL.stencilOp = function(fail,zfail,zpass) {
	snow_modules_opengl_web_GL.current_context.stencilOp(fail,zfail,zpass);
};
snow_modules_opengl_web_GL.stencilOpSeparate = function(face,fail,zfail,zpass) {
	snow_modules_opengl_web_GL.current_context.stencilOpSeparate(face,fail,zfail,zpass);
};
snow_modules_opengl_web_GL.texImage2D = function(target,level,internalformat,width,height,border,format,type,data) {
	snow_modules_opengl_web_GL.current_context.texImage2D(target,level,internalformat,width,height,border,format,type,data);
};
snow_modules_opengl_web_GL.texParameterf = function(target,pname,param) {
	snow_modules_opengl_web_GL.current_context.texParameterf(target,pname,param);
};
snow_modules_opengl_web_GL.texParameteri = function(target,pname,param) {
	snow_modules_opengl_web_GL.current_context.texParameteri(target,pname,param);
};
snow_modules_opengl_web_GL.texSubImage2D = function(target,level,xoffset,yoffset,width,height,format,type,data) {
	snow_modules_opengl_web_GL.current_context.texSubImage2D(target,level,xoffset,yoffset,width,height,format,type,data);
};
snow_modules_opengl_web_GL.uniform1f = function(location,x) {
	snow_modules_opengl_web_GL.current_context.uniform1f(location,x);
};
snow_modules_opengl_web_GL.uniform1fv = function(location,data) {
	snow_modules_opengl_web_GL.current_context.uniform1fv(location,data);
};
snow_modules_opengl_web_GL.uniform1i = function(location,x) {
	snow_modules_opengl_web_GL.current_context.uniform1i(location,x);
};
snow_modules_opengl_web_GL.uniform1iv = function(location,data) {
	snow_modules_opengl_web_GL.current_context.uniform1iv(location,data);
};
snow_modules_opengl_web_GL.uniform2f = function(location,x,y) {
	snow_modules_opengl_web_GL.current_context.uniform2f(location,x,y);
};
snow_modules_opengl_web_GL.uniform2fv = function(location,data) {
	snow_modules_opengl_web_GL.current_context.uniform2fv(location,data);
};
snow_modules_opengl_web_GL.uniform2i = function(location,x,y) {
	snow_modules_opengl_web_GL.current_context.uniform2i(location,x,y);
};
snow_modules_opengl_web_GL.uniform2iv = function(location,data) {
	snow_modules_opengl_web_GL.current_context.uniform2iv(location,data);
};
snow_modules_opengl_web_GL.uniform3f = function(location,x,y,z) {
	snow_modules_opengl_web_GL.current_context.uniform3f(location,x,y,z);
};
snow_modules_opengl_web_GL.uniform3fv = function(location,data) {
	snow_modules_opengl_web_GL.current_context.uniform3fv(location,data);
};
snow_modules_opengl_web_GL.uniform3i = function(location,x,y,z) {
	snow_modules_opengl_web_GL.current_context.uniform3i(location,x,y,z);
};
snow_modules_opengl_web_GL.uniform3iv = function(location,data) {
	snow_modules_opengl_web_GL.current_context.uniform3iv(location,data);
};
snow_modules_opengl_web_GL.uniform4f = function(location,x,y,z,w) {
	snow_modules_opengl_web_GL.current_context.uniform4f(location,x,y,z,w);
};
snow_modules_opengl_web_GL.uniform4fv = function(location,data) {
	snow_modules_opengl_web_GL.current_context.uniform4fv(location,data);
};
snow_modules_opengl_web_GL.uniform4i = function(location,x,y,z,w) {
	snow_modules_opengl_web_GL.current_context.uniform4i(location,x,y,z,w);
};
snow_modules_opengl_web_GL.uniform4iv = function(location,data) {
	snow_modules_opengl_web_GL.current_context.uniform4iv(location,data);
};
snow_modules_opengl_web_GL.uniformMatrix2fv = function(location,transpose,data) {
	snow_modules_opengl_web_GL.current_context.uniformMatrix2fv(location,transpose,data);
};
snow_modules_opengl_web_GL.uniformMatrix3fv = function(location,transpose,data) {
	snow_modules_opengl_web_GL.current_context.uniformMatrix3fv(location,transpose,data);
};
snow_modules_opengl_web_GL.uniformMatrix4fv = function(location,transpose,data) {
	snow_modules_opengl_web_GL.current_context.uniformMatrix4fv(location,transpose,data);
};
snow_modules_opengl_web_GL.useProgram = function(program) {
	snow_modules_opengl_web_GL.current_context.useProgram(program);
};
snow_modules_opengl_web_GL.validateProgram = function(program) {
	snow_modules_opengl_web_GL.current_context.validateProgram(program);
};
snow_modules_opengl_web_GL.vertexAttrib1f = function(indx,x) {
	snow_modules_opengl_web_GL.current_context.vertexAttrib1f(indx,x);
};
snow_modules_opengl_web_GL.vertexAttrib1fv = function(indx,data) {
	snow_modules_opengl_web_GL.current_context.vertexAttrib1fv(indx,data);
};
snow_modules_opengl_web_GL.vertexAttrib2f = function(indx,x,y) {
	snow_modules_opengl_web_GL.current_context.vertexAttrib2f(indx,x,y);
};
snow_modules_opengl_web_GL.vertexAttrib2fv = function(indx,data) {
	snow_modules_opengl_web_GL.current_context.vertexAttrib2fv(indx,data);
};
snow_modules_opengl_web_GL.vertexAttrib3f = function(indx,x,y,z) {
	snow_modules_opengl_web_GL.current_context.vertexAttrib3f(indx,x,y,z);
};
snow_modules_opengl_web_GL.vertexAttrib3fv = function(indx,data) {
	snow_modules_opengl_web_GL.current_context.vertexAttrib3fv(indx,data);
};
snow_modules_opengl_web_GL.vertexAttrib4f = function(indx,x,y,z,w) {
	snow_modules_opengl_web_GL.current_context.vertexAttrib4f(indx,x,y,z,w);
};
snow_modules_opengl_web_GL.vertexAttrib4fv = function(indx,data) {
	snow_modules_opengl_web_GL.current_context.vertexAttrib4fv(indx,data);
};
snow_modules_opengl_web_GL.vertexAttribPointer = function(indx,size,type,normalized,stride,offset) {
	snow_modules_opengl_web_GL.current_context.vertexAttribPointer(indx,size,type,normalized,stride,offset);
};
snow_modules_opengl_web_GL.viewport = function(x,y,width,height) {
	snow_modules_opengl_web_GL.current_context.viewport(x,y,width,height);
};
snow_modules_opengl_web_GL.get_version = function() {
	return 7938;
};
var snow_system_assets_Asset = function(_system,_id,_type) {
	if(_type == null) _type = 0;
	this.loaded = false;
	if(_id == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_id == null"));
	if(_system == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_system == null"));
	this.system = _system;
	this.type = _type;
	this.id = _id;
};
$hxClasses["snow.system.assets.Asset"] = snow_system_assets_Asset;
snow_system_assets_Asset.__name__ = ["snow","system","assets","Asset"];
snow_system_assets_Asset.prototype = {
	destroy: function() {
	}
	,__class__: snow_system_assets_Asset
};
var snow_system_assets_AssetImage = function(_system,_id,_image) {
	snow_system_assets_Asset.call(this,_system,_id,4);
	this.set_image(_image);
};
$hxClasses["snow.system.assets.AssetImage"] = snow_system_assets_AssetImage;
snow_system_assets_AssetImage.__name__ = ["snow","system","assets","AssetImage"];
snow_system_assets_AssetImage.load = function(_system,_id) {
	if(_id == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_id == null"));
	if(_system == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_system == null"));
	return new snow_system_assets_AssetImage(_system,_id,null).reload();
};
snow_system_assets_AssetImage.load_from_bytes = function(_system,_id,_bytes) {
	if(_id == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_id == null"));
	if(_bytes == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_bytes == null"));
	if(_system == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_system == null"));
	return new snow_system_assets_AssetImage(_system,_id,null).reload_from_bytes(_bytes);
};
snow_system_assets_AssetImage.load_from_pixels = function(_system,_id,_width,_height,_pixels) {
	if(_id == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_id == null"));
	if(_pixels == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_pixels == null"));
	if(_system == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("_system == null"));
	var info = _system.module.image_info_from_pixels(_id,_width,_height,_pixels);
	return new snow_system_assets_AssetImage(_system,_id,info);
};
snow_system_assets_AssetImage.provider = function(_app,_id) {
	return _app.assets.module.image_load_info(_app.assets.root + _id);
};
snow_system_assets_AssetImage.processor = function(_app,_id,_data) {
	if(_data == null) return snow_api_Promise.reject(snow_types_Error.error("AssetImage processor: data was null"));
	return _app.assets.module.image_info_from_bytes(_id,_data);
};
snow_system_assets_AssetImage.__super__ = snow_system_assets_Asset;
snow_system_assets_AssetImage.prototype = $extend(snow_system_assets_Asset.prototype,{
	reload: function() {
		var _g = this;
		this.loaded = false;
		return new snow_api_Promise(function(resolve,reject) {
			var _load = _g.system.app.io.data_flow(_g.id,null,snow_system_assets_AssetImage.provider);
			_load.then(function(_image) {
				_g.set_image(_image);
				resolve(_g);
			}).error(reject);
		});
	}
	,destroy: function() {
		this.set_image(null);
	}
	,reload_from_bytes: function(_bytes) {
		var _g = this;
		this.loaded = false;
		return new snow_api_Promise(function(resolve,reject) {
			var _load = _g.system.module.image_info_from_bytes(_g.id,_bytes);
			_load.then(function(_image) {
				_g.set_image(_image);
				resolve(_g);
			}).error(reject);
		});
	}
	,reload_from_pixels: function(_width,_height,_pixels) {
		this.loaded = false;
		this.set_image(this.system.module.image_info_from_pixels(this.id,_width,_height,_pixels));
	}
	,set_image: function(_image) {
		this.loaded = _image != null;
		return this.image = _image;
	}
	,__class__: snow_system_assets_AssetImage
});
var snow_system_assets_AssetBytes = function(_system,_id,_bytes) {
	snow_system_assets_Asset.call(this,_system,_id,1);
	this.set_bytes(_bytes);
};
$hxClasses["snow.system.assets.AssetBytes"] = snow_system_assets_AssetBytes;
snow_system_assets_AssetBytes.__name__ = ["snow","system","assets","AssetBytes"];
snow_system_assets_AssetBytes.load = function(_system,_id) {
	return new snow_system_assets_AssetBytes(_system,_id,null).reload();
};
snow_system_assets_AssetBytes.__super__ = snow_system_assets_Asset;
snow_system_assets_AssetBytes.prototype = $extend(snow_system_assets_Asset.prototype,{
	reload: function() {
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			_g.system.app.io.data_flow(_g.id).then(function(_bytes) {
				_g.set_bytes(_bytes);
				resolve(_g);
			}).error(reject);
		});
	}
	,destroy: function() {
		this.set_bytes(null);
	}
	,set_bytes: function(_bytes) {
		this.loaded = _bytes != null;
		return this.bytes = _bytes;
	}
	,__class__: snow_system_assets_AssetBytes
});
var snow_system_assets_AssetText = function(_system,_id,_text) {
	snow_system_assets_Asset.call(this,_system,_id,2);
	this.set_text(_text);
};
$hxClasses["snow.system.assets.AssetText"] = snow_system_assets_AssetText;
snow_system_assets_AssetText.__name__ = ["snow","system","assets","AssetText"];
snow_system_assets_AssetText.load = function(_system,_id) {
	return new snow_system_assets_AssetText(_system,_id,null).reload();
};
snow_system_assets_AssetText.processor = function(_app,_id,_data) {
	if(_data == null) return snow_api_Promise.reject(snow_types_Error.error("AssetText processor: data was null"));
	return snow_api_Promise.resolve(snow_api_buffers__$Uint8Array_Uint8Array_$Impl_$.toBytes(_data).toString());
};
snow_system_assets_AssetText.__super__ = snow_system_assets_Asset;
snow_system_assets_AssetText.prototype = $extend(snow_system_assets_Asset.prototype,{
	reload: function() {
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			_g.system.app.io.data_flow(_g.id,snow_system_assets_AssetText.processor).then(function(_text) {
				_g.set_text(_text);
				resolve(_g);
			}).error(reject);
		});
	}
	,destroy: function() {
		this.set_text(null);
	}
	,set_text: function(_text) {
		this.loaded = _text != null;
		return this.text = _text;
	}
	,__class__: snow_system_assets_AssetText
});
var snow_system_assets_AssetJSON = function(_system,_id,_json) {
	snow_system_assets_Asset.call(this,_system,_id,3);
	this.set_json(_json);
};
$hxClasses["snow.system.assets.AssetJSON"] = snow_system_assets_AssetJSON;
snow_system_assets_AssetJSON.__name__ = ["snow","system","assets","AssetJSON"];
snow_system_assets_AssetJSON.load = function(_system,_id) {
	return new snow_system_assets_AssetJSON(_system,_id,null).reload();
};
snow_system_assets_AssetJSON.processor = function(_app,_id,_data) {
	if(_data == null) return snow_api_Promise.reject(snow_types_Error.error("AssetJSON: data was null"));
	return new snow_api_Promise(function(resolve,reject) {
		var _data_json = null;
		try {
			_data_json = JSON.parse(snow_api_buffers__$Uint8Array_Uint8Array_$Impl_$.toBytes(_data).toString());
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return reject(snow_types_Error.parse(e));
		}
		return resolve(_data_json);
	});
};
snow_system_assets_AssetJSON.__super__ = snow_system_assets_Asset;
snow_system_assets_AssetJSON.prototype = $extend(snow_system_assets_Asset.prototype,{
	reload: function() {
		var _g = this;
		return new snow_api_Promise(function(resolve,reject) {
			_g.system.app.io.data_flow(_g.id,snow_system_assets_AssetJSON.processor).then(function(_json) {
				_g.set_json(_json);
				resolve(_g);
			}).error(reject);
		});
	}
	,destroy: function() {
		this.set_json(null);
	}
	,set_json: function(_json) {
		this.loaded = _json != null;
		return this.json = _json;
	}
	,__class__: snow_system_assets_AssetJSON
});
var snow_system_assets_Assets = function(_app) {
	this.manifest_path = "manifest";
	this.root = "";
	this.app = _app;
	this.list = [];
	this.module = new snow_core_web_assets_Assets(this);
};
$hxClasses["snow.system.assets.Assets"] = snow_system_assets_Assets;
snow_system_assets_Assets.__name__ = ["snow","system","assets","Assets"];
snow_system_assets_Assets.prototype = {
	listed: function(_id) {
		return HxOverrides.indexOf(this.list,_id,0) != -1;
	}
	,path: function(_id) {
		return this.root + _id;
	}
	,bytes: function(_id) {
		return snow_system_assets_AssetBytes.load(this,_id);
	}
	,text: function(_id) {
		return snow_system_assets_AssetText.load(this,_id);
	}
	,json: function(_id) {
		return snow_system_assets_AssetJSON.load(this,_id);
	}
	,image: function(_id) {
		return snow_system_assets_AssetImage.load(this,_id);
	}
	,image_from_bytes: function(_id,_bytes) {
		return snow_system_assets_AssetImage.load_from_bytes(this,_id,_bytes);
	}
	,image_from_pixels: function(_id,_width,_height,_pixels) {
		return snow_system_assets_AssetImage.load_from_pixels(this,_id,_width,_height,_pixels);
	}
	,__class__: snow_system_assets_Assets
};
var snow_system_audio_Audio = function(_app) {
	this.active = false;
	this.app = _app;
	this.module = new snow_modules_howlerjs_Audio(this);
	this.module.init();
	this.sound_list = new haxe_ds_StringMap();
	this.stream_list = new haxe_ds_StringMap();
	this.active = true;
};
$hxClasses["snow.system.audio.Audio"] = snow_system_audio_Audio;
snow_system_audio_Audio.__name__ = ["snow","system","audio","Audio"];
snow_system_audio_Audio.prototype = {
	create: function(_id,_name,_streaming) {
		if(_streaming == null) _streaming = false;
		if(_name == null) _name = "";
		var _g = this;
		if(_name == "") _name = this.app.make_uniqueid();
		haxe_Log.trace("    i / audio / " + ("creating sound named " + _name + " (stream: " + (_streaming == null?"null":"" + _streaming) + ")"),{ fileName : "Audio.hx", lineNumber : 53, className : "snow.system.audio.Audio", methodName : "create"});
		return new snow_api_Promise(function(resolve,reject) {
			var _create = _g.module.create_sound(_id,_name,_streaming);
			_create.then(function(_sound) {
				_g.sound_list.set(_name,_sound);
				if(_streaming) _g.stream_list.set(_name,_sound);
				resolve(_sound);
				_sound.emit("load");
			}).error(reject);
		});
	}
	,create_from_bytes: function(_name,_bytes,_format) {
		if(_name == null) _name = "";
		if(_name == "") _name = this.app.make_uniqueid();
		var sound = this.module.create_sound_from_bytes(_name,_bytes,_format);
		if(sound == null) throw new js__$Boot_HaxeError(snow_api_DebugError.null_assertion("sound == null"));
		this.sound_list.set(_name,sound);
		return sound;
	}
	,uncreate: function(_name) {
		var _sound = this.sound_list.get(_name);
		if(_sound == null) haxe_Log.trace("    i / audio / " + ("can't find sound, unable to uncreate, use create first: " + _name),{ fileName : "Audio.hx", lineNumber : 99, className : "snow.system.audio.Audio", methodName : "uncreate"});
		_sound.destroy();
	}
	,add: function(sound) {
		this.sound_list.set(sound.name,sound);
		if(sound.is_stream) this.stream_list.set(sound.name,sound);
	}
	,on: function(_name,_event,_handler) {
		if(_event == "load") {
			var sound = this.get(_name);
			if(sound != null) {
				if(sound.get_loaded()) {
					_handler(sound);
					return;
				}
			}
		}
		var _event_id = "" + _event + snow_system_audio_Audio.splitter + _name;
		if(this.handlers == null) this.handlers = new haxe_ds_StringMap();
		if(!this.handlers.exists(_event_id)) this.handlers.set(_event_id,[]);
		var _list = this.handlers.get(_event_id);
		if(HxOverrides.indexOf(_list,_handler,0) != -1) throw new js__$Boot_HaxeError("Audio on event adding the same handler twice");
		_list.push(_handler);
		this.handlers.set(_event_id,_list);
	}
	,off: function(_name,_event,_handler) {
		if(this.handlers == null) return;
		var _event_id = "" + _event + snow_system_audio_Audio.splitter + _name;
		var _list = this.handlers.get(_event_id);
		if(_list != null) {
			HxOverrides.remove(_list,_handler);
			this.handlers.set(_event_id,_list);
		}
	}
	,get: function(_name) {
		var _sound = this.sound_list.get(_name);
		return _sound;
	}
	,volume: function(_name,_volume) {
		var sound = this.get(_name);
		if(sound != null) {
			if(_volume != null) return sound.set_volume(_volume); else return sound.get_volume();
		}
		return 0;
	}
	,pan: function(_name,_pan) {
		var sound = this.get(_name);
		if(sound != null) {
			if(_pan != null) return sound.set_pan(_pan); else return sound.get_pan();
		}
		return 0;
	}
	,pitch: function(_name,_pitch) {
		var sound = this.get(_name);
		if(sound != null) {
			if(_pitch != null) return sound.set_pitch(_pitch); else return sound.get_pitch();
		}
		return 0;
	}
	,position: function(_name,_position) {
		var sound = this.get(_name);
		if(sound != null) {
			if(_position != null) return sound.set_position(_position); else return sound.get_position();
		}
		return 0;
	}
	,duration: function(_name) {
		var sound = this.get(_name);
		if(sound != null) return sound.get_duration();
		return 0;
	}
	,play: function(_name) {
		if(!this.active) return;
		var sound = this.get(_name);
		if(sound != null) sound.play();
	}
	,loop: function(_name) {
		if(!this.active) return;
		var sound = this.get(_name);
		if(sound != null) sound.loop();
	}
	,pause: function(_name) {
		if(!this.active) return;
		var sound = this.get(_name);
		if(sound != null) sound.pause();
	}
	,stop: function(_name) {
		if(!this.active) return;
		var sound = this.get(_name);
		if(sound != null) sound.stop();
	}
	,toggle: function(_name) {
		if(!this.active) return;
		var sound = this.get(_name);
		if(sound != null) sound.toggle();
	}
	,kill: function(_sound) {
		if(_sound == null) return;
		this.sound_list.remove(_sound.name);
		this.stream_list.remove(_sound.name);
	}
	,suspend: function() {
		if(!this.active) return;
		haxe_Log.trace("    i / audio / " + "suspending sound context",{ fileName : "Audio.hx", lineNumber : 354, className : "snow.system.audio.Audio", methodName : "suspend"});
		this.active = false;
		var $it0 = this.stream_list.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.internal_pause();
		}
		this.module.suspend();
	}
	,resume: function() {
		if(this.active) return;
		haxe_Log.trace("    i / audio / " + "resuming sound context",{ fileName : "Audio.hx", lineNumber : 372, className : "snow.system.audio.Audio", methodName : "resume"});
		this.active = true;
		this.module.resume();
		var $it0 = this.stream_list.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.internal_play();
		}
	}
	,on_event: function(_event) {
		this.module.on_event(_event);
		if(_event.type == 10) this.suspend(); else if(_event.type == 12) this.resume();
	}
	,destroy: function() {
		this.active = false;
		var $it0 = this.sound_list.iterator();
		while( $it0.hasNext() ) {
			var sound = $it0.next();
			sound.destroy();
		}
		this.module.destroy();
	}
	,update: function() {
		if(!this.active) return;
		var $it0 = this.sound_list.iterator();
		while( $it0.hasNext() ) {
			var _sound = $it0.next();
			if(_sound.get_playing()) _sound.internal_update();
		}
		this.module.update();
	}
	,sound_event: function(_sound,_event) {
		var _event_id = "" + _event + snow_system_audio_Audio.splitter + _sound.name;
		if(this.handlers == null) return;
		var _list = this.handlers.get(_event_id);
		if(_list != null) {
			var _g = 0;
			while(_g < _list.length) {
				var fn = _list[_g];
				++_g;
				fn(_sound);
			}
		}
	}
	,__class__: snow_system_audio_Audio
};
var snow_system_input_Input = function(_app) {
	this.touch_count = 0;
	this.app = _app;
	this.module = new snow_core_web_input_Input(this);
	this.module.init();
	this.key_code_pressed = new haxe_ds_IntMap();
	this.key_code_down = new haxe_ds_IntMap();
	this.key_code_released = new haxe_ds_IntMap();
	this.scan_code_pressed = new haxe_ds_IntMap();
	this.scan_code_down = new haxe_ds_IntMap();
	this.scan_code_released = new haxe_ds_IntMap();
	this.mouse_button_pressed = new haxe_ds_IntMap();
	this.mouse_button_down = new haxe_ds_IntMap();
	this.mouse_button_released = new haxe_ds_IntMap();
	this.gamepad_button_pressed = new haxe_ds_IntMap();
	this.gamepad_button_down = new haxe_ds_IntMap();
	this.gamepad_button_released = new haxe_ds_IntMap();
	this.gamepad_axis_values = new haxe_ds_IntMap();
	this.touches_down = new haxe_ds_IntMap();
};
$hxClasses["snow.system.input.Input"] = snow_system_input_Input;
snow_system_input_Input.__name__ = ["snow","system","input","Input"];
snow_system_input_Input.prototype = {
	keypressed: function(_code) {
		return this.key_code_pressed.h.hasOwnProperty(_code);
	}
	,keyreleased: function(_code) {
		return this.key_code_released.h.hasOwnProperty(_code);
	}
	,keydown: function(_code) {
		return this.key_code_down.h.hasOwnProperty(_code);
	}
	,scanpressed: function(_code) {
		return this.scan_code_pressed.h.hasOwnProperty(_code);
	}
	,scanreleased: function(_code) {
		return this.scan_code_released.h.hasOwnProperty(_code);
	}
	,scandown: function(_code) {
		return this.scan_code_down.h.hasOwnProperty(_code);
	}
	,mousepressed: function(_button) {
		return this.mouse_button_pressed.h.hasOwnProperty(_button);
	}
	,mousereleased: function(_button) {
		return this.mouse_button_released.h.hasOwnProperty(_button);
	}
	,mousedown: function(_button) {
		return this.mouse_button_down.h.hasOwnProperty(_button);
	}
	,gamepadpressed: function(_gamepad,_button) {
		var _gamepad_state = this.gamepad_button_pressed.h[_gamepad];
		if(_gamepad_state != null) return _gamepad_state.h.hasOwnProperty(_button); else return false;
	}
	,gamepadreleased: function(_gamepad,_button) {
		var _gamepad_state = this.gamepad_button_released.h[_gamepad];
		if(_gamepad_state != null) return _gamepad_state.h.hasOwnProperty(_button); else return false;
	}
	,gamepaddown: function(_gamepad,_button) {
		var _gamepad_state = this.gamepad_button_down.h[_gamepad];
		if(_gamepad_state != null) return _gamepad_state.h.hasOwnProperty(_button); else return false;
	}
	,gamepadaxis: function(_gamepad,_axis) {
		var _gamepad_state = this.gamepad_axis_values.h[_gamepad];
		if(_gamepad_state != null) {
			if(_gamepad_state.h.hasOwnProperty(_axis)) return _gamepad_state.h[_axis];
		}
		return 0;
	}
	,dispatch_key_down_event: function(keycode,scancode,repeat,mod,timestamp,window_id) {
		if(!repeat) {
			this.key_code_pressed.h[keycode] = false;
			this.key_code_down.h[keycode] = true;
			this.scan_code_pressed.h[scancode] = false;
			this.scan_code_down.h[scancode] = true;
		}
		this.app.host.onkeydown(keycode,scancode,repeat,mod,timestamp,window_id);
	}
	,dispatch_key_up_event: function(keycode,scancode,repeat,mod,timestamp,window_id) {
		this.key_code_released.h[keycode] = false;
		this.key_code_down.remove(keycode);
		this.scan_code_released.h[scancode] = false;
		this.scan_code_down.remove(scancode);
		this.app.host.onkeyup(keycode,scancode,repeat,mod,timestamp,window_id);
	}
	,dispatch_text_event: function(text,start,length,type,timestamp,window_id) {
		this.app.host.ontextinput(text,start,length,type,timestamp,window_id);
	}
	,dispatch_mouse_move_event: function(x,y,xrel,yrel,timestamp,window_id) {
		this.app.host.onmousemove(x,y,xrel,yrel,timestamp,window_id);
	}
	,dispatch_mouse_down_event: function(x,y,button,timestamp,window_id) {
		this.mouse_button_pressed.h[button] = false;
		this.mouse_button_down.h[button] = true;
		this.app.host.onmousedown(x,y,button,timestamp,window_id);
	}
	,dispatch_mouse_up_event: function(x,y,button,timestamp,window_id) {
		this.mouse_button_released.h[button] = false;
		this.mouse_button_down.remove(button);
		this.app.host.onmouseup(x,y,button,timestamp,window_id);
	}
	,dispatch_mouse_wheel_event: function(x,y,timestamp,window_id) {
		this.app.host.onmousewheel(x,y,timestamp,window_id);
	}
	,dispatch_touch_down_event: function(x,y,touch_id,timestamp) {
		if(!this.touches_down.h.hasOwnProperty(touch_id)) {
			this.touch_count++;
			this.touches_down.h[touch_id] = true;
		}
		this.app.host.ontouchdown(x,y,touch_id,timestamp);
	}
	,dispatch_touch_up_event: function(x,y,touch_id,timestamp) {
		this.app.host.ontouchup(x,y,touch_id,timestamp);
		if(this.touches_down.remove(touch_id)) this.touch_count--;
	}
	,dispatch_touch_move_event: function(x,y,dx,dy,touch_id,timestamp) {
		this.app.host.ontouchmove(x,y,dx,dy,touch_id,timestamp);
	}
	,dispatch_gamepad_axis_event: function(gamepad,axis,value,timestamp) {
		if(!this.gamepad_axis_values.h.hasOwnProperty(gamepad)) {
			var value1 = new haxe_ds_IntMap();
			this.gamepad_axis_values.h[gamepad] = value1;
		}
		var this1 = this.gamepad_axis_values.h[gamepad];
		this1.set(axis,value);
		this.app.host.ongamepadaxis(gamepad,axis,value,timestamp);
	}
	,dispatch_gamepad_button_down_event: function(gamepad,button,value,timestamp) {
		if(!this.gamepad_button_pressed.h.hasOwnProperty(gamepad)) {
			var value1 = new haxe_ds_IntMap();
			this.gamepad_button_pressed.h[gamepad] = value1;
		}
		if(!this.gamepad_button_down.h.hasOwnProperty(gamepad)) {
			var value2 = new haxe_ds_IntMap();
			this.gamepad_button_down.h[gamepad] = value2;
		}
		var this1 = this.gamepad_button_pressed.h[gamepad];
		this1.set(button,false);
		var this2 = this.gamepad_button_down.h[gamepad];
		this2.set(button,true);
		this.app.host.ongamepaddown(gamepad,button,value,timestamp);
	}
	,dispatch_gamepad_button_up_event: function(gamepad,button,value,timestamp) {
		if(!this.gamepad_button_released.h.hasOwnProperty(gamepad)) {
			var value1 = new haxe_ds_IntMap();
			this.gamepad_button_released.h[gamepad] = value1;
		}
		if(!this.gamepad_button_down.h.hasOwnProperty(gamepad)) {
			var value2 = new haxe_ds_IntMap();
			this.gamepad_button_down.h[gamepad] = value2;
		}
		var this1 = this.gamepad_button_released.h[gamepad];
		this1.set(button,false);
		var this2 = this.gamepad_button_down.h[gamepad];
		this2.remove(button);
		this.app.host.ongamepadup(gamepad,button,value,timestamp);
	}
	,dispatch_gamepad_device_event: function(gamepad,type,timestamp) {
		this.app.host.ongamepaddevice(gamepad,type,timestamp);
	}
	,listen: function(_window) {
		this.module.listen(_window);
	}
	,unlisten: function(_window) {
		this.module.unlisten(_window);
	}
	,on_event: function(_event) {
		this.module.on_event(_event);
	}
	,on_gamepad_added: function(_event) {
		this.module.gamepad_add(_event.which);
	}
	,on_gamepad_removed: function(_event) {
		this.module.gamepad_remove(_event.which);
	}
	,update: function() {
		this.module.update();
		this._update_keystate();
		this._update_gamepadstate();
		this._update_mousestate();
	}
	,destroy: function() {
		this.module.destroy();
	}
	,_update_mousestate: function() {
		var $it0 = this.mouse_button_pressed.keys();
		while( $it0.hasNext() ) {
			var _code = $it0.next();
			if(this.mouse_button_pressed.h[_code]) this.mouse_button_pressed.remove(_code); else this.mouse_button_pressed.h[_code] = true;
		}
		var $it1 = this.mouse_button_released.keys();
		while( $it1.hasNext() ) {
			var _code1 = $it1.next();
			if(this.mouse_button_released.h[_code1]) this.mouse_button_released.remove(_code1); else this.mouse_button_released.h[_code1] = true;
		}
	}
	,_update_gamepadstate: function() {
		var $it0 = this.gamepad_button_pressed.iterator();
		while( $it0.hasNext() ) {
			var _gamepad_pressed = $it0.next();
			var $it1 = _gamepad_pressed.keys();
			while( $it1.hasNext() ) {
				var _button = $it1.next();
				if(_gamepad_pressed.h[_button]) _gamepad_pressed.remove(_button); else _gamepad_pressed.h[_button] = true;
			}
		}
		var $it2 = this.gamepad_button_released.iterator();
		while( $it2.hasNext() ) {
			var _gamepad_released = $it2.next();
			var $it3 = _gamepad_released.keys();
			while( $it3.hasNext() ) {
				var _button1 = $it3.next();
				if(_gamepad_released.h[_button1]) _gamepad_released.remove(_button1); else _gamepad_released.h[_button1] = true;
			}
		}
	}
	,_update_keystate: function() {
		var $it0 = this.key_code_pressed.keys();
		while( $it0.hasNext() ) {
			var _code = $it0.next();
			if(this.key_code_pressed.h[_code]) this.key_code_pressed.remove(_code); else this.key_code_pressed.h[_code] = true;
		}
		var $it1 = this.key_code_released.keys();
		while( $it1.hasNext() ) {
			var _code1 = $it1.next();
			if(this.key_code_released.h[_code1]) this.key_code_released.remove(_code1); else this.key_code_released.h[_code1] = true;
		}
		var $it2 = this.scan_code_pressed.keys();
		while( $it2.hasNext() ) {
			var _code2 = $it2.next();
			if(this.scan_code_pressed.h[_code2]) this.scan_code_pressed.remove(_code2); else this.scan_code_pressed.h[_code2] = true;
		}
		var $it3 = this.scan_code_released.keys();
		while( $it3.hasNext() ) {
			var _code3 = $it3.next();
			if(this.scan_code_released.h[_code3]) this.scan_code_released.remove(_code3); else this.scan_code_released.h[_code3] = true;
		}
	}
	,__class__: snow_system_input_Input
};
var snow_system_io_IO = function(_app) {
	this.string_save_prefix = "slot";
	this.app = _app;
	this.module = new snow_core_web_io_IO(this);
	this.module.init();
};
$hxClasses["snow.system.io.IO"] = snow_system_io_IO;
snow_system_io_IO.__name__ = ["snow","system","io","IO"];
snow_system_io_IO.prototype = {
	url_open: function(_url) {
		this.module.url_open(_url);
	}
	,data_load: function(_path,_options) {
		return this.module.data_load(_path,_options);
	}
	,data_save: function(_path,_data,_options) {
		return this.module.data_save(_path,_data,_options);
	}
	,data_flow: function(_id,_processor,_provider) {
		var _g = this;
		if(_provider == null) _provider = $bind(this,this.default_provider);
		return new snow_api_Promise(function(resolve,reject) {
			_provider(_g.app,_id).then(function(data) {
				if(_processor != null) _processor(_g.app,_id,data).then(resolve,reject); else resolve(data);
			}).error(reject);
		});
	}
	,string_save_path: function(_slot) {
		if(_slot == null) _slot = 0;
		return this.module.string_save_path(_slot);
	}
	,string_save: function(_key,_value,_slot) {
		if(_slot == null) _slot = 0;
		var _string_map = this.string_slots_sync(_slot);
		var _encoded_key = window.btoa(_key);
		var _encoded_value = window.btoa(_value);
		if(__map_reserved[_encoded_key] != null) _string_map.setReserved(_encoded_key,_encoded_value); else _string_map.h[_encoded_key] = _encoded_value;
		var _contents = haxe_Serializer.run(_string_map);
		_contents = window.btoa(_contents);
		return this.module.string_slot_save(_slot,_contents);
	}
	,string_load: function(_key,_slot) {
		if(_slot == null) _slot = 0;
		var _string_map = this.string_slots_sync(_slot);
		var _encoded_key = window.btoa(_key);
		var _encoded_value;
		_encoded_value = __map_reserved[_encoded_key] != null?_string_map.getReserved(_encoded_key):_string_map.h[_encoded_key];
		if(_encoded_value == null) return null;
		return window.atob(_encoded_value);
	}
	,string_slots_sync: function(_slot) {
		if(_slot == null) _slot = 0;
		if(this.string_slots == null) this.string_slots = new haxe_ds_IntMap();
		var _string_map = this.string_slots.h[_slot];
		if(_string_map == null) {
			var _string = this.module.string_slot_load(_slot);
			if(_string == null) _string_map = new haxe_ds_StringMap(); else {
				_string = window.atob(_string);
				_string_map = haxe_Unserializer.run(_string);
			}
			this.string_slots.h[_slot] = _string_map;
		}
		return _string_map;
	}
	,default_provider: function(_app,_id) {
		return this.module.data_load(_id,null);
	}
	,on_event: function(_event) {
		this.module.on_event(_event);
	}
	,update: function() {
		this.module.update();
	}
	,destroy: function() {
		this.module.destroy();
	}
	,__class__: snow_system_io_IO
};
var snow_system_window_Window = function(_system,_config) {
	this.internal_resize = false;
	this.internal_position = false;
	this.minimized = false;
	this.closed = true;
	this.auto_render = true;
	this.auto_swap = true;
	this.height = 0;
	this.width = 0;
	this.y = 0;
	this.x = 0;
	this.fullscreen = false;
	this.grab = false;
	this.bordered = true;
	this.title = "snow window";
	this.set_max_size({ x : 0, y : 0});
	this.set_min_size({ x : 0, y : 0});
	this.system = _system;
	this.asked_config = _config;
	this.config = _config;
	if(this.config.x == null) this.config.x = 536805376;
	if(this.config.y == null) this.config.y = 536805376;
	this.system.module.create(this.system.app.config.render,_config,$bind(this,this.on_window_created));
};
$hxClasses["snow.system.window.Window"] = snow_system_window_Window;
snow_system_window_Window.__name__ = ["snow","system","window","Window"];
snow_system_window_Window.prototype = {
	on_window_created: function(_handle,_id,_configs) {
		this.id = _id;
		this.handle = _handle;
		if(this.handle == null) {
			haxe_Log.trace("   i / window / " + "failed to create window",{ fileName : "Window.hx", lineNumber : 92, className : "snow.system.window.Window", methodName : "on_window_created"});
			return;
		}
		this.closed = false;
		this.config = _configs.config;
		this.system.app.config.render = _configs.render_config;
		this.internal_position = true;
		this.set_x(this.config.x);
		this.set_y(this.config.y);
		this.internal_position = false;
		this.internal_resize = true;
		this.set_width(this.config.width);
		this.set_height(this.config.height);
		this.internal_resize = false;
		this.on_event({ type : 1, window_id : _id, timestamp : snow_Snow.core.timestamp(), event : { }});
		null;
	}
	,on_event: function(_event) {
		var _g = _event.type;
		if(_g != null) switch(_g) {
		case 5:
			this.internal_position = true;
			this.set_position(_event.event.x,_event.event.y);
			this.internal_position = false;
			break;
		case 6:
			this.internal_resize = true;
			this.set_size(_event.event.x,_event.event.y);
			this.internal_resize = false;
			break;
		case 7:
			this.internal_resize = true;
			this.set_size(_event.event.x,_event.event.y);
			this.internal_resize = false;
			break;
		case 8:
			this.minimized = true;
			break;
		case 10:
			this.minimized = false;
			break;
		default:
		} else {
		}
		if(this.onevent != null) this.onevent(_event);
	}
	,update: function() {
		if(this.handle != null && !this.closed) this.system.module.update_window(this);
	}
	,render: function() {
		if(this.minimized || this.closed) return;
		if(this.handle == null) return;
		this.system.module.render(this);
		if(this.onrender != null) {
			this.onrender(this);
			if(this.auto_swap) this.swap();
			return;
		}
		snow_modules_opengl_web_GL.clearColor(0,0,0,1.0);
		snow_modules_opengl_web_GL.clear(16384);
		if(this.auto_swap) this.swap();
	}
	,swap: function() {
		if(this.handle == null || this.closed || this.minimized) return;
		this.system.module.swap(this);
	}
	,destroy: function() {
		this.closed = true;
		if(this.handle == null) return;
		this.system.remove(this);
		this.system.module.destroy_window(this);
		this.handle = null;
	}
	,close: function() {
		this.closed = true;
		if(this.handle == null) return;
		this.system.module.close(this);
	}
	,show: function() {
		if(this.handle == null) return;
		this.closed = false;
		this.system.module.show(this);
	}
	,simple_message: function(message,title) {
		if(title == null) title = "";
		if(this.handle == null) return;
		this.system.module.simple_message(this,message,title);
	}
	,get_fullscreen: function() {
		return this.fullscreen;
	}
	,set_fullscreen: function(_enable) {
		if(this.handle != null) this.system.module.fullscreen(this,_enable);
		return this.fullscreen = _enable;
	}
	,get_bordered: function() {
		return this.bordered;
	}
	,get_grab: function() {
		return this.grab;
	}
	,get_max_size: function() {
		return this.max_size;
	}
	,get_min_size: function() {
		return this.min_size;
	}
	,get_title: function() {
		return this.title;
	}
	,set_title: function(_title) {
		if(this.handle != null) this.system.module.set_title(this,_title);
		return this.title = _title;
	}
	,set_x: function(_x) {
		this.x = _x;
		if(this.handle != null && !this.internal_position) this.system.module.set_position(this,this.x,this.y);
		return this.x;
	}
	,set_y: function(_y) {
		this.y = _y;
		if(this.handle != null && !this.internal_position) this.system.module.set_position(this,this.x,this.y);
		return this.y;
	}
	,set_width: function(_width) {
		this.width = _width;
		if(this.handle != null && !this.internal_resize) this.system.module.set_size(this,this.width,this.height);
		return this.width;
	}
	,set_height: function(_height) {
		this.height = _height;
		if(this.handle != null && !this.internal_resize) this.system.module.set_size(this,this.width,this.height);
		return this.height;
	}
	,set_cursor_position: function(_x,_y) {
		if(this.handle != null && !this.closed) this.system.module.set_cursor_position(this,_x,_y);
	}
	,set_position: function(_x,_y) {
		var last_internal_position_flag = this.internal_position;
		this.internal_position = true;
		this.set_x(_x);
		this.set_y(_y);
		this.internal_position = last_internal_position_flag;
		if(this.handle != null && !this.internal_position) this.system.module.set_position(this,this.x,this.y);
	}
	,set_size: function(_width,_height) {
		var last_internal_resize_flag = this.internal_resize;
		this.internal_resize = true;
		this.set_width(_width);
		this.set_height(_height);
		this.internal_resize = last_internal_resize_flag;
		if(this.handle != null && !this.internal_resize) this.system.module.set_size(this,_width,_height);
	}
	,set_max_size: function(_size) {
		if(this.get_max_size() != null && this.handle != null) this.system.module.set_max_size(this,_size.x,_size.y);
		return this.max_size = _size;
	}
	,set_min_size: function(_size) {
		if(this.get_min_size() != null && this.handle != null) this.system.module.set_min_size(this,_size.x,_size.y);
		return this.min_size = _size;
	}
	,set_bordered: function(_bordered) {
		if(this.handle != null) this.system.module.bordered(this,_bordered);
		return this.bordered = _bordered;
	}
	,set_grab: function(_grab) {
		if(this.handle != null) this.system.module.grab(this,_grab);
		return this.grab = _grab;
	}
	,__class__: snow_system_window_Window
};
var snow_system_window_Windowing = function(_app) {
	this.window_count = 0;
	this.app = _app;
	this.window_list = new haxe_ds_IntMap();
	this.window_handles = new haxe_ds_ObjectMap();
	this.module = new snow_core_web_window_Windowing(this);
	this.module.init();
};
$hxClasses["snow.system.window.Windowing"] = snow_system_window_Windowing;
snow_system_window_Windowing.__name__ = ["snow","system","window","Windowing"];
snow_system_window_Windowing.prototype = {
	create: function(_config) {
		var _window = new snow_system_window_Window(this,_config);
		this.window_list.h[_window.id] = _window;
		this.window_handles.set(_window.handle,_window.id);
		this.window_count++;
		this.module.listen(_window);
		if(_config.no_input == null || _config.no_input == false) this.app.input.listen(_window);
		return _window;
	}
	,remove: function(_window) {
		this.window_list.remove(_window.id);
		this.window_handles.remove(_window.handle);
		this.window_count--;
		this.module.unlisten(_window);
		if(_window.config.no_input == null || _window.config.no_input == false) this.app.input.unlisten(_window);
	}
	,window_from_handle: function(_handle) {
		if(this.window_handles.h.__keys__[_handle.__id__] != null) {
			var _id = this.window_handles.h[_handle.__id__];
			return this.window_list.h[_id];
		}
		return null;
	}
	,window_from_id: function(_id) {
		return this.window_list.h[_id];
	}
	,enable_vsync: function(_enable) {
		return this.module.system_enable_vsync(_enable);
	}
	,enable_cursor: function(_enable) {
		this.module.system_enable_cursor(_enable);
	}
	,enable_cursor_lock: function(_enable) {
		this.module.system_lock_cursor(_enable);
	}
	,display_count: function() {
		return this.module.display_count();
	}
	,display_mode_count: function(display) {
		return this.module.display_mode_count(display);
	}
	,display_native_mode: function(display) {
		return this.module.display_native_mode(display);
	}
	,display_current_mode: function(display) {
		return this.module.display_current_mode(display);
	}
	,display_mode: function(display,mode_index) {
		return this.module.display_mode(display,mode_index);
	}
	,display_bounds: function(display) {
		return this.module.display_bounds(display);
	}
	,display_name: function(display) {
		return this.module.display_name(display);
	}
	,on_event: function(_event) {
		if(_event.type == 5) {
			var _window_event = _event.window;
			var _window = this.window_list.h[_window_event.window_id];
			if(_window != null) _window.on_event(_window_event);
		}
	}
	,update: function() {
		this.module.update();
		var $it0 = this.window_list.iterator();
		while( $it0.hasNext() ) {
			var $window = $it0.next();
			$window.update();
		}
		var $it1 = this.window_list.iterator();
		while( $it1.hasNext() ) {
			var window1 = $it1.next();
			if(window1.auto_render) window1.render();
		}
	}
	,destroy: function() {
		this.module.destroy();
	}
	,__class__: snow_system_window_Windowing
};
var snow_types_Error = $hxClasses["snow.types.Error"] = { __ename__ : ["snow","types","Error"], __constructs__ : ["error","init","windowing","parse"] };
snow_types_Error.error = function(value) { var $x = ["error",0,value]; $x.__enum__ = snow_types_Error; return $x; };
snow_types_Error.init = function(value) { var $x = ["init",1,value]; $x.__enum__ = snow_types_Error; return $x; };
snow_types_Error.windowing = function(value) { var $x = ["windowing",2,value]; $x.__enum__ = snow_types_Error; return $x; };
snow_types_Error.parse = function(value) { var $x = ["parse",3,value]; $x.__enum__ = snow_types_Error; return $x; };
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
if(Array.prototype.indexOf) HxOverrides.indexOf = function(a,o,i) {
	return Array.prototype.indexOf.call(a,o,i);
};
$hxClasses.Math = Math;
String.prototype.__class__ = $hxClasses.String = String;
String.__name__ = ["String"];
$hxClasses.Array = Array;
Array.__name__ = ["Array"];
Date.prototype.__class__ = $hxClasses.Date = Date;
Date.__name__ = ["Date"];
var Int = $hxClasses.Int = { __name__ : ["Int"]};
var Dynamic = $hxClasses.Dynamic = { __name__ : ["Dynamic"]};
var Float = $hxClasses.Float = Number;
Float.__name__ = ["Float"];
var Bool = $hxClasses.Bool = Boolean;
Bool.__ename__ = ["Bool"];
var Class = $hxClasses.Class = { __name__ : ["Class"]};
var Enum = { };
if(Array.prototype.filter == null) Array.prototype.filter = function(f1) {
	var a1 = [];
	var _g11 = 0;
	var _g2 = this.length;
	while(_g11 < _g2) {
		var i1 = _g11++;
		var e = this[i1];
		if(f1(e)) a1.push(e);
	}
	return a1;
};
var __map_reserved = {}
var ArrayBuffer = typeof(window) != "undefined" && window.ArrayBuffer || typeof(global) != "undefined" && global.ArrayBuffer || js_html_compat_ArrayBuffer;
if(ArrayBuffer.prototype.slice == null) ArrayBuffer.prototype.slice = js_html_compat_ArrayBuffer.sliceImpl;
var DataView = typeof(window) != "undefined" && window.DataView || typeof(global) != "undefined" && global.DataView || js_html_compat_DataView;
var Uint8Array = typeof(window) != "undefined" && window.Uint8Array || typeof(global) != "undefined" && global.Uint8Array || js_html_compat_Uint8Array._new;
haxe_Serializer.USE_CACHE = false;
haxe_Serializer.USE_ENUM_INDEX = false;
haxe_Serializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_Unserializer.DEFAULT_RESOLVER = Type;
haxe_Unserializer.BASE64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%:";
haxe_ds_ObjectMap.count = 0;
haxe_io_FPHelper.i64tmp = (function($this) {
	var $r;
	var x = new haxe__$Int64__$_$_$Int64(0,0);
	$r = x;
	return $r;
}(this));
js_Boot.__toStr = {}.toString;
js_html_compat_Uint8Array.BYTES_PER_ELEMENT = 1;
shaderblox_uniforms_UTexture.lastActiveTexture = -1;
snow_api_Debug._level = 1;
snow_api_Debug._log_width = 16;
snow_api_Promises.calls = [];
snow_api_Promises.defers = [];
snow_api_Timer.running_timers = [];
snow_core_web_assets_Assets.POT = true;
snow_core_web_input_DOMKeys.dom_shift = 16;
snow_core_web_input_DOMKeys.dom_ctrl = 17;
snow_core_web_input_DOMKeys.dom_alt = 18;
snow_core_web_input_DOMKeys.dom_capslock = 20;
snow_core_web_input_DOMKeys.dom_pageup = 33;
snow_core_web_input_DOMKeys.dom_pagedown = 34;
snow_core_web_input_DOMKeys.dom_end = 35;
snow_core_web_input_DOMKeys.dom_home = 36;
snow_core_web_input_DOMKeys.dom_left = 37;
snow_core_web_input_DOMKeys.dom_up = 38;
snow_core_web_input_DOMKeys.dom_right = 39;
snow_core_web_input_DOMKeys.dom_down = 40;
snow_core_web_input_DOMKeys.dom_printscr = 44;
snow_core_web_input_DOMKeys.dom_insert = 45;
snow_core_web_input_DOMKeys.dom_delete = 46;
snow_core_web_input_DOMKeys.dom_lmeta = 91;
snow_core_web_input_DOMKeys.dom_rmeta = 93;
snow_core_web_input_DOMKeys.dom_kp_0 = 96;
snow_core_web_input_DOMKeys.dom_kp_1 = 97;
snow_core_web_input_DOMKeys.dom_kp_2 = 98;
snow_core_web_input_DOMKeys.dom_kp_3 = 99;
snow_core_web_input_DOMKeys.dom_kp_4 = 100;
snow_core_web_input_DOMKeys.dom_kp_5 = 101;
snow_core_web_input_DOMKeys.dom_kp_6 = 102;
snow_core_web_input_DOMKeys.dom_kp_7 = 103;
snow_core_web_input_DOMKeys.dom_kp_8 = 104;
snow_core_web_input_DOMKeys.dom_kp_9 = 105;
snow_core_web_input_DOMKeys.dom_kp_multiply = 106;
snow_core_web_input_DOMKeys.dom_kp_plus = 107;
snow_core_web_input_DOMKeys.dom_kp_minus = 109;
snow_core_web_input_DOMKeys.dom_kp_decimal = 110;
snow_core_web_input_DOMKeys.dom_kp_divide = 111;
snow_core_web_input_DOMKeys.dom_kp_numlock = 144;
snow_core_web_input_DOMKeys.dom_f1 = 112;
snow_core_web_input_DOMKeys.dom_f2 = 113;
snow_core_web_input_DOMKeys.dom_f3 = 114;
snow_core_web_input_DOMKeys.dom_f4 = 115;
snow_core_web_input_DOMKeys.dom_f5 = 116;
snow_core_web_input_DOMKeys.dom_f6 = 117;
snow_core_web_input_DOMKeys.dom_f7 = 118;
snow_core_web_input_DOMKeys.dom_f8 = 119;
snow_core_web_input_DOMKeys.dom_f9 = 120;
snow_core_web_input_DOMKeys.dom_f10 = 121;
snow_core_web_input_DOMKeys.dom_f11 = 122;
snow_core_web_input_DOMKeys.dom_f12 = 123;
snow_core_web_input_DOMKeys.dom_f13 = 124;
snow_core_web_input_DOMKeys.dom_f14 = 125;
snow_core_web_input_DOMKeys.dom_f15 = 126;
snow_core_web_input_DOMKeys.dom_f16 = 127;
snow_core_web_input_DOMKeys.dom_f17 = 128;
snow_core_web_input_DOMKeys.dom_f18 = 129;
snow_core_web_input_DOMKeys.dom_f19 = 130;
snow_core_web_input_DOMKeys.dom_f20 = 131;
snow_core_web_input_DOMKeys.dom_f21 = 132;
snow_core_web_input_DOMKeys.dom_f22 = 133;
snow_core_web_input_DOMKeys.dom_f23 = 134;
snow_core_web_input_DOMKeys.dom_f24 = 135;
snow_core_web_input_DOMKeys.dom_caret = 160;
snow_core_web_input_DOMKeys.dom_exclaim = 161;
snow_core_web_input_DOMKeys.dom_quotedbl = 162;
snow_core_web_input_DOMKeys.dom_hash = 163;
snow_core_web_input_DOMKeys.dom_dollar = 164;
snow_core_web_input_DOMKeys.dom_percent = 165;
snow_core_web_input_DOMKeys.dom_ampersand = 166;
snow_core_web_input_DOMKeys.dom_underscore = 167;
snow_core_web_input_DOMKeys.dom_leftparen = 168;
snow_core_web_input_DOMKeys.dom_rightparen = 169;
snow_core_web_input_DOMKeys.dom_asterisk = 170;
snow_core_web_input_DOMKeys.dom_plus = 171;
snow_core_web_input_DOMKeys.dom_pipe = 172;
snow_core_web_input_DOMKeys.dom_minus = 173;
snow_core_web_input_DOMKeys.dom_leftbrace = 174;
snow_core_web_input_DOMKeys.dom_rightbrace = 175;
snow_core_web_input_DOMKeys.dom_tilde = 176;
snow_core_web_input_DOMKeys.dom_audiomute = 181;
snow_core_web_input_DOMKeys.dom_volumedown = 182;
snow_core_web_input_DOMKeys.dom_volumeup = 183;
snow_core_web_input_DOMKeys.dom_comma = 188;
snow_core_web_input_DOMKeys.dom_period = 190;
snow_core_web_input_DOMKeys.dom_slash = 191;
snow_core_web_input_DOMKeys.dom_backquote = 192;
snow_core_web_input_DOMKeys.dom_leftbracket = 219;
snow_core_web_input_DOMKeys.dom_rightbracket = 221;
snow_core_web_input_DOMKeys.dom_backslash = 220;
snow_core_web_input_DOMKeys.dom_quote = 222;
snow_core_web_input_DOMKeys.dom_meta = 224;
snow_system_input_Scancodes.MASK = 1073741824;
snow_system_input_Scancodes.unknown = 0;
snow_system_input_Scancodes.key_a = 4;
snow_system_input_Scancodes.key_b = 5;
snow_system_input_Scancodes.key_c = 6;
snow_system_input_Scancodes.key_d = 7;
snow_system_input_Scancodes.key_e = 8;
snow_system_input_Scancodes.key_f = 9;
snow_system_input_Scancodes.key_g = 10;
snow_system_input_Scancodes.key_h = 11;
snow_system_input_Scancodes.key_i = 12;
snow_system_input_Scancodes.key_j = 13;
snow_system_input_Scancodes.key_k = 14;
snow_system_input_Scancodes.key_l = 15;
snow_system_input_Scancodes.key_m = 16;
snow_system_input_Scancodes.key_n = 17;
snow_system_input_Scancodes.key_o = 18;
snow_system_input_Scancodes.key_p = 19;
snow_system_input_Scancodes.key_q = 20;
snow_system_input_Scancodes.key_r = 21;
snow_system_input_Scancodes.key_s = 22;
snow_system_input_Scancodes.key_t = 23;
snow_system_input_Scancodes.key_u = 24;
snow_system_input_Scancodes.key_v = 25;
snow_system_input_Scancodes.key_w = 26;
snow_system_input_Scancodes.key_x = 27;
snow_system_input_Scancodes.key_y = 28;
snow_system_input_Scancodes.key_z = 29;
snow_system_input_Scancodes.key_1 = 30;
snow_system_input_Scancodes.key_2 = 31;
snow_system_input_Scancodes.key_3 = 32;
snow_system_input_Scancodes.key_4 = 33;
snow_system_input_Scancodes.key_5 = 34;
snow_system_input_Scancodes.key_6 = 35;
snow_system_input_Scancodes.key_7 = 36;
snow_system_input_Scancodes.key_8 = 37;
snow_system_input_Scancodes.key_9 = 38;
snow_system_input_Scancodes.key_0 = 39;
snow_system_input_Scancodes.enter = 40;
snow_system_input_Scancodes.escape = 41;
snow_system_input_Scancodes.backspace = 42;
snow_system_input_Scancodes.tab = 43;
snow_system_input_Scancodes.space = 44;
snow_system_input_Scancodes.minus = 45;
snow_system_input_Scancodes.equals = 46;
snow_system_input_Scancodes.leftbracket = 47;
snow_system_input_Scancodes.rightbracket = 48;
snow_system_input_Scancodes.backslash = 49;
snow_system_input_Scancodes.nonushash = 50;
snow_system_input_Scancodes.semicolon = 51;
snow_system_input_Scancodes.apostrophe = 52;
snow_system_input_Scancodes.grave = 53;
snow_system_input_Scancodes.comma = 54;
snow_system_input_Scancodes.period = 55;
snow_system_input_Scancodes.slash = 56;
snow_system_input_Scancodes.capslock = 57;
snow_system_input_Scancodes.f1 = 58;
snow_system_input_Scancodes.f2 = 59;
snow_system_input_Scancodes.f3 = 60;
snow_system_input_Scancodes.f4 = 61;
snow_system_input_Scancodes.f5 = 62;
snow_system_input_Scancodes.f6 = 63;
snow_system_input_Scancodes.f7 = 64;
snow_system_input_Scancodes.f8 = 65;
snow_system_input_Scancodes.f9 = 66;
snow_system_input_Scancodes.f10 = 67;
snow_system_input_Scancodes.f11 = 68;
snow_system_input_Scancodes.f12 = 69;
snow_system_input_Scancodes.printscreen = 70;
snow_system_input_Scancodes.scrolllock = 71;
snow_system_input_Scancodes.pause = 72;
snow_system_input_Scancodes.insert = 73;
snow_system_input_Scancodes.home = 74;
snow_system_input_Scancodes.pageup = 75;
snow_system_input_Scancodes["delete"] = 76;
snow_system_input_Scancodes.end = 77;
snow_system_input_Scancodes.pagedown = 78;
snow_system_input_Scancodes.right = 79;
snow_system_input_Scancodes.left = 80;
snow_system_input_Scancodes.down = 81;
snow_system_input_Scancodes.up = 82;
snow_system_input_Scancodes.numlockclear = 83;
snow_system_input_Scancodes.kp_divide = 84;
snow_system_input_Scancodes.kp_multiply = 85;
snow_system_input_Scancodes.kp_minus = 86;
snow_system_input_Scancodes.kp_plus = 87;
snow_system_input_Scancodes.kp_enter = 88;
snow_system_input_Scancodes.kp_1 = 89;
snow_system_input_Scancodes.kp_2 = 90;
snow_system_input_Scancodes.kp_3 = 91;
snow_system_input_Scancodes.kp_4 = 92;
snow_system_input_Scancodes.kp_5 = 93;
snow_system_input_Scancodes.kp_6 = 94;
snow_system_input_Scancodes.kp_7 = 95;
snow_system_input_Scancodes.kp_8 = 96;
snow_system_input_Scancodes.kp_9 = 97;
snow_system_input_Scancodes.kp_0 = 98;
snow_system_input_Scancodes.kp_period = 99;
snow_system_input_Scancodes.nonusbackslash = 100;
snow_system_input_Scancodes.application = 101;
snow_system_input_Scancodes.power = 102;
snow_system_input_Scancodes.kp_equals = 103;
snow_system_input_Scancodes.f13 = 104;
snow_system_input_Scancodes.f14 = 105;
snow_system_input_Scancodes.f15 = 106;
snow_system_input_Scancodes.f16 = 107;
snow_system_input_Scancodes.f17 = 108;
snow_system_input_Scancodes.f18 = 109;
snow_system_input_Scancodes.f19 = 110;
snow_system_input_Scancodes.f20 = 111;
snow_system_input_Scancodes.f21 = 112;
snow_system_input_Scancodes.f22 = 113;
snow_system_input_Scancodes.f23 = 114;
snow_system_input_Scancodes.f24 = 115;
snow_system_input_Scancodes.execute = 116;
snow_system_input_Scancodes.help = 117;
snow_system_input_Scancodes.menu = 118;
snow_system_input_Scancodes.select = 119;
snow_system_input_Scancodes.stop = 120;
snow_system_input_Scancodes.again = 121;
snow_system_input_Scancodes.undo = 122;
snow_system_input_Scancodes.cut = 123;
snow_system_input_Scancodes.copy = 124;
snow_system_input_Scancodes.paste = 125;
snow_system_input_Scancodes.find = 126;
snow_system_input_Scancodes.mute = 127;
snow_system_input_Scancodes.volumeup = 128;
snow_system_input_Scancodes.volumedown = 129;
snow_system_input_Scancodes.kp_comma = 133;
snow_system_input_Scancodes.kp_equalsas400 = 134;
snow_system_input_Scancodes.international1 = 135;
snow_system_input_Scancodes.international2 = 136;
snow_system_input_Scancodes.international3 = 137;
snow_system_input_Scancodes.international4 = 138;
snow_system_input_Scancodes.international5 = 139;
snow_system_input_Scancodes.international6 = 140;
snow_system_input_Scancodes.international7 = 141;
snow_system_input_Scancodes.international8 = 142;
snow_system_input_Scancodes.international9 = 143;
snow_system_input_Scancodes.lang1 = 144;
snow_system_input_Scancodes.lang2 = 145;
snow_system_input_Scancodes.lang3 = 146;
snow_system_input_Scancodes.lang4 = 147;
snow_system_input_Scancodes.lang5 = 148;
snow_system_input_Scancodes.lang6 = 149;
snow_system_input_Scancodes.lang7 = 150;
snow_system_input_Scancodes.lang8 = 151;
snow_system_input_Scancodes.lang9 = 152;
snow_system_input_Scancodes.alterase = 153;
snow_system_input_Scancodes.sysreq = 154;
snow_system_input_Scancodes.cancel = 155;
snow_system_input_Scancodes.clear = 156;
snow_system_input_Scancodes.prior = 157;
snow_system_input_Scancodes.return2 = 158;
snow_system_input_Scancodes.separator = 159;
snow_system_input_Scancodes.out = 160;
snow_system_input_Scancodes.oper = 161;
snow_system_input_Scancodes.clearagain = 162;
snow_system_input_Scancodes.crsel = 163;
snow_system_input_Scancodes.exsel = 164;
snow_system_input_Scancodes.kp_00 = 176;
snow_system_input_Scancodes.kp_000 = 177;
snow_system_input_Scancodes.thousandsseparator = 178;
snow_system_input_Scancodes.decimalseparator = 179;
snow_system_input_Scancodes.currencyunit = 180;
snow_system_input_Scancodes.currencysubunit = 181;
snow_system_input_Scancodes.kp_leftparen = 182;
snow_system_input_Scancodes.kp_rightparen = 183;
snow_system_input_Scancodes.kp_leftbrace = 184;
snow_system_input_Scancodes.kp_rightbrace = 185;
snow_system_input_Scancodes.kp_tab = 186;
snow_system_input_Scancodes.kp_backspace = 187;
snow_system_input_Scancodes.kp_a = 188;
snow_system_input_Scancodes.kp_b = 189;
snow_system_input_Scancodes.kp_c = 190;
snow_system_input_Scancodes.kp_d = 191;
snow_system_input_Scancodes.kp_e = 192;
snow_system_input_Scancodes.kp_f = 193;
snow_system_input_Scancodes.kp_xor = 194;
snow_system_input_Scancodes.kp_power = 195;
snow_system_input_Scancodes.kp_percent = 196;
snow_system_input_Scancodes.kp_less = 197;
snow_system_input_Scancodes.kp_greater = 198;
snow_system_input_Scancodes.kp_ampersand = 199;
snow_system_input_Scancodes.kp_dblampersand = 200;
snow_system_input_Scancodes.kp_verticalbar = 201;
snow_system_input_Scancodes.kp_dblverticalbar = 202;
snow_system_input_Scancodes.kp_colon = 203;
snow_system_input_Scancodes.kp_hash = 204;
snow_system_input_Scancodes.kp_space = 205;
snow_system_input_Scancodes.kp_at = 206;
snow_system_input_Scancodes.kp_exclam = 207;
snow_system_input_Scancodes.kp_memstore = 208;
snow_system_input_Scancodes.kp_memrecall = 209;
snow_system_input_Scancodes.kp_memclear = 210;
snow_system_input_Scancodes.kp_memadd = 211;
snow_system_input_Scancodes.kp_memsubtract = 212;
snow_system_input_Scancodes.kp_memmultiply = 213;
snow_system_input_Scancodes.kp_memdivide = 214;
snow_system_input_Scancodes.kp_plusminus = 215;
snow_system_input_Scancodes.kp_clear = 216;
snow_system_input_Scancodes.kp_clearentry = 217;
snow_system_input_Scancodes.kp_binary = 218;
snow_system_input_Scancodes.kp_octal = 219;
snow_system_input_Scancodes.kp_decimal = 220;
snow_system_input_Scancodes.kp_hexadecimal = 221;
snow_system_input_Scancodes.lctrl = 224;
snow_system_input_Scancodes.lshift = 225;
snow_system_input_Scancodes.lalt = 226;
snow_system_input_Scancodes.lmeta = 227;
snow_system_input_Scancodes.rctrl = 228;
snow_system_input_Scancodes.rshift = 229;
snow_system_input_Scancodes.ralt = 230;
snow_system_input_Scancodes.rmeta = 231;
snow_system_input_Scancodes.mode = 257;
snow_system_input_Scancodes.audionext = 258;
snow_system_input_Scancodes.audioprev = 259;
snow_system_input_Scancodes.audiostop = 260;
snow_system_input_Scancodes.audioplay = 261;
snow_system_input_Scancodes.audiomute = 262;
snow_system_input_Scancodes.mediaselect = 263;
snow_system_input_Scancodes.www = 264;
snow_system_input_Scancodes.mail = 265;
snow_system_input_Scancodes.calculator = 266;
snow_system_input_Scancodes.computer = 267;
snow_system_input_Scancodes.ac_search = 268;
snow_system_input_Scancodes.ac_home = 269;
snow_system_input_Scancodes.ac_back = 270;
snow_system_input_Scancodes.ac_forward = 271;
snow_system_input_Scancodes.ac_stop = 272;
snow_system_input_Scancodes.ac_refresh = 273;
snow_system_input_Scancodes.ac_bookmarks = 274;
snow_system_input_Scancodes.brightnessdown = 275;
snow_system_input_Scancodes.brightnessup = 276;
snow_system_input_Scancodes.displayswitch = 277;
snow_system_input_Scancodes.kbdillumtoggle = 278;
snow_system_input_Scancodes.kbdillumdown = 279;
snow_system_input_Scancodes.kbdillumup = 280;
snow_system_input_Scancodes.eject = 281;
snow_system_input_Scancodes.sleep = 282;
snow_system_input_Scancodes.app1 = 283;
snow_system_input_Scancodes.app2 = 284;
snow_system_input_Scancodes.scancode_names = [null,null,null,null,"A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9","0","Enter","Escape","Backspace","Tab","Space","-","=","[","]","\\","#",";","'","`",",",".","/","CapsLock","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","PrintScreen","ScrollLock","Pause","Insert","Home","PageUp","Delete","End","PageDown","Right","Left","Down","Up","Numlock","Keypad /","Keypad *","Keypad -","Keypad +","Keypad Enter","Keypad 1","Keypad 2","Keypad 3","Keypad 4","Keypad 5","Keypad 6","Keypad 7","Keypad 8","Keypad 9","Keypad 0","Keypad .",null,"Application","Power","Keypad =","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","Execute","Help","Menu","Select","Stop","Again","Undo","Cut","Copy","Paste","Find","Mute","VolumeUp","VolumeDown",null,null,null,"Keypad ,","Keypad = (AS400)",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"AltErase","SysReq","Cancel","Clear","Prior","Enter","Separator","Out","Oper","Clear / Again","CrSel","ExSel",null,null,null,null,null,null,null,null,null,null,null,"Keypad 00","Keypad 000","ThousandsSeparator","DecimalSeparator","CurrencyUnit","CurrencySubUnit","Keypad (","Keypad )","Keypad {","Keypad }","Keypad Tab","Keypad Backspace","Keypad A","Keypad B","Keypad C","Keypad D","Keypad E","Keypad F","Keypad XOR","Keypad ^","Keypad %","Keypad <","Keypad >","Keypad &","Keypad &&","Keypad |","Keypad ||","Keypad :","Keypad #","Keypad Space","Keypad @","Keypad !","Keypad MemStore","Keypad MemRecall","Keypad MemClear","Keypad MemAdd","Keypad MemSubtract","Keypad MemMultiply","Keypad MemDivide","Keypad +/-","Keypad Clear","Keypad ClearEntry","Keypad Binary","Keypad Octal","Keypad Decimal","Keypad Hexadecimal",null,null,"Left Ctrl","Left Shift","Left Alt","Left Meta","Right Ctrl","Right Shift","Right Alt","Right Meta",null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,"ModeSwitch","AudioNext","AudioPrev","AudioStop","AudioPlay","AudioMute","MediaSelect","WWW","Mail","Calculator","Computer","AC Search","AC Home","AC Back","AC Forward","AC Stop","AC Refresh","AC Bookmarks","BrightnessDown","BrightnessUp","DisplaySwitch","KBDIllumToggle","KBDIllumDown","KBDIllumUp","Eject","Sleep"];
snow_system_input_Keycodes.unknown = 0;
snow_system_input_Keycodes.enter = 13;
snow_system_input_Keycodes.escape = 27;
snow_system_input_Keycodes.backspace = 8;
snow_system_input_Keycodes.tab = 9;
snow_system_input_Keycodes.space = 32;
snow_system_input_Keycodes.exclaim = 33;
snow_system_input_Keycodes.quotedbl = 34;
snow_system_input_Keycodes.hash = 35;
snow_system_input_Keycodes.percent = 37;
snow_system_input_Keycodes.dollar = 36;
snow_system_input_Keycodes.ampersand = 38;
snow_system_input_Keycodes.quote = 39;
snow_system_input_Keycodes.leftparen = 40;
snow_system_input_Keycodes.rightparen = 41;
snow_system_input_Keycodes.asterisk = 42;
snow_system_input_Keycodes.plus = 43;
snow_system_input_Keycodes.comma = 44;
snow_system_input_Keycodes.minus = 45;
snow_system_input_Keycodes.period = 46;
snow_system_input_Keycodes.slash = 47;
snow_system_input_Keycodes.key_0 = 48;
snow_system_input_Keycodes.key_1 = 49;
snow_system_input_Keycodes.key_2 = 50;
snow_system_input_Keycodes.key_3 = 51;
snow_system_input_Keycodes.key_4 = 52;
snow_system_input_Keycodes.key_5 = 53;
snow_system_input_Keycodes.key_6 = 54;
snow_system_input_Keycodes.key_7 = 55;
snow_system_input_Keycodes.key_8 = 56;
snow_system_input_Keycodes.key_9 = 57;
snow_system_input_Keycodes.colon = 58;
snow_system_input_Keycodes.semicolon = 59;
snow_system_input_Keycodes.less = 60;
snow_system_input_Keycodes.equals = 61;
snow_system_input_Keycodes.greater = 62;
snow_system_input_Keycodes.question = 63;
snow_system_input_Keycodes.at = 64;
snow_system_input_Keycodes.leftbracket = 91;
snow_system_input_Keycodes.backslash = 92;
snow_system_input_Keycodes.rightbracket = 93;
snow_system_input_Keycodes.caret = 94;
snow_system_input_Keycodes.underscore = 95;
snow_system_input_Keycodes.backquote = 96;
snow_system_input_Keycodes.key_a = 97;
snow_system_input_Keycodes.key_b = 98;
snow_system_input_Keycodes.key_c = 99;
snow_system_input_Keycodes.key_d = 100;
snow_system_input_Keycodes.key_e = 101;
snow_system_input_Keycodes.key_f = 102;
snow_system_input_Keycodes.key_g = 103;
snow_system_input_Keycodes.key_h = 104;
snow_system_input_Keycodes.key_i = 105;
snow_system_input_Keycodes.key_j = 106;
snow_system_input_Keycodes.key_k = 107;
snow_system_input_Keycodes.key_l = 108;
snow_system_input_Keycodes.key_m = 109;
snow_system_input_Keycodes.key_n = 110;
snow_system_input_Keycodes.key_o = 111;
snow_system_input_Keycodes.key_p = 112;
snow_system_input_Keycodes.key_q = 113;
snow_system_input_Keycodes.key_r = 114;
snow_system_input_Keycodes.key_s = 115;
snow_system_input_Keycodes.key_t = 116;
snow_system_input_Keycodes.key_u = 117;
snow_system_input_Keycodes.key_v = 118;
snow_system_input_Keycodes.key_w = 119;
snow_system_input_Keycodes.key_x = 120;
snow_system_input_Keycodes.key_y = 121;
snow_system_input_Keycodes.key_z = 122;
snow_system_input_Keycodes.capslock = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.capslock);
snow_system_input_Keycodes.f1 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f1);
snow_system_input_Keycodes.f2 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f2);
snow_system_input_Keycodes.f3 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f3);
snow_system_input_Keycodes.f4 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f4);
snow_system_input_Keycodes.f5 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f5);
snow_system_input_Keycodes.f6 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f6);
snow_system_input_Keycodes.f7 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f7);
snow_system_input_Keycodes.f8 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f8);
snow_system_input_Keycodes.f9 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f9);
snow_system_input_Keycodes.f10 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f10);
snow_system_input_Keycodes.f11 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f11);
snow_system_input_Keycodes.f12 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f12);
snow_system_input_Keycodes.printscreen = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.printscreen);
snow_system_input_Keycodes.scrolllock = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.scrolllock);
snow_system_input_Keycodes.pause = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.pause);
snow_system_input_Keycodes.insert = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.insert);
snow_system_input_Keycodes.home = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.home);
snow_system_input_Keycodes.pageup = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.pageup);
snow_system_input_Keycodes["delete"] = 127;
snow_system_input_Keycodes.end = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.end);
snow_system_input_Keycodes.pagedown = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.pagedown);
snow_system_input_Keycodes.right = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.right);
snow_system_input_Keycodes.left = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.left);
snow_system_input_Keycodes.down = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.down);
snow_system_input_Keycodes.up = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.up);
snow_system_input_Keycodes.numlockclear = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.numlockclear);
snow_system_input_Keycodes.kp_divide = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_divide);
snow_system_input_Keycodes.kp_multiply = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_multiply);
snow_system_input_Keycodes.kp_minus = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_minus);
snow_system_input_Keycodes.kp_plus = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_plus);
snow_system_input_Keycodes.kp_enter = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_enter);
snow_system_input_Keycodes.kp_1 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_1);
snow_system_input_Keycodes.kp_2 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_2);
snow_system_input_Keycodes.kp_3 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_3);
snow_system_input_Keycodes.kp_4 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_4);
snow_system_input_Keycodes.kp_5 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_5);
snow_system_input_Keycodes.kp_6 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_6);
snow_system_input_Keycodes.kp_7 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_7);
snow_system_input_Keycodes.kp_8 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_8);
snow_system_input_Keycodes.kp_9 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_9);
snow_system_input_Keycodes.kp_0 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_0);
snow_system_input_Keycodes.kp_period = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_period);
snow_system_input_Keycodes.application = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.application);
snow_system_input_Keycodes.power = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.power);
snow_system_input_Keycodes.kp_equals = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_equals);
snow_system_input_Keycodes.f13 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f13);
snow_system_input_Keycodes.f14 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f14);
snow_system_input_Keycodes.f15 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f15);
snow_system_input_Keycodes.f16 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f16);
snow_system_input_Keycodes.f17 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f17);
snow_system_input_Keycodes.f18 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f18);
snow_system_input_Keycodes.f19 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f19);
snow_system_input_Keycodes.f20 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f20);
snow_system_input_Keycodes.f21 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f21);
snow_system_input_Keycodes.f22 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f22);
snow_system_input_Keycodes.f23 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f23);
snow_system_input_Keycodes.f24 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.f24);
snow_system_input_Keycodes.execute = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.execute);
snow_system_input_Keycodes.help = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.help);
snow_system_input_Keycodes.menu = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.menu);
snow_system_input_Keycodes.select = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.select);
snow_system_input_Keycodes.stop = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.stop);
snow_system_input_Keycodes.again = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.again);
snow_system_input_Keycodes.undo = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.undo);
snow_system_input_Keycodes.cut = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.cut);
snow_system_input_Keycodes.copy = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.copy);
snow_system_input_Keycodes.paste = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.paste);
snow_system_input_Keycodes.find = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.find);
snow_system_input_Keycodes.mute = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.mute);
snow_system_input_Keycodes.volumeup = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.volumeup);
snow_system_input_Keycodes.volumedown = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.volumedown);
snow_system_input_Keycodes.kp_comma = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_comma);
snow_system_input_Keycodes.kp_equalsas400 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_equalsas400);
snow_system_input_Keycodes.alterase = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.alterase);
snow_system_input_Keycodes.sysreq = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.sysreq);
snow_system_input_Keycodes.cancel = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.cancel);
snow_system_input_Keycodes.clear = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.clear);
snow_system_input_Keycodes.prior = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.prior);
snow_system_input_Keycodes.return2 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.return2);
snow_system_input_Keycodes.separator = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.separator);
snow_system_input_Keycodes.out = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.out);
snow_system_input_Keycodes.oper = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.oper);
snow_system_input_Keycodes.clearagain = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.clearagain);
snow_system_input_Keycodes.crsel = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.crsel);
snow_system_input_Keycodes.exsel = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.exsel);
snow_system_input_Keycodes.kp_00 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_00);
snow_system_input_Keycodes.kp_000 = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_000);
snow_system_input_Keycodes.thousandsseparator = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.thousandsseparator);
snow_system_input_Keycodes.decimalseparator = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.decimalseparator);
snow_system_input_Keycodes.currencyunit = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.currencyunit);
snow_system_input_Keycodes.currencysubunit = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.currencysubunit);
snow_system_input_Keycodes.kp_leftparen = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_leftparen);
snow_system_input_Keycodes.kp_rightparen = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_rightparen);
snow_system_input_Keycodes.kp_leftbrace = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_leftbrace);
snow_system_input_Keycodes.kp_rightbrace = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_rightbrace);
snow_system_input_Keycodes.kp_tab = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_tab);
snow_system_input_Keycodes.kp_backspace = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_backspace);
snow_system_input_Keycodes.kp_a = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_a);
snow_system_input_Keycodes.kp_b = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_b);
snow_system_input_Keycodes.kp_c = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_c);
snow_system_input_Keycodes.kp_d = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_d);
snow_system_input_Keycodes.kp_e = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_e);
snow_system_input_Keycodes.kp_f = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_f);
snow_system_input_Keycodes.kp_xor = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_xor);
snow_system_input_Keycodes.kp_power = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_power);
snow_system_input_Keycodes.kp_percent = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_percent);
snow_system_input_Keycodes.kp_less = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_less);
snow_system_input_Keycodes.kp_greater = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_greater);
snow_system_input_Keycodes.kp_ampersand = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_ampersand);
snow_system_input_Keycodes.kp_dblampersand = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_dblampersand);
snow_system_input_Keycodes.kp_verticalbar = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_verticalbar);
snow_system_input_Keycodes.kp_dblverticalbar = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_dblverticalbar);
snow_system_input_Keycodes.kp_colon = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_colon);
snow_system_input_Keycodes.kp_hash = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_hash);
snow_system_input_Keycodes.kp_space = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_space);
snow_system_input_Keycodes.kp_at = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_at);
snow_system_input_Keycodes.kp_exclam = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_exclam);
snow_system_input_Keycodes.kp_memstore = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_memstore);
snow_system_input_Keycodes.kp_memrecall = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_memrecall);
snow_system_input_Keycodes.kp_memclear = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_memclear);
snow_system_input_Keycodes.kp_memadd = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_memadd);
snow_system_input_Keycodes.kp_memsubtract = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_memsubtract);
snow_system_input_Keycodes.kp_memmultiply = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_memmultiply);
snow_system_input_Keycodes.kp_memdivide = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_memdivide);
snow_system_input_Keycodes.kp_plusminus = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_plusminus);
snow_system_input_Keycodes.kp_clear = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_clear);
snow_system_input_Keycodes.kp_clearentry = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_clearentry);
snow_system_input_Keycodes.kp_binary = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_binary);
snow_system_input_Keycodes.kp_octal = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_octal);
snow_system_input_Keycodes.kp_decimal = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_decimal);
snow_system_input_Keycodes.kp_hexadecimal = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kp_hexadecimal);
snow_system_input_Keycodes.lctrl = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.lctrl);
snow_system_input_Keycodes.lshift = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.lshift);
snow_system_input_Keycodes.lalt = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.lalt);
snow_system_input_Keycodes.lmeta = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.lmeta);
snow_system_input_Keycodes.rctrl = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.rctrl);
snow_system_input_Keycodes.rshift = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.rshift);
snow_system_input_Keycodes.ralt = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.ralt);
snow_system_input_Keycodes.rmeta = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.rmeta);
snow_system_input_Keycodes.mode = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.mode);
snow_system_input_Keycodes.audionext = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.audionext);
snow_system_input_Keycodes.audioprev = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.audioprev);
snow_system_input_Keycodes.audiostop = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.audiostop);
snow_system_input_Keycodes.audioplay = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.audioplay);
snow_system_input_Keycodes.audiomute = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.audiomute);
snow_system_input_Keycodes.mediaselect = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.mediaselect);
snow_system_input_Keycodes.www = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.www);
snow_system_input_Keycodes.mail = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.mail);
snow_system_input_Keycodes.calculator = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.calculator);
snow_system_input_Keycodes.computer = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.computer);
snow_system_input_Keycodes.ac_search = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.ac_search);
snow_system_input_Keycodes.ac_home = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.ac_home);
snow_system_input_Keycodes.ac_back = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.ac_back);
snow_system_input_Keycodes.ac_forward = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.ac_forward);
snow_system_input_Keycodes.ac_stop = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.ac_stop);
snow_system_input_Keycodes.ac_refresh = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.ac_refresh);
snow_system_input_Keycodes.ac_bookmarks = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.ac_bookmarks);
snow_system_input_Keycodes.brightnessdown = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.brightnessdown);
snow_system_input_Keycodes.brightnessup = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.brightnessup);
snow_system_input_Keycodes.displayswitch = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.displayswitch);
snow_system_input_Keycodes.kbdillumtoggle = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kbdillumtoggle);
snow_system_input_Keycodes.kbdillumdown = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kbdillumdown);
snow_system_input_Keycodes.kbdillumup = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.kbdillumup);
snow_system_input_Keycodes.eject = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.eject);
snow_system_input_Keycodes.sleep = snow_system_input_Keycodes.from_scan(snow_system_input_Scancodes.sleep);
snow_core_web_input_Input._keypress_blacklist = [snow_system_input_Keycodes.backspace,snow_system_input_Keycodes.enter];
snow_modules_opengl_web_GL.DEPTH_BUFFER_BIT = 256;
snow_modules_opengl_web_GL.STENCIL_BUFFER_BIT = 1024;
snow_modules_opengl_web_GL.COLOR_BUFFER_BIT = 16384;
snow_modules_opengl_web_GL.POINTS = 0;
snow_modules_opengl_web_GL.LINES = 1;
snow_modules_opengl_web_GL.LINE_LOOP = 2;
snow_modules_opengl_web_GL.LINE_STRIP = 3;
snow_modules_opengl_web_GL.TRIANGLES = 4;
snow_modules_opengl_web_GL.TRIANGLE_STRIP = 5;
snow_modules_opengl_web_GL.TRIANGLE_FAN = 6;
snow_modules_opengl_web_GL.ZERO = 0;
snow_modules_opengl_web_GL.ONE = 1;
snow_modules_opengl_web_GL.SRC_COLOR = 768;
snow_modules_opengl_web_GL.ONE_MINUS_SRC_COLOR = 769;
snow_modules_opengl_web_GL.SRC_ALPHA = 770;
snow_modules_opengl_web_GL.ONE_MINUS_SRC_ALPHA = 771;
snow_modules_opengl_web_GL.DST_ALPHA = 772;
snow_modules_opengl_web_GL.ONE_MINUS_DST_ALPHA = 773;
snow_modules_opengl_web_GL.DST_COLOR = 774;
snow_modules_opengl_web_GL.ONE_MINUS_DST_COLOR = 775;
snow_modules_opengl_web_GL.SRC_ALPHA_SATURATE = 776;
snow_modules_opengl_web_GL.FUNC_ADD = 32774;
snow_modules_opengl_web_GL.BLEND_EQUATION = 32777;
snow_modules_opengl_web_GL.BLEND_EQUATION_RGB = 32777;
snow_modules_opengl_web_GL.BLEND_EQUATION_ALPHA = 34877;
snow_modules_opengl_web_GL.FUNC_SUBTRACT = 32778;
snow_modules_opengl_web_GL.FUNC_REVERSE_SUBTRACT = 32779;
snow_modules_opengl_web_GL.BLEND_DST_RGB = 32968;
snow_modules_opengl_web_GL.BLEND_SRC_RGB = 32969;
snow_modules_opengl_web_GL.BLEND_DST_ALPHA = 32970;
snow_modules_opengl_web_GL.BLEND_SRC_ALPHA = 32971;
snow_modules_opengl_web_GL.CONSTANT_COLOR = 32769;
snow_modules_opengl_web_GL.ONE_MINUS_CONSTANT_COLOR = 32770;
snow_modules_opengl_web_GL.CONSTANT_ALPHA = 32771;
snow_modules_opengl_web_GL.ONE_MINUS_CONSTANT_ALPHA = 32772;
snow_modules_opengl_web_GL.BLEND_COLOR = 32773;
snow_modules_opengl_web_GL.ARRAY_BUFFER = 34962;
snow_modules_opengl_web_GL.ELEMENT_ARRAY_BUFFER = 34963;
snow_modules_opengl_web_GL.ARRAY_BUFFER_BINDING = 34964;
snow_modules_opengl_web_GL.ELEMENT_ARRAY_BUFFER_BINDING = 34965;
snow_modules_opengl_web_GL.STREAM_DRAW = 35040;
snow_modules_opengl_web_GL.STATIC_DRAW = 35044;
snow_modules_opengl_web_GL.DYNAMIC_DRAW = 35048;
snow_modules_opengl_web_GL.BUFFER_SIZE = 34660;
snow_modules_opengl_web_GL.BUFFER_USAGE = 34661;
snow_modules_opengl_web_GL.CURRENT_VERTEX_ATTRIB = 34342;
snow_modules_opengl_web_GL.FRONT = 1028;
snow_modules_opengl_web_GL.BACK = 1029;
snow_modules_opengl_web_GL.FRONT_AND_BACK = 1032;
snow_modules_opengl_web_GL.CULL_FACE = 2884;
snow_modules_opengl_web_GL.BLEND = 3042;
snow_modules_opengl_web_GL.DITHER = 3024;
snow_modules_opengl_web_GL.STENCIL_TEST = 2960;
snow_modules_opengl_web_GL.DEPTH_TEST = 2929;
snow_modules_opengl_web_GL.SCISSOR_TEST = 3089;
snow_modules_opengl_web_GL.POLYGON_OFFSET_FILL = 32823;
snow_modules_opengl_web_GL.SAMPLE_ALPHA_TO_COVERAGE = 32926;
snow_modules_opengl_web_GL.SAMPLE_COVERAGE = 32928;
snow_modules_opengl_web_GL.NO_ERROR = 0;
snow_modules_opengl_web_GL.INVALID_ENUM = 1280;
snow_modules_opengl_web_GL.INVALID_VALUE = 1281;
snow_modules_opengl_web_GL.INVALID_OPERATION = 1282;
snow_modules_opengl_web_GL.OUT_OF_MEMORY = 1285;
snow_modules_opengl_web_GL.CW = 2304;
snow_modules_opengl_web_GL.CCW = 2305;
snow_modules_opengl_web_GL.LINE_WIDTH = 2849;
snow_modules_opengl_web_GL.ALIASED_POINT_SIZE_RANGE = 33901;
snow_modules_opengl_web_GL.ALIASED_LINE_WIDTH_RANGE = 33902;
snow_modules_opengl_web_GL.CULL_FACE_MODE = 2885;
snow_modules_opengl_web_GL.FRONT_FACE = 2886;
snow_modules_opengl_web_GL.DEPTH_RANGE = 2928;
snow_modules_opengl_web_GL.DEPTH_WRITEMASK = 2930;
snow_modules_opengl_web_GL.DEPTH_CLEAR_VALUE = 2931;
snow_modules_opengl_web_GL.DEPTH_FUNC = 2932;
snow_modules_opengl_web_GL.STENCIL_CLEAR_VALUE = 2961;
snow_modules_opengl_web_GL.STENCIL_FUNC = 2962;
snow_modules_opengl_web_GL.STENCIL_FAIL = 2964;
snow_modules_opengl_web_GL.STENCIL_PASS_DEPTH_FAIL = 2965;
snow_modules_opengl_web_GL.STENCIL_PASS_DEPTH_PASS = 2966;
snow_modules_opengl_web_GL.STENCIL_REF = 2967;
snow_modules_opengl_web_GL.STENCIL_VALUE_MASK = 2963;
snow_modules_opengl_web_GL.STENCIL_WRITEMASK = 2968;
snow_modules_opengl_web_GL.STENCIL_BACK_FUNC = 34816;
snow_modules_opengl_web_GL.STENCIL_BACK_FAIL = 34817;
snow_modules_opengl_web_GL.STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
snow_modules_opengl_web_GL.STENCIL_BACK_PASS_DEPTH_PASS = 34819;
snow_modules_opengl_web_GL.STENCIL_BACK_REF = 36003;
snow_modules_opengl_web_GL.STENCIL_BACK_VALUE_MASK = 36004;
snow_modules_opengl_web_GL.STENCIL_BACK_WRITEMASK = 36005;
snow_modules_opengl_web_GL.VIEWPORT = 2978;
snow_modules_opengl_web_GL.SCISSOR_BOX = 3088;
snow_modules_opengl_web_GL.COLOR_CLEAR_VALUE = 3106;
snow_modules_opengl_web_GL.COLOR_WRITEMASK = 3107;
snow_modules_opengl_web_GL.UNPACK_ALIGNMENT = 3317;
snow_modules_opengl_web_GL.PACK_ALIGNMENT = 3333;
snow_modules_opengl_web_GL.MAX_TEXTURE_SIZE = 3379;
snow_modules_opengl_web_GL.MAX_VIEWPORT_DIMS = 3386;
snow_modules_opengl_web_GL.SUBPIXEL_BITS = 3408;
snow_modules_opengl_web_GL.RED_BITS = 3410;
snow_modules_opengl_web_GL.GREEN_BITS = 3411;
snow_modules_opengl_web_GL.BLUE_BITS = 3412;
snow_modules_opengl_web_GL.ALPHA_BITS = 3413;
snow_modules_opengl_web_GL.DEPTH_BITS = 3414;
snow_modules_opengl_web_GL.STENCIL_BITS = 3415;
snow_modules_opengl_web_GL.POLYGON_OFFSET_UNITS = 10752;
snow_modules_opengl_web_GL.POLYGON_OFFSET_FACTOR = 32824;
snow_modules_opengl_web_GL.TEXTURE_BINDING_2D = 32873;
snow_modules_opengl_web_GL.SAMPLE_BUFFERS = 32936;
snow_modules_opengl_web_GL.SAMPLES = 32937;
snow_modules_opengl_web_GL.SAMPLE_COVERAGE_VALUE = 32938;
snow_modules_opengl_web_GL.SAMPLE_COVERAGE_INVERT = 32939;
snow_modules_opengl_web_GL.COMPRESSED_TEXTURE_FORMATS = 34467;
snow_modules_opengl_web_GL.DONT_CARE = 4352;
snow_modules_opengl_web_GL.FASTEST = 4353;
snow_modules_opengl_web_GL.NICEST = 4354;
snow_modules_opengl_web_GL.GENERATE_MIPMAP_HINT = 33170;
snow_modules_opengl_web_GL.BYTE = 5120;
snow_modules_opengl_web_GL.UNSIGNED_BYTE = 5121;
snow_modules_opengl_web_GL.SHORT = 5122;
snow_modules_opengl_web_GL.UNSIGNED_SHORT = 5123;
snow_modules_opengl_web_GL.INT = 5124;
snow_modules_opengl_web_GL.UNSIGNED_INT = 5125;
snow_modules_opengl_web_GL.FLOAT = 5126;
snow_modules_opengl_web_GL.DEPTH_COMPONENT = 6402;
snow_modules_opengl_web_GL.ALPHA = 6406;
snow_modules_opengl_web_GL.RGB = 6407;
snow_modules_opengl_web_GL.RGBA = 6408;
snow_modules_opengl_web_GL.LUMINANCE = 6409;
snow_modules_opengl_web_GL.LUMINANCE_ALPHA = 6410;
snow_modules_opengl_web_GL.UNSIGNED_SHORT_4_4_4_4 = 32819;
snow_modules_opengl_web_GL.UNSIGNED_SHORT_5_5_5_1 = 32820;
snow_modules_opengl_web_GL.UNSIGNED_SHORT_5_6_5 = 33635;
snow_modules_opengl_web_GL.FRAGMENT_SHADER = 35632;
snow_modules_opengl_web_GL.VERTEX_SHADER = 35633;
snow_modules_opengl_web_GL.MAX_VERTEX_ATTRIBS = 34921;
snow_modules_opengl_web_GL.MAX_VERTEX_UNIFORM_VECTORS = 36347;
snow_modules_opengl_web_GL.MAX_VARYING_VECTORS = 36348;
snow_modules_opengl_web_GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
snow_modules_opengl_web_GL.MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
snow_modules_opengl_web_GL.MAX_TEXTURE_IMAGE_UNITS = 34930;
snow_modules_opengl_web_GL.MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
snow_modules_opengl_web_GL.SHADER_TYPE = 35663;
snow_modules_opengl_web_GL.DELETE_STATUS = 35712;
snow_modules_opengl_web_GL.LINK_STATUS = 35714;
snow_modules_opengl_web_GL.VALIDATE_STATUS = 35715;
snow_modules_opengl_web_GL.ATTACHED_SHADERS = 35717;
snow_modules_opengl_web_GL.ACTIVE_UNIFORMS = 35718;
snow_modules_opengl_web_GL.ACTIVE_ATTRIBUTES = 35721;
snow_modules_opengl_web_GL.SHADING_LANGUAGE_VERSION = 35724;
snow_modules_opengl_web_GL.CURRENT_PROGRAM = 35725;
snow_modules_opengl_web_GL.NEVER = 512;
snow_modules_opengl_web_GL.LESS = 513;
snow_modules_opengl_web_GL.EQUAL = 514;
snow_modules_opengl_web_GL.LEQUAL = 515;
snow_modules_opengl_web_GL.GREATER = 516;
snow_modules_opengl_web_GL.NOTEQUAL = 517;
snow_modules_opengl_web_GL.GEQUAL = 518;
snow_modules_opengl_web_GL.ALWAYS = 519;
snow_modules_opengl_web_GL.KEEP = 7680;
snow_modules_opengl_web_GL.REPLACE = 7681;
snow_modules_opengl_web_GL.INCR = 7682;
snow_modules_opengl_web_GL.DECR = 7683;
snow_modules_opengl_web_GL.INVERT = 5386;
snow_modules_opengl_web_GL.INCR_WRAP = 34055;
snow_modules_opengl_web_GL.DECR_WRAP = 34056;
snow_modules_opengl_web_GL.VENDOR = 7936;
snow_modules_opengl_web_GL.RENDERER = 7937;
snow_modules_opengl_web_GL.VERSION = 7938;
snow_modules_opengl_web_GL.NEAREST = 9728;
snow_modules_opengl_web_GL.LINEAR = 9729;
snow_modules_opengl_web_GL.NEAREST_MIPMAP_NEAREST = 9984;
snow_modules_opengl_web_GL.LINEAR_MIPMAP_NEAREST = 9985;
snow_modules_opengl_web_GL.NEAREST_MIPMAP_LINEAR = 9986;
snow_modules_opengl_web_GL.LINEAR_MIPMAP_LINEAR = 9987;
snow_modules_opengl_web_GL.TEXTURE_MAG_FILTER = 10240;
snow_modules_opengl_web_GL.TEXTURE_MIN_FILTER = 10241;
snow_modules_opengl_web_GL.TEXTURE_WRAP_S = 10242;
snow_modules_opengl_web_GL.TEXTURE_WRAP_T = 10243;
snow_modules_opengl_web_GL.TEXTURE_2D = 3553;
snow_modules_opengl_web_GL.TEXTURE = 5890;
snow_modules_opengl_web_GL.TEXTURE_CUBE_MAP = 34067;
snow_modules_opengl_web_GL.TEXTURE_BINDING_CUBE_MAP = 34068;
snow_modules_opengl_web_GL.TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
snow_modules_opengl_web_GL.TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
snow_modules_opengl_web_GL.TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
snow_modules_opengl_web_GL.TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
snow_modules_opengl_web_GL.TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
snow_modules_opengl_web_GL.TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
snow_modules_opengl_web_GL.MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
snow_modules_opengl_web_GL.TEXTURE0 = 33984;
snow_modules_opengl_web_GL.TEXTURE1 = 33985;
snow_modules_opengl_web_GL.TEXTURE2 = 33986;
snow_modules_opengl_web_GL.TEXTURE3 = 33987;
snow_modules_opengl_web_GL.TEXTURE4 = 33988;
snow_modules_opengl_web_GL.TEXTURE5 = 33989;
snow_modules_opengl_web_GL.TEXTURE6 = 33990;
snow_modules_opengl_web_GL.TEXTURE7 = 33991;
snow_modules_opengl_web_GL.TEXTURE8 = 33992;
snow_modules_opengl_web_GL.TEXTURE9 = 33993;
snow_modules_opengl_web_GL.TEXTURE10 = 33994;
snow_modules_opengl_web_GL.TEXTURE11 = 33995;
snow_modules_opengl_web_GL.TEXTURE12 = 33996;
snow_modules_opengl_web_GL.TEXTURE13 = 33997;
snow_modules_opengl_web_GL.TEXTURE14 = 33998;
snow_modules_opengl_web_GL.TEXTURE15 = 33999;
snow_modules_opengl_web_GL.TEXTURE16 = 34000;
snow_modules_opengl_web_GL.TEXTURE17 = 34001;
snow_modules_opengl_web_GL.TEXTURE18 = 34002;
snow_modules_opengl_web_GL.TEXTURE19 = 34003;
snow_modules_opengl_web_GL.TEXTURE20 = 34004;
snow_modules_opengl_web_GL.TEXTURE21 = 34005;
snow_modules_opengl_web_GL.TEXTURE22 = 34006;
snow_modules_opengl_web_GL.TEXTURE23 = 34007;
snow_modules_opengl_web_GL.TEXTURE24 = 34008;
snow_modules_opengl_web_GL.TEXTURE25 = 34009;
snow_modules_opengl_web_GL.TEXTURE26 = 34010;
snow_modules_opengl_web_GL.TEXTURE27 = 34011;
snow_modules_opengl_web_GL.TEXTURE28 = 34012;
snow_modules_opengl_web_GL.TEXTURE29 = 34013;
snow_modules_opengl_web_GL.TEXTURE30 = 34014;
snow_modules_opengl_web_GL.TEXTURE31 = 34015;
snow_modules_opengl_web_GL.ACTIVE_TEXTURE = 34016;
snow_modules_opengl_web_GL.REPEAT = 10497;
snow_modules_opengl_web_GL.CLAMP_TO_EDGE = 33071;
snow_modules_opengl_web_GL.MIRRORED_REPEAT = 33648;
snow_modules_opengl_web_GL.FLOAT_VEC2 = 35664;
snow_modules_opengl_web_GL.FLOAT_VEC3 = 35665;
snow_modules_opengl_web_GL.FLOAT_VEC4 = 35666;
snow_modules_opengl_web_GL.INT_VEC2 = 35667;
snow_modules_opengl_web_GL.INT_VEC3 = 35668;
snow_modules_opengl_web_GL.INT_VEC4 = 35669;
snow_modules_opengl_web_GL.BOOL = 35670;
snow_modules_opengl_web_GL.BOOL_VEC2 = 35671;
snow_modules_opengl_web_GL.BOOL_VEC3 = 35672;
snow_modules_opengl_web_GL.BOOL_VEC4 = 35673;
snow_modules_opengl_web_GL.FLOAT_MAT2 = 35674;
snow_modules_opengl_web_GL.FLOAT_MAT3 = 35675;
snow_modules_opengl_web_GL.FLOAT_MAT4 = 35676;
snow_modules_opengl_web_GL.SAMPLER_2D = 35678;
snow_modules_opengl_web_GL.SAMPLER_CUBE = 35680;
snow_modules_opengl_web_GL.VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
snow_modules_opengl_web_GL.VERTEX_ATTRIB_ARRAY_SIZE = 34339;
snow_modules_opengl_web_GL.VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
snow_modules_opengl_web_GL.VERTEX_ATTRIB_ARRAY_TYPE = 34341;
snow_modules_opengl_web_GL.VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
snow_modules_opengl_web_GL.VERTEX_ATTRIB_ARRAY_POINTER = 34373;
snow_modules_opengl_web_GL.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
snow_modules_opengl_web_GL.VERTEX_PROGRAM_POINT_SIZE = 34370;
snow_modules_opengl_web_GL.POINT_SPRITE = 34913;
snow_modules_opengl_web_GL.COMPILE_STATUS = 35713;
snow_modules_opengl_web_GL.LOW_FLOAT = 36336;
snow_modules_opengl_web_GL.MEDIUM_FLOAT = 36337;
snow_modules_opengl_web_GL.HIGH_FLOAT = 36338;
snow_modules_opengl_web_GL.LOW_INT = 36339;
snow_modules_opengl_web_GL.MEDIUM_INT = 36340;
snow_modules_opengl_web_GL.HIGH_INT = 36341;
snow_modules_opengl_web_GL.FRAMEBUFFER = 36160;
snow_modules_opengl_web_GL.RENDERBUFFER = 36161;
snow_modules_opengl_web_GL.RGBA4 = 32854;
snow_modules_opengl_web_GL.RGB5_A1 = 32855;
snow_modules_opengl_web_GL.RGB565 = 36194;
snow_modules_opengl_web_GL.DEPTH_COMPONENT16 = 33189;
snow_modules_opengl_web_GL.STENCIL_INDEX = 6401;
snow_modules_opengl_web_GL.STENCIL_INDEX8 = 36168;
snow_modules_opengl_web_GL.DEPTH_STENCIL = 34041;
snow_modules_opengl_web_GL.RENDERBUFFER_WIDTH = 36162;
snow_modules_opengl_web_GL.RENDERBUFFER_HEIGHT = 36163;
snow_modules_opengl_web_GL.RENDERBUFFER_INTERNAL_FORMAT = 36164;
snow_modules_opengl_web_GL.RENDERBUFFER_RED_SIZE = 36176;
snow_modules_opengl_web_GL.RENDERBUFFER_GREEN_SIZE = 36177;
snow_modules_opengl_web_GL.RENDERBUFFER_BLUE_SIZE = 36178;
snow_modules_opengl_web_GL.RENDERBUFFER_ALPHA_SIZE = 36179;
snow_modules_opengl_web_GL.RENDERBUFFER_DEPTH_SIZE = 36180;
snow_modules_opengl_web_GL.RENDERBUFFER_STENCIL_SIZE = 36181;
snow_modules_opengl_web_GL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
snow_modules_opengl_web_GL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
snow_modules_opengl_web_GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
snow_modules_opengl_web_GL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
snow_modules_opengl_web_GL.COLOR_ATTACHMENT0 = 36064;
snow_modules_opengl_web_GL.DEPTH_ATTACHMENT = 36096;
snow_modules_opengl_web_GL.STENCIL_ATTACHMENT = 36128;
snow_modules_opengl_web_GL.DEPTH_STENCIL_ATTACHMENT = 33306;
snow_modules_opengl_web_GL.NONE = 0;
snow_modules_opengl_web_GL.FRAMEBUFFER_COMPLETE = 36053;
snow_modules_opengl_web_GL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
snow_modules_opengl_web_GL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
snow_modules_opengl_web_GL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
snow_modules_opengl_web_GL.FRAMEBUFFER_UNSUPPORTED = 36061;
snow_modules_opengl_web_GL.FRAMEBUFFER_BINDING = 36006;
snow_modules_opengl_web_GL.RENDERBUFFER_BINDING = 36007;
snow_modules_opengl_web_GL.MAX_RENDERBUFFER_SIZE = 34024;
snow_modules_opengl_web_GL.INVALID_FRAMEBUFFER_OPERATION = 1286;
snow_modules_opengl_web_GL.UNPACK_FLIP_Y_WEBGL = 37440;
snow_modules_opengl_web_GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
snow_modules_opengl_web_GL.CONTEXT_LOST_WEBGL = 37442;
snow_modules_opengl_web_GL.UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
snow_modules_opengl_web_GL.BROWSER_DEFAULT_WEBGL = 37444;
snow_system_audio_Audio.splitter = " • ";
SnowApp.main();
})(typeof console != "undefined" ? console : {log:function(){}});
