import React, { useRef, useCallback, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Typography, TextField, InputBase, Button, DialogContent, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import pic1 from '../home/school1.jpg'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import SendIcon from '@material-ui/icons/Send';
import AddAPhoto from '@material-ui/icons/AddAPhoto'

import Post from '../home/post'

// styles
import useStyles from "./styles";

// components
import DP from './default profile pic.jpg'
import PageTitle from "../../components/PageTitle/PageTitle";
import PhotoIcon from '@material-ui/icons/Photo';
import Widget from "../../components/Widget/Widget";
import Header from '../../components/Header/Header'

import axios from "../../Util/axios"
import AuthService from "../../services/auth.service";

const user = {
  firstName: 'Muhammad',
  lastName: 'Osama',
  email: 'mosama4u@gmail.com',
  type: 'student',
  contact: '+92333535782'
};

export default function Home(props) {
  var classes = useStyles();
  const [open, setOpen] = React.useState(false);
  var [allPosts, setAllPosts] = useState()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const user = AuthService.getCurrentUser()
  console.log(user)

  const getPosts = useCallback(async (bool) => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/dashboard/Home")
      console.log("request")
      let finalPosts = []
      let allPosts = request.data.reverse()
      allPosts.map((i)=>{
        if(user.username == i.username){
          finalPosts.push(i)
        }
      })
      setAllPosts(finalPosts)
      return request.data;
    }
    //And here you call it
    fetchData()
  }, [])

  useEffect(() => {
    getPosts()
  }, []);

  let displayPosts //= () => { let displayPostsVar

  try {
    if (allPosts != undefined) {
      console.log("inside displayPost")
      // {return <GetAllPosts allPosts= {allPosts}/>}
      displayPosts = allPosts.map((i) => {
        return <Post key={i._id} id={i._id}
          username={i.username} time={i.time} text={i.text} image={i.image} comments={i.comments} likes={i.likes} //onSelect={this.onSelect} 
        />
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
            <Typography variant="h5">{user.username} </Typography>
            <Typography >{user.type}</Typography>
            <Typography >{user.email}</Typography>
            <Button variant='contained' style={{ marginTop: '5px' }} onClick={handleClickOpen}>Edit Profile</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
              <DialogContent>
                <div className={classes.editfields}>
                  <Typography>Username: </Typography>
                  <InputBase value={user.username} className={classes.editinputs}></InputBase>
                </div>
                <div className={classes.editfields}>
                  <Typography>Phone number: </Typography>
                  <InputBase value={user.phoneNumber} className={classes.editinputs}></InputBase>
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
            {
              displayPosts
            }
          </Grid>
        </div>

      </div>
    </>
  );
}
