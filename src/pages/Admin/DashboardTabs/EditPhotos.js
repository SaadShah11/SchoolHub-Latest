import React, { useState } from "react";
import { InputAdornment, TextareaAutosize, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import Header from '../Header/Header'
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Footer from "../../../components/Footer/footer"
// context
import Widget from "../../../components/Widget/Widget";
import {Cancel, AddBox, PhotoSizeSelectActual, PlayArrow, PartyMode } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
    box: {
        width: "50%",
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
        flexDirection: 'row'
    },
    pic: {
        width: '100px',
        height: '100px',
        textAlign:'center',
        justifyContent:'center',
        '&:hover':{
            fill:'#9F9F9F'
        }
    },
    video: {
        width: "700px",
        height: '300px',
        textAlign:'center',
        justifyContent:'center'
    },
    AR:{
        display:"flex",
        flexDirection:'row',
        textAlign:'center',
        alignItems:'center',
        marginTop:'5px',
        width:'170px',
        border: "1px solid black",
        borderRadius:"8px",
        padding:'10px',
        margin:'auto',
        '&:hover':{
            color:'white',
            cursor:'pointer',
            backgroundColor:'#43425d'
        }
    },
    cancel:{
        '&:hover':{
            fill:'#9F9F9F'
        }
    },
    tabs:{
        color:'#43425d',
       },
       indicator:{
         backgroundColor:'#43425d',
         height:'3px'
        },
}))


function EditInfo(props) {
    var classes = useStyles();
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
            <Header history={props.history}/>
            <br /><br /><br /><br />
            <Grid container >
                <div className={classes.box}>
                    <Widget title='Edit Photos/Videos' disableWidgetMenu>
                        <Tabs
                            value={activeTabId}
                            onChange={(e, id) => setActiveTabId(id)}
                            classes={{indicator: classes.indicator, root:classes.tabs}}
                            centered
                        >
                            <Tab label="Photos" classes={{ root: classes.tab }} />
                            <Tab label="Videos" classes={{ root: classes.tab }} />
                        </Tabs>
                        {activeTabId === 0 && (
                            <React.Fragment >
                                <div className={classes.pics}>
                                    <AddBox className={classes.pic} />
                                    <div className={classes.pics}>
                                        {pics.map(function (item) {
                                            return (
                                                <div className={classes.pic}>
                                                    {item.source}
                                                    <Cancel className={classes.cancel}/>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                        {activeTabId === 1 && (
                            <React.Fragment>
                                <div className={classes.AR}>
                                <PartyMode/>
                                <text>Request AR model</text>
                                </div>
                                
                                <div className={classes.pics}>
                                    {video1 == 'true' ? <div className={classes.video}><PlayArrow className={classes.video} /> <Cancel className={classes.cancel}/></div> : <AddBox className={classes.pic} />}

                                </div>
                            </React.Fragment>
                        )}
                        <br/><br/>
                        <Button size="large" variant="contained" color="seconadary"
                            className={classes.button}
                            onClick={() => { props.history.goBack() }}
                        > Cancel</Button>
                        <Button size="large" variant="contained" color="seconadary"
                            className={classes.button}
                        > Save</Button>

                    </Widget>
                </div>

            </Grid>
            <Footer />
        </div>

    );
}

export default withRouter(EditInfo);
