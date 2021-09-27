import React, { useState } from 'react'
import UserContext from './UserContext'

const initialState = {
  username: '',
  password: ''
}

const UserState = ({children}) => {
  const [ user, setUser ] = useState(initialState)
  
  return (
    <UserContext.Provider value={{ user, setUser, initialState }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserState
