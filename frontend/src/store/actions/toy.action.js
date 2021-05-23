import { toyService } from '../../services/toy.service.js'


export function loadToys(filterBy = { txt: '', inStock: 'all' }) {
    return async dispatch => {
        try {
            const toys = await toyService.query(filterBy)
            dispatch({ type: 'SET_TOYS', toys })
        } catch (err) {
            throw err
        }
    }
}

export function addToy(toyToAdd) {
    return async dispatch => {
        try {
            const toy = await toyService.save(toyToAdd)
            dispatch({ type: 'ADD_TOY', toy })
        } catch (err) {
            throw err
        }
    }
}

export function updateToy(toyToUpdate) {
    return async dispatch => {
        try {
            const toy = await toyService.save(toyToUpdate)
            dispatch({ type: 'UPDATE_TOY', toy })
        } catch (err) {
            throw err
        }
    }
}

export function remove(toyId) {
    return async dispatch => {
        try {
            await toyService.removeToy(toyId)
            dispatch({ type: 'REMOVE_TOY', toyId })
        } catch (err) {
            throw err
        }
    }
}

