// AuthContext.js
import { createContext, useState, useMemo, useContext } from 'react';
import { retrieveToken, decodeToken } from './AuthUtils';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [token,setToken] =useState(retrieveToken)
  // Decode the JWT token to get user roles
  const decodedToken = decodeToken(token);
  const userRoles = decodedToken.role; // Extract user roles from the decoded token
  console.log("AuthProvider:" , userRoles)

  const contextValue = useMemo(() => ({
    token, 
    setToken,
    userRoles,
  }),
  [token, userRoles]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}
export const useAuth = () => useContext(AuthContext);