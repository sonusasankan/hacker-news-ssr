import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home.js';
import NewsList from './components/NewsList.js';

export default () => {
    return(
        <div>
            <Route exact path="/" component={Home}/>
            <Route exact path="/news" component={NewsList}/>
        </div>
    )
}