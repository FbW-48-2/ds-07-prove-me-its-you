import './App.css';
import React, {useContext} from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';
import {UserContext} from './context/userContext.js'

import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';

import Login from './pages/Login';
import Users from './pages/Users';
import AddUser from './pages/AddUser';
import PrivateRoute from './Components/privateRoute';
import Header from './Components/Header'

function App() {
  const {user} = useContext(UserContext)

  console.log('USER: ',user.username)
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop='5%'
        > 
     <Grid item lg={6} md={8} xs={12} >
      <Paper elevation='10' className='paper' sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
        <Grid container item xs={12}> 
          <Header />
        </Grid>  
        <Grid item xs={12}>  
        <Switch>
          <Route exact path='/'>
            {!user.username ? <Redirect to="/login" /> : <Redirect to="/users" />}
          </Route>  
         <Route path="/login">
            <Login />
          </Route>
          <Route path="/adduser">
            <AddUser />
          </Route>
        <PrivateRoute component={Users} path="/user" exact />
       
        </Switch>
        </Grid>

      </Paper>
     </Grid>
     </Grid>
    </>
  );
}

export default App;
