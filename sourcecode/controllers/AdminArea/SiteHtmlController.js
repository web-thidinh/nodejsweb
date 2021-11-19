const SiteHtmls = require('../../models/AdminArea/SiteHtml')

class SiteHtmlController{

    //List
    list(req,res,next){
        SiteHtmls.find({})
        .then(function(SiteHtmlItem){
            SiteHtmlItem = SiteHtmlItem.map(function(SiteHtmlItem){return SiteHtmlItem.toObject()})
            res.render('admin/sitehtmls',{layout:'admin',SiteHtmlItem:SiteHtmlItem})
        })
    }

    //Create
    create(req,res,next){
        res.render('admin/createsitehtml',{layout:'admin'})
    }
    postcreate(req,res,next){
        SiteHtmls.create({
            name:req.body.name,
            slug:req.body.slug,
            content:req.body.content
        })
        .then(function(){
            res.redirect('/admin/sitehtmls')
        })
        .catch(next)
    }

    //Edit
    edit(req,res,next){
        SiteHtmls.findOne({_id:req.params.id})
        .then(function(SiteHtmlItem){
            SiteHtmlItem = SiteHtmlItem.toObject()
            res.render('admin/editsitehtml',{layout:'admin',SiteHtmlItem:SiteHtmlItem})
        })
    }
    postedit(req,res,next){
        SiteHtmls.updateOne({_id:req.params.id},req.body)
        .then(function(){
            res.redirect('/admin/sitehtmls')
        })
        .catch(next)
    }

    //Delete
    delete(req,res,next){
        SiteHtmls.delete({_id:req.params.id})
        .then(function(){
            res.redirect('back')
        })
        .catch(next)
    }

    submitAction(req,res,next){
        switch(req.body.action){
            case 'delete': 
            SiteHtmls.delete({slug:{$in:req.body.checkItem}})                     
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
module.exports = new SiteHtmlController