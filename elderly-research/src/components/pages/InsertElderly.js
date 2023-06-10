import { Redirect } from 'react-router-dom';
import { useState } from "react";
import './LoginPage.css';
import axios from 'axios';


function InsertElderly(props) {
    const [isDemographicSubmitted, setIsDemographicSubmitted] = useState(false);
    const [isPersonalSubmitted, setIsPersonalSubmitted] = useState(false);        
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
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

      const validateEmail = (email) =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
    
      const handleAddElderly = () => {
        if (!email) {
            setErrorMessage("Please fill the required field.");
            return;
        }
        if (!validateEmail(email)) {
          setErrorMessage("");
          setEmailErrorMessage('Invalid email format!');
          return;
        }
        setErrorMessage("");
        setEmailErrorMessage("");
        // Create an object with the elderly data
        const elderlyData = {
          email
        };

        console.log("ELDERLY DATA: ", elderlyData)
    
        axios.post("http://localhost:3000/elderly/newElderly", elderlyData)
          .then(response => {
            // Reset the input fields after successful insertion
            setEmail("");

            if (response.data.success === false && response.data.message === 'Already exists'){
                alert("Elderly's email is already in the system!");
            }
            else{
                alert("Elderly's information has been successfully inserted into the system!");
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
        <h1 style={{ fontSize: "25px", marginTop:-40, marginBottom: 15 }}>Insert Elderly Page</h1>
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
            <div className='login-form' style={{marginTop: -150}}>
                <label>Email:</label>
                <input type="text" value={email} onChange={handleEmailChange} />
           </div>
            {errorMessage && <div className="error">{errorMessage}</div>}
            {emailErrorMessage && <p className="error">{emailErrorMessage}</p>}
            <button className="btn" onClick={handleAddElderly}>Add Elderly to DB</button>
    </div>
    );
}



export default InsertElderly;