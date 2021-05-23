const initialState = {
    user: null
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LOGGED_USER':
            return { ...state, user: action.user }
        default:
            return state
    }
}