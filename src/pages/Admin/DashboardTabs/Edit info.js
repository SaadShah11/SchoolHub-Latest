import React, { useState, useEffect, useCallback } from "react";
import { FormGroup, InputAdornment, TextareaAutosize, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import Header from '../Header/Header'
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Footer from "../../../components/Footer/footer"
import InfoIcon from '@material-ui/icons/Info';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
// context
import Widget from "../../../components/Widget/Widget";
import { AccountCircle, Room, PhoneAndroid, AlternateEmail, Code, Facebook } from '@material-ui/icons'
import axios from "../../../Util/axios"
import AuthService from "../../../services/auth.service";
import { mdiWindowShutter } from "@mdi/js";

const useStyles = makeStyles((theme) => ({
  box: {
    width: "50%",
    margin: 'auto',
  },
  tabs: {
    color: '#43425d',
  },
  box: {
    width: "70%",
    margin: 'auto',

  },
  mapContainer: {
    height: "65vh",
    width: '120vh',
  },
  radio: {
    '&:checked': {
      fill: 'red',
    },
  },
  indicator: {
    backgroundColor: '#43425d',
    height: '3px'
  },
  Checks: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: '#43425d',
    color: 'white',
    width: '100px',
    float: 'right',
    marginLeft: '10px'
  },
  textarea: {
    width: '100%',
    minHeight: '300px'
  },

}))

let school = {
  schoolName: "",
  schoolAddress: "",
  schoolIcon: '',
  zipCode: "",
  schoolEmail: "",
  aboutSchool: '',
  contactNumber: "",
  schoolFB: "",
  schoolType: "",
  educationLevel: {
    primary: false,
    middle: false,
    higher: false
  },
  educationType: "",
  schoolCoordinates: {}
}

let selectedlocation = {
  longitude: '',
  latitude: ''
}

