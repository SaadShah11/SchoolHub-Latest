import React, { useState } from "react";
import {AppBar,Toolbar,IconButton,InputBase,Menu,MenuItem,Fab,Link} from "@material-ui/core";
import {AccountCircle, MailOutline as MailIcon,NotificationsNone as NotificationsIcon,Person as AccountIcon,Search as SearchIcon,Send as SendIcon} from "@material-ui/icons";
import classNames from "classnames";
import Logo from './logo.png';
// styles
import useStyles from "./styles";
// components
import { Badge, Typography, Button } from "../Wrappers/Wrappers";
import Notification from "../Notification/Notification";
import UserAvatar from "../UserAvatar/UserAvatar"; 
// context
import {useLayoutState,useLayoutDispatch,toggleSidebar,} from "../../context/LayoutContext";
import { useUserDispatch, signOut, toProfile, home } from "../../context/UserContext";
const messages = [
  {id: 0,variant: "warning",name: "Jane Hew",message: "Hey! How is it going?",time: "9:32"},
  {id: 1,variant: "success",name: "Lloyd Brown",message: "Check out my new Dashboard",time: "9:18",},
];
const notifications = [
  { id: 0, color: "warning", message: "Check out this awesome ticket" },
  {id: 1,color: "success",type: "info",message: "What is the best way to get ..."},
];

const profile={name:'John Smith', user:'Student', profile:'Profile', photo:<AccountIcon/>}


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
      <img style={{marginLeft:'20px', width:"40px", height:'45px'}} src={Logo} />
        <Typography 
        onClick={() => props.history.push('/app/home')}
        variant="h5" weight="bold" className={classes.logotype}>
          
          SCHOOLHUB Admin Panel
          
        </Typography>
        
        <div className={classes.grow} />
        
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isNotificationsUnread ? notifications.length : null}
            color="warning"
          >
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <Typography
              className={classes.profileMenuLink}
              color="Inherit"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {notifications.map(notification => (
            <MenuItem
              key={notification.id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          ))}
        </Menu>
        
      </Toolbar>
    </AppBar>
  );
}
