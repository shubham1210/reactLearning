import React, { Component } from 'react';
import * as api from '../shared/api.jsx'
import ReactLoading from 'react-loading';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import {Close} from '@material-ui/icons';
import Modal from 'react-modal';
import Button from '@material-ui/core/Button';


class ActionListperAE extends Component {

    constructor(props, context) {
        super(props, context);
            this.state = {
                "fetchOperation":false,
                "viewAeActionDialog": false,
                "modalAeName": props.modalAeName,
                "modalAeNum": props.modalAeNum,
                "updateOperation":false,
                "aePerActionList":[]
        }
        this.openAeActionViewDialog = this.openAeActionViewDialog.bind(this);
        this.markActioncomplete = this.markActioncomplete.bind(this);
        this.markActionViewed = this.markActionViewed.bind(this);
    }

     markActioncomplete = (row)=>
    {
      this.setState({"updateOperation":true})
      //url need to be disabled
            api.markActionCompleted([row.original]).then((response) => {
                if (response != null) {
                  this.setState({"updateOperation":false})
                }
            });
     
    }

    markActionViewed= (row)=>
    {
      this.setState({"updateOperation":true})
      //url need to be disabled
            api.markActionViewed([row.original]).then((response) => {
                if (response != null) {
                  this.setState({"updateOperation":false})
                }
            });
    }
      openAeActionViewDialog(row){
        this.setState({viewAeActionDialog: true});
      }

    componentDidMount() {
        this.setState({"fetchOperation":true})
      }

      componentWillReceiveProps(nextProps)
      {
        this.setState({"viewAeActionDialog":nextProps.isOpen})
        if(nextProps.modalAeNum!= this.props.modalAeNum )
        {
          this.setState({"fetchOperation":true})
          api.getRuleByAE(nextProps.modalAeNum).then((actionByAE) => {
            if (actionByAE != null) {
                this.setState({"aePerActionList":actionByAE})
                this.setState({"fetchOperation":false})
            }
        });
        }
      }

      render() {
        const aePerActionList = this.state.aePerActionList
        const columns = [ {
          Header: props => <span style={styles.header_font}>ACTION</span>,
          accessor: 'ACTION_DETAILS',
          Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
          Header: props => <span style={styles.header_font}>ALERT_EXPIRATION</span>,
          accessor: 'ALERT_EXPIRATION',
          Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
          Header: props => <span style={styles.header_font}>ORG_CODE</span>,
          accessor: 'ORG_CODE',
          Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
          Header: props => <span style={styles.header_font}>OPTY_NAME</span>,
          accessor: 'OPTY_NAME',
          Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
        }, {
          Header:  props => <span style={styles.header_font}>ACTION</span>,
          accessor: 'RA_ID', // Custom value accessors!
        Cell: row => (<div><div style={this.state.updateOperation ? styles.showUpdateDivLoader : styles.hideDiv}> <ReactLoading height={15} width={15} type="spokes" color="#0277bd" /></div><div style={this.state.updateOperation ?  styles.hideDiv:styles.showDiv}><a onClick ={e=>this.markActioncomplete(row)} href="#">Completed</a> / <a onClick ={e=>this.markActionViewed(row)} href="#">Viewed</a></div></div>), // Custom cell components!
        }]

          return (
            <Modal 
           isOpen={this.state.viewAeActionDialog}
           contentLabel={"Actions For AE"+this.props.modalAeName} ariaHideApp={false}
           onRequestClose={this.closeAeActionViewDialog}
           className="editModal"
           overlayClassName="editModalOverlay"> 
              <span style={styles.editDialogTitle}>Action of AE -{this.props.modalAeName} <span></span><Close style={styles.closeIcon} onClick={this.props.close} /></span> 
              <hr style={styles.hrDialog} />           
              <div  style={this.state.fetchOperation ? styles.showDivLoader : styles.hideDiv}>
            <ReactLoading type="spokes" color="#0277bd" />
            </div>
            <div style={this.state.fetchOperation ?  styles.hideDiv:styles.showDiv} >
            <ReactTable 
            data={aePerActionList}
            columns={columns}
            defaultPageSize={5}
            showPaginationTop={true}
            showPaginationBottom={false}
            className={"pagination_height -striped -highlight  "}
          />
               </div>
              <div style={styles.editDialogButtonDiv} className="col-md-12">
              <Button variant="contained" color="secondary" onClick={this.props.close}>Close</Button>
              </div>
          </Modal>
        )
        } 

    }        


const styles = {
    editDialogButtonDiv:{
      marginTop:'20px',
      paddingTop: '20px',
      paddingRight: '27px',
      textAlign: 'right',
      borderTop:'1px solid darkgray',
    },
    hrDialog:{
      marginTop: '5px',
      marginBottom: '10px'
    },
    closeIcon:{
      color: '#0277bd',
      float: 'right',
      cursor: 'pointer',
      height: '28px',
      width: '24px'
    },
    editDialogTitle:{
      color:'#0277bd',
      fontWeight:'bold', 
      fontSize:'22px'
    },
      showDivLoader:{
        display: 'block',
        marginTop:'100px',
        marginBottom:'100px'
      },
      showUpdateDivLoader:{
        display: 'block',
      },
      showDiv:{
        display: 'block',
      },
      hideDiv:{
        display: 'none'
      },
    }

export default ActionListperAE;
