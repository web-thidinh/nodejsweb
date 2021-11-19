const express = require('express')
const router = express.Router()
const CompanyController = require('../../controllers/AdminArea/CompanyController')

router.get('/companyinfo',CompanyController.list)

router.get('/companyinfo/edit',CompanyController.edit)
router.post('/companyinfo/edit',CompanyController.postedit)

module.exports = router