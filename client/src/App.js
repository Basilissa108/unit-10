// import dependencies
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { UserContextProvider, AuthenticationContextProvider } from "./Context.js";
import { PrivateRoute } from "./PrivateRoute";
import { Header } from "./components/header/header.js";
import { UserSignUp } from "./components/user-sign-up/user-sign-up.js";
import { UserSignIn } from "./components/user-sign-in/user-sign-in.js";
import { UserSignOut } from "./components/user-sign-out/user-sign-out.js";
import { Courses } from "./components/courses/courses.js";
import { CourseDetails } from "./components/course-details/course-details.js";
import { CreateCourse } from "./components/create-course/create-course.js";
import { UpdateCourse } from "./components/update-course/update-course.js";
import { NotFound } from "./components/not-found/not-found.js";
import { UnhandledError } from "./components/unhandled-error/unhandled-error.js";
import { Forbidden } from "./components/forbidden/forbidden.js";

// create a function called App that returns the application
function App() {
  // return a Router that's wrapped in a UserContextProvider and an AuthenticationContextProvider
  return (
    <AuthenticationContextProvider>
      <UserContextProvider>
        <Router>
          <Header />
          <hr />
          <Switch>
            <PrivateRoute exact path="/courses/create" component={CreateCourse} />
            <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
            <Route exact path="/courses/:id" component={CourseDetails} />
            <Route exact path="/signup" component={UserSignUp} />
            <Route exact path="/signin" component={UserSignIn} />
            <Route path="/signout" component={UserSignOut} />
            <Route exact path="/error" component={UnhandledError} />
            <Route exact path="/forbidden" component={Forbidden} />
            <Route exact path="/" component={Courses} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        </UserContextProvider>
      </AuthenticationContextProvider>
  );
}

export default App;
