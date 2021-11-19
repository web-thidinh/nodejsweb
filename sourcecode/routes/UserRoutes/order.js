const express = require('express')
const router = express.Router()
const OrderController = require('../../controllers/UserArea/OrderController')

router.get('/:slug',OrderController.show)
//router.get('/thanh-cong',OrderController.ordersuccess)
router.post('/tao-moi/',OrderController.postorder)

module.exports = router