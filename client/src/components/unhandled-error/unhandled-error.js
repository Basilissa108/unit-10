// import dependencies
import React from "react";

// create a variable unhandlederror, assign a function returning the element to it, and export it
export const UnhandledError = () => {
    // return the error element
    return (
        <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
        </div>
    );
}