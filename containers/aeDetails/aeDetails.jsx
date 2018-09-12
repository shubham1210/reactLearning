import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as api from '../shared/api.jsx'
import { setAEList } from './action.jsx';
import ReactLoading from 'react-loading';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import ActionListperAE from '../actionListPerAE/actionListPerAE.jsx'

class RecoAction extends Component {

  constructor(props, context) {
        super(props, context);
        this.state = {
            "updateOperation":false,
            "viewAeActionDialog": false,
            "modalAeName": "",
            "modalAeNum": ""
        }
        this.closeAeActionViewDialog = this.closeAeActionViewDialog.bind(this);
        this.openAeActionViewDialog = this.openAeActionViewDialog.bind(this);
    }

    closeAeActionViewDialog(){
      this.setState({viewAeActionDialog: false});
    }
    openAeActionViewDialog(row){
      this.setState({viewAeActionDialog: true,modalAeName:row.original.name,modalAeNum:row.original.aeNum});
    }

    componentDidMount() {
      this.setState({"updateOperation":true})
        api.getTodayAeDetails().then((aeDetails) => {
            if (aeDetails != null) {
                this.props.setAeDetails(aeDetails);
                this.setState({"updateOperation":false})
            }
        });
    }
    render() {
        const aeList = this.props.aeList
          const columns = [{
            Header: props => <span style={styles.header_font}>AE NAME</span>,
            accessor: 'name' ,// String-based value accessors!,
            filterMethod: (filter, row) =>
                    row[filter.id].toUpperCase().startsWith(filter.value.toUpperCase()) ||
                    row[filter.id].toUpperCase().endsWith(filter.value.toUpperCase())
          }, {
            Header: props => <span style={styles.header_font}>AE EMP NUM</span>,
            accessor: 'aeNum',
            Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
          }, {
            Header:  props => <span style={styles.header_font}>LAUNCH ACTION</span>,
            accessor: 'aeNum', // Custom value accessors!
            Cell: row => <a onClick ={e=>this.openAeActionViewDialog(row)} href="#">Launch Action</a>, // Custom cell components!
            filterable:false
          }]
        
          return (
            <div>
            <div  style={this.state.updateOperation ? styles.showDivLoader : styles.hideDiv}>
            <ReactLoading type="spokes" color="#0277bd" />
            </div>
            <div style={this.state.updateOperation ?  styles.hideDiv:styles.showDiv} >
          <ReactTable 
          filterable
            data={aeList}
            columns={columns}
            defaultPageSize={50}
            showPaginationTop={true}
            showPaginationBottom={false}
            className={"pagination_height -striped -highlight  "}
          />
          <br />
          </div>
          <ActionListperAE isOpen={this.state.viewAeActionDialog} close={this.closeAeActionViewDialog}  modalAeName= {this.state.modalAeName}
            modalAeNum={this.state.modalAeNum}/>
          </div>
        )
        } 
}


function mapStateToProps(ComponentState) {
    return { aeList: ComponentState.recoActionReducer.aeList };
}

function mapDispatchToProps(dispatch) {

    return bindActionCreators({
        setAeDetails: setAEList
    }, dispatch);
}


// prop validations
RecoAction.propTypes = {
    setAeDetails: PropTypes.func.isRequired
};

const styles = {
    showDivLoader:{
      display: 'block',
      marginTop:'300px'
    },
    showDiv:{
      display: 'block',
    },
    hideDiv:{
      display: 'none'
    },
   header_font:{
    fontSize: '17px',
    fontFamily : 'Roboto, sans-serif'
   }
  }

export default connect(mapStateToProps, mapDispatchToProps)(RecoAction);

    