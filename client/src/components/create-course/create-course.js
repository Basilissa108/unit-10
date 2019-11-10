// import dependencies
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Data from "../../Data";
import { AuthenticationContext } from "../../Context";
import { CourseForm } from "../course-form/course-form";

// create a variable createcourse, assign a function returning the element to it, and export it
export const CreateCourse = () => {
    // call useHistory and assign it to the variable history
    const history = useHistory();
    // instantiate new data object and assign it to the variable data
    const data = new Data();
    // get credentials from the AuthenticationContext
    const { credentials } = useContext(AuthenticationContext);
    // create a tuple for error and setError and call useState without initial value
    const [error, setError] = useState();
    // create an async function that takes a course as parameter and assign it to the variable onSubmit
    const onSubmit = async (course) => {
        const res = await data.createCourse(course, credentials);
        // check if the response status is 201
        if (res.status === 201) {
            // redirect to index
            history.push("/"); 
        } else if (res.status === 400) {
            // parse the response and assign it to the variable body
            const body = await res.json();
            // call setError the message on the body object
            setError(body.message);
        } else {
            // redirect to error page
            history.push("/error");
        }
    }
    // return a courseform component
    return (
        <CourseForm onSubmit={onSubmit} error={error} />
    );
}