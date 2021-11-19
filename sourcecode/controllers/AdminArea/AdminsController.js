const bcrypt = require('bcrypt')
const Admins = require('../../models/AdminArea/Admins')

class AdminsController{
    list(req,res,next){
        Admins.find({})
        .then(function(AdminItem){
            AdminItem = AdminItem.map(function(AdminItem){return AdminItem.toObject()})
            res.render('admin/admins',{layout:'admin',AdminItem:AdminItem})
        })
        .catch(next)
    }

    create(req,res,next){
        res.render('admin/createadmin',{layout:'admin'})
    }

    postcreate(req,res,next){
        bcrypt.hash(req.body.password,10,function(error,hashPassword){
            Admins.create({
                adminname:req.body.adminname,
                fullname:req.body.fullname,
                password:hashPassword,
                status:req.body.status
            })
            .then(function(){
                res.redirect('/admin/admins')
            })
            .catch(function(){
                res.render('admin/createadmin',{layout:'admin',errCreate:'Tạo mới quản trị viên không thành công'})
            })
        })
    }

    edit(req,res,next){
        Admins.findOne({_id:req.params.id})
        .then(function(AdminItem){
            AdminItem = AdminItem.toObject()
            res.render('admin/editadmin',{layout:'admin',AdminItem})
        })
    }
    postedit(req,res,next){
        Admins.updateOne({_id:req.params.id},{
            adminname:req.body.adminname,
            fullname:req.body.fullname,
            password:req.body.password,
            status:req.body.status
        })
        .then(function(){
            res.redirect('/admin/admins')
        })
        .catch(next)

    }

    delete(req,res,next){
        Admins.delete({_id:req.params.id})
        .then(function(){
            res.redirect('/admin/admins')
        })
        .catch(next)
    }

    submitAction(req,res,next){
        switch(req.body.action){
            case 'delete': 
            Admins.delete({_id:{$in:req.body.checkItem}})                     
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
module.exports = new AdminsController