import React from "react";
import { useState, useCallback, useContext, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { TextField, InputBase, CircularProgress } from "@material-ui/core";

// styles
import useStyles from "./styles";
import Loading from "../../components/Loading/loading"

// components
import Post from "./post"
import Widget from "../../components/Widget/Widget";
import { storage } from "../../Util/firebase"
// import { useForm } from '../../shared/hooks/form-hook';
// import { useHttpClient } from '../../shared/hooks/http-hook';
//import { AuthContext } from '../context/auth-context';

import axios from "../../Util/axios"
import AuthService from "../../services/auth.service";
import { v4 as uuidv4 } from 'uuid';
import GetAllPosts from './getPosts'

let post = {
  userID: "",
  username: "",
  text: "",
  image: "",
  likes: {},
  time: "",
  comments: {}
}

const user = AuthService.getCurrentUser()
console.log("Current User")
console.log(user)

export default function Home(props) {

  var [isLoading, setIsLoading] = useState(false);
  var [loadingPage, setLoadingPage] = useState(false);
  var [onlyTextBool, setOnlyTextBool] = useState(false);
  var [allPosts, setAllPosts] = useState()
  var [kee, setKee] = useState()
  let [reloadHome, setReloadHome] = useState(false)

  const getPosts = useCallback(async (bool) => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/dashboard/Home")
      console.log("request")

      let finalArr = []
      request.data.filter((post) => {
        console.log("Step 1")
        if (user != undefined) {
          if(user._id==post.userID){
            finalArr.push(post)
          }
          if (user.following != null || user.following != [] || user.following != undefined) {
            console.log("Step 2")
            for (let i = 0; i < user.following.length; i++) {
              if (user.following[i].follow == true && user.following[i].userID == post.userID) {
                console.log("Post found")
                finalArr.push(post)
              }
              
            }
          }
        }

      })
      console.log("Final Array")
      console.log(finalArr)
      //setAllPosts(request.data.reverse())
      setAllPosts(finalArr.reverse())
      return request.data;
    }
    //And here you call it
    fetchData()
    setReloadHome(true)
  }, [])

  //const auth = useContext(AuthContext);
  var classes = useStyles();

  // var [useridValue, setUseridValue] = useState("");
  // var [usernameValue, setUsernameValue] = useState("");
  var [textValue, setTextValue] = useState("");
  var [likesValue, setLikesValue] = useState([]);
  //var [timeValue, setTimeValue] = useState("");
  var [commentValue, setCommentValue] = useState([]);
  var [imgBoolean, setImageBoolean] = useState()

  let postBool;
  let imgBool;

  // const allInputs = { imgUrl: '' }
  const [imageAsFile, setImageAsFile] = useState('')
  const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: '' })
  const [progress, setProgress] = useState(0)

  const handleImageAsFile = (e) => {
    const image = e.target.files[0]
    // console.log("image")
    // console.log(image)

    if (image !== undefined) {
      var imageExtension = image.name.split('.').pop();
      console.log(imageExtension)

      let newImage = uuidv4() + '.' + imageExtension;
      console.log(newImage)

      // setImageAsFile(imageFile => (image))//(newImage))
      setImageAsFile(image)

      imgBool = true
      setImageBoolean(true)
    }
  }

  const handleFireBaseUpload = e => {
    //e.preventDefault()

    // async magic goes here...
    if (imageAsFile === '') {
      setOnlyTextBool(true)
      console.error(`not an image, the image file is a ${typeof (imageAsFile)}`)
    } else {
      console.log('start of upload')
      const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)

      //initiates the firebase side uploading 
      uploadTask.on('state_changed',
        (snapShot) => {
          //takes a snap shot of the process as it is happening
          const progress = Math.round(
            (snapShot.bytesTransferred / snapShot.totalBytes) * 100
          );
          setProgress(progress)
          if (progress == 100) {
            setProgress(0)
          }
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

  }

  const postSubmit = (PostBool) => {

    setLoadingPage(true)

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

    console.log("inside postSubmit")

    post.userID = user._id
    post.username = user.username
    post.text = textValue
    post.image = imageAsUrl.imgUrl
    post.likes = likesValue
    post.time = timee
    post.comments = commentValue

    console.log(postBool)

    console.log("Post")
    console.log(post)
    sendRequest(postBool)
  }

  //Snippet of code which runs based on a specific condition 
  const sendRequest = useCallback(async (postBool) => {

    console.log("inside useEffect")
    async function fetchData() {
      //await means wait for the requests come back
      console.log('inside fetchdata')
      let request;
      console.log(postBool)
      if (postBool === true) {

        console.log("inside post")
        console.log(post)
        request = await axios.post("http://localhost:8080" + props.fetchUrl, post)
        console.log("request")
        console.log(request)

        setLoadingPage(false)
        setReloadHome(true)
        return request;
      } else {
        console.log("post is false")
      }
    }
    //And here you call it
    fetchData()
    postBool = false;

  }, [])

  if (imgBoolean === true) {
    console.log("inside if")
    if (imageAsUrl.imgUrl === '') {
      console.log("empty img")
      console.log(imageAsUrl.imgUrl)

    } else {
      console.log("inside else img")
      postBool = true
      postSubmit(postBool)
      setImageBoolean(false)
    }
  } else {
    if (onlyTextBool == true) {
      postBool = true
      postSubmit(postBool)
    }
    console.log("bool:")
    console.log(imgBoolean)
  }

  console.log("Kee")
  console.log(kee)

  let displayPosts //= () => { let displayPostsVar

  try {
    if (allPosts != undefined) {
      console.log("inside displayPost")
      // {return <GetAllPosts allPosts= {allPosts}/>}
      displayPosts = allPosts.map((i) => {
        return <Post key={i._id} id={i._id}
          username={i.username} userID={i.userID} time={i.time} text={i.text} image={i.image} comments={i.comments} likes={i.likes} totalLikes={i.totalLikes}//onSelect={this.onSelect} 
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

  //}

  useEffect(() => {
    getPosts()
    //setIsLoading(true)
    setReloadHome(false)
    //getItems().then(data => setItems(data));
  }, [reloadHome]);

  return (
    <>
      <Grid container spacing={4}>
        {
          loadingPage ? <Loading /> :
            <Grid item md={8}>
              <progress value={progress} max="100" />
              <Widget title="What's on your mind?" disableWidgetMenu>
                <form onSubmit={handleFireBaseUpload}>
                  <TextField className={classes.textfield} value={textValue}
                    onChange={e => setTextValue(e.target.value)} placeholder='Post here...'></TextField>

                  <div className={classes.postbottom}>
                    <div className={classes.postbottomL} >
                      {/* <PhotoIcon fontSize='large' className='icon' />
                <text>Upload photo</text> */}
                      <input
                        type="file"
                        // multiple
                        onChange={handleImageAsFile}
                      />
                    </div>
                    <button type='submit' className={classes.postButton}>Post</button>
                  </div>
                </form>
              </Widget>
              {/* <div><img src={imageAsUrl.imgUrl} alt="image tag" /></div> */}
            </Grid>
        }
        {/* <img src={imageAsUrl.imgUrl} alt="image tag" /> */}

        <div style={{ width: '95%', marginLeft: '15px' }}>
          {
            allPosts == undefined ? <div>Loading...</div> : displayPosts
          }
        </div>

      </Grid>


    </>
  );
}