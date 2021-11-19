const express = require('express')
const router = express.Router()
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
const CategoriesController = require('../../controllers/AdminArea/CategoriesController')

router.get('/categories',CategoriesController.list)

router.post('/categories/form-submit-check',CategoriesController.submitActions)

router.get('/categories/edit/:id',CategoriesController.edit)
router.post('/categories/edit/:id',upload.single('image'),CategoriesController.editpost)

router.get('/categories/create',CategoriesController.create)
router.post('/categories/create',upload.single('image'),CategoriesController.createpost)

router.post('/categories/delete/:id',CategoriesController.destroy)


module.exports = router