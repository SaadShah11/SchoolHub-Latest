import React, { useState, useCallback, useEffect } from "react";
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
import AuthService from "../../services/auth.service";
import axios from "../../Util/axios"


const messages = [
  {id: 0,variant: "warning",name: "Jane Hew",message: "Hey! How is it going?",time: "9:32"},
  {id: 1,variant: "success",name: "Lloyd Brown",message: "Check out my new Dashboard",time: "9:18",},
];
const notifications = [
  { id: 0, color: "warning", message: "Check out this awesome ticket" },
  {id: 1,color: "success",type: "info",message: "What is the best way to get ..."},
];

const profile={name:'John Smith', user:'Student', profile:'Profile', photo:<AccountIcon/>}

let user = AuthService.getCurrentUser()
  console.log("User")
  console.log(user)

  if(user==null){
    console.log("changing user")
    user = {
      username: '',
      type:''
    }
  }

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

  var [allNotifications, setAllNotifications] = useState()
  var [reload, setReload] = useState(false)
  
  const getNotifications = useCallback(async (bool) => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/user_management/login")
      console.log("request")

      let finalUser
      request.data.filter((users)=>{
        if(user != undefined){
          finalUser = users
        }
      })

      console.log("Final Users")
      console.log(finalUser)
      setAllNotifications(finalUser.notification)
      return request.data;
    }
    fetchData()
    setReload(true)
  }, [])

  useEffect(()=>{
    getNotifications()
    setReload(false)
  },[reload])

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
      <img style={{marginLeft:'20px', width:"40px", height:'45px'}} src={Logo} />
        <Typography 
        onClick={() => {
          // if(user.type==''){
          //   props.history.push('/')
          // }else{
            props.history.push('/app/home')
          // }
          }}
        variant="h5" weight="bold" className={classes.logotype}>
          
          SCHOOLHUB
          
        </Typography>
        
        <div className={classes.grow} />
        {/* <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        */}
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
        {/*
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={e => {
            setMailMenu(e.currentTarget);
            setIsMailsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={isMailsUnread ? messages.length : null}
            color="secondary"
          >
            <MailIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton> */}
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
         <div className={classes.headerICon}> {profile.photo}</div>
        </IconButton>
        {/* <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              New Messages
            </Typography>
            <Typography
              className={classes.profileMenuLink}
              component="a"
              color="secondary"
            >
              {messages.length} New Messages
            </Typography>
          </div>
          {messages.map(message => (
            <MenuItem key={message.id} className={classes.messageNotification}>
              <div className={classes.messageNotificationSide}>
                <UserAvatar color={message.variant} name={message.name} />
                <Typography size="sm" color="text" colorBrightness="secondary">
                  {message.time}
                </Typography>
              </div>
              <div
                className={classNames(
                  classes.messageNotificationSide,
                  classes.messageNotificationBodySide,
                )}
              >
                <Typography weight="medium" gutterBottom>
                  {message.name}
                </Typography>
                <Typography color="text" colorBrightness="secondary">
                  {message.message}
                </Typography>
              </div>
            </MenuItem>
          ))}
          <Fab
            variant="extended"
            color="primary"
            aria-label="Add"
            className={classes.sendMessageButton}
          >
            Send New Message
            <SendIcon className={classes.sendButtonIcon} />
          </Fab>
        </Menu>
        */}
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
        >
          {allNotifications!=undefined ? allNotifications.map(notification => (
            <MenuItem
              key={notification._id}
              onClick={() => setNotificationsMenu(null)}
              className={classes.headerMenuItem}
            >
              <Notification {...notification} typographyVariant="inherit" />
            </MenuItem>
          )) : console.log("Undefined Notifications")}
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="bold">
              {user.username}
            </Typography>
            <Typography
              component="a"
              color="inherit"
            >
              {user.type}
            </Typography>
          </div>
          <MenuItem
            className={classNames(
              classes.profileMenuItem,
              classes.headerMenuItem,
            )}
            onClick={() => toProfile( props.history)}
          >
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
              
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
