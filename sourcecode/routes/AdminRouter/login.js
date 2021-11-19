const express = require('express')
const router = express.Router()
const LoginController = require('../../controllers/AdminArea/LoginController')
const passport = require('passport')

router.get('/',LoginController.show)
router.post('/',LoginController.login,
passport.authenticate('Admin',{
    successRedirect: '/admin/dashboard'
    ,failureRedirect: '/admin',
    failureFlash : true 
}))

module.exports = router