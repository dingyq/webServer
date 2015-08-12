var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型
var gameMapScheMa = new Schema({
	user: String,
	shareId: Number,
    head: Array,
    body: Array
}, {collection: 'gamemap'}); //  定义了一个新的模型，但是此模式还未和users集合有关联
exports.gamemap = mongoose.model('gamemap', gameMapScheMa); //  与gameMap集合关联