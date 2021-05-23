import axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/toy' : 'http://localhost:3030/api/toy'

export const toyService = {
    query,
    save,
    removeToy,
    getById
}

function query(filterBy) {
    return axios.get(`${BASE_URL}?txt=${filterBy.txt}&inStock=${filterBy.inStock}`)
        .then(res => res.data)
}

function getById(toyId) {
    return axios.get(`${BASE_URL}/${toyId}`)
        .then(res => res.data)
}

function save(toy) {
    if (toy._id) {
        return axios.put(BASE_URL, toy)
            .then(res => res.data)
    } else {
        return axios.post(BASE_URL, toy)
            .then(res => res.data)
    }
}

function removeToy(toyId, loggedinUser) {
    return axios.delete(`${BASE_URL}/${toyId}`, loggedinUser)
        .then(res => res.data)
}

