import React, { Component } from "react";
import * as api from "../shared/api.jsx";
import ReactLoading from "react-loading";
import ReactTable from "react-table";
import "react-table/react-table.css";
import withFixedColumns from "react-table-hoc-fixed-columns";
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import CustomCheckbox from './CustomCheckbox';

const ReactTableFixedColumns = withFixedColumns(ReactTable);


class TableForOnOffAction extends Component {

  

  constructor(props, context) {
    super(props, context);
    this.state = {
      updateOperation: false,
      collapseFlag: false,
      aeDetails: [],
      rules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      selectionCopy: {}
    };

    this.checkRule = this.checkRule.bind(this);
    this.onclickSave = this.onclickSave.bind(this);
    
  }

  componentDidMount() {
    this.setState({ updateOperation: true });
    api.getTodayAeDetails().then(aeDetails => {
      if (aeDetails != null) {
        this.setState({ aeDetails: aeDetails });
        this.setState({ updateOperation: false });
      }
    });
  }

onclickSave()
{
  console.log(this.selectionLocalCopy)
}

  checkRule(value) {
    let selectionLocalCopy = this.state.selectionCopy
    if (selectionLocalCopy[value] == undefined || selectionLocalCopy[value] === false)
      selectionLocalCopy[value] = true
    else
       selectionLocalCopy[value] =false;

       this.setState({"selectionCopy":selectionLocalCopy})
  }

  headerForRule() {
    const header = this.state.rules.map(value => {
      return {
        Header: props => <span style={styles.header_font}>{"RULE_"+value}</span>,
        id: `checkbox-${value}`,
        Cell: row =>  <CustomCheckbox onChange={() => {
            this.checkRule(row.original.aeNum + "_" + value)
          }}   value={row.original.aeNum + "_" + value} key={row.original.aeNum + "_" + value} checked={this.state.selectionCopy[row.original.aeNum + "_" + value]} />
        , // Custom cell components!
        filterable: false,
        sortable:false
        
      }
    })

    return header;
  }

  render() {
    console.log('render')
    const aeList = this.state.aeDetails;
    var columns = [
      {
        Header: props => <span style={styles.header_font}>AE NAME</span>,
        accessor: "name", // String-based value accessors!,
        fixed: "left",
        filterMethod: (filter, row) =>
          row[filter.id].toUpperCase().startsWith(filter.value.toUpperCase()) ||
          row[filter.id].toUpperCase().endsWith(filter.value.toUpperCase())
      },
      {
        Header: props => <span style={styles.header_font}>AE EMP NUM</span>,
        fixed: "left",
        accessor: "aeNum",
        Cell: props => <span className="number">{props.value}</span> // Custom cell components!
      },
      {
        Header: props => <span style={styles.header_font}>Designation</span>,
        fixed: "left",
        accessor: "designation",
        Cell: props => <span className="number">GVP</span> // Custom cell components!
      }
    ];

    this.headerForRule().forEach((val, index) => {
      columns.push(val);
    })

    console.log('aeList', aeList);

    return <div>
      <div className="col-md-12 mcpCard">
        <div style={this.state.updateOperation ? styles.showDivLoader : styles.hideDiv}>
          <ReactLoading type="spokes" color="#0277bd" />
        </div>
        <div style={this.state.updateOperation ? styles.hideDiv : styles.showDiv}>
          <ReactTableFixedColumns filterable data={aeList} columns={columns} defaultPageSize={5} showPaginationTop={true} showPaginationBottom={false} className={"pagination_height -striped -highlight  "} />
          <br />
        </div>
        <Button onClick={this.onclickSave} style = {styles.marginLeft1200} variant="contained" size="small" >
        <SaveIcon />
        Save
      </Button>
      </div>
      
    </div>;
  }
}


const styles = {
  showDivLoader: {
    display: "block",
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
  },
  marginLeft1200:{
    marginLeft:"1200px"
  }
};

export default TableForOnOffAction;
