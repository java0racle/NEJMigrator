var f = function(){
	(function(){
		log('do b.b.b.js');
		window.bbb = function (){
			log('call bbb function');
			bb();
		};
	})();
};
define('{pro}b/b.b.b.js',["{pro}b/b.b.js"],f);