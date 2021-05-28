import React, { useState, useCallback, useEffect } from "react";
import { Link, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import Header from '../Header/Header'
import 'react-calendar/dist/Calendar.css';
import { withRouter } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Footer from "../../../components/Footer/footer"
import axios from "../../../Util/axios"
import AuthService from "../../../services/auth.service";
// context
import Widget from "../../../components/Widget/Widget";
import { AccountCircle, Delete, Cancel, CheckCircle } from '@material-ui/icons'
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
  dp: {
    height: '80px',
    width: '80px'
  },
  profile: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    display: 'flex',
    flexDirection: 'column',
    "&:hover": {
      color: '#9F9F9F',
      cursor: 'pointer',
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
  delete: {
    marginLeft: '40px',
    fill: '#43425d',
    "&:hover": {
      fill: '#9F9F9F',
      cursor: 'pointer'
    }
  },
  tick: {
    marginLeft: '40px',
    fill: 'green',
    "&:hover": {
      fill: '#9F9F9F',
      cursor: 'pointer'
    }
  },
  cross: {
    fill: 'red',
    "&:hover": {
      fill: '#9F9F9F',
      cursor: 'pointer'
    }
  },
  indicator: {
    backgroundColor: '#43425d',
    height: '3px'
  },

}))


function Faculty(props) {
  var classes = useStyles();

  let [reloadHome, setReloadHome] = useState(false)
  var [allTeachers, setAllTeachers] = useState()
  var [allTeacherRequests, setAllTeacherRequests] = useState()
  var [status, setStatus] = useState()

  const user = AuthService.getCurrentUser()
  console.log(user)
  const school = AuthService.getCurrentSchool()
  console.log("SCHOOL")
  console.log(school)

  const getTeachers = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/searchSchool/search/")
      console.log("request")
      console.log(request.data)

      let finalReqs = []
      let allReqs = request.data
      allReqs.map((i) => {
        if (user._id == i.adminID) {
          finalReqs = i
        }
      })
      setAllTeachers(finalReqs.teachers)

      return request.data;
    }
    //And here you call it
    fetchData()
    setReloadHome(true)
  }, [])

  const getTeacherRequests = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/teacherRequest/getTeacherRequests/")
      console.log("request")
      console.log(request.data)

      console.log("AdminID")
      console.log(request.data.adminID)
      console.log("AdminID Current")
      console.log(user._id)

      let finalReqs = []
      //let finalTeachers = []
      let allReqs = request.data.reverse()
      allReqs.map((i) => {
        if (user._id == i.adminID) {
          finalReqs.push(i)
          // if(i.status === "Accepted"){
          //   finalTeachers.push(i)
          // }
        }
      })
      setAllTeacherRequests(finalReqs)
      //setAllTeachers(finalTeachers)
      
      
      // if (request.data.adminID === user._id) {
      //   console.log("inside if")
      //   setAllTeacherRequests(request.data.reverse)
      // }

      return request.data;
    }
    //And here you call it
    fetchData()
    setReloadHome(true)
  }, [])

  let handleUpdateStatus = (stat, id, sid) => {
    let finalObject = {
      status: stat,
      schoolID: sid
    }

    updateTeacherRequest(finalObject, id)
  }

  const updateTeacherRequest = useCallback(async (stat, id) => {
    async function fetchData() {
      let request;
      console.log("NewData")
      console.log(stat)
      console.log(id)
      //console.log(status)
      request = await axios.patch("http://localhost:8080/teacherRequest/updateTeacherRequest/" + id, stat)
      console.log("request")
      console.log(request)
      //setReloadPost(true)
      window.location.reload()
      return request.data;
    }
    fetchData()
  }, [])

  const deleteTeacher = useCallback(async (id) => {
    async function fetchData() {
      let request;
      console.log("NewData")
      let stat = {
        teacherID: id
      }
      console.log(stat)
      console.log(school.schoolID)
      //console.log(status)
      request = await axios.post("http://localhost:8080/school/delete_Teacher/" + school.schoolID, stat)
      console.log("request")
      console.log(request)
      setReloadHome(true)
      //window.location.reload()
      return request.data;
    }
    fetchData()
  }, [])

  useEffect(() => {
    getTeachers()
    getTeacherRequests()
    //setIsLoading(true)
    setReloadHome(false)
    //getItems().then(data => setItems(data));
  }, [reloadHome]);

  let displayTeacherRequests //= () => { let displayPostsVar

  try {
    if (allTeacherRequests != undefined) {

      // displayTeacherRequests = allTeacherRequests.map((row) => {
      //   if (row.status === "Pending") {
      //     return
      //   }

      // })
      console.log("All Requests")
      console.log(allTeacherRequests)
      displayTeacherRequests = allTeacherRequests.map(function (item) {
        if (item.status === "Pending") {
          return (
            <Grid item md={4}>
              <Widget disableWidgetMenu>
                <div className={classes.profile}>
                  {/* <AccountCircle className={classes.dp} src={item.teacherProfilePic}/> */}
                  <img className={classes.dp} src={item.teacherProfilePic} />
                  <div className={classes.name}>
                    <Typography variant='h6'>{item.teacherName}</Typography>
                    <text>{item.teacherEmail}</text>
                  </div>
                  <CheckCircle className={classes.tick} onClick={() => { handleUpdateStatus("Accepted", item._id, item.schoolID) }} />
                  <Cancel className={classes.cross} onClick={() => { handleUpdateStatus("Rejected", item._id, item.schoolID) }} />
                </div>
              </Widget>
            </Grid>
          )
        }

      })
      //setIsLoading(false)
    } else {
      console.log("nothing")
    }
  } catch (err) {
    console.log("error")
    console.log(err)
  }

  let displayTeachers //= () => { let displayPostsVar

  try {
    if (allTeachers != undefined) {

      // displayTeachers = allTeachers.map((row) => {
      //   return


      // })
      console.log("All Teachers")
      console.log(allTeachers)

      displayTeachers = allTeachers.map(function (item) {
        return (
          <Grid item md={4}>
            <Widget disableWidgetMenu>
              <div className={classes.profile}>
                {/* {item.teacherProfilePic} */}
                <img className={classes.dp} src={item.teacherProfilePic} />
                <div className={classes.name}>
                  <Typography variant='h6'>{item.teacherName}</Typography>
                  <text>{item.teacherEmail}</text>
                </div>
                <Delete onClick={()=>{deleteTeacher(item.teacherID)}} className={classes.delete} />
              </div>
            </Widget>
          </Grid>
        )
      })
      //setIsLoading(false)
    } else {
      console.log("nothing")
    }
  } catch (err) {
    console.log("error")
    console.log(err)
  }

  //Display Teachers
  // faculty.map(function (item) {
  //   return (
  //     <Grid item md={4}>
  //       <Widget disableWidgetMenu>
  //         <div className={classes.profile}>
  //           {item.dp}
  //           <div className={classes.name}>
  //             <Typography variant='h6'>{item.name}</Typography>
  //             <text>{item.email}</text>
  //           </div>
  //           <Delete className={classes.delete} />
  //         </div>
  //       </Widget>
  //     </Grid>
  //   )
  // })


  //Display Requests
  // requests.map(function (item) {
  //   return (
  //     <Grid item md={4}>
  //       <Widget disableWidgetMenu>
  //         <div className={classes.profile}>
  //           {item.dp}
  //           <div className={classes.name}>
  //             <Typography variant='h6'>{item.name}</Typography>
  //             <text>{item.email}</text>
  //           </div>
  //           <CheckCircle className={classes.tick} />
  //           <Cancel className={classes.cross} />
  //         </div>
  //       </Widget>
  //     </Grid>
  //   )
  // })


  const faculty = [
    { dp: <AccountCircle className={classes.dp} />, name: 'Muhammad Ali', email: 'ali@comsats.edu.pk' },
    { dp: <AccountCircle className={classes.dp} />, name: 'Muhammad Gulzaib', email: 'ali@comsats.edu.pk' },
    { dp: <AccountCircle className={classes.dp} />, name: 'Muhammad Gulzaib', email: 'ali@comsats.edu.pk' },
    { dp: <AccountCircle className={classes.dp} />, name: 'Muhammad Gulzaib', email: 'ali@comsats.edu.pk' },
    { dp: <AccountCircle className={classes.dp} />, name: 'John ABharam Ali', email: 'ali@comsats.edu.pk' },
  ];
  const requests = [
    { dp: <AccountCircle className={classes.dp} />, name: 'Muhammad Ali', email: 'ali@comsats.edu.pk' },
    { dp: <AccountCircle className={classes.dp} />, name: 'Muhammad Gulzaib', email: 'ali@comsats.edu.pk' },
    { dp: <AccountCircle className={classes.dp} />, name: 'Muhammad Gulzaib', email: 'ali@comsats.edu.pk' },
  ];

  var [activeTabId, setActiveTabId] = useState(0);
  const [Tvalue1, setTValue1] = useState('');
  return (
    <div>
      <Header history={props.history}/>
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
                <div style={{ marginTop: '10px' }}>
                  <Grid container spacing={2}>
                    {
                      displayTeachers
                    }
                  </Grid>
                </div>

              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <div style={{ marginTop: '10px' }}>
                  <Grid container spacing={2}>
                    {
                      displayTeacherRequests
                    }
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
