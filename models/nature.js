var mongoose = require("mongoose");  //  顶会议用户组件
var Schema = mongoose.Schema;    //  创建模型
var natureScheMa = new Schema({
    userid: String,
    password: String
}); //  定义了一个新的模型，但是此模式还未和users集合有关联
exports.nature = mongoose.model('nature', natureScheMa); //  与users集合关联