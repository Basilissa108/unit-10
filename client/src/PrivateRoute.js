// import dependencies
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthenticationContext } from "./Context";

// create a variable PrivateRoute, assign a function returning the element to it, and export it
export const PrivateRoute = ({ component: Component, ...rest }) => {
	// get the credentials from the AuthenticationContext
	const { credentials } = useContext(AuthenticationContext);
	// return a Route which either renders the component or redirects to /signin depending on wheter an id is present
	return (
		<Route {...rest} render={props => (credentials ? <Component {...props}/> : <Redirect to="/signin" /> )}/> 
	)
}