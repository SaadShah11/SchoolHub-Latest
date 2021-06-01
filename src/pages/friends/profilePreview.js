import React, { useRef, useCallback, useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { Typography, TextField, InputBase, Button, DialogContent, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import pic1 from '../home/school1.jpg'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import SendIcon from '@material-ui/icons/Send';
import AddAPhoto from '@material-ui/icons/AddAPhoto'
//import {CometChatConversationListWithMessages} from "../../lib/cometchat";
//import Chat from "../Chat/chat"


import Post from '../home/post'
import { CometChat } from "@cometchat-pro/chat"

// styles


// components
import DP from './default profile pic.jpg'
import PageTitle from "../../components/PageTitle/PageTitle";
import PhotoIcon from '@material-ui/icons/Photo';
import Widget from "../../components/Widget/Widget";
import Header from '../../components/Header/Header'
import useStyles from "./stylespreview";
import axios from "../../Util/axios"
import AuthService from "../../services/auth.service";
import { storage } from "../../Util/firebase"
import { v4 as uuidv4 } from 'uuid';
//import './style.css'

export default function Home(props) {
  var classes = useStyles();
  const [open, setOpen] = React.useState(false);
  var [allPosts, setAllPosts] = useState()
  var [userData, setUserData] = useState()
  var [currentUserData, setCurrentUserData] = useState()
  let [followValue, setFollowValue] = React.useState(false);
  let [reloadButton, setReloadButton] = React.useState(false);
  let [userDataBool, setUserDataBool] = React.useState(false);
  const allInputs = { imgUrl: '' }

  const user = AuthService.getCurrentUser()
  console.log("User Profile")
  console.log(user)
  const selectedUser = AuthService.getSelectedUser()
  //const selectedUser = props.selectedUser
  console.log("Selected User Profile Preview")
  console.log(selectedUser)
  //console.log(props.selectedUser)

  let handleFollow = (followBool) => {
    console.log("Handle Follow")
    let finalObj = {
      userID: selectedUser.userID,
      follow: followValue
    }
    updateFollowing(finalObj)

  }

  let handleChat = () => {
    var UID = selectedUser.userID;
    // CometChat.getUser(UID).then(
    //   user => {
    //     console.log("User details fetched for user:", user);
    //     props.history.push({ pathname: '/app/inbox', state: user })
    //   },
    //   error => {
    //     console.log("User details fetching failed with error:", error);
    //   }
    // );
    props.history.push({ pathname: '/app/inbox', state: UID })
  }

  const addChat = useCallback(async (finalObj) => {
    async function fetchData() {
      console.log("Final Obj")
      console.log(finalObj)
      let request;
      request = await axios.patch("http://localhost:8080/chat/chatPost/", finalObj)
      //setReloadButton(true)
      return request.data;
    }

    fetchData()
  }, [])

  const updateFollowing = useCallback(async (finalObj) => {
    async function fetchData() {
      console.log("Final Obj")
      console.log(finalObj)
      let request;
      request = await axios.patch("http://localhost:8080/user_management/userProfile/updateFollowing/" + user._id, finalObj)
      //console.log("request")
      setReloadButton(true)
      return request.data;
    }

    fetchData()
  }, [])

  const getUser = useCallback(async () => {
    async function fetchData() {
      let request;
      console.log("Inside Get User")
      request = await axios.get("http://localhost:8080/user_management/userProfile/" + selectedUser.userID)
      //console.log("request")
      let userDataa = request.data
      console.log("User Data")
      console.log(userData)
      setUserData(userDataa[0])

      // setUserDataBool(true)

      // if (userData != undefined) {
      //   if (userData.length !== 0) {
      //     console.log("Inside If")
      //     console.log(userData)
      //     let followExists = userData.following.filter(follow => follow.userID === selectedUser.userID)
      //     if (followExists.length != 0) {
      //       setFollowValue(followExists[0].follow)
      //       console.log("Inside FollowExists")
      //       console.log(followExists[0].follow)
      //     }
      //   }
      // }

      return request.data;
    }

    fetchData()
  }, [])

  const getCurrentUser = useCallback(async () => {
    async function fetchData() {
      let request;
      console.log("Inside Get User")
      request = await axios.get("http://localhost:8080/user_management/userProfile/" + user._id)
      //console.log("request")
      //let userDataa = request.data
      console.log("Current User Data")
      console.log(userData)
      console.log(request.data[0])
      setCurrentUserData(request.data[0])

      setUserDataBool(true)

      if (userData != undefined) {
        if (userData.length !== 0) {
          console.log("Inside If")
          console.log(userData)
          let followExists = userData.following.filter(follow => follow.userID === selectedUser.userID)
          if (followExists.length != 0) {
            setFollowValue(followExists[0].follow)
            console.log("Inside FollowExists")
            console.log(followExists[0].follow)
          }
        }
      }

      return request.data;
    }

    fetchData()
  }, [])

  const getPosts = useCallback(async (bool) => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/dashboard/Home")
      //console.log("request")
      let finalPosts = []
      let allPosts = request.data.reverse()
      allPosts.map((i) => {
        if (selectedUser.userID == i.userID) {
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
    getCurrentUser()

    setReloadButton(false)

    // if (userData != undefined) {
    //   if (userData.length !== 0) {
    //     console.log("Inside If")
    //     console.log(userData)
    //     let followExists = userData.following.filter(follow => follow.userID === selectedUser.userID)
    //     if (followExists.length != 0) {
    //       setFollowValue(followExists[0].follow)
    //       console.log("Inside FollowExists")
    //       console.log(followExists[0].follow)
    //     }
    //   }
    // }

  }, [reloadButton]);


  let displayPosts

  try {
    if (allPosts != undefined) {
      //console.log("inside displayPost")
      displayPosts = allPosts.map((i) => {
        return <Post key={i._id} id={i._id}
          username={i.username} time={i.time} text={i.text} image={i.image} comments={i.comments} likes={i.likes} //onSelect={this.onSelect} 
        />
      })
    } else {
      console.log("nothing")
    }
  } catch (err) {
    console.log("error")
    console.log(err)
  }



  let userDetails

  try {
    if (userData != undefined) {
      console.log("inside diaplay Details")
      userDetails = <div>

      </div>
    } else {
      console.log("nothing")
    }
  } catch (err) {
    console.log("error")
    console.log(err)
  }

  return (
    <>
      <div className={classes.main}>

        {
          userData == undefined ? <div>Loading...</div> :
            <div className={classes.info}>

              {userDataBool ? <div><div>
                <img className={classes.dp} src={userData.profilePic} /></div>
                <br />
                {/* {
                  followValue ? <Button onClick={() => handleFollow(false)}>Unfollow</Button> : <Button onClick={() => handleFollow(true)}>Follow</Button>
                } */}
                <Button onClick={() => handleChat()}>Message</Button>
                <Typography variant="h5">{userData.username} </Typography>
                <Typography >{userData.type}</Typography>
                <Typography >{userData.email}</Typography></div> : <text>Loading</text>}
              <Button variant="contained" onClick={() => props.history.push('/profilePage')}>View Profile</Button>

            </div>
        }

      </div>
    </>
  );
}
