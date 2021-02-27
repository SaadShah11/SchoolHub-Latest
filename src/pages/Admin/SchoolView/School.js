import React, { useState } from "react";
import {Grid,Tabs,Tab,} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import SchoolProfile from './SchoolProfile'
import SchoolFee from './SchoolFee'
import SchoolAcad from './SchoolAcad'
import Header from '../../../components/Header/Header'
// styles
const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent:'center',
      },
}));


function School(props) {
  var classes = useStyles();
  var [activeTabId, setActiveTabId] = useState(0);
  return (
      <div style={{backgroundColor:'white'}}>
      <Header/> 
      <br/>
      <br/>
      <br/>
    <Grid container className={classes.container}>
      <div className={classes.formContainer}>
      
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Home" classes={{ root: classes.tab }} />
            <Tab label="Fee" classes={{ root: classes.tab }} />
            <Tab label="Academic" classes={{ root: classes.tab }} />
            <Tab label="Faculty" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <SchoolProfile />
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <SchoolFee/>
            </React.Fragment>
          )}
          {activeTabId === 2 && (
            <React.Fragment>
              <SchoolAcad/>
            </React.Fragment>
          )}
        </div>
        
      </div>
      
    </Grid>
    </div>
  );
}

export default withRouter(School);
