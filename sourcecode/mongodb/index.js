const mongoose = require('mongoose')
async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/website_sell_product',{
            useNewUrlParser:true,
            useUnifiedTopology:true

        })
        console.log('Thành công')
    } catch (error) {
        console.log('Không thành công')
    }
}
module.exports = {connect}