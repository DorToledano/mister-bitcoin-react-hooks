import {storageService} from './storage.service'

export const userService = {
  getUser,
  signup,
  addMove,
  saveUser
}

var USER_KEY ='loggedInUser'

const users = [
  {
    name: 'Ochoa Hyde',
    coins: 100,
    moves: [],
  },
]

function getUser() {
  return new Promise((resolve, reject) => {
    // const user = users.find(user => user._id === userId)
    // const user = users[0] 
    let user = storageService.load(USER_KEY) 
    // if (!user) {
    //     user=users[0]
    //     console.log('user',user)
    //     storageService.store(USER_KEY,user) 
    // } 
    resolve(user) 
    // user ? resolve(user) : reject(`user not found!`)
  })
}

async function saveUser(user) {
    storageService.store(USER_KEY, user)
   }

function signup(name) {
  const loggedInUser = storageService.load(USER_KEY)
  if (loggedInUser) return
  const user = {
    name,
    coins: 100,
    moves: [],
  }
  storageService.store(USER_KEY, user)
  return Promise.resolve(user)
}

async function addMove(contact, amount) {
    const user = storageService.load(USER_KEY) 
    const move = {
        toId: contact._id,
        to: contact.name,
        at: Date.now(),
        amount,
       }
    user.moves.unshift(move)
    storageService.store(USER_KEY,user)
}
