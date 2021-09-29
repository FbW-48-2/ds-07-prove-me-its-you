import React, { useState, useEffect } from 'react'
import { getUsers } from '../helpers/apiCalls'


const UserList = () => {
  const [ userList, setUserList ] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const resApi = await getUsers()
      setUserList(resApi)
    }
    fetchData()
  }, [])

  return (
    <section className='user_list'>
      {
        Array.isArray(userList)
        ? userList?.map((user, i) => (
          <h3 key={i}>- {user.username}</h3>
        ))
        : <h1>{userList.error}</h1>
      }
    </section>
  )
}

export default UserList
