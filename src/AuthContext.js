/**
 * Handles user data and authentication tokens within the current client session,
 * and provides methods of authentication.
 */


import { useContext, createContext, useState, useEffect } from 'react';

import { useJwt } from "react-jwt";

import ClientSessionContext from './ClientSessionContext';

//APIs
import { authenticate } from './api/auth';
 
const AuthContext = createContext();
 
export const AuthContextProvider = ({ children }) => {
  const [ sessionData, setSessionData, updateSessionData ] = useContext(ClientSessionContext);
  const { decodedToken, isExpired } = useJwt(sessionData.auth_token);

  //TODO: Delegate the following to a different method or class
  const [ user, setUser ] = useState({});

  useEffect(() => {
    if (decodedToken && !isExpired)
      setUser({
        user_name: decodedToken.user_name,
        is_authenticated: true
      });
    else
      setUser({
        user_name: null,
        is_authenticated: false
      });
  }, [decodedToken, isExpired]);

  //TODO: Validate the token that is received
  const login = async (payload) => {
    const apiResponse = await authenticate(payload);
    updateSessionData({
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
