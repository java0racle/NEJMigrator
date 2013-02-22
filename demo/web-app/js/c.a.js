(function(){
	log('do c.a.js');
	window.ca = function (){
		log('call ca function');
		c();
		a();
	};
})();