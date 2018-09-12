import React,  {Component }from "react"; 
import * as constants from "../shared/constant.jsx"; 
import "react-table/react-table.css"; 
import Select from "@material-ui/core/Select"; 
import InputLabel from "@material-ui/core/InputLabel"; 
import Input from "@material-ui/core/Input"; 
import FormControl from "@material-ui/core/FormControl"; 
import ListItemText from "@material-ui/core/ListItemText"; 
import MenuItem from "@material-ui/core/MenuItem"; 
import Checkbox from "@material-ui/core/Checkbox"; 
import TableSelectionForRule from "./tableSelectionForRule.jsx"; 

class OnOffAction extends Component {

  constructor(props, context) {
    super(props, context); 
    this.state =  {
      tabSelection:0, 
      comboOptions:constants.ACTION_TYPES, 
      name:[]
    }; 
    this.handleChange = this.handleChange.bind(this); 
  }


  handleChange = event =>  {
    this.setState( {name:event.target.value }); 
  }; 

  render() {
    const {comboOptions } = this.state; 
    const ITEM_HEIGHT = 58; 
    const ITEM_PADDING_TOP = 8; 
    const MenuProps =  {
      PaperProps: {
        style: {
          maxHeight:ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP, 
          width:550
        }
      }
    }; 

    return < div style =  {styles.marginTopDiv} >  < FormControl style =  {styles.maxWidthCombo} >  < InputLabel htmlFor = "select-multiple-checkbox" > RULE's</InputLabel>
          <Select multiple value={this.state.name} onChange={this.handleChange} input={<Input id="select-multiple-checkbox" />} renderValue={selected => selected.join(", ")} MenuProps={MenuProps}>
            {comboOptions.map(name => <MenuItem key={name} value={name}>
                <Checkbox checked={this.state.name.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>)}
          </Select>
        </FormControl>

      {comboOptions.map((name, i) => (this.state.name.indexOf(name) > -1 ? <div key={i}>
        <TableSelectionForRule ruleName={name} />
      </div> : ""))}
      </div>;
  }
}

const styles = {
  maxWidthCombo: {
    maxWidth: "200px",
    minWidth: "100px"
  },
  formControl: {
    minWidth: "120",
    maxWidth: "300"
  },
  marginTopDiv: {
    marginTop: "10px",
    textAlign: "left",
    marginLeft: "38px"
  }
};

export default OnOffAction;
