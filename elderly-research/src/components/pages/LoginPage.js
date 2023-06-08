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
    // const database = [
    // {
    //   username: "admin@gmail.com",
    //   password: "admin"
    // },
    // {
    //   username: "master@gmail.com",
    //   password: "master"
    // }
    // ];

  // const errors = {
  //   uname: "invalid email",
  //   pass: "invalid password"
  // };

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];
    var isLoggedInUser = false;
    var isLoggedInMassage = "";
    console.log(uname.value);

    // Find user login info
    await axios.post(`http://localhost:3000/users/login/`, {
        username: uname.value,
        password: pass.value
      })
        .then(isLoggedIn => {
            console.log("isLoggedIn -",isLoggedIn.data);
            isLoggedInUser = isLoggedIn.data.success;
            isLoggedInMassage = isLoggedIn.data.message;
            console.log("isLoggedInUser: ",isLoggedInUser);
            console.log("isLoggedInMassage: ", isLoggedInMassage);
            })
        .catch(error => {
            console.log(error);
        });

    // Compare user info
    if (!isLoggedInUser) {
      // Invalid email or password
      setErrorMessages({name: "email",message: isLoggedInMassage});
      setErrorMessages({name: "pass",message: isLoggedInMassage});
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
          <label>Username </label>
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