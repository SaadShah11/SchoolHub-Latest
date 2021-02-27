import React, { Fragment } from "react";
import { Grid } from "@material-ui/core";
import Popup from 'reactjs-popup';
import StarRatings from 'react-star-ratings';
import 'leaflet/dist/leaflet.css';
import Carousel from 'react-grid-carousel'
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import L from 'leaflet';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { TextField, InputBase } from "@material-ui/core";
import Footer from './footer/Footer'
import Widget from "../../components/Widget/Widget";
import useStyles from "./styles";
import Header from "./Header"
import Slider from "./Slider"
import Lgs from './LGS.png'
import Pk from './PK.png'
import Bhs from "./BHS.jpg"
import Signin from '../profiling/signin/signinNew'



const customMarker = new L.icon({
  iconUrl: require("../../marker.png"),
  iconSize: [25, 25],
  iconAnchor: [0, 0],
});
const MyMarkersList = ({ markers }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ))
  return <Fragment>{items}</Fragment>
}

const MyPopupMarker = ({ content, position }) => (
  <Marker position={position} icon={customMarker} >
    <Popup>{content}</Popup>
  </Marker>
)
const markers = [
  { key: 'marker1', position: [33.647895, 73.028724], content: 'My first popup' },
  { key: 'marker2', position: [33.6879129, 73.0314367], content: 'My second popup' },
  { key: 'marker3', position: [33.652868, 73.157333], content: 'My third popup' },
  { key: 'marker3', position: [29.9248291, 70.945715], content: 'My third popup' },
  { key: 'marker3', position: [30.857321, 69.240635], content: 'My third popup' },
]
const top =[
  {pic:Lgs, Name:'Lahore Grammer School', Address:'Gulberg town, Lahore', Rating:5},
  {pic:Bhs, Name:'Beacon House School', Address:'Johar town, Lahore', Rating:4.5},
  {pic:Pk, Name:'Pak Turk International School', Address:'Taramri chowk, Islamabad', Rating:4},
  {pic:Bhs, Name:'Beacon House School', Address:'Johar town, Lahore', Rating:4},
  {pic:Pk, Name:'Pak Turk International School', Address:'Taramri chowk, Islamabad', Rating:4},
]
export default function Landing() {
  const position = [30.3753, 69.3451]
  const [value, setValue] = React.useState('Co-Education');
  const [value2, setValue2] = React.useState('Primary');
  const [value3, setValue3] = React.useState('Matric/Fsc');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChange2 = (event) => {
    setValue2(event.target.value);
  };
  const handleChange3 = (event) => {
    setValue3(event.target.value);
  };
  var classes = useStyles();
  return (
    <div>
      <Header />
      <div><Slider /></div>
      
      <Grid style={{justifyContent:'center', backgroundColor: '#FFFFFF'}} container spacing={4} >
        {/* top ranking Shools */}
        
        <Grid container spacing={1} style={{ backgroundColor: '#FFFFFF' }} item md={11}>
          <div class={classes.toptitle}>
            <text>Top Ranking School</text>
          </div>
          <div style={{ width: "100%", }}>
            <Carousel cols={5} rows={1} gap={2} loop autoplay={3000}>
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
                {TopSchool(top[4])}
              </Carousel.Item>
              <Carousel.Item>
                {TopSchool(top[2])}
              </Carousel.Item>
              <Carousel.Item>
                {TopSchool(top[3])}
              </Carousel.Item>
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

        {/* Search Schools */}
        <Grid item md={2}>
        <Widget  title="Search School" disableWidgetMenu>
            <div class={classes.eachF}>
              <InputBase class={classes.searchfield} placeholder='Search here...'></InputBase>
            </div>
            {/* <text>Apply Filters:</text> */}
            <div class={classes.eachF}>
              <text style={{ fontWeight: 'bold' }}>Disatnce: </text>
              <InputBase placeholder='Max' class={classes.feefield}></InputBase>
            </div>
            <div class={classes.eachF}>
              <text style={{ fontWeight: 'bold' }}>Fee: </text>
              <InputBase placeholder='Min' class={classes.feefield}></InputBase>
              <InputBase placeholder='Max' class={classes.feefield}></InputBase>
            </div>

            <div class={classes.eachF1}>
              <text style={{ fontWeight: 'bold' }}>School type: </text>
              <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="type" name="type" value={value} onChange={handleChange}>
                <FormControlLabel value="Co-Education" control={<Radio />} label="Co-Education" />
                <FormControlLabel value="Boys" control={<Radio />} label="Boys" />
                <FormControlLabel value="Girls" control={<Radio />} label="Girls " />
              </RadioGroup>
            </div >
            <div class={classes.eachF}>
              <text style={{ fontWeight: 'bold' }}>Education level: </text>
              <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="educationlevel" name="educationlevel" value={value2} onChange={handleChange2}>
                <FormControlLabel value="Primary" control={<Radio />} label="Primary" />
                <FormControlLabel value="Middle" control={<Radio />} label="Middle" />
                <FormControlLabel value="Higher" control={<Radio />} label="Higher " />
              </RadioGroup>
            </div>
            <div class={classes.eachF}>
              <text style={{ fontWeight: 'bold' }}>Education type: </text>
              <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="educationtype" name="educationtype  " value={value3} onChange={handleChange3}>
                <FormControlLabel value="Matric/Fsc" control={<Radio />} label="Matric/Fsc" />
                <FormControlLabel value="IGCSE" control={<Radio />} label="IGCSE" />
              </RadioGroup>
            </div>
            <div class={classes.buttons}>
              <button>Reset</button>
              <button>submit</button>
            </div>
          </Widget>
        </Grid>

        {/* Map here */}
        <Grid item md={9}>
          <Widget disableWidgetMenu>
            <MapContainer center={position}
              zoom={6}
              className={classes.mapContainer}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MyMarkersList markers={markers} />
            </MapContainer>
          </Widget>
        </Grid>

      </Grid>
      <br />
      <Footer/>
    </div>

  );
}
function TopSchool(obj){
  var classes = useStyles();
  return(
    <Grid item xs={3} class={classes.top}>
      <Widget disableWidgetMenu>
        <img style={{ width: '200px', height: '200px' }} src={obj.pic} alt="school" />
        <text style={{fontWeight:'bold'}}>{obj.Name}</text>
        <br />
        <text style={{fontSize:'13px'}}>{obj.Address}</text>
        <StarRatings rating={obj.Rating} starDimension="25px" starSpacing="3px" starRatedColor="#D10B0B"/>
      </Widget>
  </Grid>
  )

}