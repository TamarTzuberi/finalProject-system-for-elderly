import * as React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import logo from './logo.png';


export default class App extends React.Component<{}> {
  public render() {
    return (
      <div className="container-fluid">
        <div className="centreText">
          {/* React components must have a wrapper node/element */}
          <h1>Elderly</h1>
          <Link to="/LoginPage">
            <button className="btn">
              Start Research
            </button>
          </Link>
          <br></br>
          <br></br>
          <br></br>
          <br></br>          
          <br></br>
          <br></br>
        <div>
          <img src={logo} alt="Logo" />
        </div>
        </div>
    </div>

    );
  }
}