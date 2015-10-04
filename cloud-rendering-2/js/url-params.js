/*
  Usage: URLParams.get(name, default)
*/

window.URLParams = (function() {
    var match,
        pl     = /\\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); },
        query  = window.location.search.substring(1);

    var urlParams = {};
    while (match = search.exec(query))
       urlParams[decode(match[1])] = decode(match[2]);

   	urlParams.get = function(param, defaultValue){
   		return typeof urlParams[param] !== "undefined" ? urlParams[param] : defaultValue;
   	}

    return urlParams;
})();