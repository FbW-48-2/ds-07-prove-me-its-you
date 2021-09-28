import {useContext} from 'react';
import loginContext from '../context/loginContext';
import Users from './Users';

const Login = () => {

    const {user, setUser, invalidUser, setInvalidUser, history} = useContext(loginContext);

    const login = async(e) => {
        e.preventDefault();
        let theUser = {username: user.username, password: user.password};

        fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: { "Content-Type": "application/json" }, 
          body: JSON.stringify( theUser )
        })
        .then(res => res.json())
        .then(userApi => {
        
          if (userApi.username && userApi.password) {
            history.push('/users');
            setUser( userApi );
            console.log(user);
            
          } else {
            setInvalidUser(userApi.username)
          
          }
            // setUser({username: "", password: ""});
      
        })
      }

    return (
        <div>
          <form onSubmit={(e)=>{login(e)}}>
            <input
            type="text"
            placeholder="username"
            value={user.userName}
            onChange={(e)=> setUser({username: e.target.value, ...user})}  
            />
            <input
            type="password"
            placeholder="password"
            value={user.password}
            onChange={(e)=> setUser({...user, password: e.target.value})} 
            />
            <button type="submit">login</button>
          </form>
            {user? <Users /> : <Login />}
            
        </div>
    )
}

export default Login;
