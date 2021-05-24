const authService = require('./auth.service')

async function login(req, res) {
    const credentials = req.body
    try {
        const user = await authService.login(credentials)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function logout(req, res) {
    try {
        req.session.destroy()
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

async function signup(req, res) {
    try {
        const { email, password, fullname } = req.body
        const account = await authService.signup(email, password, fullname)
        const user = await authService.login({ email, password })
        req.session.loggedinUser = user
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        throw err
    }

}




module.exports = {
    login,
    logout,
    signup
}

