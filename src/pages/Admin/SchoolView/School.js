import React, { useState, useCallback, useEffect } from "react";
import { Grid, Tabs, Tab, } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from "react-router-dom";
import SchoolProfile from './SchoolProfile'
import SchoolFee from './SchoolFee'
import SchoolAcad from './SchoolAcad'
import Header from '../../../components/Header/Header'

import AuthService from "../../../services/auth.service";
import axios from "../../../Util/axios"

// styles
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: 'center',
  },
}));


function School(props) {

  var classes = useStyles();
  var [activeTabId, setActiveTabId] = useState(0);
  var [schoolValue, setSchoolValue] = useState();

  console.log("School ID")
  //I can also store entire school data in auth service and then just use it here directly
  const schoolID = AuthService.getCurrentSchool()
  console.log(schoolID)
  //console.log(props.location.data)

  const getSchool = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/searchSchool/search/specificSchool/" + schoolID.schoolID)

      console.log("request")
      setSchoolValue(request.data)
      return request.data;
    }
    //And here you call it
    fetchData()
  }, [])

  useEffect(() => {
    getSchool()
  }, schoolID);

  let displayTabs;
  if (schoolValue !== undefined) {
    return (
      <div>
      <Header history={props.history}/>
      <br />
      <br />
      <br />
      <br />
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
                <SchoolProfile school={schoolValue} />
              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <SchoolFee school={schoolValue} />
              </React.Fragment>
            )}
            {activeTabId === 2 && (
              <React.Fragment>
                <SchoolAcad school={schoolValue} />
              </React.Fragment>
            )}
          </div>

        </div>

      </Grid>
      </div>
    )
  }else{
    console.log("schoolValue undefined")
  }

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Header />
      <br />
      <br />
      <br />
      {
        displayTabs
      }
    </div>
  );
}

export default withRouter(School);
