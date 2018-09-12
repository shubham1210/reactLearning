import React, { Component } from "react";
import * as api from "../shared/api.jsx";
import ReactLoading from "react-loading";
import ReactTable from "react-table";
import "react-table/react-table.css";
import SmoothCollapse from "react-smooth-collapse";
import { ArrowUpward, ArrowDropDown } from "@material-ui/icons";

class TableSelectionForRule extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      updateOperation: false,
      collapseFlag: false,
      aeDetails:[]
    };
  }

  componentDidMount() {
    this.setState({ updateOperation: true });
    api.getTodayAeDetails().then(aeDetails => {
      if (aeDetails != null) {
        this.setState({aeDetails:aeDetails});
        this.setState({ updateOperation: false });
      }
    });
  }

  render() {
    const aeList = this.state.aeDetails;
    const columns = [
      {
        Header: props => <span style={styles.header_font}>AE NAME</span>,
        accessor: "name", // String-based value accessors!,
        filterMethod: (filter, row) =>
          row[filter.id].toUpperCase().startsWith(filter.value.toUpperCase()) ||
          row[filter.id].toUpperCase().endsWith(filter.value.toUpperCase())
      },
      {
        Header: props => <span style={styles.header_font}>AE EMP NUM</span>,
        accessor: "aeNum",
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: props => <span style={styles.header_font}>Designation</span>,
        accessor: "aeNum",
        Cell: props => <span className="number">GVP</span> // Custom cell components!
      },
      {
        Header: props => <span style={styles.header_font}>ACTION</span>,
        accessor: "aeNum", // Custom value accessors!
        Cell: row => (
          <a onClick={e => this.openAeActionViewDialog(row)} href="#">
            Remove Selection
          </a>
        ), // Custom cell components!
        filterable: false
      }
    ];

    return <div>
        <div className="col-md-12 mcpCard">
          <div className="col-md-12 padding5">
            <div style={styles.desginHeaderDiv}>{this.props.ruleName}</div>
            <div className="col-md-1" style={styles.expandButtonDivBottom} onClick={e => this.setState(
                  { collapseFlag: !this.state.collapseFlag }
                )}>
              {this.state.collapseFlag ? <ArrowUpward style={styles.updownArrowIcon} viewBox="0 0 20 8" /> : <ArrowDropDown style={styles.updownArrowIcon} viewBox="0 0 20 8" />}
            </div>
          </div>
          <SmoothCollapse className={"searchTableWidth"} expanded={this.state.collapseFlag}>
            <div style={this.state.updateOperation ? styles.showDivLoader : styles.hideDiv}>
              <ReactLoading type="spokes" color="#0277bd" />
            </div>
            <div style={this.state.updateOperation ? styles.hideDiv : styles.showDiv}>
              <ReactTable filterable data={aeList} columns={columns} defaultPageSize={5} showPaginationTop={true} showPaginationBottom={false} className={"pagination_height -striped -highlight  "} />
              <br />
            </div>
          </SmoothCollapse>
        </div>
      </div>;
  }
}


const styles = {
  showDivLoader: {
    display: "block",
    marginTop: "300px"
  },
  showDiv: {
    display: "block"
  },
  hideDiv: {
    display: "none"
  },
  header_font: {
    fontSize: "17px",
    fontFamily: "Roboto, sans-serif"
  },
  updownArrowIcon: {
    color: "#0277bd",
    float: "right",
    cursor: "pointer",
    height: "28px",
    width: "24px"
  },
  expandButtonDivBottom: {
    top: "-35px",
    marginLeft: "1200px"
  },
  desginHeaderDiv: {
    width: "100%",
    textAlign: "left",
    fontSize: "20px",
    textAlign: "left",
    fontFamily: "-webkit-pictograph"
  }
};

export default TableSelectionForRule;
