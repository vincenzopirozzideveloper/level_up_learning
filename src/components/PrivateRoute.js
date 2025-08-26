import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from '../services/authService';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        // Check if user is authenticated
        if (!isAuthenticated) {
          return <Redirect to="/auth/sign-in" />;
        }

        // Check if user has selected a character (for routes after login)
        if (rest.requiresCharacter && !user?.character_selected) {
          return <Redirect to="/character-selection" />;
        }

        // Render the component if all checks pass
        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;