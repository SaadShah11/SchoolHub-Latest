import React, { useState, useCallback, useEffect } from "react";
import Header from "../Header/Header";
import Slider from "./Slider";
import ReactPlayer from 'react-player'
import { makeStyles } from '@material-ui/core/styles';
import 'leaflet/dist/leaflet.css';
import Logo from '../../landing/LGS.png'
import StarRatings from 'react-star-ratings';
import Widget from "../../../components/Widget/Widget";
import L from 'leaflet';
import Footer from './Footer'
import { Button, Typography, Grid } from "@material-ui/core";
import Carousel from 'react-grid-carousel'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import axios from "../../../Util/axios"
import AuthService from "../../../services/auth.service";
import Review from "./review"

const useStyles = makeStyles((theme) => ({
    intro: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: "15px"
    },
    texts: {
        width: "40%",
    },
    video: {
        paddingLeft: '0px',
        width: "45.9%",
    },
    map: {
        backgroundColor: 'black',
        justifyContent: "center",
        width: "70%",
    },
    mapContainer: {
        height: "65vh",
        width: '90vh',
    },
    schoolLogo: {
        margin: 'auto',
        width: "200px",
        height: '200px'
    },
    maprev: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '10px',
        marginTop: '10px'
    },
    reviews: {
        width: '45%',
        height: '65vh'
    },
    para: {
        width: '400px',
        height: "100px",
        border: '1px solid rgba(0,0,0,0.2)',
    },
    top: {
        marginLeft: '15px',
        width: '250px',
        borderRadius: '5px',
        height: '250px',
        '&:hover': {
            cursor: 'pointer',
            opacity: '0.7'
        }
    },
    review: {
        borderBottom: '1px solid rgba(0,0,0,0.2)',
        marginBottom: '10px'
    },
    leavecomment: {
        width: '400px',
        height: '180px'

    },
    toptitle: {
        width: '100%',
        marginLeft: '15px',
        marginBottom: '10px',
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#696969',
        alignItems: 'center'
    },
}));
const iconPerson = new L.Icon({
    iconUrl: require('./../marker.png'),
    iconSize: [30, 30],

});

const reviews = [
    { id: '1', name: 'Ali Khan', content: 'One of my favourite sohool, very good services and reponse. rating it 5 because it is the best.', rating: 5, date: '5 aug 2020' },
    { id: '2', name: 'John Snow', content: 'Congratulation on your shadi.', rating: 4.5, date: '5 aug 2020' },
    { id: '3', name: 'Another Name', content: 'Brother asked a very good questions.', rating: 3, date: '5 aug 2020' },
    { id: '4', name: 'Ali Khan', content: 'One of my favourite sohool, very good services and reponse. rating it 5 because it is the best.', rating: 5, date: '5 aug 2020' },
    { id: '5', name: 'John Snow', content: 'Congratulation on your shadi.', rating: 4.5, date: '5 aug 2020' },
    { id: '6', name: 'Another Name', content: 'Brother asked a very good questions.', rating: 3, date: '5 aug 2020' }

]

let reviewData = {
    schoolID: '',
    userID: '',
    username: '',
    userProilePic: '',
    date: '',
    reviewText: '',
    rating: '',
    reply: {}
}

