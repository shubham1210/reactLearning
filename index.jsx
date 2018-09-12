import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Router, Route, Switch, Redirect } from 'react-router'
import { Provider } from 'react-redux'
// main app
import Layout from './containers/Layout.jsx';
import ErrorComponent from './containers/sorryPages/404_page.jsx';
import configureStore from './containers/store/store.jsx';
import Chart from './containers/charts/chart';

const store = configureStore();

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter store={store}>
            <Switch>
                <Route path='/entry/' component={Layout} />
                <Route path='/chart/' component={Chart} />
                <Route path='/error/' component={ErrorComponent} />
            </Switch>
        </BrowserRouter>
    </Provider>
), document.getElementById('app'));

