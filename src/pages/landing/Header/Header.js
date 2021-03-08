import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, InputBase, Menu, MenuItem, Fab, Link } from "@material-ui/core";
import { MailOutline as MailIcon, NotificationsNone as NotificationsIcon, Person as AccountIcon, Search as SearchIcon, Send as SendIcon } from "@material-ui/icons";
import classNames from "classnames";
import Logo from './logo.png';
import { useHistory } from "react-router-dom";
// styles
import useStyles from "./styles";
// components
import { Badge, Typography, Button } from "../../../components/Wrappers/Wrappers";
import Notification from "../../../components/Notification/Notification";
import UserAvatar from "../../../components/UserAvatar/UserAvatar";
// context
import { useLayoutState, useLayoutDispatch, toggleSidebar, } from "../../../context/LayoutContext";
import { useUserDispatch, signOut, toLogin, admin } from "../../../context/UserContext";

const messages = [
  { id: 0, variant: "warning", name: "Jane Hew", message: "Hey! How is it going?", time: "9:32" },
  { id: 1, variant: "success", name: "Lloyd Brown", message: "Check out my new Dashboard", time: "9:18", },
];
const notifications = [
  { id: 0, color: "warning", message: "Check out this awesome ticket" },
  { id: 1, color: "success", type: "info", message: "What is the best way to get ..." },
];

export default function Header(props) {

  var classes = useStyles();
  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();
  var userDispatch = useUserDispatch();
  // local
  var [mailMenu, setMailMenu] = useState(null);
  var [isMailsUnread, setIsMailsUnread] = useState(true);
  var [notificationsMenu, setNotificationsMenu] = useState(null);
  var [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  var [isSearchOpen, setSearchOpen] = useState(false);
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <img style={{ marginLeft: '20px', width: "40px", height: '45px' }} src={Logo} />
        <Typography variant="h5" weight="bold" className={classes.logotype}>
          SCHOOLHUB
        </Typography>

        <div className={classes.grow} />
        <Typography className={classes.logotype}>
          About us
        </Typography>
        <Link to="/signup" style={{ color: 'white', textDecoration: "none" }}>
          {"Signup"}
        </Link>
        <Link style={{ color: 'white' }}>
          Signin
        </Link>
        {/* <Link onClick={() => {props.history.push("/login")}}>hi</Link>  */}
        <Link onClick={() => {console.log(props.history)}}>hi</Link> 
      </Toolbar>
      
    </AppBar >
  );
}
