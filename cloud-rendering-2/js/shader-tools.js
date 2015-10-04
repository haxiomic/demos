var ShaderTools = (function(){
	//public
	function getDOMShaders(){
		var shaders = {};
		var shaderTypeReg = /\s*x-shader/i;
		var scripts = document.getElementsByTagName("script");
		for (var i = scripts.length - 1; i >= 0; i--) {
			var type = scripts[i].type;
			if(typeof type !== "string") continue;//@! ever true?
			if(type.match(shaderTypeReg)){
				if(scripts[i].id.length > 0){
					shaders[scripts[i].id] = scripts[i].textContent;
				}
			}
		};

		shaders = processShaders(shaders);

		return shaders;
	}

	function processShaders(shaders){
		//@! todo
		//- resolves #include directives
		return shaders;
	}

	return {
		getDOMShaders: getDOMShaders
	}
})();