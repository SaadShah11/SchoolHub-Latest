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
      <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
      <img style={{marginLeft:'20px', width:"40px", height:'45px', marginRight:'10px'}} src={Logo} />
       <Typography variant='h5' onClick={()=>props.history.push('/')}>SCHOOLHUB</Typography>
       </div>
       <Typography className={classes.signin} onClick={()=>props.history.push('/login')}>Sign in</Typography>
       </Toolbar>
    </AppBar>
  )
}