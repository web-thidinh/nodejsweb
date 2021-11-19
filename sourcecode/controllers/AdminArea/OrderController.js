const Products = require('../../models/UserArea/Products')
const Maincategories = require('../../models/UserArea/MainCategories')
const Orders = require('../../models/AdminArea/Orders')
class OrderController{
    list(req,res,next){
        Orders.find({deleted:false})
        .then(function(OrderItem){
            OrderItem = OrderItem.map(function(OrderItem){return OrderItem.toObject()})
            res.render('admin/orderspage',{layout:'admin',OrderItem})
        })
    }

    create(req,res,next){
        Promise.all([Maincategories.find({}),Products.find({})])
        .then(function([CategoryItem,ProductItem]){
            CategoryItem = CategoryItem.map(function(CategoryItem){return CategoryItem.toObject()})
            ProductItem = ProductItem.map(function(ProductItem){return ProductItem.toObject()})
            res.render('admin/createorder',{layout:'admin',CategoryItem,ProductItem})
        })
        .catch(next)
    }

    postcreate(req,res,next){
        Orders.create({
            productcategory:req.body.productcategory,
            productname:req.body.productname,
            customer:req.body.customer,
            phonenumber:req.body.phonenumber,
            productnumber:req.body.productnumber,
            totalprice:req.body.totalprice,
            address:req.body.address,
            payment:req.body.payment
        })
        .then(function(){
            res.redirect('/admin/orders') 
        })
        .catch(next)
    }

    edit(req,res,next){ 
        Orders.findOne({_id:req.params.id})
        .then(function(OrderItem){
            OrderItem = OrderItem.toObject()
            res.render('admin/editorder',{layout:'admin',OrderItem:OrderItem})
        })
        .catch(next)
    }

    delete(req,res,next){
        Orders.delete({_id:req.params.id})
        .then(function(){
             res.redirect('back')
        })
        .catch(next)
    }

    submitAction(req,res,next){
        switch(req.body.action){
            case 'delete': 
                Orders.delete({_id:{$in:req.body.checkItem}})                     
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

module.exports = new OrderController