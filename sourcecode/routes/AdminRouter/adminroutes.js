//ADMIN
const AdminloginRouter = require('./login')
const AdminDashboardRouter = require('./dashboard')
const AdminOrderRouter = require('./order')
const AdminCategoriesRouter = require('./categories')
const AdminProductsRouter = require('./products')
const AdminSiteHtmlRouter = require('./sitehtml')
const AdminCompanyInfoRouter = require('./companyinfo')
const AdminUsersRouter = require('./users')
const AdminsRouter = require('./admins')
const AdminTrashRouter = require('./trash')
const AdminLogoutRouter = require('./logout')
const CheckIsAdmin = require('../../middleware/CheckIsAdmin')

function AdminRoutes(app){

    app.use('/admin',AdminloginRouter)

    app.use(CheckIsAdmin)

    app.use('/admin',AdminDashboardRouter)

    app.use('/admin',AdminOrderRouter)

    app.use('/admin',AdminCategoriesRouter)

    app.use('/admin',AdminProductsRouter)

    app.use('/admin',AdminSiteHtmlRouter)

    app.use('/admin',AdminCompanyInfoRouter)

    app.use('/admin',AdminUsersRouter)  

    app.use('/admin',AdminsRouter)

    app.use('/admin',AdminTrashRouter)

    app.use('/admin',AdminLogoutRouter)
}

module.exports = AdminRoutes