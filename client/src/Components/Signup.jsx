import React, { useState, useContext } from 'react'
import { Redirect, useHistory } from 'react-router'
import UserContext from '../context/UserContext'
import { signUp } from '../helpers/apiCalls'


const Signup = () => {
  const [ signupForm, setSignupForm ] = useState({
    username: '',
    password: ''
  })
  const { setUser } = useContext(UserContext)
  const [ msg, setMsg ] = useState('')

  let history = useHistory()

  const handleInput = (e) => {
    setSignupForm({
      ...signupForm,
      [e.target.name]: e.target.value
    })
    setMsg(null)
  }

  const handleSignup = async (e) => {
    e.preventDefault()
    const userApi = await signUp(signupForm)
    if (userApi.error) setMsg(userApi.error)
    else {
      setUser(userApi);
      history.push('/users')
      // <Redirect to='/users' />
    }
  }

  return (
    <section className='signup'>
      <h1>Sign up</h1>
      {
        msg && <h2>{msg}</h2>
      }
      <form onSubmit={handleSignup}>
        <input name='username' value={signupForm.username} onChange={handleInput} placeholder='username' />
        <input name='password' value={signupForm.password} onChange={handleInput} placeholder='password' />
        <button type='submit'>
          Sign up
        </button>
      </form>
    </section>
  )
}

export default Signup
