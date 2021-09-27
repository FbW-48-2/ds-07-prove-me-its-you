import React, { useState, useEffect } from 'react'
import { getUsers } from '../helpers/apiCalls'


const UserList = () => {
  const [ userList, setUserList ] = useState([])

  useEffect(async() => {
    const resApi = await getUsers()
    setUserList(resApi)
  }, [])

  return (
    <div className='user_list'>
      {
        Array.isArray(userList)
        ? userList?.map((user, i) => (
          <h3 key={i}>- {user.username}</h3>
        ))
        : <h1>{userList.error}</h1>
      }
    </div>
  )
}

export default UserList
