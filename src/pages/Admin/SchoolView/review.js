
import React from "react";
import 'leaflet/dist/leaflet.css';
import StarRatings from 'react-star-ratings';
import Widget from "../../../components/Widget/Widget";
import { Button, Grid } from "@material-ui/core";
import Carousel from 'react-grid-carousel'
import { makeStyles } from '@material-ui/core/styles';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// styles
//import useStyles from "./SchoolProfile";
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
    }
}));

export default function Review(props) {

    var classes = useStyles();

    console.log("Review Props")
    console.log(props)

    let reviews = props.reviews

    return (
        <Grid style={{ width: "100%", paddingBottom: '20px' }}>
            <div class={classes.toptitle}>
                <text>User Reviews</text>
                <StarRatings rating={4} starDimension="18px" starSpacing="3px" starRatedColor="#D10B0B" />
                <text style={{ fontSize: '14px' }}>({reviews.length} Reviews)</text>
            </div>
            <Carousel cols={5} rows={1} gap={2} loop autoplay={3000}>
                {reviews.map(function (item) {
                    return (
                        <Carousel.Item>
                            <Grid item xs={3} class={classes.top}>
                                <Widget disableWidgetMenu>
                                    <AccountCircleIcon style={{ fontSize: '40' }} />
                                    <div className={classes.nameanddate}>
                                        <StarRatings rating={item.rating} starDimension="20px" starSpacing="3px" starRatedColor="#D10B0B" />
                                        <text className={classes.name}><br />by <b>{item.username}</b> on {item.date}</text>
                                    </div>
                                    <text className={classes.time}>{item.reviewText}</text>
                                </Widget>
                            </Grid>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </Grid> 
    )
}