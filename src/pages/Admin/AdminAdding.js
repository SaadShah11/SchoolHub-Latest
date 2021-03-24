import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Widget from "../../components/Widget/Widget";
import { FormGroup, Tabs, Tab, InputAdornment, Checkbox, FormControlLabel, Radio, RadioGroup, Button, Stepper, Step, StepLabel, TextField, Typography } from '@material-ui/core';
import { Delete, VideoCall, Photo } from '@material-ui/icons';
import Fee from './fee'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { toLogin } from "../../context/UserContext";
import { AccountCircle, Room, PhoneAndroid, AlternateEmail, Code, Facebook } from '@material-ui/icons'
import { Cancel, AddBox, PhotoSizeSelectActual, PlayArrow, PartyMode } from '@material-ui/icons'

import { v4 as uuidv4 } from 'uuid';
import firebase from "../../Util/firebase"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        width: "80%",
        margin: 'auto',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    box: {
        width: "60%",
        margin: 'auto',

    },
    box2: {
        display: 'flex',
        flexDirection: 'row'

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
    Checks: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    postbottom: {
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'center',
        alignItems: 'center',
        marginTop: '5px',
    },
    postbottomL: {
        justifyContent: 'center',
        display: "flex",
        width: '26%',
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: "5px",
        padding: "5px",
        backgroundColor: '#f1f1f1',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: '#C5C5C5'
        }
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        //   alignItems:'center'
    },
    mapContainer: {
        height: "65vh",
        width: '90vh',
    },
}));

function getSteps() {
    return ['Add General Information', 'Add photos/video', 'Add Fee details', 'Add location', 'Finish'];
}

let School = {
    schoolName: "",
    schoolAddress: "",
    zipCode: "",
    schoolEmail: "",
    schoolPhoneNumber: "",
    schoolFB: "",
    schoolType: "",
    educationLevel: "",
    educationType: ""
}

