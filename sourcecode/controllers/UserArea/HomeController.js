const MainCategoriesIntro = require('../../models/UserArea/MainCategoriesIntro')
const MainCategories = require('../../models/UserArea/MainCategories')
const Products = require('../../models/UserArea/Products')
const SiteHtmls = require('../../models/AdminArea/SiteHtml')
const Users = require('../../models/UserArea/Users')
const { PromiseProvider } = require('mongoose')
var flash = require("connect-flash")

class HomeController{

    show(req,res,next){
        Promise.all([MainCategories.find({}),Products.find({special:true}),Products.find({new:true})])
            .then(function([MaincategoryItem,SpecialProduct,NewProduct]){
                MaincategoryItem = MaincategoryItem.map(MaincategoryItem => MaincategoryItem.toObject())
                SpecialProduct = SpecialProduct.map(SpecialProduct => SpecialProduct.toObject())
                NewProduct = NewProduct.map(NewProduct => NewProduct.toObject())
                if(!req.isAuthenticated()){ 
                    res.render('home',{MaincategoryItem,SpecialProduct,NewProduct})
                }
                else{
                    res.render('home',{MaincategoryItem,SpecialProduct,NewProduct,CurrentUser:res.locals.CurrentUser})
                }
            })
            .catch(next)
    }

    product(req,res,next){
        Products.find({status:true})
        .then(function(ProductItem){
            ProductItem = ProductItem.map(function(ProductItem){return ProductItem.toObject()})
            res.render('products',{ProductItem:ProductItem})
        })
    }

    category(req,res,next){
        Promise.all([MainCategories.findOne({slug:req.params.slug}),Products.find({parentslug:req.params.slug,status:true})])
            .then(function([ThisCategory,ThisProductItem]){
                ThisCategory = ThisCategory.toObject()
                ThisProductItem = ThisProductItem.map(function(ThisProductItem){return ThisProductItem.toObject()})
            res.render('category',{ThisCategory,ThisProductItem})
            })       
    }

    productdetail(req,res,next){
        Products.findOne({slug:req.params.slug})
            .then(function(ProductItem){
                Products.find({parentslug:ProductItem.parentslug})
                .then(function(ProductRelate){
                    ProductItem = ProductItem.toObject()
                    ProductRelate = ProductRelate.map(function(ProductRelate){return ProductRelate.toObject()})
                    res.render('productdetail',{ProductItem,ProductRelate,ProductNumber:req.body.productnumber,
                        Success:req.flash('Success'),SuccessIcon:req.flash('SuccessIcon')})
                })
            })
            .catch(next)
    }

    //Intro page
    intro(req,res,next){
        SiteHtmls.findOne({slug:'gioi-thieu'})
        .then(function(SiteItem){
            SiteItem = SiteItem.toObject()
            res.render('pageintro',{SiteItem:SiteItem})
        })
        .catch(next)
    }

    //Search
    search(req,res,next){
        Products.find({})
        .then(function(ProductItem){
            var SearchInput = req.query.search
            var SearchResult = ProductItem.filter(function(MatchItem){
                return MatchItem.name.toLowerCase().indexOf(SearchInput.toLowerCase()) !== -1
            })
            SearchResult = SearchResult.map(function(SearchResult){return SearchResult.toObject()})
            res.render('search',{Item:SearchResult,value:SearchInput})
        })
    }

    //Cart
    cart(req,res,next){
        if(req.isAuthenticated() && req.user.type === 'User'){
            Users.findOne({_id:req.user.id})
            .then(function(CurrentUser){
                var ListCartItem = CurrentUser.cart.filter(function(CartItem){
                    return CartItem 
                })
                var ListIdItem = CurrentUser.cart.reduce(function(ListId,CartItem){
                    ListId.push(CartItem.ProductId)
                    return ListId
                },[])
                console.log(ListIdItem) 
                ListCartItem = ListCartItem.map(function(ListCartItem){return ListCartItem.toObject()})
                res.render('cart',{ListCartItem})
                // var CartId = []
                // var CartNumber = []
                // CurrentUser.cart.filter(function(CartItem){
                //     CartId.push(CartItem.ProductId)
                //     CartNumber.push(CartItem.ProductNumber)
                // })
                // Products.find({_id:{$in:CartId}})
                // .then(function(CartProduct){
                //     var CartList = CurrentUser.cart.filter(function(CartItem){
                //         return CartItem.ProductId
                //     })
                //     console.log(CartList)
                //     CartList = CartList.map(function(CartList){return CartList.toObject()})
                //     CartProduct = CartProduct.map(function(CartProduct){return CartProduct.toObject()})
                //     res.render('cart',{CartProduct,CartList:CartList,CartNumber:res.locals.CartNumber,DeleteSuccess:req.flash('DeleteSuccess'),SuccessIcon:req.flash('SuccessIcon')})
                // })
            })
            .catch(next)
        }
        else{
            res.redirect('/user/login')
        }
    }
    postcart(req,res,next){
        if(req.isAuthenticated() && req.user.type === 'User'){
            var dataCart = {}
            dataCart.ProductId = req.params.id
            dataCart.ProductNumber = req.body.productnumber
            Users.findOne({_id:req.user.id})
            .then(function(CurrentUser){
                var CheckExist = CurrentUser.cart.filter(function(CartItem){
                    return CartItem.ProductId === dataCart.ProductId
                }).length > 0
                if(CheckExist){
                    console.log("Đã tồn tại")
                    CurrentUser.cart.filter(function(ExistItem){
                        if(ExistItem.ProductId === dataCart.ProductId){
                            ExistItem.ProductNumber += Number(dataCart.ProductNumber)
                            CurrentUser.updateOne({ProductId:dataCart.ProductId},{
                                ProductNumber:ExistItem.ProductNumber
                            })
                        }
                    })
                }
                else{
                    console.log('Không tồn tại')
                    CurrentUser.cart.push(dataCart)
                }
                CurrentUser.save()
                req.flash('SuccessIcon','<i style="margin-right:5px;" class="far fa-check-circle"></i>')
                req.flash('Success','Đã thêm vào giỏ hàng')
                res.redirect('back')
            })
        }
        else{
            res.redirect('/user/login')
        }
    }

    deletecart(req,res,next){
        console.log(req.params.id)
        Users.findOne({_id:req.user.id})
        .then(function(CurrentUser){
            var NewCart = CurrentUser.cart.filter(function(CartItem){
                return CartItem.ProductId !== req.params.id
            })
            console.log(NewCart.length)
            console.log('--------')
            CurrentUser.cart = NewCart
            console.log(CurrentUser.cart.length)
            CurrentUser.save()
            req.flash('SuccessIcon','<i style="margin-right:5px;" class="far fa-check-circle"></i>')
            req.flash('DeleteSuccess','Đã xóa khỏi giỏ hàng.')
            res.redirect('back')
        })
        .catch(next)
    }
}

module.exports = new HomeController