function EditInfo(props) {

  var classes = useStyles();
  let position = [30.3753, 69.3451]

  var [activeTabId, setActiveTabId] = useState(0);

  let [schoolName, setSchoolName] = useState()
  let [schoolAddress, setSchoolAddress] = useState()
  let [zipCode, setZipCode] = useState()
  let [schoolEmail, setSchoolEmail] = useState()
  let [schoolPhoneNumber, setSchoolPhoneNumber] = useState()
  let [schoolFB, setSchoolFB] = useState()
  let [educationType, setEducationType] = useState()
  let [schoolIcon, setSchoolIcon] = useState()
  let [aboutSchool, setAboutSchool] = useState()
  let [createSchoolBool, setCreateSchoolBool] = useState(false)

  let [educationLevel, setEducationLevel] = useState({
    checkedA: false,
    checkedB: false,
    checkedC: false
  });

  let [schoolType, setSchoolType] = useState()
  let [reloadHome, setReloadHome] = useState(false)
  var [allSchools, setAllSchools] = useState()

  const user = AuthService.getCurrentUser()
  console.log(user)
  const schoolID = AuthService.getCurrentSchool()
  console.log("SCHOOL")
  console.log(schoolID)

  const handleChangeSchoolType = (event) => {
    setSchoolType(event.target.value);
  };
  const handleChange3 = (event) => {
    setEducationType(event.target.value);
  };

  const handleChangeEducationLevel = (event) => {
    setEducationLevel({ ...educationLevel, [event.target.name]: event.target.checked });
  };

  let updateSchoolObject = () => {
    console.log("inside updateSchool")

    school.schoolName = schoolName
    school.schoolAddress = schoolAddress
    school.zipCode = zipCode
    school.schoolEmail = schoolEmail
    school.aboutSchool = aboutSchool
    school.contactNumber = schoolPhoneNumber
    school.schoolFB = schoolFB
    school.schoolType = schoolType
    //school.educationLevel = educationLevel
    school.educationType = educationType
    school.schoolCoordinates = selectedlocation

    position = [school.schoolCoordinates.latitude, school.schoolCoordinates.longitude]

    if (educationLevel.checkedA == true) {
      school.educationLevel.primary = true
    }
    if (educationLevel.checkedB == true) {
      school.educationLevel.middle = true
    }
    if (educationLevel.checkedC == true) {
      school.educationLevel.higher = true
    }

    updateSchool(school)
  }

  const getSchool = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/searchSchool/search/specificSchool/" + schoolID.schoolID)
      console.log("request")
      console.log(request.data.schoolName)

      setAllSchools(request.data)
      setSchoolName(request.data[0].schoolName)
      setSchoolAddress(request.data[0].schoolAddress)
      setAboutSchool(request.data[0].aboutSchool)
      setZipCode(request.data[0].zipCode)
      setSchoolEmail(request.data[0].schoolEmail)
      setSchoolPhoneNumber(request.data[0].contactNumber)
      setSchoolFB(request.data[0].schoolFB)
      setSchoolType(request.data[0].schoolType)
      setEducationType(request.data[0].educationType)

      let educationLevelArray = {
        checkedA: false,
        checkedB: false,
        checkedC: false
      }

      if (request.data[0].educationLevel.primary == true) {
        educationLevelArray.checkedA = true
      }
      if (request.data[0].educationLevel.middle == true) {
        educationLevelArray.checkedB = true
      }
      if (request.data[0].educationLevel.higher == true) {
        educationLevelArray.checkedB = true
      }
      setEducationLevel(educationLevelArray)

      selectedlocation.longitude = request.data[0].schoolCoordinates.longitude
      selectedlocation.latitude = request.data[0].schoolCoordinates.latitude

      return request.data;
    }
    //And here you call it
    fetchData()
    setReloadHome(true)
  }, [])

  const updateSchool = useCallback(async (schoolFinal) => {

    console.log("inside updateSchool Function")
    console.log("School")
    console.log(schoolFinal)
    async function fetchData(schoolFinal) {

      let request;
      console.log('inside fetchdata')
      console.log(schoolFinal)

      request = await axios.patch("http://localhost:8080/school/Edit_School/"+schoolID.schoolID, schoolFinal)
      console.log("request")
      console.log(request)

      window.location.reload()

      return request;
    }
    fetchData(schoolFinal)

  }, [])

  useEffect(() => {
    getSchool()
    setReloadHome(false)
  }, [reloadHome])

  console.log("Data")
  console.log(educationLevel)
  console.log(educationType)
  console.log(schoolType)
  console.log(selectedlocation)

  return (
    <div>
      <Header history={props.history} />
      <br /><br /><br /><br />
      <Grid container >
        <div className={classes.box}>
          <Widget title='Edit General Information' disableWidgetMenu>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}
              classes={{ indicator: classes.indicator, root: classes.tabs }}
              centered
            >
              <Tab label="General Information" classes={{ root: classes.tab }} />
              <Tab label="School Coordinates" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment>
                <TextField value={schoolName} onChange={e => setSchoolName(e.target.value)} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><AccountCircle /></InputAdornment>
                  ),
                }} className={classes.textfield} id="name" placeholder="School Name" fullWidth />
                <TextField value={schoolAddress} onChange={e => setSchoolAddress(e.target.value)} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><Room /></InputAdornment>
                  ),
                }} id="address" placeholder="School Address" fullWidth />
                <TextField value={aboutSchool} onChange={e => setAboutSchool(e.target.value)} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><InfoIcon /></InputAdornment>
                  ),
                }} id="aboutSchool" placeholder="School Description" fullWidth />
                <TextField value={zipCode} type="number" onChange={e => setZipCode(e.target.value)} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><Code /></InputAdornment>
                  ),
                }} id="zip" placeholder="Zip code" fullWidth />
                <TextField value={schoolEmail} onChange={e => setSchoolEmail(e.target.value)} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><AlternateEmail /></InputAdornment>
                  ),
                }} id="email" placeholder="School Email" fullWidth />
                <TextField value={schoolPhoneNumber} type="number" onChange={e => setSchoolPhoneNumber(e.target.value)} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><PhoneAndroid /></InputAdornment>
                  ),
                }} id="contact" placeholder="School Phone Number" fullWidth />
                <TextField value={schoolFB} onChange={e => setSchoolFB(e.target.value)} InputProps={{
                  startAdornment: (
                    <InputAdornment position="start"><Facebook /></InputAdornment>
                  ),
                }} id="facebook" placeholder="School Facebook Link" fullWidth />

                <div className={classes.Checks}>
                  <text style={{ fontWeight: 'bold' }}>School type: </text>
                  <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="type" name="type" value={schoolType} onChange={handleChangeSchoolType}>
                    <FormControlLabel value="Co-Education" control={<Radio />} label="Co-Education" />
                    <FormControlLabel value="Boys" control={<Radio />} label="Boys" />
                    <FormControlLabel value="Girls" control={<Radio />} label="Girls " />
                  </RadioGroup>
                </div >
                <div className={classes.Checks}>
                  <text style={{ fontWeight: 'bold' }}>Education level: </text>
                  <FormGroup row>
                    <FormControlLabel
                      control={<Checkbox checked={educationLevel.checkedA}
                        value={educationLevel.checkedA} onChange={handleChangeEducationLevel} name="checkedA" />}
                      label="Primary"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={educationLevel.checkedB}
                        value={educationLevel.checkedB} onChange={handleChangeEducationLevel} name="checkedB" />}
                      label="Middle"
                    />
                    <FormControlLabel
                      control={<Checkbox checked={educationLevel.checkedC}
                        value={educationLevel.checkedC} onChange={handleChangeEducationLevel} name="checkedC" />}
                      label="Higher"
                    />
                  </FormGroup>
                </div>
                <div className={classes.Checks}>
                  <text style={{ fontWeight: 'bold' }}>Education type: </text>
                  <RadioGroup onChange={(e) => { setEducationType(e.target.value) }} style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="educationtype" name="educationtype  " value={educationType}>
                    <FormControlLabel value="Matric/Fsc" control={<Radio />} label="Matric/Fsc" />
                    <FormControlLabel value="IGCSE" control={<Radio />} label="IGCSE" />
                  </RadioGroup>
                </div>
              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <div className={classes.box}>
                  <text style={{ fontSize: '10px' }}>Double click to go to your current location. <br />
                    Click on map to mark exact location of your school.</text>
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
                      <LocationMarker />
                      {/* For selected location  */}
                      <AddMarkerToClick />
                    </MapContainer>
                  </Widget>
                </div>
              </React.Fragment>
            )}
            <Button size="large" variant="contained" color="seconadary"
              className={classes.button}
              onClick={() => { props.history.goBack() }}
            > Cancel</Button>
            <Button size="large" variant="contained" color="seconadary"
              className={classes.button} onClick={()=>updateSchoolObject()}
            > Update</Button>
          </Widget>
        </div>

      </Grid>
      <Footer />
    </div>

  );
}


function LocationMarker() {
  const [position, setPosition] = React.useState(null)
  const map = useMapEvents({
    dblclick() {
      map.locate()
    },
    locationfound(e) {
      setPosition(e.latlng)
      map.flyTo(e.latlng, 15)
    },
  })

  return position === null ? null : (
    <Marker position={position} icon={iconPerson}>
      <Popup>You are here</Popup>
    </Marker>
  )
}
const iconPerson = new L.Icon({
  iconUrl: require('./marker.png'),
  iconSize: [30, 30],

});

function AddMarkerToClick() {

  const [markers, setMarkers] = React.useState([]);

  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng
      setMarkers([newMarker]);
    },
  })
  console.log("Current location")
  //console.log(markers)
  //console.log(markers[0])
  if (markers[0] != undefined) {
    console.log(markers[0].lat)
    selectedlocation.latitude = markers[0].lat
    console.log(markers[0].lng)
    selectedlocation.longitude = markers[0].lng
  }

  return (
    <>
      {markers.map(marker =>
        <Marker position={marker} icon={iconPerson}>
          <Popup>Latitude: {marker.lat}<br /> Longitutde: {marker.lng}</Popup>
        </Marker>
      )}
    </>
  )
}


export default withRouter(EditInfo);
