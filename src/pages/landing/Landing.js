import React, { Fragment, useEffect, useCallback, useState } from "react";
import { Grid } from "@material-ui/core";
import Popup from 'reactjs-popup';
import StarRatings from 'react-star-ratings';
import 'leaflet/dist/leaflet.css';
import Carousel from 'react-grid-carousel'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet';
import { toLogin } from "../../context/UserContext";
import { Badge, Typography } from ".././../components/Wrappers/Wrappers";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, Button, InputBase } from "@material-ui/core";
import Footer from './footer/Footer'
import Widget from "../../components/Widget/Widget";
import useStyles from "./styles";
import Header from "../../components/HeaderLanding"
import Slider from "./Slider"
import Lgs from './LGS.png'
import Pk from './PK.png'
import Bhs from "./BHS.jpg"
import Signin from '../profiling/signin/signinNew'
import Mapp from "../maps/Maps"
import axios from "../../Util/axios"
import TopSchools from "./topSchools"

// const customMarker = new L.icon({
//   iconUrl: require("../../marker.png"),
//   iconSize: [25, 25],
//   iconAnchor: [0, 0],
// });
// const MyMarkersList = ({ markers }) => {
//   const items = markers.map(({ key, ...props }) => (
//     <MyPopupMarker key={key} {...props} />
//   ))
//   return <Fragment>{items}</Fragment>
// }

// const MyPopupMarker = ({ content, position }) => (
//   <Marker position={position} icon={customMarker} >
//     <Popup>{content}</Popup>
//   </Marker>
// )
// const markers = [
//   { key: 'marker1', position: [33.647895, 73.028724], content: 'My first popup' },
//   { key: 'marker2', position: [33.6879129, 73.0314367], content: 'My second popup' },
//   { key: 'marker3', position: [33.652868, 73.157333], content: 'My third popup' },
//   { key: 'marker3', position: [29.9248291, 70.945715], content: 'My third popup' },
//   { key: 'marker3', position: [30.857321, 69.240635], content: 'My third popup' },
// ]
const top = [
  { pic: Lgs, Name: 'Lahore Grammer School', Address: 'Gulberg town, Lahore', Rating: 5 },
  { pic: Bhs, Name: 'Beacon House School', Address: 'Johar town, Lahore', Rating: 4.5 },
  { pic: Pk, Name: 'Pak Turk International School', Address: 'Taramri chowk, Islamabad', Rating: 4 },
  { pic: Bhs, Name: 'Beacon House School', Address: 'Johar town, Lahore', Rating: 4 },
  { pic: Pk, Name: 'Pak Turk International School', Address: 'Taramri chowk, Islamabad', Rating: 4 },
]

// function sleep(miliseconds) {
//   var currentTime = new Date().getTime();

//   while (currentTime + miliseconds >= new Date().getTime()) {
//     console.log("Sleeping")
//   }
// }

