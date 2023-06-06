const express = require('express')
const router = express.Router()
const controller = require('../controller/user')

router.get('/logout', controller.logout)
router.get('/', controller.logins)
router.post('/login', controller.login)
router.get('/register', controller.getRegister)
router.post('/registers', controller.register)
router.get('/users', controller.get)
router.get('/create', controller.getPost)
router.post('/store', controller.post)
router.get('/users/delete/:id', controller.delete)


module.exports = router