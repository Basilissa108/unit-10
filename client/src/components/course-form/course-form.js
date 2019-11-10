// import dependencies
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { UserContext } from "../../Context";
import { Input } from "../input/input";
import { Textarea } from "../textarea/textarea";
import { Button } from "../button/button";
import "./course-form.css";

// create a variable courseform, assign a function returning the element to it, and export it
export const CourseForm = (props) => {
    // call useHistory and assign it to the variable history
    const history = useHistory();
    // get firstname and lastname from the UserContext
    const { firstName, lastName } = useContext(UserContext);
    // destructure the props object
    const { onSubmit, course, error } = props;
    // determine whether to use Update or Create based on whether a course was provided or not
    const method = course ? "Update" : "Create";
    // create a tuple for title and setTitle and call useState with the course's title or an empty string as initial value
    const [title, setTitle] = useState(course ? course.title : "");
    // create a tuple for description and setDescription and call useState with the course's description or an empty string as initial value
    const [description, setDescription] = useState(course ? course.description : "");
    // create a tuple for estimatedTime and setEstimatedTime and call useState with the course's estimatedTime or an empty string as initial value
    const [estimatedTime, setEstimatedTime] = useState(course ? course.estimatedTime : "");
    // create a tuple for materialsNeeded and setMaterialsNeeded and call useState with the course's materialsNeeded or an empty string as initial value
    const [materialsNeeded, setMaterialsNeeded] = useState(course ? course.materialsNeeded : "");
    // create a variable handleSubmit and assign a function to it
    const handleSubmit = async (e) => {
        // call preventDefault on the event
        e.preventDefault();
        const course = {
            title: title,
            description: description,
            estimatedTime: estimatedTime,
            materialsNeeded: materialsNeeded
        };
        // call onSubmit function with the course details
        onSubmit(course);
    }
    // return the course form element
    return (
        <div className="bounds course--detail">
            <h1>{method} Course</h1>
                    <div>
                        {error &&
                            <div>
                                <h2 className="validation--errors--label">Validation errors</h2>
                                <div className="validation-errors">
                                    {error}
                                </div>
                            </div>
                        }
                        <form>
                            <div className="grid-66">
                                <div className="course--header">
                                    <h4 className="course--label">Course</h4>
                                    <div>
                                        <Input
                                            id="title"
                                            name="title"
                                            classNameName="input-title course--title--input"
                                            placeholder="Course title..."
                                            value={title}
                                            onChange={setTitle}
                                        />
                                    </div>
                                    <p>By {firstName} {lastName}</p>
                                </div>
                                <div className="course--description">
                                    <div>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Course description..."
                                            value={description}
                                            onChange={setDescription}
                                        />
                                    </div>
                                </div>
                                </div>
                            <div className="grid-25 grid-right">
                                <div className="course--stats">
                                    <ul className="course--stats--list">
                                        <li className="course--stats--list--item">
                                            <h4>Estimated Time</h4>
                                            <div>
                                                <Input
                                                    id="estimatedTime"
                                                    name="estimatedTime"
                                                    classNameName="course--time--input"
                                                    placeholder="Hours"
                                                    value={estimatedTime}
                                                    onChange={setEstimatedTime}    
                                                />
                                            </div>
                                        </li>
                                        <li className="course--stats--list--item">
                                            <h4>Materials Needed</h4>
                                            <div>
                                                <Textarea
                                                    id="materialsNeeded"
                                                    name="materialsNeeded"
                                                    placeholder="List materials..."
                                                    value={materialsNeeded}
                                                    onChange={setMaterialsNeeded}
                                                /> 
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="grid-100 pad-bottom">
                                <Button onClick={handleSubmit} isSubmit>{course ? "Update" : "Create"}</Button>
                                <Button onClick={() => history.goBack()} isSecondary>Cancel</Button>
                            </div>
                        </form>
                    </div>
        </div>
    );
}

// define proptypes for the course form component
CourseForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    course: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        description:  PropTypes.string.isRequired,
        estimatedTime: PropTypes.string,
        materialsNeeded: PropTypes.string
    }),
    error: PropTypes.string
}