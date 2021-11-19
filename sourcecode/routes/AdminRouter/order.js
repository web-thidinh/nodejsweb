const express = require('express')
const router = express.Router()
const OrderController = require('../../controllers/AdminArea/OrderController')

router.get('/orders',OrderController.list)

router.get('/orders/create',OrderController.create)
router.post('/orders/create',OrderController.postcreate)

router.get('/orders/edit/:id',OrderController.edit)

router.post('/orders/delete/:id',OrderController.delete)

router.post('/orders/form-submit-action',OrderController.submitAction)

module.exports = router