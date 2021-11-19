const mongoose = require('mongoose')
const Schema = mongoose.Schema
var mongooseDelete = require('mongoose-delete')

const Orders = new Schema({
    productcategory:{type:String},
    productname:{type:String},
    customer:{type:String},
    phonenumber:{type:String},
    productnumber:{type:Number},
    totalprice:{type:Number}, 
    address:{type:String},
    payment:{type:String}
},{
    timestamps:true
})
Orders.plugin(mongooseDelete,{ 
    deletedAt : true,
    overrideMethods: true
})
module.exports = mongoose.model('orders',Orders)