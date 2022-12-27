import React, { FunctionComponent } from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import App from './App'
import FirstComponent from './components/FirstComponent';
import { Header } from './components/Header';
import Search from './components/SearchComponent';
import SecondComponent from './components/SecondComponent';
import './css/styles.css';

export const AppRouter: FunctionComponent = () => {
    return (

        <BrowserRouter>
            <div>
                <Header />
                <main>
                    <Route exact={true} path="/" component={App} />
                    <Route path="/FirstComponent" component={FirstComponent} />
                    <Route path="/SecondComponent" component={SecondComponent} />
                    <Route path="/SearchComponent" component={Search} />

                    <Redirect from='*' to='/' />
                </main>
            </div>
        </BrowserRouter>

    );
}