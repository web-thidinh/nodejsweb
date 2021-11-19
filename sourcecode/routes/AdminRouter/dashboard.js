const express = require('express')
const router = express.Router()
const DashboardController = require('../../controllers/AdminArea/DashboardController')

router.get('/dashboard',DashboardController.dashboard)

module.exports = router