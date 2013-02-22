var f = function(){
	(function(){
		log('do a.b.js');
		window.ab = function (){
			log('call ab function');
			a();
			b();
		};
	})();
};
define('{pro}a.b.js',["{pro}a/a.js","{pro}b/b.js"],f);