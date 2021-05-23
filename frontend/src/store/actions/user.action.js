import { userService } from '../../services/user.service.js'

const SESSION_KEY = 'userSession'

export function loadUser() {
    return dispatch => {
        const user = JSON.parse(sessionStorage.getItem(SESSION_KEY))
        const action = {
            type: 'SET_LOGGED_USER',
            user
        }
        dispatch(action)
    }
}

export function loginUser(credentials) {
    return dispatch => {
        return userService.login(credentials)
            .then(user => {
                sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
                const action = {
                    type: 'SET_LOGGED_USER',
                    user
                }
                dispatch(action)
            })
    }
}

export function logoutUser() {
    return dispatch => {
        return userService.logout()
            .then(() => {
                sessionStorage.removeItem(SESSION_KEY)
                const action = {
                    type: 'SET_LOGGED_USER',
                    user: null
                }
                dispatch(action)
            })
    }
}

export function signupUser(user) {
    return dispatch => {
        return userService.signupUser(user)
            .then((user) => {
                sessionStorage.setItem(SESSION_KEY, JSON.stringify(user))
                const action = {
                    type: 'SET_LOGGED_USER',
                    user
                }
                dispatch(action)
            })
    }
}