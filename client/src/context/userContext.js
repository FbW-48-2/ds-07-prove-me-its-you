import React, {createContext, useState, useEffect} from "react";
import { checkAuth } from "../helpers/fetchData";
export const UserContext = createContext()

const UserProvider = ( {children} ) => {
    const [user, setUser] = useState({})
    const exportData = {user, setUser}

    useEffect(async() => { 
        const loggedIn = await checkAuth()
        if (loggedIn.username) {
            setUser(loggedIn)
        }
    }, [])


return (
    <UserContext.Provider value={exportData}>
        {children}
    </UserContext.Provider>
)}

export default UserProvider