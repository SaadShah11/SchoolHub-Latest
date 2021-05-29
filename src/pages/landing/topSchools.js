import React, { Fragment, useEffect, useCallback, useState } from "react";
import { Grid } from "@material-ui/core";
import StarRatings from 'react-star-ratings';
import 'leaflet/dist/leaflet.css';
import Carousel from 'react-grid-carousel'
import Widget from "../../components/Widget/Widget";
import useStyles from "./styles";

export default function Landing(props) {

    // let [allSchools, setAllSchools] = useState(props.Schools)
    // let [displayBool, setDisplayBool] = useState(props.displayBool)

    console.log("Props")
    console.log(props)
    let allSchools = props.Schools

    // let top = []

    // allSchools.map((school) => {
    //     top.push({
    //         pic: school.schoolIcon,
    //         Name: school.schoolName,
    //         Address: school.schoolAddress,
    //         Rating: school.totalRating
    //     })
    // })

    var classes = useStyles();
    return (
        <div>
            <Grid style={{ justifyContent: 'center', backgroundColor: '#FFFFFF' }} container spacing={4} >
                {/* top ranking Shools */}

                <Grid container spacing={1} style={{ backgroundColor: '#FFFFFF' }} item md={11}>
                    <div class={classes.toptitle}>
                        <text>Top Ranking School</text>
                    </div>
                    <div style={{ width: "100%", }}>
                        <Carousel cols={5} rows={1} gap={2} loop autoplay={3000}>
                            {
                                allSchools.map((obj) => {
                                    return <Carousel.Item>
                                        <Grid item xs={3} class={classes.top}>
                                            <Widget disableWidgetMenu>
                                                <img style={{ width: '200px', height: '200px' }} src={obj.schoolIcon} alt="school" />
                                                <text style={{ fontWeight: 'bold' }}>{obj.schoolName}</text>
                                                <br />
                                                <text style={{ fontSize: '13px' }}>{obj.schoolAddress}</text>
                                                <StarRatings rating={obj.totalRating} starDimension="25px" starSpacing="3px" starRatedColor="#D10B0B" />
                                            </Widget>
                                        </Grid>
                                    </Carousel.Item>
                                })
                            }
                        </Carousel>
                    </div>


                </Grid>
                {/* SchoolHub recommended Shools */}
                {/* <Grid container spacing={1} style={{ marginTop: '10px', backgroundColor: '#FFFFFF' }} item md={11}>
          <div class={classes.toptitle}>
            <text>SchoolHub Recommendation</text>
          </div>

          <div style={{ width: "100%" }}>
            <Carousel cols={5} rows={1} gap={1} loop autoplay={4000}>
              <Carousel.Item>
                {TopSchool(top[0])}
              </Carousel.Item>
              <Carousel.Item>
                {TopSchool(top[1])}
              </Carousel.Item>
              <Carousel.Item>
                {TopSchool(top[2])}
              </Carousel.Item>
              <Carousel.Item>
                {TopSchool(top[0])}
              </Carousel.Item>
              <Carousel.Item>
                {TopSchool(top[3])}
              </Carousel.Item>
              <Carousel.Item>
                {TopSchool(top[4])}
              </Carousel.Item>
            </Carousel>
          </div>

        </Grid>
        <br />
        <br /> */}


            </Grid>
        </div>

    );
}
function TopSchool(obj) {
    var classes = useStyles();
    console.log("Inside TopSchool")
    return (
        <Grid item xs={3} class={classes.top}>
            <Widget disableWidgetMenu>
                <img style={{ width: '200px', height: '200px' }} src={obj.pic} alt="school" />
                <text style={{ fontWeight: 'bold' }}>{obj.Name}</text>
                <br />
                <text style={{ fontSize: '13px' }}>{obj.Address}</text>
                <StarRatings rating={obj.Rating} starDimension="25px" starSpacing="3px" starRatedColor="#D10B0B" />
            </Widget>
        </Grid>
    )
}

