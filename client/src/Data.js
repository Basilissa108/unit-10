// create a class called Data and export it
export default class Data {
	// create a function and assign it to api
	api = (path, method, body = null, requiresAuth = false, credentials = null) => {
		// add the path to the baseurl and assign it to the variable url
        const url = "http://localhost:5000/api" + path;
		// create an object with options for the fetch method and assign it to the variable options
        const options = {
          method,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        };
		// check if body is not null and assign the stringified value to options.body
        if (body !== null) {
          options.body = JSON.stringify(body);
        }
        // Check if auth is required
		if (requiresAuth) {
			const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
			options.headers['Authorization'] = `Basic ${encodedCredentials}`;
		}
		// call fetch with the url and options and return it
        return fetch(url, options);
	};
	// create an async function that takes a credentials parameter and assign it to getUser
	getUser = async (credentials) => {
		// call the api method with the path "/users", the method "GET", null as body, true for authentication, and the credentials, and return it
        return this.api("/users", "GET", null, true, credentials);
	};
    // create an async function that takes a user object as parameter and assign it to createUser
	createUser = async (user) => {
		// call the api method with the path "/users", the method "POST", the user as body, and return it
        return this.api("/users", "POST", user);
	};
	// create an async function and assign it to getCourses
	getCourses = async () => {
		// call the api method with the path "/courses", the method "GET", and return it
		return this.api("/courses", "GET");
	}
	// create an async function that takes an id as parameter and assign it to getCourse
	getCourse = async (id) => {
		// call the api method with the path "/courses/id", the method "GET", and return it
		return this.api(`/courses/${id}`, "GET");
	}
	// create an async function that takes a course object and credentials as parameter and assign it to createCourse
	createCourse = async (course, credentials) => {
		// call the api method with the path "/courses", the method "POST", the course object, true for authentication, and credentials, and return it
		return this.api("/courses", "POST", course, true, credentials);
	}
	// create an async function that takes an id, a course object, and credentials as parameter and assign it to updateCourse
	updateCourse = async (id, course, credentials) => {
		// call the api method with the path "/courses/id", the method "PUT", the course object, true for authentication, and credentials, and return it
		return this.api(`/courses/${id}`, "PUT", course, true, credentials);
	}
	// create an async function that takes an id and credentials as parameter and assign it to deleteCourse
	deleteCourse = async (id, credentials) => {
		// call the api method with the path "/courses/id", the method "DELETE", null as body, true for authentication and credentials, and return it
		return this.api(`/courses/${id}`, "DELETE", null, true, credentials);
	}
}