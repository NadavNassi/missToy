import { httpService } from './http.service'

// const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/user' : 'http://localhost:3030/api/user'

export const userService = {
    login,
    logout,
    signupUser
}

function login(credentials) {
    return httpService.post('user/login', credentials)
}

function logout() {
    return httpService.post('user/logout')
}

function signupUser(user) {
    return httpService.post('user/signup', user)
}