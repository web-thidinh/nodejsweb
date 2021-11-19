const express = require('express')
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'sourcecode/public/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
})
const upload = multer({storage:storage})
const FieldsUpload = upload.fields([{ name: 'image'},{ name: 'imageslibrary', maxCount: 10 }])

const router = express.Router() 
const ProductController = require('../../controllers/AdminArea/ProductsController')

router.get('/products',ProductController.list)

router.get('/products/create',ProductController.create)
router.post('/products/create',FieldsUpload,ProductController.postcreate)

router.get('/products/edit/:id',ProductController.edit)
router.post('/products/edit/:id',FieldsUpload,ProductController.postedit)

router.post('/products/delete/:id',ProductController.delete)

router.post('/products/form-submit-action',ProductController.submitAction)

module.exports = router