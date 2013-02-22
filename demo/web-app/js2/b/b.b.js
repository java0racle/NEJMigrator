var f = function(){
	(function(){
		log('do b.b.js');
		window.bb = function (){
			log('call bb function');
			b();
		};
	})();
};
define('{pro}b/b.b.js',["{pro}b/b.js"],f);