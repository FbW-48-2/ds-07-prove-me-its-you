import React, { useContext }  from 'react'
import UserContext from '../context/UserContext'
import { Route, Redirect } from 'react-router'

const PrivateRoute = (props) => {
  const { user } = useContext(UserContext)
  
  return (
    user.username
    ? <Route {...props}/>
    : <Redirect to="/login" />
  )
}

export default PrivateRoute
