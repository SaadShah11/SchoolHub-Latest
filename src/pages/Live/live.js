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
export default function Live() {
  var classes = useStyles();

  return (
    <>
      {stream == 0 ? <div className={classes.no}><Typography variant='h2'>There is no stream available at the moment.</Typography> <Error className={classes.error} /></div> :
        <Grid container spacing={2}>
          <Grid item md={8}>
            <Widget disableWidgetMenu>
              <div className={classes.profile}>
                <AccountCircleIcon style={{ fontSize: '50' }} />
                <div className={classes.nameanddate}>
                  <text className={classes.name}><b>{detail.name}</b> is live now.</text>
                  <text className={classes.time}>{detail.time}</text>
                </div>
              </div>
              <ReactHlsPlayer
                url='http://www.youtube.com/embed/xDMP3i36naA'
                autoplay={false}
                controls={true}
                width={730}
                height="auto"
            />
              {/* <Iframe
                url="http://www.youtube.com/embed/xDMP3i36naA"
                width="700px"
                height="450px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
              /> */}
              {/* <ReactPlayer url='https://dist.bambuser.net/player/?resourceUri=https%3A%2F%2Fcdn.bambuser.net%2Fbroadcasts%2F84297594-ed7d-4015-9384-2e070b253cfe%3Fda_signature_method%3DHMAC-SHA256%26da_id%3D9e1b1e83-657d-7c83-b8e7-0b782ac9543a%26da_timestamp%3D1615116481%26da_static%3D1%26da_ttl%3D0%26da_signature%3D5508a766532d32b59e86fdbf5d79aa8b38dece4ae886f589bdfafd5e4830ca99'/> */}
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
