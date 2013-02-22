var f = function(){
	(function(){
		log('do a.a.a.js');
		window.aaa = function (){
			log('call aaa function');
			aa();
		};
	})();
};
define('{pro}a/a.a.a.js',["{pro}a/a.a.js"],f);