import React, { useState } from "react";
import {Grid,Typography,  Button, Tabs,  Tab,  TextField,} from "@material-ui/core";
import Header from './Header/Header'
import { withRouter } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
// styles
import {mdiFacebook as FacebookIcon,mdiTwitter as TwitterIcon,mdiGithub as GithubIcon,} from '@mdi/js'
import {Box, IconButton, Link} from '@material-ui/core';
import Icon from '@mdi/react';
import Acad from './images/Acad.jpg'
import Fee from './images/feee.jpg'
import Live from './images/Live.jpg'
import Photos from "./images/Photos.jpg"
import Request from './images/Request.jpg'
import Reviews from './images/Reviews.jpg'
import General from './images/General.jpg'
import AuthService from "../../services/auth.service";
// context
import { useUserDispatch, loginUser, admin } from "../../context/UserContext";
import Widget from "../../components/Widget/Widget";
import Footer from "../../components/Footer/footer"
const useStyles = makeStyles((theme) => ({
    container:{
        width:'90%',
        margin:'auto',
        marginTop:'80px',
    },
    tab:{
        '&:hover':{
            opacity:'0.6',
            cursor:'pointer'
        }
    },
    link: {
        '&:not(:first-child)': {
          paddingLeft: 30
        },
        
      },
    pic:{
        width:"200px", 
        height:'170px'
      }
}))
const teachers=[
  {name: "Muhammad Ahmed", icon:<DeleteIcon/>},
  {name: "Ali Murtaza", icon:<DeleteIcon/>},
  {name: "Mr. john wick", icon:<DeleteIcon/>}
]

function Login(props) {
  var classes = useStyles();

  const school = AuthService.getCurrentSchool()
  console.log(school)

  return (
      <div>
    <Header history={props.history}/>
    <div className={classes.container}>
    <Widget  title='SCHOOL DASHBOARD' disableWidgetMenu>
    <Grid style={{justifyContent:'center'}} container  spacing={4} >
            <Grid className={classes.tab} item><Widget disableWidgetMenu><img className={classes.pic} onClick={()=>{props.history.push('./general')}} src={General} /></Widget></Grid>
            <Grid className={classes.tab} item><Widget disableWidgetMenu><img className={classes.pic} onClick={()=>{props.history.push('./photos')}} src={Photos} /></Widget></Grid>
            {/* <Grid className={classes.tab} item><Widget disableWidgetMenu><img className={classes.pic} onClick={()=>{props.history.push('./acad')}} src={Acad} /></Widget></Grid> */}
            <Grid className={classes.tab} item><Widget disableWidgetMenu><img className={classes.pic} onClick={()=>{props.history.push('./fee')}} src={Fee} /></Widget></Grid>
            <Grid className={classes.tab} item><Widget disableWidgetMenu><img className={classes.pic} onClick={()=>{props.history.push('./live')}} src={Live} /></Widget></Grid>
            <Grid className={classes.tab} item><Widget disableWidgetMenu><img className={classes.pic} onClick={()=>{props.history.push('./requests')}} src={Request} /></Widget></Grid>
            <Grid className={classes.tab} item><Widget disableWidgetMenu><img className={classes.pic} onClick={()=>{props.history.push('./reviews')}} src={Reviews} /></Widget></Grid>
    </Grid>
    </Widget>
    </div>
    <Footer/>
      </div>
  );
}

export default withRouter(Login);
