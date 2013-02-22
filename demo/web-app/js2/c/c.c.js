var f = function(){
	(function(){
		log('do c.c.js');
		window.cc = function (){
			log('call cc function');
			c();
		};
	})();
};
define('{pro}c/c.c.js',["{pro}c/c.js"],f);