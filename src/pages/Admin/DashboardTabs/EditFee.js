import BootstrapTable from 'react-bootstrap-table-next';
import React from 'react'
import {TextField, Grid, Button} from '@material-ui/core';
import Header from '../Header/Header'
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Footer from "../../../components/Footer/footer"

// context
import Widget from "../../../components/Widget/Widget";
import {AccountCircle, Room, PhoneAndroid, AlternateEmail, Code, Facebook } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  table:{
      textAlign:'center'
  },
  box: {
    width: "50%",
    margin: 'auto',
  },
  button: {
    backgroundColor: '#43425d',
    color: 'white',
    width: '100px',
    float: 'right',
    marginLeft: '10px'
  },
}))
function EditFee(props) {

  var classes = useStyles();
  const data = [
    {Des: 'Admission Fee', name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
    {Des: 'Tution Fee',name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
    {Des: 'Exam Fee', name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
    {Des: 'Sport Fee',name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
    {Des: 'Lab Fee', name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
    {Des: 'Library Fee', name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
    {Des: 'Total Admission Fee',name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
    {Des: 'Total Monthly Fee', name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},  
  ];
  const columns = [{
    dataField: 'Des',
    text: 'Description'
      
  }, {
    dataField: 'name',
    text: 'Junior',
    headerStyle: (colum, colIndex) => {
        return { justifyContent: 'center'};
      }
  }, {
    dataField: 'name',
    text: 'Higher',
    
  },{
    dataField: 'name',
    text: 'College',
    
  }];
  return (
    <div>
      <Header />
      <br /><br /><br /><br />
      <Grid container >
        <div className={classes.box}>
          <Widget title='Edit Fee Structure' disableWidgetMenu>
            <BootstrapTable keyField='id' data={data} columns={columns} />
            <Button size="large" variant="contained" 
              className={classes.button}
              onClick={() => { props.history.goBack() }}
            > Cancel</Button>
            <Button size="large" variant="contained" 
              className={classes.button}
            > Save</Button>
          </Widget>
          
        </div>
        
        </Grid>
        <Footer />
    </div>
  );
}

export default withRouter(EditFee);
