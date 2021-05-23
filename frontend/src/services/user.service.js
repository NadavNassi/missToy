import axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/user' : 'http://localhost:3030/api/user'

export const userService = {
    login,
    logout,
    signupUser
}

function login(credentials) {
    return axios.post(`${BASE_URL}/login`, { credentials })
        .then(res => res.data)
}

function logout() {
    return axios.post(`${BASE_URL}/logout`)
        .then(res => res.data)
}

function signupUser(user) {
    return axios.post(`${BASE_URL}/signup`, { user })
        .then(res => res.data)
}