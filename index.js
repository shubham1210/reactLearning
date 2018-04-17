import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Router, Route, Switch,Redirect } from 'react-router'

// main app
import App from './containers/App';
import Error from './containers/error';
import ErrorComponent from './containers/sorryPages/404_page';



ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route path='/entry/' component={ App } />
            <Route path='/entry/:id' component={ App } />
            <Route path='/error/' component={ ErrorComponent } />
        </Switch>
    </BrowserRouter>
), document.getElementById('app'));