export default function Landing(props) {

  let [allSchools, setAllSchools] = useState()
  let [displayBool, setDisplayBool] = useState(false)
  let displayTopSchools;

  const getAllSchools = useCallback(async () => {
    async function fetchData() {
      let request;
      console.log("inside get all schools")
      request = await axios.get("http://localhost:8080/searchSchool/search/")
      console.log("request")
      console.log(request.data)
      setAllSchools(request.data)
      // sleep(2000)
      // setReload(true)
      // setDisplayBool(true)
      return request.data;
    }
    //And here you call it
    fetchData()
  }, [])

  useEffect(() => {
    getAllSchools()

    if (allSchools != undefined) {
      console.log("inside displayTopSchools")
      // displayTopSchools = <TopSchools Schools={allSchools} />
      displayTopSchools = <Carousel cols={5} rows={1} gap={2} loop autoplay={3000}>
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
    } else {

      console.log("nothing displayTopSchools")
      console.log(allSchools)
    }
    // setReload(false)
  }, [])

  // let displayTopSchools;

  // if (allSchools != undefined) {
  //   console.log("inside displayTopSchools")
  //   displayTopSchools = <TopSchools Schools={allSchools} />
  // } else {

  //   console.log("nothing displayTopSchools")
  //   console.log(allSchools)
  // }
  console.log("All Schools At End")
  console.log(allSchools)

  var classes = useStyles();
  return (
    <div>
      <Header history={props.history} />
      <div><Slider /></div>
      <br /><br />
      {/* <Typography onClick={() => toLogin(props.history)}>SCHOOLHUB</Typography> */}
      <Grid style={{ justifyContent: 'center', backgroundColor: '#FFFFFF' }} container spacing={4} >
        {/* top ranking Shools */}
        {/* <TopSchools Schools={allSchools} displayBool={displayBool}/> */}

        <Grid container spacing={1} style={{ backgroundColor: '#FFFFFF' }} item md={11}>
          <div class={classes.toptitle}>
            <text>Top Ranking School</text>
          </div>
          <div style={{ width: "100%", }}>
            <Carousel cols={5} rows={1} gap={2} loop autoplay={3000}>
              {
                displayTopSchools
              }
            </Carousel>
          </div>


        </Grid>
        {/* SchoolHub recommended Shools */}
        <Grid container spacing={1} style={{ marginTop: '10px', backgroundColor: '#FFFFFF' }} item md={11}>
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
        <br />

        <Mapp />
        {/* Search Schools */}
        {/* <Grid item md={3}>
        <Widget  title="Search School" disableWidgetMenu>
            <div class={classes.eachF}>
            <TextField placeholder="Search here..." fullWidth/>
            </div> */}
        {/* <text>Apply Filters:</text> */}
        {/* <div class={classes.eachF}>
              <text style={{ fontWeight: 'bold' }}>Disatnce: </text>
              <TextField placeholder="Max Distance (in KM)"/>
            </div>
            <div class={classes.eachF}>
              <text style={{ fontWeight: 'bold' }}>Fee: </text>
              <TextField placeholder="Min (PKR)" className={classes.feefield}/>
              <TextField placeholder="Max (PKR)" className={classes.feefield}/>
              
            </div>

            <div class={classes.eachF}>
              <text style={{ fontWeight: 'bold' }}>School type: </text>
              <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="type" name="type" value={value} onChange={handleChange}>
                <FormControlLabel value="Co-Education" control={<Radio color='inherit'/>} label="Co-Education" />
                <FormControlLabel value="Boys" control={<Radio color='inherit'/>} label="Boys" />
                <FormControlLabel value="Girls" control={<Radio color='inherit'/>} label="Girls " />
              </RadioGroup>
            </div >
            <div class={classes.eachF}>
              <text style={{ fontWeight: 'bold' }}>Education level: </text>
              <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="educationlevel" name="educationlevel" value={value2} onChange={handleChange2}>
                <FormControlLabel value="Primary" control={<Radio color='inherit'/>} label="Primary" />
                <FormControlLabel value="Middle" control={<Radio color='inherit'/>} label="Middle" />
                <FormControlLabel value="Higher" control={<Radio color='inherit'/>} label="Higher " />
              </RadioGroup>
            </div>
            <div class={classes.eachF}>
              <text style={{ fontWeight: 'bold' }}>Education type: </text>
              <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="educationtype" name="educationtype  " value={value3} onChange={handleChange3}>
                <FormControlLabel value="Matric/Fsc" control={<Radio color='inherit'/>} label="Matric/Fsc" />
                <FormControlLabel value="IGCSE" control={<Radio color='inherit'/>} label="IGCSE" />
              </RadioGroup>
            </div>
            <div class={classes.buttons}>
              <Button color="primary">Reset</Button>
              <Button color="primary">submit</Button>
            </div>
          </Widget>
        </Grid> */}

        {/* Map here */}
        {/* <Grid item md={8}>
          <Widget disableWidgetMenu>
            <MapContainer center={position}
              zoom={6}
              className={classes.mapContainer}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {/* for my loction */}
        {/* <LocationMarker />
              <MyMarkersList markers={markers} />
            </MapContainer>
          </Widget>
        </Grid> */}

      </Grid>
      <br />
      <Footer />
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
        <StarRatings rating={obj.rating} starDimension="25px" starSpacing="3px" starRatedColor="#D10B0B" />
      </Widget>
    </Grid>
  )
}

// function TopSchool(obj) {
//   var classes = useStyles();
//   console.log("Inside TopSchool")
//   return (
//     <Grid item xs={3} class={classes.top}>
//       <Widget disableWidgetMenu>
//         <img style={{ width: '200px', height: '200px' }} src={obj.schoolIcon} alt="school" />
//         <text style={{ fontWeight: 'bold' }}>{obj.schoolName}</text>
//         <br />
//         <text style={{ fontSize: '13px' }}>{obj.schoolAddress}</text>
//         <StarRatings rating={obj.totalRating} starDimension="25px" starSpacing="3px" starRatedColor="#D10B0B" />
//       </Widget>
//     </Grid>
//   )
// }

