// import dependencies
import React, { useCallback, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import Data from "./Data";

// create a new context and assign it to the variable UserContext, and export it
export const UserContext = React.createContext();
// create a higher order component that takes children as prop, assign it to the variable UserContextProvider, and export it
export const UserContextProvider = ({ children }) => {
	const data = new Data();
	// get credentials from AuthenticationContext
	const { credentials } = useContext(AuthenticationContext);
  	// assign a function to the variable setUserDetails to update the user details in the context
	const setUserDetails = useCallback(({
		id,
		firstName,
		lastName
	}) => {
		// call the updateUserDetails function with the previousState and return an object that combines the previous and new values
		updateUserDetails(prevState => {
			return {
				...prevState,
				id,
				firstName,
				lastName
			};
		})
	}, []);
	// create an object with initials values and assign it to the variable userState
	const userState = {
		id: undefined,
		firstName: undefined,
		lastName: undefined,
		setUserDetails: setUserDetails
	}
	// create a tuple for userDetails and updateUserDetails and call useState with the userState object as initial value
	const [userDetails, updateUserDetails] = useState(userState);
	// call useEffect with an empty dependency array to execute on render
	useEffect(() => {
		// create an async function to try and get a user and assign it to the variable tryGetUser
		const tryGetUser = async () => {
			// call data.getUser methode with the credentials from the authenticationcontext and assign the response to the variable res
			const res = await data.getUser(credentials);
			// check if response status is 200
			if (res.status === 200) {
				// parse the response and assign it to the variable user
				const user = await res.json();
				// call the setUserDetails function with the user
				setUserDetails(user);
			}
		};
		// if credentials exist in the authenticationcontext call the tryGetUser function
		if (credentials) tryGetUser();
	}, []);
	// return the children provided by props wrapped in a UserContext.Provider and set its value to userDetails in state
	return (
		<UserContext.Provider value={userDetails}>
			{children}
		</UserContext.Provider>
	);
};

// create a new context and assign it to the variable AuthenticationContext, and export it
export const AuthenticationContext = React.createContext();
// create a higher order component that takes children as prop, assign it to the variable AuthenticationContextProvider, and export it
export const AuthenticationContextProvider = ({ children }) => {
	// instantiate a new data object and assign it to the variable data
	const data = new Data();
	// create a function to authenticate a user, it takes an email and a password parameter
	const authenticate = useCallback(async (email, password) => {
		// post course to API
		const res = await data.getUser({ username: email, password: password });
		// check if response status is 200
		if (res.status === 200) {
			// parse the response and assign it to the variable user
			const user = await res.json();
			// call setAuthentication to update the credentials value in state
			setAuthentication(prevState => {
				return {
					...prevState,
					credentials: { username: email, password: password }
				};
			});
			// encrypt the email and assign it to the variable encryptedEmail
			const encryptedEmail = window.btoa(email);
			// encrypt the password and assign it to the variable encryptedPassword
			const encryptedPassword = window.btoa(password);
			// save encrypted credentials to a cookie which expires after 1 hour
			Cookies.set("courses", JSON.stringify({ x: encryptedEmail, y: encryptedPassword }), { expires: 1/24 });
			// return an object of the response status and the user to indicate success
			return { response: res, user: user };
		} else {
			// return an object of the response status and undefined to indicate failure
			return { response: res, user: undefined };
		}
	});
	// create a function to unauthenticate a user
	const unauthenticate = useCallback(() => {
		// call setAuthentication and set authenticated to false and credentials to undefined
		setAuthentication(prevState => {
			return {
				...prevState,
				credentials: undefined
			};
		});
		// remove the cookie
		Cookies.remove("courses");
		// return true to indicate success
		return true;
	});
	// function to try to get credentials from a cookie
	const getCredentialsFromCookie = () => {
		// try to get encrypted credentials from cookie
		const encryptedCredentials = Cookies.getJSON("courses");
		// check if the cookie exists
		if (encryptedCredentials) {
			// decrypt the email value from the cookie and assign it to the variable email
			const email = window.atob(encryptedCredentials.x);
			// decrypt the password value from the cookie and assign it to the variable password
			const password = window.atob(encryptedCredentials.y);
			// return an object with the email and password
			return { username: email, password: password };
		}
		// if we get here there is no user authenticated, hence return null
		return null;
	}
	// create an object with initials values and assign it to the variable userState
	const authenticationState = {
		credentials: getCredentialsFromCookie(),
		authenticate: authenticate,
		unauthenticate: unauthenticate
	}
	// create a tuple for authentication and setAuthentication and call useState with the authenticationState object as initial value
	const [authentication, setAuthentication] = useState(authenticationState);
	// return the children provided by props wrapped in a AuthenticationContext.Provider and set its value to authentication in state
	return (
		<AuthenticationContext.Provider value={authentication}>
			{children}
		</AuthenticationContext.Provider>
	);
}