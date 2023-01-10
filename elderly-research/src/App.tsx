import * as React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default class App extends React.Component<{}> {
  public render() {
    return (
      <div className="container-fluid">
      <div className="centreText">
        {/* React components must have a wrapper node/element */}
        <h1>Elderly</h1>
        <Link to="/ResearcherPage">
          <button>Start Research</button>
        </Link>
        
      </div>
    </div>

    );
  }
}