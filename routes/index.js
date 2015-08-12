var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
// var nature = require('../models/nature').nature;
mongoose.connect('mongodb://localhost/scanplane');


var homepage = require('./homepage');
var gamemap = require('./gamemap');

/* GET home page. */
router.get('/', function(req, res) {
      res.render('index', { title: 'index' });
});
 
/*login*/
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});
 
/*logout*/
router.get('/logout', function(req, res) {
      res.render('logout', { title: 'logout' });
});
 
router.post('/homepage', homepage.homePage);
router.get('/gamemap', gamemap.getMap1);

module.exports = router;
