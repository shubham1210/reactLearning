
import React, {Component} from 'react';

class ErrorComponent extends Component {
    render() {
        return (

            <div className="container">
                <div className="row">
                    <div className="span12">
                        <div className="hero-unit center">
                            <h1>Page Not Found <small><font face="Tahoma" color="red">Error 404</font></small></h1>
                            <br />
                            <p>The page you requested could not be found, either contact your webmaster or try again. Use your browsers <b>Back</b> button to navigate to the page you have prevously come from</p>
                            <p><b>Or you could just press this neat little button:</b></p>
                            <a href="/entry" className="btn btn-large btn-info"><i className="icon-home icon-white"></i> Take Me Home</a>
                        </div>
                        <br />

                </div>
            </div>
            </div>

        );
    }
}
export default ErrorComponent;
