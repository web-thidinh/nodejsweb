const MainCategories = require('../../models/UserArea/MainCategories')
class CategoriesController{
    list(req,res,next){
        MainCategories.find({})
        .then(function(MainCategoryItem){
            MainCategoryItem = MainCategoryItem.map(MainCategoryItem => MainCategoryItem.toObject())
            res.render('admin/categories',{layout:'admin',MainCategoryItem:MainCategoryItem})
        })
        .catch(next)
    }

    //Edit
    edit(req,res,next){
        MainCategories.findOne({_id: req.params.id})
        .then(function(MainCategoryItem){
            MainCategoryItem = MainCategoryItem.toObject()
            res.render('admin/editcategory',{layout:'admin',MainCategoryItem:MainCategoryItem})
        })
        .catch(next)
    }
    editpost(req,res,next){
        MainCategories.updateOne({_id:req.params.id},{
            name:req.body.name,
            // image:req.file.filename,
            slug:req.body.slug,
            status:req.body.status
        })
        .then(function(){
            res.redirect('/admin/categories')
        })
        .catch(next)
    }

    //Create
    create(req,res,next){
        res.render('admin/createcategory',{layout:'admin'})
    }
    createpost(req,res,next){
        MainCategories.create({
            name:req.body.name.trim(),
            slug:req.body.slug,
            image:req.file.filename,
            status:req.body.status
        }) 
            .then(function(){
                res.redirect('/admin/categories')
            })
            .catch(next
            //     function(){
            //     res.render('admin/createcategory',{layout:'admin',errCreate:'Tạo danh mục sản phẩm không thành công !'})
            // }
            )
    }

    //Delete
    destroy(req,res,next){
        MainCategories.delete({_id:req.params.id})
        .then(function(){
            res.redirect('back')
        })
        .catch(next)
    }

    //Trash
    trash(req,res,next){
        
    }

    submitActions(req,res,next){
        switch(req.body.action){
            case 'delete': 
                MainCategories.delete({slug:{$in:req.body.checkItem}})                     
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

module.exports = new CategoriesController