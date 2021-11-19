const express = require('express')
const router = express.Router()
const TrashController = require('../../controllers/AdminArea/TrashController')

router.get('/trash',TrashController.trash)

router.post('/trash/categories/restore/:slug',TrashController.restorecategory)
router.post('/trash/categories/delete/:slug',TrashController.deletecategory)

router.post('/trash/products/restore/:slug',TrashController.restoreproduct)
router.post('/trash/products/delete/:slug',TrashController.deleteproduct)

router.post('/trash/orders/restore/:id',TrashController.restoreorder)
router.post('/trash/orders/delete/:id',TrashController.deleteorder)

router.post('/trash/sitehtmls/restore/:id',TrashController.restoresitehtml)
router.post('/trash/sitehtmls/delete/:id',TrashController.deletesitehtml)

router.post('/trash/categories-form-submit',TrashController.categoriessubmit)
router.post('/trash/products-form-submit',TrashController.productssubmit)
router.post('/trash/orders-form-submit',TrashController.orderssubmit)
router.post('/trash/sitehtmls-form-submit',TrashController.sitehtmlssubmit)


module.exports = router