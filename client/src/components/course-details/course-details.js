// import dependencies
import React, { useContext, useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import Data from "../../Data";
import { UserContext, AuthenticationContext } from "../../Context";
import { Button } from "../button/button";
import { Spinner } from "../spinner/spinner";
import { Remarkable } from "remarkable";
import "./course-details.css"

// create a variable CourseDetails, assign a function returning the element to it, and export it
export const CourseDetails = () => {
    // get course id from params
    const { id } = useParams();
    // get userdetails from usercontext
    const userDetails = useContext(UserContext);
    // get credentials from authenticationcontext
    const { credentials } = useContext(AuthenticationContext);
    // cal useHistory and assign it to the variable history
    const history = useHistory();
    // instantiate a new data object and assign it to the variable data
    const data = new Data();
    // instantiate new Remarkable instance and assign it to the variable md
    const md = new Remarkable();
    // create a tuple for course and setCourse and call useState without initial value
    const [course, setCourse] = useState();
    // call useEffect hook to get executed on mount
    useEffect(() => {
        const fetchCourse = async () => {
            // call the getCourse method on data with the id and assign the response to the variable res
            const res = await data.getCourse(id);
            // check if response status is 200
            if (res.status === 200) {
                // parse the response and assign it to the variable course
                const course = await res.json();
                // call setCourse with the course
                setCourse(course);
            } else if (res.status === 404) {
                // redirect to notfound page
                history.push("/notfound");
            } else {
                // redirect to error page
                history.push("/error");
            }
        }
        // call the fetchCourse function
        fetchCourse();
        // the following comment disables a linting rule specifying that all external dependencies need to be listed in order to trigger the method,
        // however, in this case we want to disregard changes of the dependencies and only execute the method when the component mounts and therefore provide an empty dependency array
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // function to delete the course
    const handleDelete = async () => {
        // use fetch to delete the course and assign the response to the variable res
        const res = await data.deleteCourse(id, credentials);
        // check if the response status is unlike 204 or 403, if so throw an exception
        if (res.status !== 204 && res.status !== 401) throw Error("An error occurred when trying to delete the course.");
        // is the response status is 401 redirect to /forbidden otherwise redirect to /
        res.status === 401 ? history.push("/forbidden") : history.push("/");
    }
    // return courses element
    return (
        <div>
            {course &&
                <div className="actions--bar">
                    <div className="bounds">
                        <div className="grid-100">
                            {userDetails.id === course.userId && 
                                <span>
                                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                                    <Button className="button" onClick={handleDelete}>Delete Course</Button>
                                </span>
                            }
                            <Link className="button button-secondary" to="/">Return to List</Link>
                        </div>
                    </div>
                </div>
            }
            {course
                ?
                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{course.title}</h3>
                                <p>By {course.User.firstName} {course.User.lastName}</p>
                            </div>
                            <div className="course--description" dangerouslySetInnerHTML={{ __html: md.render(course.description)}} >
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    <li className="course--stats--list--item">
                                        <h4>Estimated Time</h4>
                                        <h3>{course.estimatedTime ? course.estimatedTime : "No estimate available"}</h3>
                                    </li>
                                    <li className="course--stats--list--item">
                                        <h4>Materials Needed</h4>
                                        {course.materialsNeeded 
                                            ? <ul dangerouslySetInnerHTML={{ __html: md.render(course.materialsNeeded)}} />
                                            : <p>No materials needed</p>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                : <Spinner />
            }
        </div>
    );
}