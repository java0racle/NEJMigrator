(function(){
	log('do a.a.a.js');
	window.aaa = function (){
		log('call aaa function');
		aa();
	};
})();