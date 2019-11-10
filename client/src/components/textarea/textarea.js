// import dependencies
import React from "react";
import PropTypes from "prop-types";
import "./textarea.css";

// create a variable input, assign a function returning the element to it, and export it
export const Textarea = (props) => {
    // destructure the props object
    const { id, name, placeholder, value, onChange, className } = props;
    // define a function to handle change events of the input field
    const handleChange = (e) => {
        // call the onChange function with the updated value
        onChange(e.target.value);
    }
    // return the input element
    return (
        <textarea
            id={id}
            name={name}
            className={className}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
        />
    );
}

// define proptypes for the input component
Textarea.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string
}