function GetStepContent(stepIndex) {
    const position = [30.3753, 69.3451]
    const classes = useStyles();
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

    let [schoolName, setSchoolName] = useState()
    let [schoolAddress, setSchoolAddress] = useState()
    let [zipCode, setZipCode] = useState()
    let [schoolEmail, setSchoolEmail] = useState()
    let [schoolPhoneNumber, setSchoolPhoneNumber] = useState()
    let [schoolFB, setSchoolFB] = useState()
    let [educationType, setEducationType] = useState()

    let [educationLevel, setEducationLevel] = useState({
        checkedA: false,
        checkedB: false,
        checkedC: false
    });

    let [schoolType, setSchoolType] = useState()
    var [activeTabId, setActiveTabId] = useState(0);
    const [video1, setVideo1] = React.useState('true');
    const [picss, setpicss] = React.useState(5)
    const [value, setValue] = React.useState('Co-Education');
    const [value3, setValue3] = React.useState('Matric/Fsc');

    const handleChangeSchoolType = (event) => {
        setValue(event.target.value);
    };
    const handleChange3 = (event) => {
        setValue3(event.target.value);
    };

    const handleChangeEducationLevel = (event) => {
        setEducationLevel({ ...educationLevel, [event.target.name]: event.target.checked });
    };

    const [files, setFiles] = useState([])

    const onFileChange = e => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newFile = e.target.files[i];
            newFile["id"] = Math.random();
            // add an "id" property to each File object
            setFiles(prevState => [...prevState, newFile]);
        }
    };

    const uploadTask =
        firebase.storage().ref().child(`/schoolImages/${files.name}`).put(files);
    uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
            const progress = (
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            console.log(`Progress: ${progress}%`);
            if (snapshot.state === firebase.storage.TaskState.RUNNING) {
                console.log('file uploading...')
            }
            // ...etc
        },
        error => console.log(error.code),
        async () => {
            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
            console.log(downloadURL);
            // the web storage url for our file
        });

    const onUploadSubmission = e => {
        e.preventDefault(); // prevent page refreshing
        const promises = [];
        files.forEach(file => {
            const uploadTask = firebase.storage().ref().child(`your/file/path/${file.name}`).put(file);
            promises.push(uploadTask);
            uploadTask.on(
                firebase.storage.TaskEvent.STATE_CHANGED,
                snapshot => {

                }
            );
        });

    }

    console.log("School Name")
    console.log(educationLevel)

    switch (stepIndex) {
        case 0:
            return <div className={classes.box}>
                <Widget title='General Information' disableWidgetMenu>
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
                        <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="type" name="type" value={value} onChange={handleChangeSchoolType}>
                            <FormControlLabel value="Co-Education" control={<Radio />} label="Co-Education" />
                            <FormControlLabel value="Boys" control={<Radio />} label="Boys" />
                            <FormControlLabel value="Girls" control={<Radio />} label="Girls " />
                        </RadioGroup>
                    </div >
                    {/* <div className={classes.Checks}>
                        <text style={{ fontWeight: 'bold' }}>Education level: </text>
                        <div>
                            <FormControlLabel control={<Checkbox name="checkedC" />} label="Junior" />
                            <FormControlLabel control={<Checkbox name="checkedC" />} label="Middle" />
                            <FormControlLabel control={<Checkbox name="checkedC" />} label="Higher" />
                        </div>

                    </div> */}
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
                        <RadioGroup onChange={(e) => { setEducationType(e.target.value) }} style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="educationtype" name="educationtype  " value={value3} onChange={handleChange3}>
                            <FormControlLabel value="Matric/Fsc" control={<Radio />} label="Matric/Fsc" />
                            <FormControlLabel value="IGCSE" control={<Radio />} label="IGCSE" />
                        </RadioGroup>
                    </div>
                </Widget>

            </div>;
        case 1:
            return <div className={classes.box}>
                <Widget title='Photos/Video' disableWidgetMenu>
                    <Tabs
                        value={activeTabId}
                        onChange={(e, id) => setActiveTabId(id)}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Photos" classes={{ root: classes.tab }} />
                        <Tab label="Videos" classes={{ root: classes.tab }} />
                    </Tabs>
                    {activeTabId === 0 && (
                        <React.Fragment >
                            <div className={classes.pics}>
                                <AddBox className={classes.pic} />
                                <label>Select Files
                                    <input type="file" multiple onChange={onFileChange} />
                                </label>
                                {/* <div className={classes.pics}>
                                {pics.map(function (item) {
                                    return (
                                        <div className={classes.pic}>
                                            {item.source}
                                            <Cancel className={classes.cancel} />
                                        </div>
                                    )
                                })}
                            </div> */}
                            </div>
                        </React.Fragment>
                    )}
                    {activeTabId === 1 && (
                        <React.Fragment>
                            <div className={classes.AR}>
                                <PartyMode />
                                <text>Request AR model</text>
                            </div>

                            <div className={classes.pics}>
                                {video1 == 'true' ? <div className={classes.video}><PlayArrow className={classes.video} /> <Cancel className={classes.cancel} /></div> : <AddBox className={classes.pic} />}

                            </div>
                        </React.Fragment>
                    )}
                    <br />
                </Widget>
            </div>;;
        case 2:
            return <div className={classes.box}>
                <Widget title='Fee Details' disableWidgetMenu>
                    <Fee />
                </Widget>
            </div>;
        case 3:
            return <div className={classes.box}>
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
            </div>;
        case 4:
            return <div className={classes.box}>
                <Widget title='Request submitted' disableWidgetMenu>
                    <text>Process for adding your school has been completed.</text>
                    <br />
                    <text>Your request has been submitted and will be processed soon.</text>
                </Widget>
            </div>;;
        default:
            return 'Unknown stepIndex';
    }
}

export default function AdminAdding(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Widget>
                            <Typography className={classes.instructions}>All steps completed</Typography>
                            <Button onClick={handleReset}>Reset</Button>
                        </Widget>
                    </div>
                ) : (
                    <div>
                        <div >
                            <Typography className={classes.instructions}>{GetStepContent(activeStep)}</Typography>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                disabled={activeStep === 0 || activeStep === 4}
                                onClick={handleBack}
                                className={classes.button}
                            >
                                Back
                                </Button>
                            <Button variant="contained" className={classes.button}
                                onClick={activeStep === 4 ? () => props.history.push('/adminDashboard') : handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
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
