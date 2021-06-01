import React, { useState, useCallback, useEffect } from "react";
import { InputAdornment, TextareaAutosize, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import Header from '../Header/Header'
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Footer from "../../../components/Footer/footer"
// context
import Widget from "../../../components/Widget/Widget";
import { Cancel, AddBox, PhotoSizeSelectActual, PlayArrow, PartyMode } from '@material-ui/icons'
import axios from "../../../Util/axios"
import AuthService from "../../../services/auth.service";
import { mdiWindowShutter } from "@mdi/js";

const useStyles = makeStyles((theme) => ({
    box: {
        width: "50%",
        margin: 'auto',
    },
    dp: {
        height: '100px',
        width: '150px',
        borderRadius: '10%'
    },
    button: {
        backgroundColor: '#43425d',
        color: 'white',
        width: '100px',
        float: 'right',
        marginLeft: '10px'
    },
    pics: {
        display: 'flex',
        flexDirection: 'row'
    },
    pic: {
        marginLeft:"70px",
        
        textAlign: 'center',
        alignItems:'center',
        justifyContent: 'center',
        '&:hover': {
            fill: '#9F9F9F'
        },
        display: "flex",
        flexDirection: 'column',
    },
    video: {
        width: "700px",
        height: '300px',
        textAlign: 'center',
        justifyContent: 'center'
    },
    AR: {
        display: "flex",
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: '5px',
        width: '170px',
        border: "1px solid black",
        borderRadius: "8px",
        padding: '10px',
        margin: 'auto',
        '&:hover': {
            color: 'white',
            cursor: 'pointer',
            backgroundColor: '#43425d'
        }
    },
    cancel: {
        '&:hover': {
            fill: '#9F9F9F'
        }
    },
    tabs: {
        color: '#43425d',
    },
    indicator: {
        backgroundColor: '#43425d',
        height: '3px'
    },
}))


function EditInfo(props) {
    var classes = useStyles();

    const user = AuthService.getCurrentUser()
    console.log(user)
    const schoolID = AuthService.getCurrentSchool()
    console.log("SCHOOL")
    console.log(schoolID)

    let images = props
    console.log("Props")
    console.log(images)

    let [schoolImages, setSchoolImages] = useState()
    let [schoolVideo, setSchoolVideo] = useState()
    let [reload, setReload] = useState()

    const deleteImage = useCallback(async () => {
        async function fetchData() {
            let request;
            console.log("Delete Image")
            console.log(schoolID.schoolID)
            console.log(images.id)
            request = await axios.post("http://localhost:8080/school/delete_Image/" + schoolID.schoolID, { imageID: images.id })
            console.log("request")
            console.log(request.data)

            window.location.reload()
            return request.data;
        }
        //And here you call it
        fetchData()
        //setReloadHome(true)
    }, [])


    // useEffect(() => {
    //     getSchool()
    // }, [])

    // let displayImages //= () => { let displayPostsVar

    // try {
    //     if (schoolImages != undefined) {
    //         console.log("inside displatPosts")
    //         // {return <GetAllPosts allPosts= {allPosts}/>}
    //         displayImages = schoolImages.map((i) => {
    //             return <SchoolImages key={i._id} id={i._id} path={i.path} 
    //             />
    //         })
    //     } else {
    //         console.log("nothing")
    //     }
    // } catch (err) {
    //     console.log("error")
    //     console.log(err)
    // }


    const pics = [
        { id: 0, source: <PhotoSizeSelectActual className={classes.pic} /> },
        { id: 1, source: <PhotoSizeSelectActual className={classes.pic} /> },
        { id: 2, source: <PhotoSizeSelectActual className={classes.pic} /> },
        { id: 3, source: <PhotoSizeSelectActual className={classes.pic} /> },
        { id: 4, source: <PhotoSizeSelectActual className={classes.pic} /> }
    ]
    const video = [
        { id: 0, source: <PlayArrow className={classes.video} /> },
    ]
    var [activeTabId, setActiveTabId] = useState(0);
    const [video1, setVideo1] = React.useState('true');
    const [picss, setpicss] = React.useState(5)
    return (
        <div>

            <React.Fragment >
                {/* <div className={classes.pics}>
                                    {/* <AddBox className={classes.pic} /> */}
                {/* <div className={classes.pics}> */}
                <div className={classes.pic}>
                    <img className={classes.dp} src={images.path} />
                    <Cancel onClick={() => deleteImage()} className={classes.cancel} />
                </div>
                {/* </div>
                                </div> */}
            </React.Fragment>

        </div>

    );
}

export default withRouter(EditInfo);
