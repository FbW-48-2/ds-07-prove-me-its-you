import './App.css';
import { useState } from 'react';
import loginContext from './context/loginContext';
import Login from './components/Login';
import Users from './components/Users';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import { BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';

function App() {
  const [user, setUser] = useState({username: "", password: ""});
  const [invalidUser, setInvalidUser] = useState("");
  
  return (
    <div className="App">
      <Router>
        <loginContext.Provider value={{user, setUser, invalidUser, setInvalidUser}} >
        <div className="header">
            <NavLink activeClassName="active" exact to="/">Home</NavLink>
            {user.username === "" ? (
            <NavLink activeClassName="active" exact to="/login">Login</NavLink>
            ) : (
            <NavLink activeClassName="active" exact to="/users">{user.username}</NavLink>
            )} 
        </div>
            <Switch>
              <Route exact path='/' component={Home} />
              {user.username === "" ? (
              <Route exact path='/login' component={Login} />
              ) : (
              <PrivateRoute exact path='/users' component={Users} />
              )} 
            </Switch>
        </loginContext.Provider>
      </Router>
    </div>
  );
}

export default App;
