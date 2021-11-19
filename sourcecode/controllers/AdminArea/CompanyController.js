const InfoCompany = require('../../models/AdminArea/InfoCompany')
class  CompanyController{
    list(req,res,next){
        InfoCompany.findOne({_id:'6170471b402be48cbb526d43'})
        .then(function(InfoCompany){
            InfoCompany = InfoCompany.toObject()
            res.render('admin/companyinfo',{layout:'admin',InfoCompany:InfoCompany})
        })
    }
    edit(req,res,next){
        InfoCompany.findOne({_id:'6170471b402be48cbb526d43'})
        .then(function(InfoCompany){
            InfoCompany = InfoCompany.toObject()
            res.render('admin/editinfocompany',{layout:'admin',InfoCompany:InfoCompany})
        })
    }
    postedit(req,res,next){
        InfoCompany.updateOne({_id:'6170471b402be48cbb526d43'},req.body)
        .then(function(){
            res.redirect('/admin/companyinfo')
        })
        .catch(function(){
            res.render('admin/editinfocompany',{errEdit:'Chỉnh sửa sản phẩm không thành công !'})
        })
    }
}

module.exports = new CompanyController