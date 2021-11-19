const UserLogin = require('../../models/UserArea/UserLogin')

class UserLoginController{
    
    show(req,res,next){
        res.render('login',{
            layout:'empty',
            title:'Đăng nhập',
            username:req.flash('userinput'),
            password:req.flash('passinput'),
            errUser: req.flash('errUsername'),
            errPass:req.flash('errPassword'),
        })
    }

    login(req,res,next){
        console.log(req.headers.referrer)
        // if (!req.user) {
        //     req.session.redirectTo = '/account';
        //     res.redirect('/login');
        // } else {
        //     next();
        // }
    }

    logout(req,res){
        req.logout()
        res.redirect('/')
    }
}
module.exports = new UserLoginController