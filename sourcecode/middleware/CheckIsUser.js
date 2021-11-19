
function isUser(req, res, next){
    if(req.isAuthenticated() && req.user.type === 'User'){
        res.locals.CurrentUser = req.user.username
        res.locals.CartNumber = req.user.cart.length
    }
    next()
}

module.exports = isUser