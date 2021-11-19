const MainCategories = require('../../models/UserArea/MainCategories')
const Products = require('../../models/UserArea/Products')
const SiteHtmls = require('../../models/AdminArea/SiteHtml')
const Orders = require('../../models/AdminArea/Orders')
class TrashController{
    trash(req,res,next){
        Promise.all([MainCategories.findDeleted({}),Products.findDeleted({}),Orders.findDeleted({}),SiteHtmls.findDeleted({})])
            .then(function([CategoryDeleteItem,ProductDeleteItem,OrderItem,SiteHtmlItem]){
                CategoryDeleteItem = CategoryDeleteItem.map(CategoryDeleteItem => CategoryDeleteItem.toObject())
                ProductDeleteItem = ProductDeleteItem.map(ProductDeleteItem => ProductDeleteItem.toObject())
                OrderItem = OrderItem.map(OrderItem => OrderItem.toObject())
                SiteHtmlItem = SiteHtmlItem.map(SiteHtmlItem => SiteHtmlItem.toObject())
                res.render('admin/trash',{layout:'admin',CategoryDeleteItem,ProductDeleteItem,OrderItem,SiteHtmlItem})
            })
            .catch(next)  
    }

    //Categories
    restorecategory(req,res,next){
        MainCategories.restore({slug:req.params.slug})
        .then(function(){
            res.redirect('back')
        })
        .catch(next)
    }
    deletecategory(req,res,next){
        MainCategories.deleteOne({slug:req.params.slug})
        .then(function(){
            res.redirect('back')
        })
        .catch(next)
    }
    categoriessubmit(req,res,next){
        switch(req.body.action){
            case 'restore':
                MainCategories.restore({slug:req.body.checkItem})
                .then(function(){
                    res.redirect('back')
                })
                .catch(next)
                break
            case 'delete':
                MainCategories.deleteMany({slug:req.body.checkItem})
                .then(function(){
                    res.redirect('back')
                })
                .catch(next)
                break
            default:
                res.json({message:'Action invalid'})

        }
        
    }

    //Products
    restoreproduct(req,res,next){
        Products.restore({slug:req.params.slug})
        .then(function(){
            res.redirect('back')
        })
        .catch(next)
    }
    deleteproduct(req,res,next){
        Products.deleteOne({slug:req.params.slug})
        .then(function(){
            res.redirect('back')
        })
        .catch(next)
    }
    productssubmit(req,res,next){
        switch(req.body.action){
            case 'restore':
                Products.restore({slug:req.body.checkItem})
                .then(function(){
                    res.redirect('back')
                })
                .catch(next)
                break
            case 'delete':
                Products.deleteMany({slug:req.body.checkItem})
                .then(function(){
                    res.redirect('back')
                })
                .catch(next)
                break
            default:
                res.json({message:'Action invalid'})

        }
        
    }


    //Orders
    restoreorder(req,res,next){
        Orders.restore({_id:req.params.id})
        .then(function(){
            res.redirect('back')
        })
        .catch(next)
    }
    deleteorder(req,res,next){
        Orders.deleteOne({_id:req.params.id})
        .then(function(){
            res.redirect('back')
        })
        .catch(next)
    }
   orderssubmit(req,res,next){
        switch(req.body.action){
            case 'restore':
                Orders.restore({_id:req.body.checkItem})
                .then(function(){
                    res.redirect('back')
                })
                .catch(next)
                break
            case 'delete':
                Orders.deleteMany({_id:req.body.checkItem})
                .then(function(){
                    res.redirect('back')
                })
                .catch(next)
                break
            default:
                res.json({message:'Action invalid'})

        }
        
    }

    //Sitehtmls
    restoresitehtml(req,res,next){
        SiteHtmls.restore({_id:req.params.id})
        .then(function(){
            res.redirect('back')
        })
        .catch(next)
    }
    deletesitehtml(req,res,next){
        SiteHtmls.deleteOne({_id:req.params.id})
        .then(function(){
            res.redirect('back')
        })
        .catch(next)
    }
   sitehtmlssubmit(req,res,next){
        switch(req.body.action){
            case 'restore':
                SiteHtmls.restore({_id:req.body.checkItem})
                .then(function(){
                    res.redirect('back')
                })
                .catch(next)
                break
            case 'delete':
                SiteHtmls.deleteMany({_id:req.body.checkItem})
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
module.exports = new TrashController