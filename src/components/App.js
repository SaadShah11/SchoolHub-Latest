import React from "react";
import { HashRouter, Route, Switch, Redirect, Router, BrowserRouter } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
//import Login from "../pages/login/Login";
import Login from '../pages/NewLogin/Login'
import Signin from '../pages/profiling/signin/signinNew'
import Landing from './../pages/landing/Landing'
import userProfile from '../pages/UserProfile/UserProfile'

// context
import { useUserState } from "../context/UserContext";
import Home from "../pages/home/Home";
import Dashboard from "../pages/dashboard/Dashboard";
import AdminAdding from '../pages/Admin/AdminAdding'
import AdminDashboard from '../pages/Admin/AdminDashboard'
import SchoolDetails from "../pages/Admin/SchoolView/School"
//import checkboxUI from "../pages/Admin/checkbox"
import Live from '../pages/Admin/DashboardTabs/LiveStream'
import EditInfo from '../pages/Admin/DashboardTabs/Edit info'
import EditPhotos from '../pages/Admin/DashboardTabs/EditPhotos'
import EditFee from '../pages/Admin/DashboardTabs/EditFee'
import Faculty from '../pages/Admin/DashboardTabs/Faculty'
import Feedback from '../pages/Admin/DashboardTabs/Feedback'
import uploadImage from '../pages/uploadImage/upload'

import superAdminlogin from '../pages/SuperAdmin/login/Login'
import SuperAdmin from './LayoutSuperAdmin'

import Faq from '../pages/faq/Feedback'


export default function App() {
  // global
  var { isAuthenticated } = useUserState();
  let url1 = '/user_management/login';
  let url2 = '/user_management/signup';

  return (
    <HashRouter>
      <Switch>
        {/* <Route exact path="/" component={Landing} /> */}
        {/* <Route exact path="/" render={() => <Redirect to="/app/home" />} /> */}
        {/* <Route exact path="/app" render={() => <Redirect to="/app/home" />}/> */}

        <Route path="/schoolDetails" render={(props) => (
          <SchoolDetails {...props} />
        )} />

        <Route exact path="/general" component={EditInfo} />
        <Route exact path="/photos" component={EditPhotos} />
        <Route exact path="/fee" component={EditFee} />
        <Route exact path="/acad" component={EditInfo} />
        <Route exact path="/requests" component={Faculty} />
        <Route exact path="/reviews" component={Feedback} />
        <Route exact path="/uploadImage" component={uploadImage} />

        <Route exact path="/admin" component={AdminAdding} />
        <Route exact path="/adminDashboard" component={AdminDashboard} />
        <Route exact path="/landing" component={Landing} />
        {/* <Route exact path="/" render={(props) => (
          <Landing {...props} fetchUrl1={url1} fetchUrl2={url2} />
        )} /> */}
        {/* <Route exact path="/landing" component={Landing} /> */}
        <Route exact path="/" render={(props) => (
          <Login {...props} fetchUrl1={url1} fetchUrl2={url2} />
        )} />
        <Route exact path="/live" component={Live} />
        <Route path="/app/dashboard" component={Dashboard} />
        <Route path="/app" component={Layout} />
        <Route path="/userProfile" component={userProfile} />

        <Route exact path="/superAdmin" component={superAdminlogin} />
        <Route path="/superAdminDashboard" component={SuperAdmin} />

        {/* <PublicRoute path="/login" render={(props) => (
          <Login {...props} fetchUrl={url1} fetchUrl2={url2} />
        )} /> */}
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
