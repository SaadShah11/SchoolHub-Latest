import React, { useState } from "react";
import {AppBar,Toolbar,IconButton,InputBase,Menu,MenuItem,Fab,Link} from "@material-ui/core";
import {AccountCircle, MailOutline as MailIcon,NotificationsNone as NotificationsIcon,Person as AccountIcon,Search as SearchIcon,Send as SendIcon} from "@material-ui/icons";
import useStyles from "./styles";
import Logo from './logo.png';
import { Badge, Typography, Button } from "../Wrappers/Wrappers";
import { toLogin } from "../../context/UserContext";
export default function Header(props){
  var classes = useStyles();
  return(
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
      <img style={{marginLeft:'20px', width:"40px", height:'45px'}} src={Logo} />
       <Typography>SCHOOLHUB</Typography>
       <Typography onClick={()=>props.history.push('/login')}>Login/Signup</Typography>
       </Toolbar>
    </AppBar>
  )
}