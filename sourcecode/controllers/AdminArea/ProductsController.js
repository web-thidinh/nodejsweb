const Products = require('../../models/UserArea/Products')
const MainCategories = require('../../models/UserArea/MainCategories')
class ProductController{
    list(req,res,next){
        Promise.all([MainCategories.find({status:true}),Products.find({})])
        .then(function([CategoryItem,ProductItem]){
            CategoryItem = CategoryItem.map(function(CategoryItem){return CategoryItem.toObject()})
            ProductItem = ProductItem.map(function(ProductItem){return ProductItem.toObject()})
            res.render('admin/products',{layout:'admin',ProductItem,CategoryItem})
        })
        .catch(next)
    }

    create(req,res,next){
        MainCategories.find({status:true})
        .then(function(CategoryItem){
            CategoryItem = CategoryItem.map(function(CategoryItem){return CategoryItem.toObject()})
            res.render('admin/createproduct',{layout:'admin',CategoryItem:CategoryItem})
        })
        .catch(next)
    }

    postcreate(req,res,next){
        Products.create({
            parent:req.body.parent, 
            parentslug:req.body.parentslug,
            name:req.body.name.trim(),
            slug:req.body.slug,
            productprice:req.body.productprice,  
            productindex:req.body.productindex, 
            image:req.files['image'][0].filename,
            // imageslibrary:req.files['imageslibrary'].reduce(function(value,currentValue){
            //     return value.concat(currentValue.filename)
            // },[]),
            // image:req.files['image'][0].path.split('\\').slice(2).join('\\').replace(/\\/,'/'),
            // imageslibrary:req.files['imageslibrary'].reduce(function(value,currentValue){
            //     return value.concat(currentValue.path.replace(/\\/g,'/').split('/').slice(2).join('/'))
            // },[]),
            description:req.body.description,
            status:req.body.status,
            new:req.body.new,
            special:req.body.special
        })
        .then(function(){
            res.redirect('/admin/products')
        })
        .catch(next
        //     function(){
        //     MainCategories.find({status:true})
        //     .then(function(CategoryItem){
        //         CategoryItem = CategoryItem.map(function(CategoryItem){return CategoryItem.toObject()})
        //         res.render('admin/createproduct',{layout:'admin',errCreate:'Tạo mới sản phẩm không thành công',CategoryItem:CategoryItem})
        //     })
        //     .catch(function(){
        //         res.render('admin/createproduct',{layout:'admin',errCreate:'Không tìm thấy danh mục sản phẩm',CategoryItem:CategoryItem})
        //     })
        // }
        )
    }

    edit(req,res,next){
        Products.findOne({_id: req.params.id})
        .then(function(ProductItem){
            ProductItem = ProductItem.toObject()
            MainCategories.find({status:true})
            .then(function(CategoryItem){
                CategoryItem = CategoryItem.map(function(CategoryItem){return CategoryItem.toObject()})
                res.render('admin/editproduct',{layout:'admin',ProductItem:ProductItem,CategoryItem:CategoryItem})
            })
            .catch(next)        
        })
        .catch(next)
    }
    postedit(req,res,next){
        Products.updateOne({_id:req.params.id},{
            parent:req.body.parent, 
            parentslug:req.body.parentslug,
            name:req.body.name.trim(),
            slug:req.body.slug,
            productprice:req.body.productprice,  
            productindex:req.body.productindex, 
            // image:req.files['image'][0].filename,
            // imageslibrary:req.files['imageslibrary'].reduce(function(value,currentValue){
            //     return value.concat(currentValue.path.replace(/\\/g,'/').split('/').slice(2).join('/'))
            // },[]),
            description:req.body.description,
            status:req.body.status,
            new:req.body.new,
            special:req.body.special
        })
        .then(function(){
            res.redirect('/admin/products')
        })
        .catch(next
        //     function(){
        //     res.render('admin/editproduct',{errEdit:'Cập nhật sản phẩm không thành công !'})
        // }
        )
 
    }

    delete(req,res,next){
        Products.delete({_id:req.params.id})
        .then(function(){
            res.redirect('back')
        })
        .catch(next)
    }

    submitAction(req,res,next){
        switch(req.body.action){
            case 'delete': 
                Products.delete({slug:{$in:req.body.checkItem}})                     
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

module.exports = new ProductController