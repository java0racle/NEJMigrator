var f = function(){
	(function(){
		log('do a.a.js');
		window.aa = function (){
			log('call aa function');
			a();
		};
	})();
};
define('{pro}a/a.a.js',["{pro}a/a.js"],f);