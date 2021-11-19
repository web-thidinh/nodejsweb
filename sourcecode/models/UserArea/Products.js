const mongoose = require('mongoose')
const mongooseDelete = require('mongoose-delete')
const Schema = mongoose.Schema
const moment = require('moment')
var date = new Date

const Products = new Schema({ 
    parent:{type:String},
    parentslug:{type:String},
    name:{type:String,unique:true},
    slug:{type:String},
    productprice:{type:Number},
    productindex:{type:Number},
    image:{type:String},
    imageslibrary:{type:Array}, 
    description:{type:String},
    status:{type:Boolean},
    new:{type:Boolean},
    special:{type:Boolean},
},{
    timestamps:true,
})
Products.createdAt = moment()
Products.plugin(mongooseDelete,{
    deletaAt:true,
    overrideMethods:true
})

module.exports = mongoose.model('products',Products)
