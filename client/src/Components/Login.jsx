import React, { useState, useContext } from 'react'
import { auth } from '../helpers/apiCalls'
import { useHistory } from 'react-router'
import UserContext from '../context/UserContext'

const Login = () => {
  const [ loginForm, setLoginForm ] = useState({
    username: '',
    password: ''
  })
  const { setUser } = useContext(UserContext)
  const [ msg, setMsg ] = useState('')

  let history = useHistory()

  const handleInput = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const userApi = await auth(loginForm)
    if (userApi.error) {
      setMsg(`Ups! something went wrong, try again`)
    } else {
      setUser(userApi)
      history.push('/users')
    }
  }

  return (
    <div className='login'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input name='username' value={loginForm.username} onChange={handleInput} placeholder='username' />
        <input name='password' value={loginForm.password} onChange={handleInput} placeholder='password' />
        <button type='submit'>
          Login
        </button>
      </form>
      {
        msg && <h3>{msg}</h3>
      }
    </div>
  )
}

export default Login
