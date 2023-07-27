/**
 * Manages session data using session storage.
 * You can save any kind of JSON serializable object and retrieve it
 * if that component is enclosed in this Provider.
 */

import { createContext } from "react";
import { useSessionStorage, useLocalStorage } from 'usehooks-ts'
import { useUpdatableObject } from "./hooks";

//Context that handles client data between the App and the client (browser)
const ClientSessionContext = createContext();

/**
 * Creates a Provider for storing and retrieving data from the client context
 * using the browser's Session Storage.
 * 
 * @param {*} props 
 * @returns 
 */
export const ClientSessionProvider = (props) => {
	const { key, initialValue } = props;
	const session_hook = useUpdatableObject(useSessionStorage, key || "session-data", initialValue || {});
	return (
		<ClientSessionContext.Provider value={session_hook}>
			{props.children}
		</ClientSessionContext.Provider>
	);
}

/**
 * Creates a Provider for storing and retrieving data from the client context
 * using the browser's Local Storage (persistent).
 * 
 * @param {*} props 
 * @returns 
 */
export const ClientLocalProvider = (props) => {
	const { key, initialValue } = props;
	const session_hook = useUpdatableObject(useLocalStorage, key || "session-data", initialValue || {});
	return (
		<ClientSessionContext.Provider value={session_hook}>
			{props.children}
		</ClientSessionContext.Provider>
	);
}

export default ClientSessionContext;
