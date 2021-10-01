import React, { useContext } from 'react';
import loginContext from '../context/loginContext';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(loginContext);

    return (
      <Route {...rest} render={
        props => (
            user.username ?
            <Component {...props} /> : <Redirect to="/login" />
    )} /> 
        
    );
};

export default PrivateRoute;