const mongoose = require('mongoose')
const Schema = mongoose.Schema
var mongooseDelete = require('mongoose-delete');

const Admins = new Schema({
    adminname:{type:String,},
    fullname:{type:String},
    password:{type:String},
    status:{type:Boolean},
    type:{type:String,default:'Admin'}
},{
    timestamps:true 
})
Admins.plugin(mongooseDelete,{ 
    deletedAt : true,
    overrideMethods: true
})
module.exports = mongoose.model('admins',Admins)
