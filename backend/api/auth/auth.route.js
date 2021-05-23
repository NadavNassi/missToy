const express = require('express')
const { login, logout, signup } = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.post('/logout', logout)
router.post('/signup', signup)


module.exports = router


