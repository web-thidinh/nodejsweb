const bcrypt = require('bcrypt');
const saltRounds = 10;
const Users = require('../../models/UserArea/Users')

class UsersController{

    user(req,res,next){
        Users.find({})
        .then(function(UserItem){
            // UserItem = UserItem.map(UserItem => UserItem.toObject())
            UserItem = UserItem.map(function(UserItem){return UserItem.toObject()})
            res.render('admin/users',{layout:'admin',UserItem:UserItem})
        })
        .catch(next)
    }

    create(req,res){
        res.render('admin/createuser',{layout:'admin'})
    }

    createpost(req,res,next){
        bcrypt.hash(req.body.password,saltRounds,function(error,hashPassword){
            Users.create({
                username:req.body.username,
                phonenumber:req.body.phonenumber,
                password:hashPassword,
                status:req.body.status
            })
            .then(function(){
                res.redirect('/admin/users')
            })
            .catch(next)
        })
    }

    edit(req,res,next){
        Users.findOne({_id:req.params.id})
        .then(function(UserItem){
            UserItem = UserItem.toObject()
            res.render('admin/edituser',{layout:'admin',UserItem:UserItem})
        })
        .catch(next)
    }

    postedit(req,res,next){
        Users.updateOne({_id:req.params.id},req.body)
        .then(function(){
            res.redirect('/admin/users')
        })
        .catch(next)
    }

    delete(req,res,next){
        Users.delete({_id:req.params.id})
        .then(function(){
            res.redirect('back')
        })
        .catch(next)
    }

    submitAction(req,res,next){
        switch(req.body.action){
            case 'delete': 
            Users.delete({_id:{$in:req.body.checkItem}})                     
                .then(function(){
                    res.redirect('back')
                })
                .catch(next)
                break
            default:
                res.json({message:'Action invalid'})
        }
    }
}

module.exports = new UsersController