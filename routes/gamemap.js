var gamemap = require('../models/gamemap').gamemap;

exports.getMap1 = function(req, res) {
    var query_doc = {user: req.query.user, shareId: req.query.shareId};
    // var query_doc = {user:"admin"};
    // console.log(req);
    console.log("query_doc.user is "+query_doc.user);
    (function(){
        gamemap.find(query_doc, function(err, doc){ 
            console.log("doc is "+doc);
            if(doc != null || doc == ""){
                res.json(doc)
                // res.json(req);
            }else{
                console.log(query_doc.user + ": query failed in " + new Date());
                console.log("err is "+err);
            }
        });
    })(query_doc);
}

exports.getMap = function(req, res, cb) {
    var query_doc = {user: req.query.user, shareId: req.query.shareId};
    // var query_doc = {user:"admin"};
    // console.log(req);
    console.log("query_doc.user is "+query_doc.user);
    gamemap.find(query_doc, function (err, doc) {
        if(err) return cb({error:'Internal error.'});
        cb(null, doc.map(function (a) {
            return {
                user:a.user,
                shareId:a.shareId,
                head:a.head,
                body:a.body,
            }
        }))
    })
}
