const express = require('express')
const router = express.Router()
const registerController = require('../../controllers/UserArea/RegisterController')

router.get('/register',registerController.register)
router.post('/register',registerController.postregist)

module.exports = router