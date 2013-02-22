var f = function(){
	(function(){
		log('do b.c.js');
		window.bc = function (){
			log('call bc function');
			b();
			c();
		};
	})();
};
define('{pro}b.c.js',["{pro}b/b.js","{pro}c/c.js"],f);