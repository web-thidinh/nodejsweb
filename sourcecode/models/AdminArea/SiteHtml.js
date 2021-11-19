const mongoose = require('mongoose')
const Schema = mongoose.Schema 
var mongooseDelete = require('mongoose-delete');

const SiteHtmls = new Schema({
    name:{type:String},
    slug:{type:String},
    content:{type:String}
},{
    timestamps:true
})
SiteHtmls.plugin(mongooseDelete,{ 
    deletedAt : true,
    overrideMethods: true
})
module.exports = mongoose.model('sitehtmls',SiteHtmls)