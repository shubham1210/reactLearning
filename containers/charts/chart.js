import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


class Chart extends Component {

    constructor(props, context) {
        super(props, context);
        

        this.state = {
            "data":{}

        }
    }

    callMe(e) {
        alert(e);
        console.log(e);
    }
    
    componentDidMount() {
        console.log('chart mounted');
        const data = [
            {name: 'Build Strategic business partnerships', pv: 2400, amt: 2400},
            {name: 'Improve operational Effecency', pv: 1398, amt: 2210},
            {name: 'Optimize business cost', pv: 9800, amt: 2290},
            {name: 'Develop workspace',  pv: 3908, amt: 2000},
            {name: 'Moderize business through Technology', pv: 4800, amt: 2181},
            {name: 'Engage and retain talent',  pv: 3800, amt: 2500},
            {name: 'Provide excellent customre Experience', pv: 4300, amt: 2100},
      ];
      this.setState({"chartData":data})

    }


    render() {
        return (

            <div>
                <BarChart layout="vertical"  width={500} height={400} data={this.state.chartData}
                margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis />
                <YAxis type="category"  dataKey="name" />
                <Tooltip/>
                <Legend />
                <Bar onClick={e=> this.callMe(e)} dataKey="pv" fill="#8884d8" />
                </BarChart>
            </div>
        );
    }
}
    function mapStateToProps(ComponentState) {}

    function mapDispatchToProps(dispatch) {

    }


    export default connect(mapStateToProps, mapDispatchToProps)(Chart);

