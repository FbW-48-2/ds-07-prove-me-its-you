import {useContext, useState} from 'react';
import loginContext from '../context/loginContext';
import { useHistory } from 'react-router';

const Login = () => {
    
    const {user, setUser, invalidUser, setInvalidUser} = useContext(loginContext);
    const [inputUser, setInputUser] = useState({});
    const history = useHistory();

    const inputChange = (e) => {
      setInputUser({...inputUser, [e.target.name]: e.target.value})
    }

    const login = async(e) => {
        e.preventDefault();
       
        fetch('http://localhost:5000/login', {
          method: 'POST',
          credentials: 'include',
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify(inputUser)
        })
        .then(res => res.json())
        .then(userApi => {
        
          if (userApi.username && userApi.password) {
            history.push('/users');
            setUser( userApi );
            console.log(user);
            
          } else {
           console.log(userApi.error)
           setInvalidUser(userApi.error)
          
          }
        })
      }
     
    return (
        <div>
          <form onSubmit={(e)=>{login(e)}}>
            <input
            type="text"
            placeholder="username"
            name="username"
            onChange={(e)=> inputChange(e)}  
            />
            <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e)=> inputChange(e)} 
            />
            <button type="submit">login</button>
          </form>
            {invalidUser ? invalidUser : ""}
      </div>
    )
}

export default Login;
