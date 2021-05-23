const bcrypt = require('bcrypt')
const userService = require('../user/user.service')

async function login(credentials) {
    try {
        const user = await userService.getByUsername(credentials.email)
        if (!user) return Promise.reject('Invalid username or password')
        const match = bcrypt.compare(credentials.password, user.password)
        if (!match) return Promise.reject('Invalid username or password')
        delete user.password
        return user
    } catch (err) {
        throw err
    }
}

async function signup(email, password, fullname) {
    const saltRounds = 10
    if (!email || !password || !fullname) return Promise.reject('fullname, username and password are required!')
    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add(email, password = hash, fullname)
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


function remove(userId) {
    const idx = gUsers.findIndex(user => user._id === userId)
    if (idx === -1) {
        return Promise.reject('No Such user')
    }
    gUsers.splice(idx, 1)
    return utilService.saveToysToFile(gUsers, 'user')
}

module.exports = {
    login,
    signup,
    remove
}