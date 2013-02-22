var f = function(){
	!function(w,d){
		log('do index.js');
		ab();
		bc();
		ca();
	}(window,document);
};
define('{pro}index.js',["{pro}a.b.js","{pro}b.c.js","{pro}c.a.js"],f);