import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom'
import Login from './Components/Login';
import UserList from './Components/UserList';
import UserState from './context/UserState';
import PrivateRoute from './Components/PrivateRoute';
import './App.css';

function App() {

  return (
    <div className="App">
      <UserState>
        <Router>
          <nav>
            <NavLink to='/login' activeClassName='active'>
              Login
            </NavLink>
            <NavLink to='/users' activeClassName='active'>
              Users
            </NavLink>
          </nav>
          <main>
            <Switch>
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/users' component={UserList} />
            </Switch>
          </main>
        </Router>
      </UserState>
    </div>
  );
}

export default App;
