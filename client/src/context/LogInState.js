import React, { useState, useEffect } from 'react'
import { LogInContext } from './LogInContext'
import { login, getUsers } from '../helpers/loginHelpers'


export default function LogInState({children}) {

    const [ user, setUser ] = useState()
    const [ usersArr, setUsersArr ] = useState([])

    const updateUsersArr = async () => {
        setUsersArr(await getUsers())
    }

    useEffect(() => {
        updateUsersArr()
    }, [user])

    return (
        <LogInContext.Provider
            value={{
                    login, 
                    user, 
                    setUser, 
                    usersArr, 
                    setUsersArr
                }}
        >
            {children}
        </LogInContext.Provider>
    )
}
