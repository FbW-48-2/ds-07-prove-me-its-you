import React, { useState } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [login, setLogin] = useState(null)

  const handleLogin = () => {
    axios.post(`${axios.defaults.baseURL}/signup`, {
      username: username,
      password: password
    }).then(res=>{
      setError(null);
      setLogin("Signup successful.")
    }).catch(err=>{
      setLogin(null);
      setError("Username or Password are not valid.")
    });
    setTimeout(()=>{ 
      setLogin(null);
      setError(null);
    }, 3000)
  }

  return (
    <div className="input-container">
      <h3>Signup</h3>
      <div className="input">
        <label htmlFor="username">Username:</label>
        <input type="text" value={username} name="username" id="username" onChange={e=>setUsername(e.target.value)}/>
      </div>
      <div className="input">
        <label htmlFor="username">Password:</label>
        <input type="password" value={password} name="password" id="password" onChange={e=>setPassword(e.target.value)}/>
      </div>
      <div>
        <button onClick={handleLogin}>signup</button>
      </div>
      {error ? <p id="error">{error}</p> : null}
      {login ? <p id="login">{login}</p> : null}
    </div>
  )
}
