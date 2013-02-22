var f = function(){
	(function(){
		log('do c.a.js');
		window.ca = function (){
			log('call ca function');
			c();
			a();
		};
	})();
};
define('{pro}c.a.js',["{pro}c/c.js","{pro}a/a.js"],f);