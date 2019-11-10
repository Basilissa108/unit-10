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
    // create a tuple for isLoading and setIsLoading and call useState with false as initial value
    const [isLoading, setIsLoading] = useState(false);
    // create a tuple for course and setCourse and call useState without initial value
    const [course, setCourse] = useState();
    // create a tuple for error and setError and call useState without initial value
    const [error, setError] = useState();
    // call the useEffect hook with an empty dependency array to execute on render
    useEffect(() => {
        // assign an async function to the variable fetchCourse
        const fetchCourse = async () => {
            // set isLoading to true
            setIsLoading(true);
            // use getCourse method to get data from the api and assign the response to the variable res
            const res = await data.getCourse(id);
            // check if the response status is unlike 200 or 404, if so redirect to /error
            if (res.status !== 200 && res.status !== 404) history.push("/error");
            // check if the response status is 404, if so redirect to /notfound
            if (res.status === 404) history.push("/notfound");
            // parse the response and assign it to the variable course
            const course = await res.json();
            // check if the authenticated user has the same id as the userId of the course, if not redirect to /forbidden
            if (course.userId !== userDetails.id) history.push("/forbidden");
            // call setCourse to update the courses in state
            setCourse(course);
            // set isLoading to false
            setIsLoading(false);
        }
        // call the fetchCourse function
        fetchCourse();
    }, []);
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
        isLoading
            ? <Spinner />
            : <CourseForm course={course} onSubmit={onSubmit} error={error} />
    );
}