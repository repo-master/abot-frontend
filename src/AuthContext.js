/**
 * Handles user data and authentication tokens within the current session,
 * and provides methods of authentication.
 */


import { useContext, createContext, useState, useEffect } from 'react';

import { useJwt } from "react-jwt";

import UserSessionContext from './UserSession';

//APIs
import { authenticate } from './api/auth';
 
const AuthContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [ sessionData, setSessionData, updateUserData ] = useContext(UserSessionContext);
  const { decodedToken, isExpired } = useJwt(sessionData.auth_token);

  const [ user, setUser ] = useState({});

  useEffect(() => {
    if (decodedToken && !isExpired)
      setUser({
        user_name: decodedToken.user_name
      });
    else
      setUser({
        user_name: null
      });
  }, [decodedToken, isExpired]);

  const login = async (payload) => {
    const apiResponse = await authenticate(payload);
    updateUserData({
      auth_token: apiResponse.data.access_token
    });
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};
 
export default AuthContext;
