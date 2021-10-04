import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { LogInContext } from '../context/LogInContext'

export default function Navigation() {

    const { user } = useContext(LogInContext)

    const styles = {
        fontWeight: "bold",
        color: "white",
        textDecoration: "underline"
    }

    return (
        <nav className="nav">
            <div className="nav__icon">
                 { user ? `${user.username}  🚀` : '' }
            </div>
            <ul className="nav__list">
            <li className="nav__item">
                <NavLink 
                    exact
                    to="/"
                    activeStyle={styles}
                >Home</NavLink>
            </li>
                {
                    user ?
                    <>
                    <li className="nav__item">
                        <NavLink
                            exact
                            to="/users"
                            activeStyle={styles}
                        >Users</NavLink>
                    </li>
                    </>
                    :
                    <>
                    <li className="nav__item">
                        <NavLink 
                            exact
                            to="/login"
                            activeStyle={styles}
                        >Login</NavLink>
                    </li>
                    </>
                }
            </ul>   

        </nav>
    )
}
