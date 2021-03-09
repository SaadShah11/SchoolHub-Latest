
import React from "react";
import { useState, useCallback, useRef } from "react";
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

let newData = {
    comments: [],
    likes: ""
}

export default function Post(props) {

    const user = AuthService.getCurrentUser()

    let [commentValue, setCommentValue] = useState();
    let [likesValue, setLikesValue] = useState(false);
    //let [reloadPost, setReloadPost] = useState(false)

    var classes = useStyles();

    const searchInput = useRef(null)
    function handleFocus() {
        searchInput.current.focus()
    }

    let handleLikes = () => {
        setLikesValue(!likesValue)
        console.log(likesValue)
    }

    let handleSend = () => {
        let finalComment = {
            text: commentValue,
            username: user.username
        }
        newData.comments = finalComment
        if (likesValue === true) {
            newData.likes = 1
        } else {
            newData.Likes = 0
        }
        console.log(props.id)
        postComment()
    }

    const postComment = useCallback(async () => {
        async function fetchData() {
            let request;
            console.log("NewData")
            console.log(newData)
            request = await axios.patch("http://localhost:8080/dashboard/" + props.id, newData)
            console.log("request")
            console.log(request)
            //setReloadPost(true)
            window.location.reload()
            return request.data;
        }
        fetchData()
    }, [])

    // useEffect(() => {
    //     getPosts()
    //     setReloadHome(false)
    //   }, [reloadHome]);

    let correctIcon = () => {
        if (likesValue === true) {
            return <ThumbUpAltIcon onClick={() => setLikesValue(!likesValue)} color="primary" fontSize='medium' />
        }
        else {
            return <ThumbUpAltIcon onClick={() => setLikesValue(!likesValue)} fontSize='medium' />
        }
    }

    return (
        <Grid item md={8}>
            <Widget disableWidgetMenu>

                <div className={classes.postmain} >
                    <div className={classes.post}>
                        <div className={classes.profile}>
                            <AccountCircleIcon style={{ fontSize: '50' }} />
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
                        </div>
                        <div onClick={handleFocus} class={classes.comm}><CommentIcon fontSize='medium' />
                            <text style={{ fontSize: '16px' }}>Comment</text></div>
                    </div>
                    {/* <div class={classes.commentbox}> */}
                    <div class={classes.commentbox}>
                        <InputBase className={classes.comment} inputRef={searchInput} onChange={e => setCommentValue(e.target.value)}
                            placeholder='Leave a comment'></InputBase>
                        <Button onClick={() => handleSend()}> <SendIcon class={classes.commButton} /></Button>
                    </div>
                    <div>
                        {props.comments.map(function (item) {
                            return (
                                <div className={classes.profile1}>
                                    <AccountCircleIcon style={{ fontSize: '40' }} />
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