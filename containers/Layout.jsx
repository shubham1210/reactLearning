import React , {Component} from 'react';
import Header from './header/header.jsx';
import Footer from './footer/footer.jsx';
import Body from './body/body.jsx';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/styles.scss';
import '../styles/gartner-table.scss';
import '../styles/modal-ui.scss';
import '../styles/subheader-ui.scss';
import '../styles/icomoon.css';
import '../styles/react-datetime.scss';
import '../styles/legend.scss';
import '../styles/react-select.scss';


export default class Layout extends Component {
    render () {
        return (
           <div>
            <Header/>
            <Body/>
            <Footer/>
           </div>
        )
    }
}