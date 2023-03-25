import React, { FunctionComponent } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import App from './App'
import { Header } from './components/Header';
import ResearcherPage from './components/pages/ResearcherPage';
import LoginPage from './components/pages/LoginPage';
import './css/styles.css';

export const AppRouter: FunctionComponent = () => {
    return (

        <BrowserRouter>
            <div>
                <Header />
                <main>
                    <Route exact={true} path="/" component={App} />
                    <Route path="/ResearcherPage" component={ResearcherPage} />
                    <Route path="/LoginPage" component={LoginPage} />
                    <Redirect from='*' to='/' />
                </main>
            </div>
        </BrowserRouter>

    );
}