// import dependencies
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthenticationContext, UserContext } from "../../Context";
import { Spinner } from "../spinner/spinner";

// create a variable UserSignOut, assign a function returning the element to it, and export it
export const UserSignOut = () => {
    // call useHistory and assign it to the variable history
    const history = useHistory();
    // get unauthenticate from the AuthenticationContext
    const { unauthenticate } = useContext(AuthenticationContext);
    // get setUserDetails from usercontext
    const { setUserDetails } = useContext(UserContext);
    // call the unauthenticate function and assign the result to the variable unauthenticated
    const unauthenticated = unauthenticate();
    // check if unauthenticated is true
    if (unauthenticated) {
        // call setUserDetails function with undefined for all values to reset the user in global state
        setUserDetails({ id: undefined, firstName: undefined, lastName: undefined });
        // redirect to index
        history.push("/");
    } else {
        // redirect to /error as unauthentication apparently was unsuccessful
        history.push("/error");
    }
    // return a spinner
    return <Spinner />;
}