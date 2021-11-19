const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MainCategoriesIntro = new Schema({
    name:{type:String},
    active:{type:Number},
    slug:{type:String},
    createdDay:{type:Date,default:Date.now},
    updatedDay:{type:Date,default:Date.now}
})

module.exports = mongoose.model('main-into-categories',MainCategoriesIntro)