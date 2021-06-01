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
import SchoolImages from "./images"
import { storage } from "../../../Util/firebase"
import { v4 as uuidv4 } from 'uuid';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { mdiWindowShutter } from "@mdi/js";

const useStyles = makeStyles((theme) => ({
    box: {
        width: "95%",
        height: "95%",
        margin: 'auto',
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
        flexDirection: 'column'
    },
    pic: {
        width: '100px',
        height: '100px',
        textAlign: 'center',
        justifyContent: 'center',
        '&:hover': {
            fill: '#9F9F9F'
        }
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
    images: {
        display: 'flex',
        flexDirection: 'row',
        width: '80%',
        justifyContent: 'center',
        margin: 'auto'
    }
}))

let obj = {
    images: {}
}

function EditInfo(props) {
    var classes = useStyles();

    const user = AuthService.getCurrentUser()
    console.log(user)
    const schoolID = AuthService.getCurrentSchool()
    console.log("SCHOOL")
    console.log(schoolID)

    let [schoolImages, setSchoolImages] = useState()
    let [schoolIcon, setSchoolIcon] = useState()
    let [reload, setReload] = useState()
    const [imageAsFile, setImageAsFile] = useState('')
    const [iconAsFile, setIconAsFile] = useState('')
    const [imageAsUrl, setImageAsUrl] = useState({ imgUrl: '' })
    const [iconAsUrl, setIconAsUrl] = useState({ imgUrl: '' })
    const [progress, setProgress] = useState(0)
    var [imgBoolean, setImageBoolean] = useState(false)
    var [iconBoolean, setIconBoolean] = useState(false)
    //var [onlyVideoBool, setonlyVideoBool] = useState(false)

    const getSchool = useCallback(async () => {
        async function fetchData() {
            let request;
            request = await axios.get("http://localhost:8080/searchSchool/search/specificSchool/" + schoolID.schoolID)
            console.log("request")
            console.log(request.data)

            //setAllSchools(request.data)
            setSchoolImages(request.data[0].images)
            setSchoolIcon(request.data[0].schoolIcon)

            return request.data;
        }
        //And here you call it
        fetchData()
        //setReloadHome(true)
    }, [])

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

            //imgBool = true
            setImageBoolean(true)
        }
    }

    const handleIconAsFile = (e) => {
        const image = e.target.files[0]
        // console.log("image")
        // console.log(image)

        if (image !== undefined) {
            var imageExtension = image.name.split('.').pop();
            console.log(imageExtension)

            let newImage = uuidv4() + '.' + imageExtension;
            console.log(newImage)

            // setImageAsFile(imageFile => (image))//(newImage))
            setIconAsFile(image)

            //imgBool = true
            setIconBoolean(true)
        }
    }

    const handleFireBaseUpload = e => {
        //e.preventDefault()

        // async magic goes here...
        if (imageAsFile === '') {
            //setOnlyTextBool(true)
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

    const handleIconFireBaseUpload = e => {
        //e.preventDefault()

        // async magic goes here...
        if (iconAsFile === '') {
            //setOnlyTextBool(true)
            console.error(`not an image, the image file is a ${typeof (iconAsFile)}`)
        } else {
            console.log('start of upload')
            const uploadTask = storage.ref(`/images/${iconAsFile.name}`).put(iconAsFile)

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
                    storage.ref('images').child(iconAsFile.name).getDownloadURL()
                        .then(fireBaseUrl => {
                            setIconAsUrl(prevObject => ({ ...prevObject, imgUrl: fireBaseUrl }))
                        })

                })
        }

    }

    const imageSubmit = () => {

        console.log("inside imageSubmit")

        if (imageAsUrl.imgUrl != '') {
            obj.images.path = imageAsUrl.imgUrl
        }
        if (iconAsUrl.imgUrl != '') {
            obj.schoolIcon = iconAsUrl.imgUrl
        }

        console.log("Final Object")
        console.log(obj)
        updateImages(obj)
    }

    const updateImages = useCallback(async (finalObj) => {
        async function fetchData() {
            let request;
            request = await axios.post("http://localhost:8080/school/addNewSchoolImages/" + schoolID.schoolID, finalObj)
            console.log("request")
            console.log(request.data)

            window.location.reload()
            return request.data;
        }
        //And here you call it
        fetchData()
        //setReloadHome(true)
    }, [])

    useEffect(() => {
        getSchool()
    }, [])

    if (imgBoolean === true) {
        console.log("inside if")
        if (imageAsUrl.imgUrl === '') {
            console.log("empty img")
            console.log(imageAsUrl.imgUrl)

        } else {
            console.log("inside else img")
            //postBool = true
            imageSubmit()
            //setImageBoolean(false)
        }
    } else {
        // if (onlyVideoBool == true) {
        //     loginSubmit()
        // }
        console.log("bool:")
        console.log(imgBoolean)
    }

    if (iconBoolean === true) {
        console.log("inside if")
        if (iconAsUrl.imgUrl === '') {
            console.log("empty img")
            console.log(iconAsUrl.imgUrl)

        } else {
            console.log("inside else img")
            //postBool = true
            imageSubmit()
            //setImageBoolean(false)
        }
    } else {
        // if (onlyVideoBool == true) {
        //     loginSubmit()
        // }
        console.log("bool:")
        console.log(imgBoolean)
    }

    let displayImages //= () => { let displayPostsVar

    try {
        if (schoolImages != undefined) {
            console.log("inside displatPosts")
            // {return <GetAllPosts allPosts= {allPosts}/>}
            displayImages = schoolImages.map((i) => {
                return <div ><SchoolImages className={classes.pic} key={i._id} id={i._id} path={i.path}
                /></div>
            })
        } else {
            console.log("nothing")
        }
    } catch (err) {
        console.log("error")
        console.log(err)
    }

    let displayIcon //= () => { let displayPostsVar

    try {
        if (schoolIcon != undefined) {
            console.log("inside displatIcon")
            // {return <GetAllPosts allPosts= {allPosts}/>}
            displayIcon = <div ><SchoolImages className={classes.pic} path={schoolIcon}/></div>

        } else {
            console.log("nothing")
        }
    } catch (err) {
        console.log("error")
        console.log(err)
    }

    // pics.map(function (item) {
    //     return (
    //         <div className={classes.pic}>
    //             {item.source}
    //             <Cancel className={classes.cancel} />
    //         </div>
    //     )
    // })

    // const pics = [
    //     { id: 0, source: <PhotoSizeSelectActual className={classes.pic} /> },
    //     { id: 1, source: <PhotoSizeSelectActual className={classes.pic} /> },
    //     { id: 2, source: <PhotoSizeSelectActual className={classes.pic} /> },
    //     { id: 3, source: <PhotoSizeSelectActual className={classes.pic} /> },
    //     { id: 4, source: <PhotoSizeSelectActual className={classes.pic} /> }
    // ]
    // const video = [
    //     { id: 0, source: <PlayArrow className={classes.video} /> },
    // ]
    var [activeTabId, setActiveTabId] = useState(0);
    return (
        <div>
            <Header history={props.history} />
            <br /><br /><br /><br />
            <Grid container >
                <div className={classes.box}>
                    <Widget title='Edit Photos/Icon' disableWidgetMenu>
                        <Tabs
                            value={activeTabId}
                            onChange={(e, id) => setActiveTabId(id)}
                            classes={{ indicator: classes.indicator, root: classes.tabs }}
                            centered
                        >
                            <Tab label="Photos" classes={{ root: classes.tab }} />
                            <Tab label="School Icon" classes={{ root: classes.tab }} />
                        </Tabs>
                        {activeTabId === 0 && (
                            <React.Fragment >
                                <div className={classes.pics}>

                                    <div className={classes.postbottomL} >
                                        <input
                                            type="file"
                                            onChange={handleImageAsFile}
                                        />
                                        <button onClick={handleFireBaseUpload} className={classes.postButton}>Upload Image</button>

                                    </div>
                                    <br />
                                    <br />

                                    {/* <AddBox className={classes.pic} /> */}
                                    <div className={classes.images}>
                                        {
                                            displayImages
                                        }
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                        {activeTabId === 1 && (
                            <React.Fragment>

                                <div className={classes.pics}>

                                    <div className={classes.postbottomL} >
                                        <input
                                            type="file"
                                            onChange={handleIconAsFile}
                                        />
                                        <button onClick={handleIconFireBaseUpload} className={classes.postButton}>Update Icon</button>

                                    </div>
                                    <br />
                                    <br />

                                    {/* <AddBox className={classes.pic} /> */}
                                    <div className={classes.images}>
                                        {
                                            displayIcon
                                        }
                                    </div>
                                </div>

                                {/* <div className={classes.AR}>
                                    <PartyMode />
                                    <text>Request AR model</text>
                                </div> */}

                                {/* <div className={classes.pics}>
                                    <TextField value={schoolVideo} onChange={e => setSchoolVideo(e.target.value)} InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start"><VideoLibraryIcon /></InputAdornment>
                                        ),
                                    }} id="facebook" placeholder="School Facebook Link" fullWidth />
                                </div> */}
                            </React.Fragment>
                        )}
                        <br /><br />
                        <Button size="large" variant="contained" color="seconadary"
                            className={classes.button}
                            onClick={() => { props.history.goBack() }}
                        > Cancel</Button>
                        <Button size="large" variant="contained" color="seconadary"
                            className={classes.button}
                            onClick={() => { imageSubmit() }}
                        > Save</Button>

                    </Widget>
                </div>

            </Grid>
            <Footer />
        </div>

    );
}

export default withRouter(EditInfo);
