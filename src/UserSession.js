/**
 * Manages session data using session storage.
 * You can save any kind of JSON serializable object and retrieve it
 * if that component is enclosed in this Provider.
 * 
 */


import { createContext } from "react";
import { useSessionStorage } from 'usehooks-ts'
import { useUpdatableObject } from "./hooks";

const UserSessionContext = createContext();

export const UserSessionProvider = (props) => {
  const { key, initialValue } = props;
  const user_session_hook = useUpdatableObject(useSessionStorage, key || "session-data", initialValue || {});
  return (
    <UserSessionContext.Provider value={user_session_hook}>
      {props.children}
    </UserSessionContext.Provider>
  );
}

export default UserSessionContext;
