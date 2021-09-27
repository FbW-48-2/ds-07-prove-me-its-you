import React, {useState, useEffect} from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(async () => {
    await axios.get(`${axios.defaults.baseURL}/users`)
    .then((response)=>{
      console.log("response", response);
      setUsers(response.data);
    }).catch((err)=>{
      console.log(err);
    })
  }, []);


  
  const userList = users.map((user, index)=>{
    return <p>User {index+1} - {user.username}</p>;
  });

  return (
    <div>
      {userList}
    </div>
  )
}
