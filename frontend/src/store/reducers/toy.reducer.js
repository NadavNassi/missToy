const initialState = {
    toys: null,
}

export function toyReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: action.toys }
        case 'ADD_TOY':
            return { ...state, toys: [action.toy, ...state.toys] }
        case 'REMOVE_TOY':
            return { ...state, toys: state.toys.filter(toy => toy._id !== action.toyId) }
        case 'UPDATE_TOY':
            const idx = state.toys.findIndex(toy => toy._id === action.toy._id)
            return { ...state, toys: [...state.toys.slice(0, idx), { ...action.toy }, ...state.toys.slice(idx + 1)] }
        default:
            return state
    }
}