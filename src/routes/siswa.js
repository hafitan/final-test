const express = require('express')
const router = express.Router()
const controller = require('../controller/siswa')
const UserController = require('../controller/user')
const {authToken} = require('../middleware/auth')

router.get('/logout', authToken, UserController.logout)
router.get('/', authToken, controller.get)
router.get("/matematika", authToken, controller.getAllMtk)
router.get("/ipa", authToken, controller.getIpa)
router.get('/create', authToken, controller.getPost)
router.post('/store', authToken, controller.post)
router.get('/edit/:id', authToken, controller.getEdit)
router.post('/update/:id', authToken, controller.edit)
router.get('/delete/:id', authToken, controller.delete)

module.exports = router