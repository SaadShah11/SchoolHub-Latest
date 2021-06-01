
import React from "react";
import { useState, useCallback, useRef, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { TextField, InputBase, Button, InputLabel } from "@material-ui/core";
import pic1 from './school1.jpg'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import SendIcon from '@material-ui/icons/Send';

// styles
import useStyles from "./styles";
import axios from "../../Util/axios"

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import PhotoIcon from '@material-ui/icons/Photo';
import Widget from "../../components/Widget/Widget";
import { storage } from "../../Util/firebase"
import AuthService from "../../services/auth.service";
// import { useForm } from '../../shared/hooks/form-hook';
// import { useHttpClient } from '../../shared/hooks/http-hook';
//import Card from '../../shared/Card'

let newComment = {
    comments: []
}

let newLike = {
    likes: []
}

let commentsWithImg;

export default function Post(props) {

    const user = AuthService.getCurrentUser()

    let [commentValue, setCommentValue] = useState();
    let [likesValue, setLikesValue] = useState(false);
    let [postImg, setPostImg] = useState();
    let [postLikes, setPostlikes] = useState(props.totalLikes);

    //let [reloadPost, setReloadPost] = useState(false)

    var classes = useStyles();

    const searchInput = useRef(null)
    function handleFocus() {
        searchInput.current.focus()
    }

    let handleSendComment = () => {
        let finalComment = {
            userID: user._id,
            text: commentValue,
            username: user.username
        }

        newComment.comments = finalComment
        postComment()
    }


    let handleSendLike = (likeBool) => {

        setLikesValue(likeBool)

        let finalLike = {
            userID: user._id,
            username: user.username,
            like: likeBool
        }

        newLike.likes = finalLike
        postLike()
    }

    const getPostImg = useCallback(async () => {
        async function fetchData() {
            let request;
            request = await axios.get("http://localhost:8080/user_management/userProfile/" + props.userID)
            console.log("request")
            console.log(request)
            setPostImg(request.data[0].profilePic)
            //window.location.reload()
            return request.data;
        }
        fetchData()
    }, [])

    const getCommentImg = useCallback(async (object) => {
        async function fetchData() {
            let request;
            request = await axios.get("http://localhost:8080/user_management/userProfile/" + object.userID)
            console.log("getCommentIng Request")
            console.log(request.data[0].profilePic)
            //window.location.reload()
            return request.data[0].profilePic;
        }
        fetchData()
    }, [])

    const postComment = useCallback(async () => {
        async function fetchData() {
            let request;
            console.log("NewData")
            console.log(newComment)
            request = await axios.patch("http://localhost:8080/dashboard/updateComment/" + props.id, newComment)
            console.log("request")
            console.log(request)
            //setReloadPost(true)
            window.location.reload()
            return request.data;
        }
        fetchData()
    }, [])

    const postLike = useCallback(async () => {
        async function fetchData() {
            let request;
            console.log("NewData")
            console.log(newLike)
            request = await axios.patch("http://localhost:8080/dashboard/updateLike/" + props.id, newLike)
            console.log("request")
            console.log(request)
            setPostlikes(request.data.totalLikes)
            //setReloadPost(true)
            //window.location.reload()
            return request.data;
        }
        fetchData()
    }, [])

    useEffect(() => {

        getPostImg()

        if (props.likes.length !== 0) {
            console.log("Inside If")
            console.log(props.likes)
            let likeExists = props.likes.filter(like => like.userID === user._id)
            if (likeExists.length != 0) {
                setLikesValue(likeExists[0].like)
            }
        }

    }, []);

    useEffect(() => {
        //let count = 0;
        
        for(let i=0;i<props.comments.length;i++){
            let commentImg = getCommentImg(props.comments[i])
            console.log("Inside commentimg for loop")
            console.log(commentImg)
            //console.log(i)
            //console.log(props.comments[i])
            
            props.comments[i].userImg = commentImg
            
        }

        // commentsWithImg = props.comments.map((i) => {
        //     let commentImg = getCommentImg(i)
        //     console.log(count)
        //     console.log(commentImg)
        //     props.comments[count].userImg = commentImg
        //     count++
        // })

        console.log("Updated Comments")
        console.log(props.comments)
    }, []);

    let correctIcon = () => {
        if (likesValue === true) {
            return <div><ThumbUpAltIcon onClick={() => handleSendLike(false)} color="primary" fontSize='medium' /></div>
        }
        else {
            return <div><ThumbUpAltIcon onClick={() => handleSendLike(true)} fontSize='medium' /></div>
        }
    }

    return (
        <Grid item md={8}>
            <Widget disableWidgetMenu>

                <div className={classes.postmain} >
                    <div className={classes.post}>
                        <div className={classes.profile}>
                            {/* <AccountCircleIcon src={postImg} style={{ fontSize: '50' }} /> */}
                            <img className={classes.dp} src={postImg} />
                            <div className={classes.nameanddate}>
                                <text className={classes.name}>{props.username}</text>
                                <text className={classes.time}>{props.time}</text>
                            </div>
                        </div>
                        <div className={classes.posttext}>
                            <text >{props.text}</text>
                        </div>
                        <img className={classes.pic} src={props.image} />
                    </div>
                    <div class={classes.likeComm}>
                        <div class={classes.like} >
                            {
                                correctIcon()
                            }
                            <text style={{ fontSize: '16px' }}>Like</text>
                            <text>&ensp;({postLikes})</text>
                        </div>
                        <div onClick={handleFocus} class={classes.comm}><CommentIcon fontSize='medium' />
                            <text style={{ fontSize: '16px' }}>Comment</text></div>
                    </div>
                    {/* <div class={classes.commentbox}> */}
                    <div class={classes.commentbox}>
                        <InputBase className={classes.comment} inputRef={searchInput} onChange={e => setCommentValue(e.target.value)}
                            placeholder='Leave a comment'></InputBase>
                        <Button onClick={() => handleSendComment()}> <SendIcon class={classes.commButton} /></Button>
                    </div>
                    <div>
                        {props.comments.map(function (item) {
                            return (
                                <div className={classes.profile1}>
                                    {/* <AccountCircleIcon style={{ fontSize: '40' }} /> */}
                                    <img className={classes.dp1} src={item.userImg} />
                                    <div className={classes.nameanddate}>
                                        <text className={classes.name}>{item.username}</text>
                                        <text className={classes.time}>{item.text}</text>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {/* </div> */}

                </div>

            </Widget>
        </Grid>

    )
}