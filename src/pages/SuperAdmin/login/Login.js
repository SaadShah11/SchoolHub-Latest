import React, { useState, useEffect, useCallback } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
// styles
import useStyles from "./styles";

// logo
import logo from "../../../logo.png";
//import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../../context/UserContext";
import Widget from "../../../components/Widget/Widget";

import axios from "../../../Util/axios"
import AuthService from "../../../services/auth.service";

let userLogin = {
  type: 'Super Admin',
  email: "",
  password: ""
}

function Login(props) {
  var classes = useStyles();
  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  var [emailValue, setEmailValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");

  const loginSubmit = () => {

    if (emailValue === "" || passwordValue === "") {
      console.log('error, some field is empty')
      alert('error, some fields empty')
    } else {

      userLogin.email = emailValue
      userLogin.password = passwordValue

      sendRequest()
    }
  }

  //Snippet of code which runs based on a specific condition 
  const sendRequest = useCallback(async () => {
    //useEffect(() => {
    //Asyn is a request that is supposed to be send out of the application,
    //thats why we use async function

    console.log("inside useEffect")
    async function fetchData() {

      let request;

      console.log("inside Login")
      console.log(userLogin)
      AuthService.superAdminLogin(userLogin).then(
        (response) => {
          console.log(response)

          props.history.push("/superAdminDashboard/dashboard");
          // window.location.reload();
        },
        error => {
          console.log(error)
        }
      );

      console.log(request)
      return request;
    }
    //And here you call it
    fetchData()

  }, [])//now this is dependent on the url, everytime url changes it will run
  //[] means, run code once when it loads and dont run again, without it it runs in loop
  //[movies], runs everytime movies changes

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>School-Hub</Typography>
      </div>

      <div className={classes.formContainer}>
        <Widget disableWidgetMenu>
          <div className={classes.form}>
            <React.Fragment>
              <Typography variant="h2" className={classes.greeting}>
                Welcome to School-Hub Super Admin
              </Typography>
              {/* <Button size="large" className={classes.googleButton}>
                  <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button> */}
              {/* <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                  <Typography className={classes.formDividerWord}>or</Typography>
                  <div className={classes.formDivider} />
                </div> */}
              <Fade in={error}>
                <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
                </Typography>
              </Fade>
              {/* <form onSubmit={loginSubmit}> */}
                <TextField
                  id="email"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={emailValue}
                  onChange={e => setEmailValue(e.target.value)}
                  margin="normal"
                  placeholder="Email Adress"
                  type="email"
                  fullWidth
                />
                <TextField
                  id="password"
                  InputProps={{
                    classes: {
                      underline: classes.textFieldUnderline,
                      input: classes.textField,
                    },
                  }}
                  value={passwordValue}
                  onChange={e => setPasswordValue(e.target.value)}
                  margin="normal"
                  placeholder="Password"
                  type="password"
                  fullWidth
                />
                <div className={classes.formButtons}>
                  {isLoading ? (
                    <CircularProgress size={26} className={classes.loginLoader} />
                  ) : (
                    <Button

                      type="submit"
                      onClick={()=>loginSubmit()}

                      disabled={
                        emailValue.length === 0 || passwordValue.length === 0
                      }
                      variant="contained"
                      size="large"
                    >
                      Login
                    </Button>
                  )}
                  <Button
                    size="large"
                    className={classes.forgetButton}
                  >
                    Forget Password
                </Button>
                </div>
              {/* </form> */}
            </React.Fragment>


          </div>
        </Widget>
      </div>

    </Grid>
  );
}


export default withRouter(Login);
