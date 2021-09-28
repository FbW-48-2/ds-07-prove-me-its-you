import './App.css';
import { useState } from 'react';
import loginContext from './context/loginContext';
import Login from './components/Login';
import Users from './components/Users'
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect} from 'react-router-dom';

function App() {
  const [user, setUser] = useState({username: "", password: ""});
  const [invalidUser, setInvalidUser] = useState("");
  
  return (
    <div className="App">
      <Router>
        <loginContext.Provider value={{user, setUser, invalidUser, setInvalidUser}} >
        
            <Switch>
              <Route path='/' exact component={Login} />
              <Route path='/login' component={Login} />
              <Route path='/users' component={Users} />
            </Switch>

        </loginContext.Provider>
      </Router>
    </div>
  );
}

export default App;
