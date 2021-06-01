import React, { useState, useEffect } from "react";
import { Drawer, List } from "@material-ui/core";
import {ThreeDRotation as AR, Apartment as Apartment, LiveTv as Stream, Equalizer as Stats, LocationOn as Map, Home as HomeIcon,FilterNone as UIElementsIcon} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
// styles
import useStyles from "./styles";
// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
// context
import {useLayoutState} from "../../context/LayoutContext";

const structure = [
  {id: 0, label: "Dashboard", link: "/superAdminDashboard/dashboard", icon: <HomeIcon /> },
  {id: 1, label: "Schools", link: "/superAdminDashboard/schools", icon: <Apartment />},
  // {id: 2, label: "AR requests", link: "/superAdminDashboard/ar", icon: <AR /> },
  {id: 3,label: "Live Stream",link: "/superAdminDashboard/live",icon: <Stream />},
  {id: 4,label: "Reviews and Feedbacks",link: "/superAdminDashboard/reviews",icon: <UIElementsIcon />},
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
