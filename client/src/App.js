import './App.css';
import { useState } from 'react';
import loginContext from './context/loginContext';
import Login from './components/Login';
import Users from './components/Users';
import Home from './Home';
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
            <NavLink activeClassName="active" to="/login">Login</NavLink>
            <NavLink activeClassName="active" to="/user">Dashboard</NavLink>
            </div>
            <Switch>
              <Route path='/' exact component={Home} />
              <Route path='/login' component={Login} />
              <PrivateRoute path='/users' component={Users} />
            </Switch>

        </loginContext.Provider>
      </Router>
    </div>
  );
}

export default App;
