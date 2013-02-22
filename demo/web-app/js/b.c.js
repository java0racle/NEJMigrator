(function(){
	log('do b.c.js');
	window.bc = function (){
		log('call bc function');
		b();
		c();
	};
})();