export default function SchoolProfile(props) {

    console.log("props")
    //console.log(props.school)
    let school = props.school
    console.log(school)
    //console.log(school[0].aboutSchool)

    const user = AuthService.getCurrentUser()

    const classes = useStyles();
    const position = [school[0].schoolCoordinates.latitude, school[0].schoolCoordinates.longitude]

    let [newReview, setNewReview] = useState('');
    let [newRating, setNewRating] = useState(1);
    let [allReviews, setAllReviews] = useState();
    let [reloadReview, setReloadReview] = useState(false);
    let [teacherButton, setTeacherButton] = useState(false);

    const handleSend = () => {

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

        reviewData.reviewText = newReview
        reviewData.date = timee
        reviewData.schoolID = school[0]._id
        reviewData.rating = newRating
        reviewData.userID = user._id
        reviewData.username = user.username

        postReview()
    }

    const postReview = useCallback(async () => {
        async function fetchData() {
            let request;
            console.log("ReviewData")
            console.log(reviewData)
            request = await axios.post("http://localhost:8080/review/addReview", reviewData)
            console.log("request")
            console.log(request)
            return request.data;
        }
        fetchData()
        setReloadReview(true)
    }, [])

    const getReviews = useCallback(async () => {
        async function fetchData() {
            let request;
            request = await axios.get("http://localhost:8080/review/reviews")
            console.log("request")
            console.log(request)
            let finalReviews = [];
            request.data.map((i) => {
                if (i.schoolID == school[0]._id) {
                    finalReviews.push(i)
                }
            }
            )
            setAllReviews(finalReviews)
            return request.data;
        }
        fetchData()
    }, [])

    let joinSchool = () => {

        let finalObj = {
            teacherID: user._id,
            teacherName: user.username,
            teacherEmail: user.email,
            teacherProfilePic: user.profilePic,
            schoolID: props.school[0]._id,
            adminID: props.school[0].adminID,
            status: ''
        }

        console.log("Final Object")
        console.log(finalObj)

        addTeacherRequest(finalObj)

    }

    const addTeacherRequest = useCallback(async (finalObj) => {
        async function fetchData() {
            let request;
            console.log("FinalData")
            console.log(finalObj)
            request = await axios.post("http://localhost:8080/teacherRequest/addTeacherRequest", finalObj)
            console.log("request")
            console.log(request)
            alert("Request Sent, Please wait for approval by School Admin")
            return request.data;
        }
        fetchData()
        setReloadReview(true)
    }, [])

    useEffect(() => {
        getReviews()
        setReloadReview(false)
        console.log("reload review")
        console.log(reloadReview)
        if (user.type == 'Teacher') {
            setTeacherButton(true)
        }
    }, [reloadReview]);

    let displayReviews //= () => { let displayPostsVar

    if (allReviews != undefined) {
        console.log("inside displayReviews")
        // displayReviews = allReviews.map((i) => {
        //     return <Review key={i._id} id={i._id}
        //         username={i.username} date={i.date} reviewText={i.reviewText}
        //         rating={i.rating} userProilePic={i.userProilePic} schoolID={i.schoolID}
        //         userID={i.userID}
        //     //onSelect={this.onSelect} 
        //     />
        // })
        displayReviews =
            <Review reviews={allReviews} />

    } else {
        console.log("nothing")
    }

    return (
        <div style={{ width: '200vh' }}>
            <Slider school={props.school} />
            <Widget className={classes.intro} title='About School' disableWidgetMenu>
                <div className={classes.intro}>
                    <div className={classes.texts}>
                        <img className={classes.schoolLogo} src={school[0].schoolIcon} />
                        <br />
                        <text>Welcome to <b>{school[0].schoolName}</b> <br />
                        </text>
                        {school[0].aboutSchool}
                        <text >
                        </text>
                        <br />
                        {
                            teacherButton ? <Button size="large" variant="contained" color="seconadary" onClick={() => joinSchool()}>Join School</Button> : <div></div>
                        }
                    </div>
                    <div className={classes.video}>
                        <Widget title='Life at School' disableWidgetMenu>
                            {/* <ReactPlayer url='https://youtu.be/4NR4JOL4_2o' /> */}
                            <ReactPlayer url={school[0].videos} />
                        </Widget>
                    </div>
                </div>
            </Widget>


            <div className={classes.maprev}>

                <div>
                    <MapContainer center={position}
                        zoom={6}
                        className={classes.mapContainer}
                    >
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position} icon={iconPerson}>
                            <Popup>
                                We are located here!
                        </Popup>
                        </Marker>
                    </MapContainer>
                </div>

                <div className={classes.reviews}>
                    <Widget style={{ height: '65vh' }} title='Rate our School' disableWidgetMenu>
                        <div className={classes.leavecomment}>
                            <StarRatings starDimension="20px" rating={newRating}
                                starSpacing="3px" changeRating={(rating) => { setNewRating(rating) }} starRatedColor="#D10B0B" />
                            <textarea className={classes.para} id="about" placeholder="Leave a review"
                                onChange={e => setNewReview(e.target.value)} fullWidth />
                            <Button style={{ float: "right" }} onClick={() => handleSend()
                            }
                                size="large" variant="contained" color="seconadary"
                                disabled={
                                    newReview.length === 0  || newReview === '' || newReview ===undefined
                                }> Submit</Button>
                        </div>
                        <Typography variant='h3'>Frequently Asked Questions</Typography>


                    </Widget>
                </div>

            </div>
            {
                displayReviews
            }
            <div >
                <Widget disableWidgetMenu>
                    <Footer school={props.school} />
                </Widget>
            </div>
        </div>
    )
}
function Rating(obj) {
    var classes = useStyles();
    return (
        <div className={classes.review}>
            <Widget disableWidgetMenu>
                {/* <AccountCircleIcon style={{ fontSize: '40' }} /> */}
                <div className={classes.nameanddate}>
                    <StarRatings rating={obj.rating} starDimension="20px" starSpacing="3px" starRatedColor="#D10B0B" />
                    <text className={classes.name}>by <b>{obj.name}</b> on {obj.date}</text>
                </div>
                <text className={classes.time}>{obj.content}</text>
            </Widget>

        </div>
    )

}