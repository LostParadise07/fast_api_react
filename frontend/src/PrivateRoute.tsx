// PrivateRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from "./service/auth";

import { RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        )
      }
    />
  );
};

export default PrivateRoute;
