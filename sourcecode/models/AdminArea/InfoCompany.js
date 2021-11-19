const mongoose = require('mongoose')
const Schema = mongoose.Schema

const InfoCompany = new Schema({
    address:{type:String},
    hotline:{type:String},
    email:{type:String},
    website:{type:String},
    fanpage:{type:String},
    instargram:{type:String}
})

module.exports = mongoose.model('infocompanies',InfoCompany)