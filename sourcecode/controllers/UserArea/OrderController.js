
const Products = require('../../models/UserArea/Products')
const Orders =require('../../models/AdminArea/Orders')
class OrderController{
    
    show(req,res,next){
        if(req.isAuthenticated() && req.user.type ==='User'){
            Products.findOne({slug:req.params.slug})
            .then(function(ProductItem){
                ProductItem = ProductItem.toObject()
                res.render('pageorder',{ProductItem:ProductItem,Success:req.flash('Success'),SuccessIcon:req.flash('SuccessIcon')})
            })
            .catch(next)
        }
        else{
            res.redirect('/user/login')
        }
    }
    postorder(req,res,next){
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
            req.flash('SuccessIcon','<i style="margin-right:5px;" class="far fa-check-circle"></i>')
            req.flash('Success','Đặt hàng thành công')
            res.redirect('back')
        })
        .catch(next)
    }
    // ordersuccess(req,res,next){
    //     res.render('ordersuccess')
    // }
}

module.exports = new OrderController