// import dependencies
import React from "react";
import PropTypes from "prop-types";
import "./input.css";

// create a variable input, assign a function returning the element to it, and export it
export const Input = (props) => {
    // destructure the props object
    const { id, name, type, placeholder, value, onChange, className } = props;
    // define a function to handle change events of the input field
    const handleChange = (e) => {
        // call the onChange function with the updated value
        onChange(e.target.value);
    }
    // return the input element
    return (
        <div>
            <input
                id={id}
                name={name}
                type={type || "text"}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className={className}
            />
        </div>
    );
}

// define proptypes for the input component
Input.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    type: PropTypes.string,
    className: PropTypes.string
}