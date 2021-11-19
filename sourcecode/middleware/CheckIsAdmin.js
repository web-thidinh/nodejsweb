
function isAdmin(req,res,next){
    if(req.isAuthenticated() && req.user.type === 'Admin'){
        res.locals.CurrentAdmin = req.user.adminname
        next()
    }   
    else{
        res.redirect('/admin')
    }
}

module.exports = isAdmin