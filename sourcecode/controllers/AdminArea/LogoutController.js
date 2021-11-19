
class LogoutController{
    logout(req,res){
        req.logout()
        res.redirect('/admin')
    }
}

module.exports = new LogoutController