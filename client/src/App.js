import './App.css';
import axios from 'axios';
import { useState } from 'react';
import loginContext from './context/loginContext';
import Login from './components/Login';
import Users from './components/Users'
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true

function App() {
  const [user, setUser] = useState({username: "", password: ""});
  const [invalidUser, setInvalidUser] = useState("");
  const history = useHistory();
  
  return (
    <div className="App">
      <Router>
        <loginContext.Provider value={{user, setUser, invalidUser, setInvalidUser, history}} >

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
