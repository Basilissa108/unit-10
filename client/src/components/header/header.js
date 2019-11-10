// import dependencies
import React, { useContext } from "react";
import { UserContext } from "../../Context";
import { Link } from "react-router-dom";
import "./header.css";

// create a variable header, assign a function returning the element to it, and export it
export const Header = () => {
    // get firstName and lastName from the usercontext
    const { firstName, lastName } = useContext(UserContext);
    // return the header element
    return (
        <div className="header">
            <div className="bounds">
                <Link to="/"><h1 className="header--logo">Courses</h1></Link>
                <nav>
                    {firstName && lastName
                        ? (
                            <>
                                <span>{`Welcome ${firstName} ${lastName}!`}</span>
                                <Link className="signout" to="/signout">Sign Out</Link>
                            </>
                        )
                        : (
                            <>
                                <Link className="signup" to="../signup">Sign Up</Link>
                                <Link className="signin" to="../signin">Sign In</Link>
                            </>
                        )

                    }
                </nav>
            </div>
        </div>
    );
}