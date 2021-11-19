const bcrypt = require('bcrypt')
const UsersModel = require('../../models/UserArea/Users')
class RegisterController{
    
    register(req,res,next){
        res.render('register',{layout:'empty',title:'Đăng ký'})
    }

    postregist(req,res,next){  
        UsersModel.findOne({
            username:req.body.username
        })
        .then(function(user){
            if(user){
                res.json('Đã tồn tại người dùng')
            }
            bcrypt.hash(req.body.password,10,function(err,hashPassword){
                UsersModel.create({
                    username:req.body.username,
                    phonenumber:req.body.phonenumber,
                    password:hashPassword,
                })
            })
            res.redirect('back')
        })                   
        .catch(function(err){   
            console.log(err)
        })
    }
}
module.exports = new RegisterController