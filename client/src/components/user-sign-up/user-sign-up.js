// import dependencies
import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import Data from "../../Data";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { Spinner } from "../spinner/spinner";
import "./user-sign-up.css";

// create a variable signup, assign a function returning the element to it, and export it
export const UserSignUp = () => {
    const data = new Data();
    // call useHistory and assign it to the variable history
    const history = useHistory();
    // create a tuple for firstName and setFirstName and call useState with an empty string as initial value
    const [firstName, setFirstName] = useState("");
    // create a tuple for lastName and setLastName and call useState with an empty string as initial value
    const [lastName, setLastName] = useState("");
    // create a tuple for emailAddress and setEmailAddress and call useState with an empty string as initial value
    const [emailAddress, setEmailAddress] = useState("");
    // create a tuple for password and setPassword and call useState with an empty string as initial value
    const [password, setPassword] = useState("");
    // create a tuple for confirmPassword and setConfirmPassword and call useState with an empty string as initial value
    const [confirmPassword, setConfirmPassword] = useState("");
    // create a tuple for isLoading and setIsLoading and call useState with false as initial value
    const [isLoading, setIsLoading] = useState(false);
    // create a tuple for error and setError and call useState without initial value
    const [error, setError] = useState();
    // create a variable handleSubmit and assign a function to it
    const handleSubmit = async (e) => {
        // call preventDefault on the event
        e.preventDefault();
        // set isLoading to true in order to show a loading state
        setIsLoading(true);
        // create an object from the values in state and assign it to the variable user
        const user = {
            firstName: firstName,
            lastName: lastName,
            emailAddress: emailAddress,
            password: password,
            confirmPassword: confirmPassword
        };
        // call the createUser function with the user object and assign the response to the variable res
        const res = await data.createUser(user)
        // set isLoading to false
        setIsLoading(false);
        // redirect either to index or the error page based on the response's status
        if (res.status === 201) {
            history.push("/");
        } else if (res.status === 500) {
            history.push("/error");
        } else {
            // parse the response and assign it to the variable body
            const body = await res.json();
            // call setError the message on the body object
            setError(body.message);
        }
    }
    // return the signup element
    return (
        isLoading
            ? <Spinner />
            : <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                    <div>
                        {isLoading
                            ? <Spinner />
                            : <form>
                                {error &&
                                    <div>
                                        <h2 className="validation--errors--label">Validation errors</h2>
                                        <div className="validation-errors">
                                            {error}
                                        </div>
                                    </div>
                                }
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="First Name"
                                    value={firstName}
                                    onChange={setFirstName}
                                />
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last Name"
                                    value={lastName}
                                    onChange={setLastName}
                                />
                                <Input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="text"
                                    placeholder="Email Address"
                                    value={emailAddress}
                                    onChange={setEmailAddress}
                                />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={setPassword}
                                />    
                                <Input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={setConfirmPassword}
                                />
                                <div className="grid-100 pad-bottom">
                                    <Button onClick={handleSubmit}>Sign Up</Button>
                                    <Button onClick={() => history.push("/")} isSecondary>Cancel</Button>
                                </div>
                            </form>
                        }
                    </div>
                    <p>&nbsp;</p>
                    <p>Already have a user account?<Link to="/signin">Click here</Link> to sign in!</p>
                </div>
            </div>
    );
}