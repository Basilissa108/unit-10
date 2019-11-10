// import dependencies
import React, { useContext, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthenticationContext, UserContext } from "../../Context";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { Spinner } from "../spinner/spinner";
import "./user-sign-in.css";

// create a variable signin, assign a function returning the element to it, and export it
export const UserSignIn = () => {
    // call useHistory and assign it to the variable history
    const history = useHistory();
    // get authenticate method from AuthenticationContext
    const { authenticate } = useContext(AuthenticationContext);
    // get setUserDetails method from UserContext
    const { setUserDetails } = useContext(UserContext);
    // create a tuple for isLoading and setIsLoading and call useState with false as initial value
    const [isLoading, setIsLoading] = useState(false);
    // create a tuple for emailAddress and setEmailAddress and call useState with an empty string as initial value
    const [emailAddress, setEmailAddress] = useState("");
    // create a tuple for password and setPassword and call useState with an empty string as initial value
    const [password, setPassword] = useState("");
    // create a tuple for error and setError and call useState without an initial value
    const [error, setError] = useState();
    // create a variable handleSubmit and assign a function to it
    const handleSubmit = async (e) => {
        // reset error
        setError();
        // call preventDefault on the event
        e.preventDefault();
        // check if emailAddress and password are provided
        if (emailAddress && password) {
            // set isLoading to true in order to show a loading state
            setIsLoading(true);
            // call authenticate function with emailAddress and password
            const { response, user } = await authenticate(emailAddress, password);
            // set isLoading to false
            setIsLoading(false);
            // check if the response status was 200
            if (response.status === 200) {
                // if we get here the authenticate function returned a user, call the setUserDetails function with it to save it to global state
                setUserDetails(user);
                // redirect to the previous page
                history.goBack();
            // check if the reponse status was 401
            } else if (response.status === 401) {
                // in case the response cannot be parsed to json wrapping this part in a try catch block will catch the exception
                try {
                    // try to parse the response and assign it to the variable body
                    const body = await response.json();
                    // call setError the message on the body object
                    setError(body.message);
                } catch (e) {
                    // if we get here the login has failed and we were unable to parse the reponse, hence manually set an error
                    setError("The login failed, please make sure to enter your correct credentials.")
                }
            }
        } else {
            // manually set a validation error
            setError("Please fill in your email address and password.")
        }
    }
    // return the signin element
    return (
        isLoading
            ? <Spinner />
            : <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <form>
                            {error &&
                                 <div>
                                    <h2 className="validation--errors--label">Validation errors</h2>
                                    <div className="validation-errors">
                                        {error}
                                    </div>
                                </div>
                            }
                            <div>
                                <Input
                                    id="emailAddress"
                                    name="emailAddress"
                                    placeholder="Email Address"
                                    value={emailAddress}
                                    onChange={setEmailAddress}
                                />
                            </div>
                            <div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={setPassword}
                                />
                            </div>
                            <div className="grid-100 pad-bottom">
                                <Button onClick={handleSubmit} isSubmit>Sign In</Button>
                                <Button onClick={() => history.push("/")} isSecondary>Cancel</Button>
                            </div>
                        </form>
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="/signup">Click here</Link> to sign up!</p>
                </div>
            </div>
    );
}