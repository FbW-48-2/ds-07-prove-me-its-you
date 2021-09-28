import React from 'react';
import loginContext from '../context/loginContext';
import { useContext, useState, useEffect } from 'react';

const Users = () => {
    const {user} = useContext(loginContext);
    const [users, setUsers] = useState([]);

    useEffect(()=> {
        usersData();
    }, [user]);

    const usersData = async () => {
        await fetch(
              "http://localhost:5000/users", {
              mode: "cors",
              method: "GET",
              credentials: "include"
        })
        .then(res => res.json())
        .then(users => setUsers(users))
    }

    return (
        <div>
        <h2> Members Only </h2>
       {users.map(user=> <p>{user.username}</p>)}
        </div>
    )
}

export default Users;
