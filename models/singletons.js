var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型
var gameMapScheMa = new Schema({
	name: { type: String },
	accesstoken: { type: String },
	ticket: { type: String },
    date: { type: Number },
    expiresin: { type: Number }
}, {collection: 'singletons'}); //  定义了一个新的模型，但是此模式还未和singletons集合有关联
exports.singletons = mongoose.model('singletons', gameMapScheMa); //  与singletons集合关联