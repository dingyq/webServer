var wxShare = require('../utils/wxsharesign.js');
var homepage = require('./homepage');
var gamemap = require('./gamemap');


module.exports = function(rest){
	rest.post('/homepage', homepage.homePage);

	rest.get('/bp:gamemap', gamemap.getMap);
	// rest.post('/gamgaemap', gamemap.getMap);
	rest.get('/bp:wxtoken', function(req, res, cb) {
		var url = decodeURIComponent(req.params.url);
		wxShare.getWxShareBasicData(function(result){
			cb(null, result);
		}, url);
	})
}
 
