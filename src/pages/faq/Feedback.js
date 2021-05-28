import React, { useState, useEffect, useCallback } from "react";
import { InputBase, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
//import Header from '../Header/Header'
import 'react-calendar/dist/Calendar.css';
import { withRouter } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Footer from "../../components/Footer/footer"
import StarRatings from 'react-star-ratings';
// context
import Widget from "../../components/Widget/Widget";
import { AccountCircle, Send, Cancel, CheckCircle, BorderRight } from '@material-ui/icons'

import axios from "../../Util/axios"
import AuthService from "../../services/auth.service";
import Review from "../Admin/SchoolView/review"

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
  maindiv: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10px'
  },
  reply: {
    width: '100%',
    paddingLeft: '3px',
    paddingRight: '3px',
  },
  commButton: {
    width: '30px',
    fill: "#43425d",
    '&:hover ': {
      cursor: 'pointer',
      fill: '#767575'
    }
  },
  name: {
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      color: '#767575'
    }
  },
  commentbox: {
    marginTop: '7px',
    display: "flex",
    flexDirection: 'row',

    borderBottom: '1px solid rgba(0,0,0, 0.2)',
  },
  cancel: {
    '&:hover': {
      fill: '#9F9F9F'
    }
  },
  tabs: {
    color: '#43425d',
  },

  indicator: {
    backgroundColor: '#43425d',
    height: '3px'
  },
  leavecomment: {
    width: '400px',
    height: '180px'

  }, para: {
    width: '500px',
    height: "200px",
    border: '1px solid rgba(0,0,0,0.2)',
  },
}))

let reviewData = {
  userID: '',
  username: '',
  userProilePic: '',
  date: '',
  reviewText: '',
  rating: '',
  reply:[]
}

function Feedback(props) {

  var classes = useStyles();

  var [activeTabId, setActiveTabId] = useState(0);
  const [Tvalue1, setTValue1] = useState('');
  let [newReview, setNewReview] = useState();
  let [newRating, setNewRating] = useState(1);
  let [allReviews, setAllReviews] = useState();
  let [reloadReview, setReloadReview] = useState(false);

  const user = AuthService.getCurrentUser()

  const handleSend = () => {

    let current = new Date()
    let year = current.getFullYear().toString();
    let month = current.getMonth() + 1;
    let day = current.getDate();

    let hours = current.getHours().toString();
    let minutes = current.getMinutes();
    let seconds = current.getSeconds();

    let finalDate = year.concat("/", month, "/", day)
    let finalTime = hours.concat(":", minutes, ":", seconds)

    let timee = finalDate.concat(" ", finalTime)

    reviewData.reviewText = newReview
    reviewData.date = timee
    //reviewData.schoolID = school[0]._id
    reviewData.rating = newRating
    console.log("New Rating")
    console.log(newRating)
    reviewData.userID = user._id
    reviewData.username = user.username

    postReview()
  }

  const postReview = useCallback(async () => {
    async function fetchData() {
      let request;
      console.log("ReviewData")
      console.log(reviewData)
      request = await axios.post("http://localhost:8080/mainReview/schoolHubReviews", reviewData)
      console.log("request")
      console.log(request)
      alert("Review Added Successfully")
      return request.data;
    }
    fetchData()
    setReloadReview(true)
  }, [])

  const getReviews = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/mainReview/schoolHubReviews")
      console.log("request")
      console.log(request)
      setAllReviews(request.data)
      return request.data;
    }
    fetchData()
  }, [])

  useEffect(() => {
    getReviews()
    setReloadReview(false)
    console.log("reload review")
    console.log(reloadReview)
  }, [reloadReview]);

  let displayReviews //= () => { let displayPostsVar

  if (allReviews != undefined) {
    console.log("inside displayReviews")
    displayReviews = <Review reviews={allReviews} />

  } else {
    console.log("nothing")
  }

  return (
    <div>
      {/* <Header />
      <br /><br /><br /><br /> */}
      <Grid container >
        <div className={classes.box}>
          <Widget title='Feedback' disableWidgetMenu>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}
              classes={{ indicator: classes.indicator, root: classes.tabs }}
              centered
            >
              <Tab label="School Feedback" classes={{ root: classes.tab }} />
              <Tab label="Rate SchoolHub" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment >
                <div className={classes.maindiv}>
                  <Grid container spacing={2}>
                    {
                      displayReviews
                    }
                  </Grid>
                </div>

              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <Widget style={{ height: '55vh' }} title='Rate our School' disableWidgetMenu>
                  <div className={classes.leavecomment}>
                    <StarRatings starDimension="20px" rating={newRating}
                      starSpacing="3px" changeRating={(rating) => { setNewRating(rating) }} starRatedColor="#D10B0B" />
                    <textarea className={classes.para} id="about" placeholder="Leave a review"
                      onChange={e => setNewReview(e.target.value)} fullWidth />
                    {/* <Button style={{ float: "right" }} onClick={() => handleSend()}
                      size="large" variant="contained" color="seconadary"> Submit</Button> */}
                  </div>
                  <Button size="large" variant="contained" color="seconadary"
                    className={classes.button}
                    onClick={() => { props.history.goBack() }}
                  > Cancel</Button>
                  <Button size="large" variant="contained" color="seconadary"
                    className={classes.button} onClick={() => handleSend()}
                  > Submit</Button>
                </Widget>

              </React.Fragment>
            )}


          </Widget>
        </div>

      </Grid>
    </div>

  );
}

export default withRouter(Feedback);
