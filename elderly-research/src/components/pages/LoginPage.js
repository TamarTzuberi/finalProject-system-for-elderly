import { Link, Redirect } from 'react-router-dom';
import React, { useState } from "react";
import ReactDOM from "react-dom";
import './LoginPage.css';
import axios, { all } from 'axios';


function LoginPage(props) {
      // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    // User Login info
    const database = [
    {
      username: "admin@gmail.com",
      password: "admin"
    },
    {
      username: "master@gmail.com",
      password: "master"
    }
    ];

  const errors = {
    uname: "invalid email",
    pass: "invalid password"
  };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    var isLoggedInUser = false;
    console.log(uname.value);

    // Find user login info
    await axios.post(`http://localhost:3000/users/login/`, {
        username: uname.value,
        password: pass.value
      })
        .then(isLoggedIn => {
            console.log("isLoggedIn -",isLoggedIn);
            isLoggedInUser = isLoggedIn.data;
            console.log(isLoggedInUser);
            })
        .catch(error => {
            console.log(error);
        });

    // Compare user info
    if (!isLoggedInUser) {
      // Invalid password
      setErrorMessages({ name: "pass", message: errors.pass });
    } else {
      setIsSubmitted(true);
};
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

    return (
        // <div>
        //     <Link to="/ResearcherPage">
        //         <button>Stav</button>
        //     </Link>
        // </div>
        <div className="app">
        <div className="login-form">
          <div className="title">Sign In</div>
          {isSubmitted ? <Redirect to="/ResearcherPage"/> : renderForm}

        </div>
      </div>
    );
}



export default LoginPage;