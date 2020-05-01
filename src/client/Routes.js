import React from 'react';
import NewsList, { loadData } from './components/NewsList.js';

export default [
    {   
        loadData,
        path: "/",
        component: NewsList,
        exact: true
    }
]