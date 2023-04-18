import bitcoin from '../img/bitcoin.png'
import {signup} from '../store/actions/user.actions'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'




export function SignupPage() {

  const navigate= useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((storeState) => storeState.userModule.loggedInUser)
 

 useEffect(() => {
  if (user) navigate('/')
 }, [user])

  function onSignup(ev) {
    ev.preventDefault()
    const name = ev.target.elements.namedItem('user-name').value
    dispatch(signup(name))
    navigate('/')
  }

    return (
      <section className="signup-page ">
        <form onSubmit={onSignup} className="simple-form ">
          <img src={bitcoin}></img>
          <label htmlFor="name">Please enter your name</label>
          <input type="text" placeholder="Your name here" name="user-name" id="name"></input>
          <button className="simple-button">Sign up</button>
        </form>
      </section>
    )
}
