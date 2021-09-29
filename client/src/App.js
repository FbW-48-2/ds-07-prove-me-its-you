import { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import UserList from './Components/UserList';
import PrivateRoute from './Components/PrivateRoute';
import UserContext from './context/UserContext';
import { signOut } from './helpers/apiCalls'
import { Redirect } from 'react-router';
import './App.css';


function App() {
  const { user } = useContext(UserContext)

  const handleSingOut = async () => {
    const resApi = await signOut()
    alert(resApi.message);
    <Redirect to="/home" />
  }

  return (
    <div className="App">
        <Router>
          <nav>
            <NavLink to='/home' activeClassName='active'>
              Home
            </NavLink>
            <NavLink to='/users' activeClassName='active'>
              Users
            </NavLink>
            {
              user.username
              ? (
                <button onClick={handleSingOut}>
                  Sign out
                </button>
              )
              : (<>
                <NavLink to='/login' activeClassName='active'>
                  Login
                </NavLink>
                <NavLink to='/signup' activeClassName='active'>
                  Sign up
                </NavLink>
                </>
              )
            }
          </nav>
          <main>
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />
              <PrivateRoute exact path='/users' component={UserList} />
              <Route path='/' component={Home} />
            </Switch>
          </main>
        </Router>
    </div>
  );
}

export default App;
