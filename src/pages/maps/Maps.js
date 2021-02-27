import React, { Fragment, useState, useCallback, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Popup from 'reactjs-popup';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import FilterListIcon from '@material-ui/icons/FilterList';
import marker from '../../logo.png'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { TextField, InputBase, Button, MenuItem, Select, DialogContent, Dialog, DialogTitle, DialogActions } from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import Widget from "../../components/Widget/Widget";
import { MapContainer, TileLayer, Marker } from 'react-leaflet'
import useStyles from "./styles";

import axios from "../../Util/axios"
import AuthService from "../../services/auth.service";

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
const Schools = [
  { id: '1', name: 'Army Public School, Islamabad', location: 'I-8 markaz, Islamabad' },
  { id: '2', name: 'Pak Turk International School, Islamabad', location: 'Taramri chowk, Islamabad' },
  { id: '3', name: 'Grafton School, Islamabad', location: 'Taramri chowk, Islamabad' }
]

let newData = {
  //filters: [],
  search: ""
}

export default function Maps() {
  const [value, setValue] = React.useState('Co-Education');
  const [value2, setValue2] = React.useState('Primary');
  const [value3, setValue3] = React.useState('Matric/Fsc');
  let [searchValue, setSearchValue] = useState("");
  var [searchResults, setSearchResults] = useState();
  var [allSchools, setAllSchools] = useState()

  //fee={min:0,max:5}
  //distance={min:0,max:5}

  var [fee, setFee] = useState();
  var [distance, setDistance] = useState();
  var [schoolType, setSchoolType] = useState('Co-Education');
  var [educationLevel, setEducationLevel] = useState('Primary');
  var [educationType, setEducationType] = useState('Matric/Fsc')
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const user = AuthService.getCurrentUser()

  const handleChangeSchoolType = (event) => {
    setSchoolType(event.target.value);
    console.log(schoolType)
  };
  const handleChangeEducationLevel = (event) => {
    setEducationLevel(event.target.value);
    console.log(educationLevel)
  };
  const handleChangeEducationType = (event) => {
    setEducationType(event.target.value);
    console.log(educationType)
  };
  var classes = useStyles();
  const position = [30.3753, 69.3451]

  let handleSend = () => {
    // let finalSearch = {
    //   //filters: filterValue,
    //   search: searchValue
    // }
    //newData.filters = finalComment
    console.log("search Value")
    console.log(searchValue)
    newData.search = searchValue

    postSearch()
  }

  const getAllSchools = useCallback(async (bool) => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/searchSchool/search/")
      console.log("request")
      setAllSchools(request.data)
      return request.data;
    }
    //And here you call it
    fetchData()
  }, [])

  useEffect(() => {
    getAllSchools()
    //getItems().then(data => setItems(data));
  }, []);

  const postSearch = useCallback(async () => {
    async function fetchData() {
      let request;
      console.log("NewData")
      console.log(newData)
      request = await axios.post("http://localhost:8080/searchSchool/search/" + newData.search, newData)
      console.log("request")
      console.log(request)
      setSearchResults(request.data)
      //window.location.reload()
      return request.data;
    }
    fetchData()
  }, [])

  let displayResults //= () => { let displayPostsVar

  if (searchResults != undefined) {
    console.log("inside displayresults")
    // {return <GetAllPosts allPosts= {allPosts}/>}
    displayResults = searchResults.map((i) => {
      // return <Post key={i._id} id={i._id}
      //   username={i.username} time={i.time} text={i.text} image={i.image} comments={i.comments} likes={i.likes} //onSelect={this.onSelect} 
      // />
      return (
        <div class={classes.result}>
          <text>{i.schoolName}</text>
          <br />
          <text style={{ fontSize: '10px' }}>{i.schoolAddress}</text>
        </div>
      )
    })
  } else {
    console.log("nothing")
  }

  let displayLocation;
  let markersArray = []

  // useEffect(() => {
  //   if (allSchools != undefined) {
  //     console.log("inside allSchool If")
  //     displayLocation = allSchools.map((i) => {
  //       let key = i._id
  //       let position = [Number(i.schoolCoordinates.latitude), Number(i.schoolCoordinates.longitude)]
  //       let content = i.aboutSchool
  //       let markers = {
  //         key: key,
  //         position: position,
  //         content: content
  //       }
  //       markersArray.push(markers)
  //     })

  //     console.log(markersArray)
  //   } else {
  //     console.log("allSchools Else")
  //   }
  //   //getItems().then(data => setItems(data));
  // }, [allSchools]);

  if (allSchools != undefined) {
    console.log("inside allSchool If")
    displayLocation = allSchools.map((i) => {
      let key = i._id
      let position = [Number(i.schoolCoordinates.longitude), Number(i.schoolCoordinates.latitude)]
      let content = i.aboutSchool
      let markers = {
        key: key,
        position: position,
        content: content
      }
      markersArray.push(markers)
    })

    console.log(markersArray)
  } else {
    console.log("allSchools Else")
  }

  const handleChangeDistance = (event) => {
    console.log("inisde handle Distance")
    setDistance(event.target.value);
    console.log(distance)
  };

  return (
    <div>
      <Grid container spacing={1}>
        <Grid item md={3}>
          <Widget title="Search School Here" disableWidgetMenu>
            <div className={classes.searchfield}>

              <FilterListIcon class={classes.icon} onClick={handleClickOpen} />
              <SearchIcon fontSize='large' class={classes.icon} />
              <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Filters</DialogTitle>
                <DialogContent>
                  <div class={classes.eachF}>
                    <text style={{ fontWeight: 'bold' }}>Disatnce: </text>
                    <FormControl className={classes.formControl}>
                      <Select
                        value={distance}
                        onChange={handleChangeDistance}
                        displayEmpty
                        className={classes.selectEmpty}
                        inputProps={{ 'aria-label': 'Without label' }}
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={0.5}>500m</MenuItem>
                        <MenuItem value={1}>1km</MenuItem>
                        <MenuItem value={5}>5km</MenuItem>
                        <MenuItem value={10}>10km</MenuItem>
                        <MenuItem value={50}>50km</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div class={classes.eachF1}>
                    <text style={{ fontWeight: 'bold' }}>Fee: </text>
                    <TextField placeholder="Min" class={classes.feefield} />
                    <TextField placeholder="Max" class={classes.feefield} />
                  </div>

                  <div class={classes.eachF1}>
                    <text style={{ fontWeight: 'bold' }}>School type: </text>
                    <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="type" name="type" value={schoolType}
                      onChange={handleChangeSchoolType}>
                      <FormControlLabel value="Co-Education" control={<Radio color='inherit' />} label="Co-Education" />
                      <FormControlLabel value="Boys" control={<Radio color='inherit' />} label="Boys" />
                      <FormControlLabel value="Girls" control={<Radio color='inherit' />} label="Girls " />
                    </RadioGroup>
                  </div >
                  <div class={classes.eachF}>
                    <text style={{ fontWeight: 'bold' }}>Education level: </text>
                    <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="educationlevel" name="educationlevel"
                     value={educationLevel} onChange={handleChangeEducationLevel}>
                      <FormControlLabel value="Primary" control={<Radio color='inherit' />} label="Primary" />
                      <FormControlLabel value="Middle" control={<Radio color='inherit' />} label="Middle" />
                      <FormControlLabel value="Higher" control={<Radio color='inherit' />} label="Higher " />
                    </RadioGroup>
                  </div>
                  <div class={classes.eachF}>
                    <text style={{ fontWeight: 'bold' }}>Education type: </text>
                    <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="educationtype" name="educationtype  " 
                    value={educationType} onChange={handleChangeEducationType}>
                      <FormControlLabel value="Matric/Fsc" control={<Radio />} label="Matric/Fsc" />
                      <FormControlLabel value="IGCSE" control={<Radio />} label="IGCSE" />
                    </RadioGroup>
                  </div>


                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Reset
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>

              {/* <InputBase onChange={e => setSearchValue(e.target.value)} placeholder='Search here...'></InputBase>

              <Popup
                trigger={<FilterListIcon class={classes.icon} />}
                position="right center">
                <Grid container>
                  <Grid item md={3} class={classes.popup2} >
                    <Widget title="Filter School Here" disableWidgetMenu>
                      <div class={classes.eachF}>
                        <text style={{ fontWeight: 'bold' }}>Disatnce: </text>
                        <InputBase placeholder='Max' class={classes.feefield}></InputBase> */}
              {/* <FormControl className={classes.formControl}>
                          <Select
                            id="demo-simple-select"
                            value={distance}
                            onChange={handleChangeDistance}
                          >
                            <MenuItem value={1}>1 km</MenuItem>
                            <MenuItem value={5}>5 km</MenuItem>
                            <MenuItem value={10}>10 km</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl className={classes.formControl}>
                          <Select
                            value={distance}
                            onChange={handleChangeDistance}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ 'aria-label': 'Without label' }}
                          >
                            <MenuItem value="">
                              <em>None</em>
                            </MenuItem>
                            <MenuItem value={0.5}>500m</MenuItem>
                            <MenuItem value={1}>1km</MenuItem>
                            <MenuItem value={5}>5km</MenuItem>
                            <MenuItem value={10}>10km</MenuItem>
                            <MenuItem value={50}>50km</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div class={classes.eachF1}>
                        <text style={{ fontWeight: 'bold' }}>Fee: </text>
                        <InputBase placeholder='Min' class={classes.feefield}></InputBase>
                        <InputBase placeholder='Max' class={classes.feefield}></InputBase>
                      </div>

                      <div class={classes.eachF1}>
                        <text style={{ fontWeight: 'bold' }}>School type: </text>
                        <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="type" name="type" value={schoolType}
                          onChange={handleChangeSchoolType}>
                          <FormControlLabel value="Co-Education" control={<Radio />} label="Co-Education" />
                          <FormControlLabel value="Boys" control={<Radio />} label="Boys" />
                          <FormControlLabel value="Girls" control={<Radio />} label="Girls " />
                        </RadioGroup>
                      </div >
                      <div class={classes.eachF}>
                        <text style={{ fontWeight: 'bold' }}>Education level: </text>
                        <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="educationlevel"
                          name="educationlevel" value={educationLevel} onChange={handleChangeEducationLevel}>
                          <FormControlLabel value="Primary" control={<Radio />} label="Primary" />
                          <FormControlLabel value="Middle" control={<Radio />} label="Middle" />
                          <FormControlLabel value="Higher" control={<Radio />} label="Higher " />
                        </RadioGroup>
                      </div>
                      <div class={classes.eachF}>
                        <text style={{ fontWeight: 'bold' }}>Education type: </text>
                        <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="educationtype"
                          name="educationtype  " value={educationType} onChange={handleChangeEducationType}>
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
                </Grid>
              </Popup>
              <Button onClick={() => handleSend()}> <SearchIcon fontSize='large' class={classes.icon} /></Button> */}

            </div>

            <div >
              {
                displayResults
              }
            </div>
          </Widget>
        </Grid>

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

              <MyMarkersList markers={markersArray} />
              {/* <Marker position={position}>
                  <Popup>
                    You are here
                  </Popup>
                </Marker> */}
            </MapContainer>
          </Widget>
        </Grid>
      </Grid>
    </div >

  );
}
