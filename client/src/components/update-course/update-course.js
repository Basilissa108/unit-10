// import dependencies
import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { AuthenticationContext, UserContext } from "../../Context";
import Data from "../../Data";
import { CourseForm } from "../course-form/course-form";
import { Spinner } from "../spinner/spinner";

// create a variable UpdateCourse, assign a function returning the element to it, and export it
export const UpdateCourse = () => {
    // instantiate new data object and assign it to the variable data
    const data = new Data();
    // get id from params
    const { id } = useParams();
    // get userdetails from usercontext
    const userDetails = useContext(UserContext);
    // call useHistory and assign it to the variable history
    const history = useHistory();
    // get credentials from the AuthenticationContext
    const { credentials } = useContext(AuthenticationContext);
    // create a tuple for course and setCourse and call useState without initial value
    const [course, setCourse] = useState();
    // create a tuple for error and setError and call useState without initial value
    const [error, setError] = useState();
    // call the useEffect hook with userDetails.id as dependency
    useEffect(() => {
        // check if userDetails.id exists and if the counter is below 1, the counter is used to only call the function once
        if (userDetails.id) {
            // call the fetchCourse function
            fetchCourse();
        }
        // the following comment disables a linting rule specifying that all external dependencies need to be listed in order to trigger the method,
        // however, in this case we want to disregard changes of the dependencies other than userDetails.id
        // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [userDetails.id])
    // assign an async function to the variable fetchCourse
    const fetchCourse = async () => {
        // use getCourse method to get data from the api and assign the response to the variable res
        const res = await data.getCourse(id);
        // check if the status is 404
        if (res.status === 404) {
            // redirect to /notfound
            history.push("/notfound");
            // return so the rest of the code doesn't get executed
            return;
        }
        // check if the response status is 200
        if (res.status === 200) {
            // parse the response and assign it to the variable course
            const course = await res.json();
            // check if the authenticated user has the same id as the userId of the course, if not redirect to /forbidden
            if (course.userId !== userDetails.id) {
                // redirect to /forbidden
                history.push("/forbidden");
                // return so the rest of the code doesn't get executed
                return;
            }
            // call setCourse to update the courses in state
            setCourse(course);
        } else {
            // redirect to /error
            history.push("/error");
        }
    }
    // create an async function that takes a course as parameter and assign it to the variable onSubmit
    const onSubmit = async (course) => {
        const res = await data.updateCourse(id, course, credentials);
        // check if the response status is 204
        if (res.status === 204) {
            // redirect to the previous page (Coursedetails)
            history.goBack(); 
        } else if (res.status === 400) {
            // parse the response and assign it to the variable body
            const body = await res.json();
            // call setError the message on the body object
            setError(body.message);
        } else {
            history.push("/error");
        }
    }
    // return update course element
    return (
        course
            ? <CourseForm course={course} onSubmit={onSubmit} error={error} />
            : <Spinner />
    );
}