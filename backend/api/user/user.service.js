const dbService = require('../../services/db.service')
// const logger = require('../../services/logger.service')
// const reviewService = require('../review/review.service')
// const ObjectId = require('mongodb').ObjectId

async function add(email, password, fullname) {
    try {
        let savedUser = {
            fullname,
            email,
            password,
            isAdmin: false,
            createdAt: Date.now()
        }
        const collection = await dbService.getCollection('userDB')
        await collection.insertOne(savedUser)
        return savedUser
    } catch (err) {
        throw err
    }
}

async function getByUsername(email) {
    try {
        const collection = await dbService.getCollection('userDB')
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        // logger.error(`while finding user ${username}`, err)
        throw err
    }
}

module.exports = {
    getByUsername,
    add
}