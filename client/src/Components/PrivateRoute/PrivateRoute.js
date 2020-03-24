import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLoggedIn } from '../Login/auth-utils';

function PrivateRoute({ children, ...props }) {
  return (
    <Route
      {...props}
      render={({ location }) =>
        isLoggedIn() ? (
          children
        ) : (
          <Redirect
            to={{
              ...location,
              pathname: '/login',
              search: location.search,
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
