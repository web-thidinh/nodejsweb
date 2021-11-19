const express = require('express')
const router = express.Router()
const SiteHtmlController = require('../../controllers/AdminArea/SiteHtmlController')

router.get('/sitehtmls',SiteHtmlController.list)

router.get('/sitehtmls/create',SiteHtmlController.create)
router.post('/sitehtmls/create',SiteHtmlController.postcreate)

router.get('/sitehtmls/edit/:id',SiteHtmlController.edit)
router.post('/sitehtmls/edit/:id',SiteHtmlController.postedit)

router.post('/sitehtmls/delete/:id',SiteHtmlController.delete)

router.post('/sitehtmls/form-submit-action',SiteHtmlController.submitAction)

module.exports = router