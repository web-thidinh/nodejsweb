const mongoose = require('mongoose')
const Schema = mongoose.Schema
var mongooseDelete = require('mongoose-delete');

const Users = new Schema({
    username:{
        type:String,
        maxlength:50,
        unique:true
    },
    phonenumber:String,
    password:String,
    cart:[
        {
            ProductId:String,
            ProductNumber:Number
        }
    ],
    status:{type:Boolean,default:true},
    type:{type:String,default:'User'}
},{
    timestamps:true
})

Users.plugin(mongooseDelete,{ 
    deletedAt : true,
    overrideMethods: true
})

module.exports = mongoose.model('users',Users)