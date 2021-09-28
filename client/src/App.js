import Navigation from './Components/Navigation';
import { Switch, Route, Redirect } from 'react-router-dom'
// import {PrivateRoute} from 'react-router'
import LogIn from './Components/LogIn';
import Home from './Components/Home';
import UserList from './Components/UserList';
import PrivateRoute from './Components/PrivateRoute';
import { LogInContext } from './context/LogInContext';
import { useContext } from 'react';

function App() {

  const { user } = useContext(LogInContext)
  
  return (
    <>
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login">
          { user ? <Redirect to="/users"/> : <LogIn/> }
        </Route>
        <PrivateRoute exact path="/users" component={UserList}/>
      </Switch>
    </>
  );
}

export default App;
