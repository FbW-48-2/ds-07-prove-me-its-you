import React, { useContext } from 'react'
import { LogInContext } from '../context/LogInContext'
import { Link } from 'react-router-dom'

export default function Home() {

    const { user } = useContext(LogInContext)

    return (
        <div className="home">
            <h1 className="home__heading">Welcome</h1>
            {
                user ?
                <p className="home__user">{user.username} 😎</p>
                :
                <>
                <p className="home__text">Do you have an account?</p>
                <p className="home__text">Click here to <Link to="/login">Login</Link> </p>
                </>
            }
        </div>
    )
}
