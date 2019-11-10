// import dependencies
import React from "react";
import PropTypes from "prop-types";
import "./button.css";

// create a variable Button, assign a function returning the element to it, and export it
export const Button = (props) => {
    // destructure the props object
    const { children, onClick, isSubmit, isSecondary } = props;
    // return the button element
    return (
        <button
            className={`button ${isSecondary ? "button-secondary" : ""}`}
            onClick={onClick}
            type={isSubmit ? "submit" : "button"}
        >
            {children}
        </button>
    );
}

// define proptypes for the button component
Button.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    isSubmit: PropTypes.bool,
    isSecondary: PropTypes.bool
}