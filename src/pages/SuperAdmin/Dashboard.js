import React, { useRef, useState, useCallback, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { TextField, InputBase, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Widget from "../../components/Widget/Widget";
import axios from "../../Util/axios"
import { AddToPhotos as Posts, ThreeDRotation as AR, Apartment as Apartment, LiveTv as Stream, People as People } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  main: {
    marginLeft: '15%',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: 'bold',
    fontSize: '30px'
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  iconname: {

    display: 'flex',
    flexDirection: 'row'
  }
}));
const stats = [
  { name: 'Total Users', content: '', icon: <People /> },
  { name: 'Total Schools', content: '', icon: <Apartment /> },
  { name: 'Total Teachers', content: '', icon: <People /> },
  { name: 'Total Students', content: '', icon: <People /> },
  { name: 'Total Posts', content: '', icon: <Posts /> },
  // { name: 'AR Requests ', content: '', icon: <AR /> },
  { name: 'Live Stream Requests', content: '', icon: <Stream /> }
]
export default function Dashboard() {
  var classes = useStyles()

  var [allUsers, setAllUsers] = useState()
  var [allSchools, setAllSchools] = useState()
  var [allTeachers, setAllTeachers] = useState()
  var [allStudents, setAllStudents] = useState()
  var [allPosts, setAllPosts] = useState()
  var [allLivestreams, setAllLivestream] = useState()
  var [allAR, setAllAR] = useState()

  const getLiveStreams = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/videoStreaming/getStreams")
      console.log("request")
      //console.log(request.data)
      let finalArr = []
      let reviews = request.data.map(
        (item) => {
          if (item.status == 'Pending') {
            finalArr.push(item)
          }
        }
      )
      setAllLivestream(finalArr.length)
      return request.data;
    }
    //And here you call it
    fetchData()
  }, [])

  const getPosts = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/dashboard/Home")
      console.log("request")
      setAllPosts(request.data.length)
      return request.data;
    }
    //And here you call it
    fetchData()
  }, [])

  const getSchools = useCallback(async () => {
    async function fetchData() {
      let request;
      console.log("inside get all schools")
      request = await axios.get("http://localhost:8080/searchSchool/search/")
      console.log("request")
      setAllSchools(request.data.length)
      return request.data;
    }
    //And here you call it
    fetchData()
  }, [])

  const getUsers = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/user_management/login")
      console.log("request")
      console.log(request.data)
      setAllUsers(request.data.length - 1)
      let finalArrStudent = []
      let finalArrTeacher = []

      request.data.map(
        (item) => {
          if (item.type == 'Student') {
            console.log("Student")
            finalArrStudent.push(item)
          }
          else if (item.type == 'Teacher') {
            console.log("Teacher")
            finalArrTeacher.push(item)
          }
        }
      )
      console.log("Im out")
      setAllStudents(finalArrStudent.length)
      //console.log(allStudents)
      setAllTeachers(finalArrTeacher.length)
      //console.log(allTeachers)

      return request.data;
    }
    //And here you call it
    fetchData()
  }, [])

  useEffect(() => {
    getLiveStreams()
    getPosts()
    getUsers()
    getSchools()

  }, []);

  let findTotal = (name) => {
    if (name == 'Live Stream Requests') {
      return allLivestreams
    }
    if (name == 'Total Posts') {
      return allPosts
    }
    if (name == 'Total Users') {
      return allUsers
    }
    if (name == 'Total Students') {
      console.log("Students")
      console.log(allStudents)
      return allStudents
    }
    if (name == 'Total Teachers') {
      console.log("Teachers")
      console.log(allTeachers)
      return allTeachers
    }
    if(name == 'Total Schools'){
      return allSchools
    }
  }

  let displayDashboard //= () => { let displayPostsVar

  try {
    if (stats != undefined) {

      displayDashboard = stats.map(function (item) {
        return (
          <Grid item md={4}>
            <Widget disableWidgetMenu>
              <div className={classes.tab}>
                <div className={classes.iconname}>
                  {item.icon}
                  <Typography>{item.name}:</Typography>
                </div>
                {/* <Typography>{item.content}</Typography> */}
                <Typography>{findTotal(item.name)}</Typography>
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


  return (
    <div className={classes.main}>
      <Typography className={classes.title} variant="h5" weight="bold"> SchoolHub Admin Dashboard</Typography>
      <Grid container spacing={5}>


        {displayDashboard}
      </Grid>
    </div>

  )
}