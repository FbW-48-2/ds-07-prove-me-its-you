import Login from "./Components/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserList from "./Components/UserList";
import Signup from "./Components/Signup";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <div className="links">
            <p><Link to="/">/ Login</Link></p>
            <p><Link to="/signup">/ Signup</Link></p>
            <p><Link to="/users">/ Users</Link></p>
          </div>
          <Route path="/" exact>
            <Login/>
          </Route>
          <Route path="/signup" exact>
            <Signup/>
          </Route>
          <Route path="/users" exact>
            <UserList/>
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
