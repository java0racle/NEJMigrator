(function(){
	log('do a.b.js');
	window.ab = function (){
		log('call ab function');
		a();
		b();
	};
})();