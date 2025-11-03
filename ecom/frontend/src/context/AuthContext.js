import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context
// This is the "brain" itself, but empty for now
const AuthContext = createContext();

// 2. Create the "Provider"
// This is a component that will wrap our app and "provide"
// the login info to all other components.
export function AuthProvider({ children }) {
  // 3. This is the state we want to share
  // We'll store the user object here (or null if not logged in)
  const [currentUser, setCurrentUser] = useState(null);

  // 4. Create the functions to change the state
  const login = (userData) => {
    // This function will be called when we successfully log in
    setCurrentUser(userData);
    // In a real app, we'd also save a token to localStorage
  };

  const logout = () => {
    // This function will clear the user
    setCurrentUser(null);
  };

  // 5. This 'value' object is what all our components will get
  const value = {
    user: currentUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// 6. Create an easy-to-use "Hook"
// This lets any component get the context data by just calling useAuth()
export const useAuth = () => {
  return useContext(AuthContext);
};