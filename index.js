import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Router, Route, Switch,Redirect } from 'react-router'

// main app
import Layout from './containers/Layout';
import ErrorComponent from './containers/sorryPages/404_page';



ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route path='/entry/' component={ Layout } />
            <Route path='/entry/:id' component={ Layout } />
            <Route path='/error/' component={ ErrorComponent } />
        </Switch>
    </BrowserRouter>
), document.getElementById('app'));

