import React from 'react';
import Home from './components/Home.js';
import NewsList, { loadData } from './components/NewsList.js';

export default [
    {
        path: "/",
        component: Home,
        exact: true
    },
    {
        loadData,
        path: "/news",
        component: NewsList
    }
]