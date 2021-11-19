const express = require('express')
const passport = require('passport')
const router = express.Router()
const UserLoginController = require('../../controllers/UserArea/UserLoginController')

router.get('/login',UserLoginController.show)

router.post('/login',passport.authenticate('User',{
    successRedirect: '/',
    failureRedirect: '/user/login',
    failureFlash : true
}))

router.get('/logout',UserLoginController.logout)


module.exports = router