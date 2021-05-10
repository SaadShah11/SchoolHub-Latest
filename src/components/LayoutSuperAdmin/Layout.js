import React from "react";
import {Route,Switch,Redirect,withRouter,} from "react-router-dom";
import {Box, IconButton, Link} from '@material-ui/core';
import Icon from '@mdi/react';
//icons
import {mdiFacebook as FacebookIcon,mdiTwitter as TwitterIcon,mdiGithub as GithubIcon,} from '@mdi/js'
// styles
import useStyles from "./styles";
// components
import Header from "../HeaderSuperAdmin/Header";
import Sidebar from "../SidebarSuperAdmin/Sidebar";
// pages
import Dashboard from '../../pages/SuperAdmin/Dashboard';
import Live from '../../pages/SuperAdmin/LiveStream';
import Ar from '../../pages/SuperAdmin/AR';
import Schools from '../../pages/SuperAdmin/Schools';
import Reviews from '../../pages/SuperAdmin/Reviews'
import Footer from '../Footer/footer'
function Layout(props) {
  var classes = useStyles();
  return (
    <div className={classes.root}>
        <>
          <Header history={props.history} />
          <Sidebar />
          <div
            className={classes.content}
          >
            <div className={classes.fakeToolbar} />
            <Switch>
              <Route path="/superAdminDashboard/dashboard" component={Dashboard} />
              <Route path="/superAdminDashboard/schools" component={Schools} />
              <Route path="/superAdminDashboard/ar" component={Ar} />
              <Route path="/superAdminDashboard/live" component={Live} />
              <Route path="/superAdminDashboard/reviews" component={Reviews} />
            </Switch>
            <Footer/>
          </div>
        </>
    </div>
  );
}

export default withRouter(Layout);
