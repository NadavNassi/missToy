const fs = require('fs')
const gUsers = require('../data/user.json')

const utilService = require('./util.service.js')

function query() {
    return Promise.resolve(gUsers)
}

function save(user) {
    //CREATE
    const { fullname, email, password } = user
    let savedUser = {
        _id: utilService.makeId(),
        fullname,
        email,
        password,
        isAdmin: false
    }
    savedUser.createdAt = savedUser.updatedAt = Date.now()
    gUsers.unshift(savedUser)
    return utilService.saveToysToFile(gUsers, 'user')
        .then(() => {
            savedUser = { ...savedUser }
            delete savedUser.password
            return savedUser
        })
}

function checkLogin(credentials) {
    var user = gUsers.find(user => user.email === credentials.email &&
        user.password === credentials.password)
    if (user) {
        user = { ...user }
        delete user.password
    }
    return Promise.resolve(user)
}

function remove(userId) {
    const idx = gUsers.findIndex(user => user._id === userId)
    if (idx === -1) {
        return Promise.reject('No Such user')
    }
    gUsers.splice(idx, 1)
    return utilService.saveToysToFile(gUsers, 'user')
}

module.exports = {
    checkLogin,
    save,
    query,
    remove
}
