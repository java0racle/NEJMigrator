(function(){
	log('do a.a.js');
	window.aa = function (){
		log('call aa function');
		a();
	};
})();