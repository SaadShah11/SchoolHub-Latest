import React, { useRef, useState, useCallback, useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import { TextField, InputBase, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Widget from "../../components/Widget/Widget";
import axios from "../../Util/axios"
import Carousel from 'react-grid-carousel';
import StarRatings from 'react-star-ratings';
import { Send, AccountCircle as DP, ThreeDRotation as AR, Apartment as Apartment, LiveTv as Stream, People as People } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  main: {
    marginLeft: '20%',
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '30px'
  },
  avg: {
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: 'bold',
    fontSize: '15px'
  },
  name: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: "center",
  },
  replybutton: {
    color: 'blue',
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline'
    }
  },
  comment: {
    padding: '5px',
    width: "95%"
  },
  commButton: {
    width: '25px',
    height: '25px',
    marginTop: '7px'
  },
  commentbox: {
    display: "flex",
    flexDirection: 'row',
    borderBottom: '1px solid rgba(0,0,0, 0.2)',
  },
}));
const reviews = [
  { id: '1', name: 'Ali Khan', content: 'One of my favourite sohool, very good services and reponse. rating it 5 because it is the best.', rating: 5, date: '5 aug 2020' },
  { id: '2', name: 'John Snow', content: 'Congratulation on your shadi.', rating: 4.5, date: '5 aug 2020' },
  { id: '3', name: 'Another Name', content: 'Brother asked a very good questions.', rating: 3, date: '5 aug 2020' },
  { id: '4', name: 'Ali Khan', content: 'One of my favourite sohool, very good services and reponse. rating it 5 because it is the best.', rating: 5, date: '5 aug 2020' },
  { id: '5', name: 'John Snow', content: 'Congratulation on your shadi.', rating: 4.5, date: '5 aug 2020' },
  { id: '6', name: 'Another Name', content: 'Brother asked a very good questions.', rating: 3, date: '5 aug 2020' }

]
export default function Reviews() {
  var classes = useStyles()
  const [open, setOpen] = React.useState('none');

  let [reloadHome, setReloadHome] = useState(false)
  var [allReviews, setAllReviews] = useState()
  var [status, setStatus] = useState()
  let [replyValue, setReplyValue] = useState();
  //let [reload, setReload] = useState(false);

  const getReviews = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/mainReview/schoolhubReviews")
      console.log("request")
      console.log(request.data)
      setAllReviews(request.data.reverse())
      return request.data;
    }
    //And here you call it
    fetchData()
    setReloadHome(true)
  }, [])

  let handleReply = (id) => {
    console.log("replyValue")
    console.log(id)
    //Add schoolIcon later
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

      request = await axios.patch("http://localhost:8080/mainReview/updateReview/" + id, reply)
      console.log("request")
      console.log(request)

      setReloadHome(true)
      //return request.data;
    }
    fetchData()
  }, [])

  useEffect(() => {
    getReviews()
    //setIsLoading(true)
    setReloadHome(false)
    //getItems().then(data => setItems(data));
  }, [reloadHome]);

  const handleClickOpen = () => {
    open == 'none' ? setOpen("block") : setOpen("none");
  };

  let displayReviews //= () => { let displayPostsVar

  try {
    if (allReviews != undefined) {

      displayReviews = allReviews.map((item) => {
        return (
          <Grid item xs={10} class={classes.top}>
            <Widget disableWidgetMenu>
              <div className={classes.name}>
                <DP style={{ fontSize: '45' }} />
                <div className={classes.namerate}>
                  <text className={classes.name}>by<b> {item.username} </b>  on <b>{item.date}</b></text>
                  <StarRatings rating={item.rating} starDimension="20px" starSpacing="3px" starRatedColor="#D10B0B" />
                </div>
              </div>
              <text className={classes.time}>{item.reviewText}</text>
              <br />
              <div>
                {item.reply.map(function (items) {
                  return (
                    <div className={classes.profile1}>
                      {/* <AccountCircleIcon style={{ fontSize: '40' }} /> */}
                      <img className={classes.dp1} src={items.schoolIcon} />
                      <div className={classes.nameanddate}>
                        {/* <text className={classes.name}>{items.username}</text> */}
                        <text className={classes.time}>{items.text}</text>
                      </div>
                    </div>
                  )
                })}
              </div>
              {/* <br />
              <text className={classes.replybutton} onClick={handleClickOpen}>Reply</text> */}
              <br />
              {/* <div style={{ display: open, borderBottom: '1px solid rgba(0,0,0, 0.2)' }}>
                <InputBase className={classes.comment} placeholder='Reply here'></InputBase>
                <Send class={classes.commButton} />
              </div> */}
              <div class={classes.commentbox}>
                <InputBase className={classes.reply} onChange={e => setReplyValue(e.target.value)} placeholder='Reply'></InputBase>
                <Send class={classes.commButton} onClick={() => { handleReply(item._id) }} />
              </div>
            </Widget>
          </Grid>
        )
      })

    }
    else {
      console.log("nothing")
    }
  } catch (err) {
    console.log("error")
    console.log(err)
  }


  return (
    <div className={classes.main}>
      <Typography className={classes.title} variant="h5" weight="bold"> Reviews and Feedbacks</Typography>
      <div className={classes.avg}>
        <text>Average Ratings</text>
        <text style={{ fontSize: '14px' }}>({reviews.length} Reviews)</text>
        <StarRatings rating={4} starDimension="18px" starSpacing="3px" starRatedColor="#D10B0B" />
      </div>
      <Grid container spacing={1}>
        {
          displayReviews
        }
      </Grid>
    </div>

  )
}