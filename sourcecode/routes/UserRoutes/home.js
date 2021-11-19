const express = require('express')
const router = express.Router()
const HomeController = require('../../controllers/UserArea/HomeController')

router.get('/',HomeController.show)
router.get('/danh-muc/:slug',HomeController.category)
router.get('/san-pham/:slug',HomeController.productdetail)

router.get('/gioi-thieu',HomeController.intro)
router.get('/tim-kiem',HomeController.search)

router.get('/san-pham',HomeController.product)


router.get('/gio-hang',HomeController.cart)
router.post('/gio-hang/them-moi/:id',HomeController.postcart)
router.post('/gio-hang/xoa/:id',HomeController.deletecart)

module.exports = router