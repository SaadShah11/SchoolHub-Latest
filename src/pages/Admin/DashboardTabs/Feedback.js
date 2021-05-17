import React, { useState, useEffect, useCallback } from "react";
import { InputBase, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import Header from '../Header/Header'
import 'react-calendar/dist/Calendar.css';
import { withRouter } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Footer from "../../../components/Footer/footer"
import StarRatings from 'react-star-ratings';
import axios from "../../../Util/axios"
import AuthService from "../../../services/auth.service";
// context
import Widget from "../../../components/Widget/Widget";
import { AccountCircle, Send, Cancel, CheckCircle, BorderRight, AirlineSeatReclineExtraOutlined } from '@material-ui/icons'
import { idea } from "react-syntax-highlighter/dist/esm/styles/hljs";
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
  profile1: {
    margin: 'auto',
    width: '95%',
    backgroundColor: '#F3F3F3',
    borderRadius: '6px',
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    marginTop: "5px",
  },
  dp1: {
    height: '25px',
    width: '25px',
    borderRadius: '70%'
  },
  nameanddate: {
    display: 'flex',
    flexDirection: 'column'
  },
  time: {
    fontSize: '12px',
  },
  name: {
    fontWeight: 'bold',
    '&:hover': {
      cursor: 'pointer',
      color: '#767575'
    }
  },

}))


function Feedback(props) {
  var classes = useStyles();
  const reviews = [
    { id: '1', name: 'Ali Khan', content: 'One of my favourite sohool, very good services and reponse. rating it 5 because it is the best.', rating: 5, date: '5 aug 2020' },
    { id: '2', name: 'John Snow', content: 'Congratulation on your shadi.', rating: 4.5, date: '5 aug 2020' },
    { id: '3', name: 'Another Name', content: 'Brother asked a very good questions.', rating: 3, date: '5 aug 2020' },
    { id: '4', name: 'Ali Khan', content: 'One of my favourite sohool, very good services and reponse. rating it 5 because it is the best.', rating: 5, date: '5 aug 2020' },
    { id: '5', name: 'John Snow', content: 'Congratulation on your shadi.', rating: 4.5, date: '5 aug 2020' },
    { id: '6', name: 'Another Name', content: 'Brother asked a very good questions.', rating: 3, date: '5 aug 2020' }
  ]

  var [activeTabId, setActiveTabId] = useState(0);
  const [Tvalue1, setTValue1] = useState('');
  let [allReviews, setAllReviews] = useState();
  let [replyValue, setReplyValue] = useState();
  let [reload, setReload] = useState(false);

  const user = AuthService.getCurrentUser()
  console.log(user)

  const getReviews = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/review/reviews")
      console.log("request")
      console.log(request)
      let finalReviews = [];
      request.data.map((i) => {
        console.log(i.schoolID)
        console.log("yep")
        console.log(user._id)
        if (i.schoolID == user._id) {
          console.log("Inside If1")
          finalReviews.push(i)
        }
      }
      )
      setAllReviews(finalReviews)
      console.log("Final Array")
      console.log(finalReviews)
      return request.data;
    }
    fetchData()
  }, [])

  let handleReply = (id) => {
    console.log("replyValue")
    console.log(id)
    let reply = {
      text: replyValue
    }
    updateReply(reply, id)
  }

  const updateReply = useCallback(async (reply, id) => {
    async function fetchData() {
      let request;
      console.log("NewData")
      console.log(id)
      console.log(reply)

      request = await axios.patch("http://localhost:8080/review/updateReview/" + id, reply)
      console.log("request")
      console.log(request)

      setReload(true)
      return request.data;
    }
    fetchData()
  }, [])

  useEffect(() => {
    getReviews()
    setReload(false)
  }, [reload]);


  let displayReviews //= () => { let displayPostsVar

  if (allReviews != undefined) {
    console.log("inside displayReviews")
    displayReviews = allReviews.map((item) => {
      return (
        <Grid item xs={4} class={classes.top}>
          <Widget disableWidgetMenu>
            <AccountCircle style={{ fontSize: '40' }} />
            <div className={classes.nameanddate}>
              <StarRatings rating={item.rating} starDimension="20px" starSpacing="3px" starRatedColor="#D10B0B" />
              <text className={classes.name}><br /> by <b>{item.username}</b> on {item.date}</text>
            </div>
            <text className={classes.time}>{item.reviewText}</text>
            <div>
              {item.reply.map(function (items) {
                return (
                  <div className={classes.profile1}>
                    {/* <AccountCircleIcon style={{ fontSize: '40' }} /> */}
                    <img className={classes.dp1} src={items.profilePic} />
                    <div className={classes.nameanddate}>
                      <text className={classes.name}>{items.username}</text>
                      <text className={classes.time}>{items.text}</text>
                    </div>
                  </div>
                )
              })}
            </div>
            <div class={classes.commentbox}>
              <InputBase className={classes.reply} onChange={e => setReplyValue(e.target.value)} placeholder='Reply'></InputBase>
              <Send class={classes.commButton} onClick={() => { handleReply(item._id) }} />
            </div>
          </Widget>
        </Grid>
      )
    })

    // displayReviews = <Review reviews={allReviews} />
  } else {
    console.log("nothing")
  }

  return (
    <div>
      <Header />
      <br /><br /><br /><br />
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
                <div>

                </div>
              </React.Fragment>
            )}
            <br />
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

export default withRouter(Feedback);
