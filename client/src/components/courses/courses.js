// import dependencies
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Data from "../../Data";
import "./courses.css";

// create a variable Courses, assign a function returning the element to it, and export it
export const Courses = () => {
    // instantiate new Data instance and assign it to the variable data
    const data = new Data();
    // create a tuple for courses and setCourses and call useState without initial value
    const [courses, setCourses] = useState();
    // useEffect hook to fetch courses data on the first render
    useEffect(() => {
        // assign an async function to the variable fetchCourses
        const fetchCourses = async () => {
            // use fetch to get data from the api and assign the response to the variable res
            const res = await data.getCourses();
            // parse the response and assign it to the variable body
            const body = await res.json();
            // check if the response status is unlike 200, if so throw an exception
            if (res.status !== 200) throw Error(body.message);
            // call setCourses to update the courses in state
            setCourses(body);
        }
        // call the fetchCourses function
        fetchCourses();
        // the following comment disables a linting rule specifying that all external dependencies need to be listed in order to trigger the method,
        // however, in this case we want to disregard changes of the dependencies and only execute the method when the component mounts and therefore provide an empty dependency array
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // return courses element
    return (
        <div className="bounds">
            {courses && courses.map((course, idx) => {
                return(
                    <div className="grid-33" key={idx}>
                        <Link className="course--module course--link" to={`/courses/${course.id}`}>
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </Link>
                    </div>
                );
            })}
            <div className="grid-33">
                <Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </h3>
                </Link>
            </div>
        </div>
    );
}