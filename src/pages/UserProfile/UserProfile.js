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
import { storage } from "../../Util/firebase"
import { v4 as uuidv4 } from 'uuid';
import './style.css'

export default function Home(props) {
  var classes = useStyles();
  const [open, setOpen] = React.useState(false);
  var [allPosts, setAllPosts] = useState()
  var [userData, setUserData] = useState({ profilePic: "" })
  const allInputs = { imgUrl: '' }
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState(allInputs)
  var [imgBoolean, setImageBoolean] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const user = AuthService.getCurrentUser()
  console.log(user)

  const getUser = useCallback(async () => {
    async function fetchData() {
      let request;
      console.log("Inside Get User")
      request = await axios.get("http://localhost:8080/user_management/userProfile/" + user._id)
      console.log("request")
      let userDataa = request.data
      setUserData(userDataa[0])

      return request.data;
    }

    fetchData()
  }, [])

  const getPosts = useCallback(async (bool) => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/dashboard/Home")
      console.log("request")
      let finalPosts = []
      let allPosts = request.data.reverse()
      allPosts.map((i) => {
        if (user.username == i.username) {
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
    getUser()
    
  }, []);

  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    console.log("image")
    console.log(image)

    if (image !== undefined) {
      var imageExtension = image.name.split('.').pop();
      console.log(imageExtension)

      let newImage = uuidv4() + '.' + imageExtension;
      console.log(newImage)

      setImageAsFile(imageFile => (image))//(newImage))

      //imgBool = true
      setImageBoolean(true)
    }

  }

  const handleFireBaseUpload = e => {
    //e.preventDefault()
    console.log('start of upload')
    // async magic goes here...
    if (imageAsFile === '') {
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
    }
    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)

    //initiates the firebase side uploading 
    uploadTask.on('state_changed',
      (snapShot) => {
        //takes a snap shot of the process as it is happening
        console.log(snapShot)
      }, (err) => {
        //catches the errors
        console.log(err)
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
          .then(fireBaseUrl => {
            setImageAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
          })

      })

      
  }

  const updateProfilePic = useCallback(async (img) => {
    console.log("Inside Update Profile Pic")
    async function fetchData() {
      let request;
      console.log("New Pic")
      console.log(img)
      request = await axios.patch("http://localhost:8080/user_management/userProfile/updateProfilePic/" + user._id, img)
      console.log("request")
      console.log(request)
      //setReloadPost(true)
      window.location.reload()
      return request.data;
    }
    fetchData()
  }, [])

  if (imgBoolean === true) {
    console.log("inside if")
    if (imageAsUrl.imgUrl === '') {
      console.log("empty img")
      console.log(imageAsUrl.imgUrl)
    } else {
      console.log("inside else img")
      console.log(imageAsUrl.imgUrl)
      let img = {
        profilePic: imageAsUrl.imgUrl
      }
      updateProfilePic(img)
      setImageBoolean(false)
    }
  } else {
    console.log("bool:")
    console.log(imgBoolean)
  }

  console.log("Img URL")
  console.log(imageAsUrl.imgUrl)
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
            <div>
              <img className={classes.dp} src={userData.profilePic} />
              {/* replace with add icon */}
              <form onSubmit={handleFireBaseUpload}>
                <div id='updateImg'>
                  <AddAPhoto className={classes.editimage} />
                  <input type="file" onChange={handleImageAsFile} />

                </div>
                <Button type='submit'>Update</Button>
              </form>

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
          <Grid container spacing={4}>
            {
              displayPosts
            }
          </Grid>
        </div>

      </div>
    </>
  );
}
