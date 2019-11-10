// import dependencies
import React from "react";

// create a variable forbidden, assign a function returning the element to it, and export it
export const Forbidden = () => {
    // return the forbidden element
    return (
        <div className="bounds">
            <h1>Forbidden</h1>
            <p>Oh oh! You can't access this page.</p>
        </div>
    );
}