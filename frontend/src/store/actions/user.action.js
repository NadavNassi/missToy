import { userService } from '../../services/user.service.js'

const SESSION_KEY = 'userSession'

export function loadUser() {
    return async dispatch => {
        try {
            const user = await JSON.parse(sessionStorage.getItem(SESSION_KEY))
            const action = {
                type: 'SET_LOGGED_USER',
                user
            }
            dispatch(action)
        } catch (err) {
            throw err
        }
    }
}

export function loginUser(credentials) {
    return async dispatch => {
        try {
            const user = await userService.login(credentials)
            await sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
            const action = {
                type: 'SET_LOGGED_USER',
                user
            }
            dispatch(action)
        } catch (err) {
            throw err
        }
    }
}

export function logoutUser() {
    return async dispatch => {
        try {
            await userService.logout()
            sessionStorage.removeItem(SESSION_KEY)
            const action = {
                type: 'SET_LOGGED_USER',
                user: null
            }
            dispatch(action)
        } catch (err) {
            throw err
        }
    }
}

export function signupUser(userToSign) {
    return async dispatch => {
        try {
            const user = await userService.signupUser(userToSign)
            sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
            const action = {
                type: 'SET_LOGGED_USER',
                user
            }
            dispatch(action)
        } catch (err) {
            throw err
        }
    }
}