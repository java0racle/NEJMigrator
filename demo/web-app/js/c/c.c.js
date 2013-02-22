(function(){
	log('do c.c.js');
	window.cc = function (){
		log('call cc function');
		c();
	};
})();