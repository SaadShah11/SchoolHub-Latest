import React, { useRef } from "react";
import { Grid, Typography } from "@material-ui/core";
import { TextField, InputBase, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Error from '@material-ui/icons/Error';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import SendIcon from '@material-ui/icons/Send';
import ReactPlayer from 'react-player'
import Iframe from 'react-iframe'
import ReactHlsPlayer from 'react-hls-player'
//import Iframe from 'react-iframe'
// styles


// components
import PageTitle from "../../components/PageTitle/PageTitle";
import PhotoIcon from '@material-ui/icons/Photo';
import Widget from "../../components/Widget/Widget";
import { PhotoSizeSelectActual } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  nameanddate: {
    display: 'flex',
    flexDirection: 'column'
  },
  profile1: {
    margin: 'auto',
    width: '99   %',
    backgroundColor: '#F7F7F7',
    borderRadius: '6px',
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    marginTop: "5px",
  },
  time: {
    fontSize: '12px',
  },
  comment: {
    padding: '5px',
    width: "98%"
  },
  name: {

    '&:hover': {
      cursor: 'pointer',
      color: '#767575'
    }
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
    borderTop: '1px solid rgba(0,0,0, 0.2)',
  },
  profile: {
    display: "flex",
    flexDirection: 'row',
    alignItems: "center",
    borderBottom: '1px solid rgba(0,0,0, 0.3)',
    paddingBottom: "5px",
    marginBottom: '5px',

  },
  comments: {
    height: '500px',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'flex-End'
  },
  no: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: 'auto',
    height: '75vh',
    textAlign: 'center',
    width: '70%',
    color: 'rgba(0,0,0, 0.5)'
  },
  error: {
    margin: 'auto',
    width: '200px',
    height: '200px'
  },
}))

const comment = [
  { id: '1', name: 'Ali Khan', content: 'Nice pic dear.' },
  { id: '2', name: 'John Snow', content: 'Congratulation on your shadi.' },
  { id: '3', name: 'Another Name', content: 'Brother asked a very good questions.' }
]
const detail = { name: 'School-Hub', time: '20 mins ago' }
var stream = 1
export default function Live(props) {

  var classes = useStyles();
  console.log("props")
  console.log(props.location.state)
  let liveStreamData = props.location.state

  let srcUrl = "https://dist.bambuser.net/player/?resourceUri="
  //let url = 'https%3A%2F%2Fcdn.bambuser.net%2Fgroups%2F101842%2Fbroadcasts%3Fby_authors%3D%26title_contains%3D%26has_any_tags%3D%26has_all_tags%3D%26da_id%3D60ab58d7-50fb-320f-94fd-6b79d9cb36b4%26da_timestamp%3D1621954098%26da_signature_method%3DHMAC-SHA256%26da_ttl%3D0%26da_static%3D1%26da_signature%3Dcac1fbd7eac0b1d480f6992d50c8748fa32eb6d1bd6e6e7c63769b90b06733ba'
  //let url = 'https://cdn.bambuser.net/groups/101842/broadcasts?by_authors=&title_contains=&has_any_tags=&has_all_tags=&da_id=60ab58d7-50fb-320f-94fd-6b79d9cb36b4&da_timestamp=1621954098&da_signature_method=HMAC-SHA256&da_ttl=0&da_static=1&da_signature=cac1fbd7eac0b1d480f6992d50c8748fa32eb6d1bd6e6e7c63769b90b06733ba'
  //let url = 'https://cdn.bambuser.net/broadcasts/9b4864a2-1b2b-499c-95ca-725a7b00771b?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1621602118&da_static=1&da_ttl=0&da_signature=53be188ce17b88497584701a5cc31fec167a33811190208cb187cfa926035767'
  let url = liveStreamData.resourceURI
  //let url = 'https://cdn.bambuser.net/broadcasts/9b4864a2-1b2b-499c-95ca-725a7b00771b?da_signature_method=HMAC-SHA256&da_id=9e1b1e83-657d-7c83-b8e7-0b782ac9543a&da_timestamp=1621602118&da_static=1&da_ttl=0&da_signature=53be188ce17b88497584701a5cc31fec167a33811190208cb187cfa926035767'
  const uri = encodeURIComponent(url);
  console.log(uri)
  let srcUrl1 = srcUrl + uri
  console.log(srcUrl1)

  return (
    <>
      {stream == 0 ? <div className={classes.no}><Typography variant='h2'>There is no stream available at the moment.</Typography> <Error className={classes.error} /></div> :
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Widget disableWidgetMenu>
              <div className={classes.profile}>
                <AccountCircleIcon style={{ fontSize: '50' }} />
                <div className={classes.nameanddate}>
                  <text className={classes.name}><b>{liveStreamData.schoolName}</b> is live now.</text>
                  <text className={classes.time}>Start Time: {liveStreamData.startTime}</text>
                </div>
              </div>
              <Iframe src={srcUrl1} style="border: none" width="850px"
        height="450px"></Iframe>
              
            </Widget>
          </Grid>
          <Grid item md={4}>
            <Widget title='Comments' disableWidgetMenu>
              <div className={classes.comments}>
                <div>
                  {comment.map(function (item) {
                    return (
                      <div className={classes.profile1}>
                        <AccountCircleIcon style={{ fontSize: '40' }} />
                        <div className={classes.nameanddate}>
                          <text className={classes.name}><b>{item.name}</b></text>
                          <text className={classes.time}>{item.content}</text>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div class={classes.commentbox}>
                  <InputBase className={classes.comment} placeholder='Leave a comment'></InputBase>
                  <SendIcon class={classes.commButton} />
                </div>
              </div>
            </Widget>
          </Grid>
        </Grid>}
    </>
  );
}
