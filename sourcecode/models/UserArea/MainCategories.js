const mongoose = require('mongoose')
var mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema

const MainCategories = new Schema({
    name:{ 
        type:String,
        unique:true
    },
    slug:{type:String},
    image:{type:String},
    status:{type:Boolean},
},{
    timestamps:true,
})

MainCategories.plugin(mongooseDelete,{ 
    deletedAt : true,
    overrideMethods: true
})
module.exports = mongoose.model('main-categories',MainCategories)