const express = require('express')
const router = express.Router()
const AdminsController = require('../../controllers/AdminArea/AdminsController')

router.get('/admins',AdminsController.list)

router.get('/admins/create',AdminsController.create)
router.post('/admins/create',AdminsController.postcreate)

router.get('/admins/edit/:id',AdminsController.edit)
router.post('/admins/edit/:id',AdminsController.postedit)

router.post('/admins/detele',AdminsController.delete)

router.post('/admins/form-submit-action',AdminsController.submitAction)





module.exports = router