import React , {Component} from 'react';

import Header from './header/header'
import Footer from './footer/footer'
import 'bootstrap/dist/css/bootstrap.min.css';


export default class App extends Component {
    render () {
        return (
          <div>
            <Header/>
            <p>This is my new react app body</p>

            <Footer/>
            </div>
        )
    }
}