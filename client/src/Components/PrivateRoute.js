import React, { useContext } from 'react'
import { LogInContext } from '../context/LogInContext';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {

    const { user } = useContext(LogInContext)

    return (
        <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
    )
}
