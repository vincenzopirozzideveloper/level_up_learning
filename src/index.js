import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// Import gaming fonts
import "@fontsource/bebas-neue";
import "@fontsource/orbitron";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono";

import AuthLayout from "layouts/Auth.js";
import AdminLayout from "layouts/Admin.js";
import CharacterSelection from "components/CharacterSelection/CharacterSelection";
import PrivateRoute from "components/PrivateRoute";
import authService from "services/authService";

function App() {
  const [characterSelected, setCharacterSelected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount (only from localStorage, no API calls)
    const checkAuth = () => {
      try {
        // Only check localStorage, don't make API calls
        const authenticated = authService.isAuthenticated();
        setIsAuthenticated(authenticated);
        
        if (authenticated) {
          const user = authService.getUser();
          setCharacterSelected(user?.character_selected || false);
        }
      } catch (error) {
        console.error("Auth check error:", error);
      } finally {
        setLoading(false);
      }
    };

    // Use setTimeout to ensure this doesn't block initial render
    setTimeout(checkAuth, 0);
  }, []);

  const handleCharacterSelect = async (character) => {
    try {
      // Save character selection to backend
      await authService.updateCharacterSelection(character);
      setCharacterSelected(true);
      
      // Navigate to dashboard after character selection
      window.location.href = '#/admin/dashboard';
    } catch (error) {
      console.error("Character selection error:", error);
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#0a0a0c',
        color: '#ff4655',
        fontSize: '2rem',
        fontFamily: 'Bebas Neue',
      }}>
        Loading...
      </div>
    );
  }

  return (
    <HashRouter>
      <Switch>
        {/* Public Auth Routes */}
        <Route path="/auth" component={AuthLayout} />
        
        {/* Character Selection Route - Protected */}
        <Route 
          path="/character-selection" 
          exact
          render={() => {
            // Check authentication manually for character selection
            if (!isAuthenticated) {
              return <Redirect to="/auth/sign-in" />;
            }
            // Render CharacterSelection directly without wrapper
            return <CharacterSelection onComplete={handleCharacterSelect} />;
          }}
        />
        
        {/* Admin Routes - Protected and requires character */}
        <PrivateRoute
          path="/admin"
          requiresCharacter
          component={AdminLayout}
        />
        
        {/* Default Redirect */}
        <Route exact path="/">
          {isAuthenticated ? (
            characterSelected ? (
              <Redirect to="/admin/dashboard" />
            ) : (
              <Redirect to="/character-selection" />
            )
          ) : (
            <Redirect to="/auth/sign-in" />
          )}
        </Route>
        
        {/* Catch all - redirect to sign in */}
        <Redirect to="/auth/sign-in" />
      </Switch>
    </HashRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));