const express = require('express')
const router = express.Router()
const UsersController = require('../../controllers/AdminArea/UsersController')

router.get('/users',UsersController.user)

router.get('/users/create',UsersController.create)
router.post('/users/create',UsersController.createpost)

router.get('/users/edit/:id',UsersController.edit)
router.post('/users/edit/:id',UsersController.postedit)

router.post('/users/delete/:id',UsersController.delete)

router.post('/users/form-submit-action',UsersController.submitAction)

module.exports = router