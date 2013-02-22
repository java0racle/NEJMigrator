var f = function(){
	(function(){
		log('do c.c.c.js');
		window.ccc = function (){
			log('call ccc function');
			cc();
		};
	})();
};
define('{pro}c/c.c.c.js',["{pro}c/c.c.js"],f);