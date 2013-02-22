(function(){
	log('do b.b.js');
	window.bb = function (){
		log('call bb function');
		b();
	};
})();