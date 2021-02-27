import React, { useState } from "react";
import { Link, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import Header from '../Header/Header'
import 'react-calendar/dist/Calendar.css';
import { withRouter } from "react-router-dom";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Footer from "../../../components/Footer/footer"
// context
import Widget from "../../../components/Widget/Widget";
import {AccountCircle, Delete, Cancel, CheckCircle} from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  box: {
    width: "80%",
    margin: 'auto',
  },
  button: {
    backgroundColor: '#43425d',
    color: 'white',
    width: '100px',
    float: 'right',
    marginLeft: '10px'
  },
  button2: {
    backgroundColor: '#43425d',
    color: 'white',
    width: '90%',
    float: 'right',
    marginLeft: '10px'
  },  
  dp:{
    height:'80px',
    width:'80px'
  },
  profile:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  name:{
    display:'flex',
    flexDirection:'column',
    "&:hover":{
      color: '#9F9F9F',
      cursor:'pointer',
    }
  },
 
  cancel: {
    '&:hover': {
      fill: '#9F9F9F'
    }
  },
  tabs: {
    color: '#43425d',
  },
 delete:{
  marginLeft:'40px', 
  fill:'#43425d',
  "&:hover":{
    fill: '#9F9F9F',
    cursor:'pointer'
  }
 },
 tick:{
  marginLeft:'40px', 
  fill:'green',
  "&:hover":{
    fill: '#9F9F9F',
    cursor:'pointer'
  }
 },
 cross:{
  fill:'red',
  "&:hover":{
    fill: '#9F9F9F',
    cursor:'pointer'
  }
 },
  indicator: {
    backgroundColor: '#43425d',
    height: '3px'
  },
 
}))


function Faculty(props) {
  var classes = useStyles();
  const faculty = [
    {dp:<AccountCircle className={classes.dp}/>,name:'Muhammad Ali',email:'ali@comsats.edu.pk'},
    {dp:<AccountCircle className={classes.dp}/>,name:'Muhammad Gulzaib',email:'ali@comsats.edu.pk'},
    {dp:<AccountCircle className={classes.dp}/>,name:'Muhammad Gulzaib',email:'ali@comsats.edu.pk'},
    {dp:<AccountCircle className={classes.dp}/>,name:'Muhammad Gulzaib',email:'ali@comsats.edu.pk'},
    {dp:<AccountCircle className={classes.dp}/>,name:'John ABharam Ali',email:'ali@comsats.edu.pk'},
  ];
  const requests = [
    {dp:<AccountCircle className={classes.dp}/>,name:'Muhammad Ali',email:'ali@comsats.edu.pk'},
    {dp:<AccountCircle className={classes.dp}/>,name:'Muhammad Gulzaib',email:'ali@comsats.edu.pk'},
    {dp:<AccountCircle className={classes.dp}/>,name:'Muhammad Gulzaib',email:'ali@comsats.edu.pk'},
  ];
 
  var [activeTabId, setActiveTabId] = useState(0);
  const [Tvalue1, setTValue1] = useState('');
  return (
    <div>
      <Header />
      <br /><br /><br /><br />
      <Grid container >
        <div className={classes.box}>
          <Widget title='Faculty' disableWidgetMenu>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}
              classes={{ indicator: classes.indicator, root: classes.tabs }}
              centered
            >
              <Tab label="Our Faculty" classes={{ root: classes.tab }} />
              <Tab label="Faculty Requests" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment >
              <div style={{marginTop:'10px'}}>
                  <Grid container spacing={2}>
                  {faculty.map(function(item){return(
                    <Grid item md={4}>
                      <Widget disableWidgetMenu>
                    <div className={classes.profile}>
                      {item.dp}
                      <div className={classes.name}>
                        <Typography variant='h6'>{item.name}</Typography>
                        <text>{item.email}</text>
                      </div>
                      <Delete className={classes.delete}/>
                    </div>
                    </Widget>
                    </Grid>
                  )})}
                  </Grid>
                </div>

              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
               <div style={{marginTop:'10px'}}>
                  <Grid container spacing={2}>
                  {requests.map(function(item){return(
                    <Grid item md={4}>
                      <Widget disableWidgetMenu>
                    <div className={classes.profile}>
                      {item.dp}
                      <div className={classes.name}>
                        <Typography variant='h6'>{item.name}</Typography>
                        <text>{item.email}</text>
                      </div>
                      <CheckCircle className={classes.tick}/>
                      <Cancel className={classes.cross}/>
                    </div>
                    </Widget>
                    </Grid>
                  )})}
                  </Grid>
                </div>
              </React.Fragment>
            )}
            
            <Button size="large" variant="contained" color="seconadary"
              className={classes.button}
              onClick={() => { props.history.goBack() }}
            > Cancel</Button>
            <Button size="large" variant="contained" color="seconadary"
              className={classes.button}
            > Save</Button>

          </Widget>
        </div>

      </Grid>
      <Footer />
    </div>

  );
}

export default withRouter(Faculty);
