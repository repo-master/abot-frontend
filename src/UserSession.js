
import { createContext } from "react";
import { useSessionStorage } from 'usehooks-ts'
import { useUpdatableObject } from "./hooks";

const UserSessionContext = createContext();

function UserSessionProvider(props) {
  const { key, initialValue } = props;
  const user_session_hook = useUpdatableObject(useSessionStorage, key || "session-data", initialValue || {});
  return <UserSessionContext.Provider value={user_session_hook}>{props.children}</UserSessionContext.Provider>;
}

export { UserSessionContext, UserSessionProvider };
