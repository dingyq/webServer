
var http = require('https');  
var qs = require('querystring'); 
var sign = require('./sign.js');
var singletons = require('../models/singletons').singletons;

/**
 * 到微信后台获取accesstoken
**/
var getAccessToken = function(cb, cb1) {
    var data = {  
        appid: "wxfba52509a14551ff",  
        secret: "30d59cda0cf6cccc1276ae3e3a85b1b7"
    };//这是需要提交的数据  
    var content = qs.stringify(data);  
    var options = {  
        hostname: 'api.weixin.qq.com',  
        path: '/cgi-bin/token?grant_type=client_credential&' + content,  
        method: 'GET'  
    };
    var req = http.request(options, function (res) {  
        // console.log('STATUS: ' + res.statusCode);  
        // console.log('HEADERS: ' + JSON.stringify(res.headers));  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            var obj =JSON.parse(chunk);
            // 存入DB，然后回调；
            var conditions = { name: 'wxtoken' };
            var newData = { $set: { accesstoken:obj.access_token ,expiresin:obj.expires_in, date:parseInt(new Date().getTime() / 1000)}};
            singletons.update(conditions, newData, {}, function(err, docs) {
                console.log(JSON.stringify(docs)+","+err);
            });
            cb(obj.access_token, cb1);
        });  
    });  
      
    req.on('error', function (e) {  
        console.log('problem with request: ' + e.message);  
    });  
      
    req.end(); 
}
// getAccessToken();  

/**
 * 根据token到微信后台获取ticket
**/
var getJsApiTicket = function (token, cb) {
    var data = {  
        access_token: token,  
        type: 'jsapi'
    };//这是需要提交的数据  
    var content = qs.stringify(data);  
    var options = {  
        hostname: 'api.weixin.qq.com',  
        path: '/cgi-bin/ticket/getticket?' + content,  
        method: 'GET'  
    };
    var req = http.request(options, function (res) {  
        res.setEncoding('utf8');  
        res.on('data', function (chunk) {  
            // console.log('BODY: ' + chunk); 
            cb({retcode:0, retmsg:'success'}, chunk);
        });  
    });  
      
    req.on('error', function (e) {  
        // console.log('problem with request: ' + e.message);  
        cb({retcode:-1, retmsg:e.message}, null);
    });  
      
    req.end(); 
}

var getWxTokenFromDB = function(cb) {
    var query_doc = {name:'wxtoken'};
    // console.log("query_doc.name is "+query_doc.name);
    singletons.find(query_doc, function (err, doc) {
        if(err) return cb({retcode:-1, retmsg:'Internal error.'});
        cb({retcode:0, retmsg:'success'}, doc[0]);
    })
}

exports.getWxShareBasicData = function (cb, url) {
    var ticketCallBack = function (retsult, chunk) {
        // console.log(chunk);
        if(retsult.retcode == 0){
            var obj = JSON.parse(chunk);
            var signRel = sign(obj.ticket, url);
            signRel.retcode = 0;
            cb(signRel);  
        } else {
            cb({retcode:-1, retmsg:'fail'});  
        }
        
    }

    var dbCallBack = function(queryRel, actualRel) {

        var tokenInvalid = true;
        if(queryRel.retcode == 0){
            //token 7200s失效，这里设定超过3600s则失效，需重新到微信后台拉取
            if(parseInt(actualRel.date) + parseInt(actualRel.expiresin) + 3600 < parseInt(new Date().getTime() / 1000)){
                tokenInvalid = false;
            }
        } else {
            tokenInvalid = false;
        }

        if(tokenInvalid) {
            console.log("adfasdfas1")
            getJsApiTicket(actualRel.accesstoken, ticketCallBack);
        } else {
            console.log("adfasdfas")    
            getAccessToken(getJsApiTicket, ticketCallBack);
        }

    }
    getWxTokenFromDB(dbCallBack);
}

 






