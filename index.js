import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Router, Route, Switch,Redirect } from 'react-router'
import { Provider } from 'react-redux'
// main app
import Layout from './containers/Layout';
import ErrorComponent from './containers/sorryPages/404_page';
import configureStore from './containers/store/store.js';


const store = configureStore();

console.log(store);

ReactDOM.render((
    <Provider store={store}>
    <BrowserRouter store={store}>
        <Switch>
            <Route path='/entry/' component={ Layout } />
            <Route path='/entry/:id' component={ Layout } />
            <Route path='/error/' component={ ErrorComponent } />
        </Switch>
    </BrowserRouter>
    </Provider>
), document.getElementById('app'));

