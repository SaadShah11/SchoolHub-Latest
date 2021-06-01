import React, { useState, useEffect } from "react";
import { Drawer, List } from "@material-ui/core";
import {LiveTv as Stream, Equalizer as Stats, LocationOn as Map, Home as HomeIcon,FilterNone as UIElementsIcon} from "@material-ui/icons";
import GroupIcon from '@material-ui/icons/Group';
import ChatIcon from '@material-ui/icons/Chat';
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
// styles
import useStyles from "./styles";
// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
// context
import {useLayoutState} from "../../context/LayoutContext";

const structure = [
  
  {id: 0, label: "Statistics", link: "/app/charts", icon: <Stats /> },
  {id: 1, label: "Map", link: "/app/map", icon: <Map />},
  {id: 2, label: "Home", link: "/app/home", icon: <HomeIcon /> },
  {id: 3,label: "Live Stream",link: "/app/live",icon: <Stream />},
  {id: 4,label: "Friends",link: "/app/friends",icon: <GroupIcon />},
  {id: 6,label: "Inbox",link: "/app/inbox",icon: <ChatIcon />},
  {id: 5,label: "Feedback",link: "/app/faq",icon: <UIElementsIcon />}
  ,
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function() {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer variant={"permanent"} className={classes.drawerOpen}>
      <div className={classes.toolbar} />
      <List className={classes.sidebarList}>
        {structure.map(link => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))} 
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
