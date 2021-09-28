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
        fetch(
              "http://localhost:5000/users", {
              mode: "cors",
              method: "GET",
              headers: {
              "Content-Type": "application  json",
              Origin: "http://localhost:3000"
              },
        })
        .then(res => res.json())
        .then(users => setUsers(users))
    }

    return (
        <div>
        {/* {users?.map((user, i)=> (
            <p key={i}>{user}</p>
        )) 
        } */}
        {users.username}
        </div>
    )
}

export default Users;
