const Orders = require('../../models/AdminArea/Orders')
const MainCategories = require('../../models/UserArea/MainCategories')
const Products = require('../../models/UserArea/Products')
const SiteHtmls = require('../../models/AdminArea/SiteHtml')
const Admins = require('../../models/AdminArea/Admins')
class DashboardController{
    dashboard(req,res,next){
        Promise.all([MainCategories.countDocuments(),Products.countDocuments(),
            Admins.countDocuments(),MainCategories.countDocumentsDeleted(),
            Products.countDocumentsDeleted(),SiteHtmls.countDocuments(),
            Orders.countDocuments(),Orders.countDocumentsDeleted(),
            SiteHtmls.countDocumentsDeleted()

        ])
        .then(function([
            CategoryCount,ProductCount,AdminCount,DeletedCategory,DeletedProduct,SitetmlCount,
            OrderItem,OrderDeletedItem,SiteHtmlDeleted]){
                if(req.isAuthenticated()){
                    res.render('admin/dashboard',{layout:'admin',CategoryCount,ProductCount,AdminCount,
                    DeletedCategory,DeletedProduct,SitetmlCount,OrderItem,OrderDeletedItem,SiteHtmlDeleted,CurrentAdmin:res.locals.CurrentAdmin})
                }
                else{
                    res.render('admin/dashboard',{layout:'admin',CategoryCount,ProductCount,AdminCount,
                    DeletedCategory,DeletedProduct,SitetmlCount,OrderItem,OrderDeletedItem,SiteHtmlDeleted})
                }
        })
    }
}

module.exports = new DashboardController