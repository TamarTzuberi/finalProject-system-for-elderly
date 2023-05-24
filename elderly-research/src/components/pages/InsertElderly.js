import { Redirect } from 'react-router-dom';
import { useState } from "react";
import './LoginPage.css';
import axios from 'axios';


function InsertElderly(props) {
    const [isDemographicSubmitted, setIsDemographicSubmitted] = useState(false);
    const [isPersonalSubmitted, setIsPersonalSubmitted] = useState(false);        
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");


    const handleDropdownFocus=(state) =>
    {
        setOpen(!state)
    }

    const handleButtonClick = () => {
        setIsDemographicSubmitted(true);
    };

    if (isDemographicSubmitted) {
        return <Redirect to="/DemographicPage" />;
    }

    const handlePersonalButtonClick = () => {
        setIsPersonalSubmitted(true);

    }

    if (isPersonalSubmitted) {
        return <Redirect to="/ResearcherPage" />;
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setEmailErrorMessage('');

      };
    
      const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
      };
    
      const handleLastNameChange = (event) => {
        setLastName(event.target.value);
      };

      const validateEmail = (email) =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    
      const handleAddElderly = () => {
        if (!email || !firstName || !lastName) {
            setErrorMessage("Please fill in all the required fields.");
            return;
          }
          if (!validateEmail(email)) {
            setEmailErrorMessage('Invalid email format');
            return;
          }
        // Create an object with the elderly data
        const elderlyData = {
          email,
          firstName,
          lastName
        };

        console.log("ELDERLY DATA: ", elderlyData)
    
        axios.post("http://localhost:3000/elderly/newElderly", elderlyData)
          .then(response => {
            // Reset the input fields after successful insertion
            setEmail("");
            setFirstName("");
            setLastName("");

            if (response.data.success === false && response.data.message === 'Already exists'){
                alert("Elderly's email is already in the system");
            }
            else{
                alert("Elderly's information has been successfully entered into the system");
            }
          })
          .catch(error => {
            // Handle error
            console.log("Error inserting elderly:", error);
            setErrorMessage("Error inserting elderly. Please try again.");
          });
      };
    
    return (
        <div className='app'>
            <div className="rightContainerLogin">
                 <div className='app-drop-down-container-elderly'>
                     <button onClick={e=>handleDropdownFocus(open)}>Other options</button>
                     {open && (
                         <ul>
                             <li onClick={handleButtonClick}>Demographic information</li>
                             <li onClick={handlePersonalButtonClick}>Personal information</li>
                         </ul>
                     )}
                 </div>
            </div>
            <div className='login-form'>
                <label>Email:</label>
                <input type="text" value={email} onChange={handleEmailChange} />
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={handleFirstNameChange} />
                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={handleLastNameChange} />
            </div>
            {errorMessage && <div className="error">{errorMessage}</div>}
            {emailErrorMessage && <p className="error">{emailErrorMessage}</p>}
            <button className="btn" onClick={handleAddElderly}>Add Elderly to DB</button>
    </div>
    );
}



export default InsertElderly;