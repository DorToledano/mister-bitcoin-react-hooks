

const INITIAL_STATE = {
    loggedInUser: null
}

export function userReducer(state = INITIAL_STATE, action = {}) {

    const { loggedInUser } = state
    switch (action.type) {
        case 'SPEND_BALANCE':
            return {
                ...state,
                loggedInUser: { ...loggedInUser, balance: loggedInUser.balance - action.amount }
            }
            case 'SET_USER': {
                return { ...state, loggedInUser: action.loggedInUser  }
              }

        default:
            return state;
    }
}