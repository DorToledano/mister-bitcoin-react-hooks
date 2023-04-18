import {userService} from '../../services/user.service'

export function spendBalance(amount) {
    console.log('amount:', amount)
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'SPEND_BALANCE', amount})
        } catch (error) {
            console.log('error:', error)
        }
    }
}

export function loadUser() {
    return async (dispatch) => {
      try {
        const loggedInUser =  await userService.getUser()
        const action = {
          type: 'SET_USER',
          loggedInUser,
        }
        dispatch(action)
      } catch (error) {
        console.log('error:', error)
      }
    }
  }
  
  export function signup(name){
    return async (dispatch) => {
      try {
        const loggedInUser = await userService.signup(name) 
        const action = {
          type: 'SET_USER',
          loggedInUser,
        }
        dispatch(action)
      } catch (error) {
        console.log('error:', error)
      }
    }
  }

  export function updateUser(loggedInUser) {
    return async (dispatch) => {
      try {
        await userService.saveUser(loggedInUser)
        const action = { type: 'SET_USER', loggedInUser }
        dispatch(action)
      } catch (error) {
        console.log('error:', error)
      }
    }
  }