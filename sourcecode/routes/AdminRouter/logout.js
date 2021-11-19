const express = require('express')
const router = express.Router()
const LogoutController = require('../../controllers/AdminArea/LogoutController')

router.get('/adminlogout',LogoutController.logout)

module.exports = router