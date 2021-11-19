const Admins = require('../../models/AdminArea/Admins')
const passport = require('passport')
const bcrypt = require('bcrypt')
class LoginController{

    show(req,res,next){
        res.render('admin/login',{layout:'adminempty'})     
    }

    login(req,res,next){   
        Admins.findOne({adminname:req.body.adminname},function(err,admin){
            if(admin){
                bcrypt.compare(req.body.password,admin.password,function(err,result){
                    if(result){
                        next()
                    }
                    else{
                        res.render('admin/login',{layout:'adminempty',errPass:'Sai mật khẩu !',valueAdmin:req.body.adminname,valuePass:req.body.password})
                    }
                })
                
            }else{
                res.render('admin/login',{layout:'adminempty',errAdmin:'Sai tên đăng nhập !',valueAdmin:req.body.adminname,valuePass:req.body.password})
            }
        })
    }     
}

module.exports = new LoginController