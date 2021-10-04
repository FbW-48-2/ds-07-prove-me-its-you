import React, { useContext } from 'react'
import { LogInContext } from '../context/LogInContext'

export default function UserList() {

    const { usersArr } = useContext(LogInContext)
    // console.log(usersArr);
    return (
        <div className="users">
            {
            usersArr.error ?
            <div className="users__error">
                <h1>{usersArr.error}!</h1>   
                <p>Please login to access the Users</p> 
            </div>

            :
            <>
            <h1 >Users</h1>
            <ul className="users__list">
            {
                usersArr.map((item, i) => {
                    return <li key={i} className="users__item"><span>User {i +1}:</span> {item.username}</li>
                })
            }
            </ul>
            </>
            }
        </div>
    )
}
