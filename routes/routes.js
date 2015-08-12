var homepage = require('./homepage');
var gamemap = require('./gamemap');

module.exports = function(rest){
	rest.post('/homepage', homepage.homePage);
	// rest.get('/gamemap', gamemap.getMap);
	rest.post('/gamemap', gamemap.getMap);
}
 
