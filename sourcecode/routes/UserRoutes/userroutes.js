//USER
const loginRouter = require('../UserRoutes/userlogin')
const homeRouter =require('../UserRoutes/home')
const registerRouter= require('../UserRoutes/userregister')
const orderRouter = require('../UserRoutes/order')
const passport = require('passport')
const CheckIsUser = require('../../middleware/CheckIsUser')

function UserRoutes(app){
    
    //USER ROUTER
    app.set('view options', { layout: 'main' })

    app.use('/user',loginRouter)

    app.use('/user',registerRouter)

    app.use(CheckIsUser)
    
    app.use('/',homeRouter)
    
    app.use('/dat-hang',orderRouter)

}

module.exports = UserRoutes