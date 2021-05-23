const express = require('express')
const { getToys, getById, createToy, updateToy, remove } = require('./toy.controller')
const router = express.Router()

router.get('/', getToys)
router.post('/', createToy)
router.put('/', updateToy)
router.get('/:toyId', getById)

router.delete('/:toyId', remove)

module.exports = router