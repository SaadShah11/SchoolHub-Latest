import React, { useRef } from "react";
import { Grid } from "@material-ui/core";
import { Typography, TextField, InputBase, Button, DialogContent, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import pic1 from '../home/school1.jpg'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import SendIcon from '@material-ui/icons/Send';
import AddAPhoto from '@material-ui/icons/AddAPhoto'

// styles
import useStyles from "./styles";

// components
import DP from './dp.jpg'
import PageTitle from "../../components/PageTitle/PageTitle";
import PhotoIcon from '@material-ui/icons/Photo';
import Widget from "../../components/Widget/Widget";
import Header from '../../components/Header/Header'
const comment = [
  { id: '1', name: 'Ali Khan', content: 'Nice pic dear.' },
  { id: '2', name: 'John Snow', content: 'Congratulation on your shadi.' },
  { id: '3', name: 'Another Name', content: 'Brother asked a very good questions.' }
]
const user = { firstName: 'Muhammad', 
              lastName:'Osama', 
              email: 'mosama4u@gmail.com', 
              type: 'student' ,
              contact:'+92333535782'};
export default function Home(props) {
  var classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Header history={props.history} />
      <br /><br /><br /><br />

      <div className={classes.main}>

        <div className={classes.info}>
          <Widget disableWidgetMenu>
            <div >
              <img className={classes.dp} src={DP} />
              <AddAPhoto className={classes.editimage} />
            </div>
            <Typography variant="h5">{user.firstName} {user.lastName} </Typography>
            <Typography >{user.type}</Typography>
            <Typography >{user.email}</Typography>
            <Button variant='contained' style={{ marginTop: '5px' }} onClick={handleClickOpen}>Edit Profile</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
              <DialogContent>
                <div className={classes.editfields}>
                  <Typography>First Name: </Typography>
                  <InputBase value={user.firstName} className={classes.editinputs}></InputBase>
                </div>
                <div className={classes.editfields}>
                  <Typography>Last Name: </Typography>
                  <InputBase value={user.lastName} className={classes.editinputs}></InputBase>
                </div>
                <div className={classes.editfields}>
                  <Typography>Phone number: </Typography>
                  <InputBase value={user.contact}  className={classes.editinputs}></InputBase>
                </div>
                <div className={classes.editfields}>
                  <Typography>Old Password: </Typography>
                  <InputBase type='password' className={classes.editinputs}></InputBase>
                </div>
                <div className={classes.editfields}>
                  <Typography>New Password: </Typography>
                  <InputBase type='password' className={classes.editinputs}></InputBase>
                </div>
                <div className={classes.editfields}>
                  <Typography>Confirm New Password:  </Typography>
                  <InputBase type='password' className={classes.editinputs}></InputBase>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                  </Button>
                <Button onClick={handleClose} color="primary">
                  Update
                  </Button>
              </DialogActions>
            </Dialog>
          </Widget>

        </div>


        <div style={{ marginLeft: '28%' }}>
          <Grid container spacing={4} >
            <Post />
            <Post />
            <Post />
          </Grid>
        </div>

      </div>
    </>
  );
}
function Post() {
  var classes = useStyles();

  const searchInput = useRef(null)
  function handleFocus() {
    searchInput.current.focus()
  }

  return (
    <Grid item md={8}>
      <Widget disableWidgetMenu>

        <div className={classes.postmain} >
          <div className={classes.post}>
            <div className={classes.profile}>
              <AccountCircleIcon style={{ fontSize: '50' }} />
              <div className={classes.nameanddate}>
                <text className={classes.name}>{user.firstName} {user.lastName}</text>
                <text className={classes.time}>2 hours ago</text>
              </div>
            </div>
            <div className={classes.posttext}>
              <text >Hello this is some text, Hello this is some text.</text>
            </div>
            <img className={classes.pic} src={pic1} />
          </div>
          <div class={classes.likeComm}>
            <div class={classes.like} ><ThumbUpAltIcon fontSize='medium' /><text style={{ fontSize: '16px' }}>Like</text></div>
            <div onClick={handleFocus} class={classes.comm}><CommentIcon fontSize='medium' /><text style={{ fontSize: '16px' }}>Comment</text></div>
          </div>
          <div class={classes.commentbox}>
            <InputBase className={classes.comment} inputRef={searchInput} placeholder='Leave a comment'></InputBase>
            <SendIcon class={classes.commButton} />
          </div>
          <div>
            {comment.map(function (item) {
              return (
                <div className={classes.profile1}>
                  <AccountCircleIcon style={{ fontSize: '40' }} />
                  <div className={classes.nameanddate}>
                    <text className={classes.name}>{item.name}</text>
                    <text className={classes.time}>{item.content}</text>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </Widget>
    </Grid>
  )
}