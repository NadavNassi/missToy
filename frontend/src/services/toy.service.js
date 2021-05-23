
import { httpService } from './http.service'

// const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/toy' : 'http://localhost:3030/api/toy'

export const toyService = {
    query,
    save,
    removeToy,
    getById
}

function query(filterBy) {
    return httpService.get(`toy`, filterBy)
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put('toy', toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function removeToy(toyId, /* loggedinUser */) {
    return httpService.delete(`toy/${toyId}`)
}

