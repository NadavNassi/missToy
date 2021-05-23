import { toyService } from '../../services/toy.service.js'


export function loadToys(filterBy = { txt: '', inStock: 'all' }) {
    return dispatch => {
        return toyService.query(filterBy)
            .then(toys => {
                if (!toys) {

                }
                const action = {
                    type: 'SET_TOYS',
                    toys
                }
                dispatch(action)
            })
    }
}

export function addToy(toy) {
    return dispatch => {
        return toyService.save(toy)
            .then(toy => {
                const action = {
                    type: 'ADD_TOY',
                    toy
                }
                dispatch(action)
            })
    }
}

export function updateToy(toy) {
    return dispatch => {
        return toyService.save(toy)
            .then(toy => {
                const action = {
                    type: 'UPDATE_TOY',
                    toy
                }
                dispatch(action)
            })
    }
}

export function remove(toyId) {
    return dispatch => {
        return toyService.removeToy(toyId)
            .then(() => {
                const action = {
                    type: 'REMOVE_TOY',
                    toyId
                }
                dispatch(action)
            })
    }
}

