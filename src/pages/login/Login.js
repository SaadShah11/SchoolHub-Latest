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
import logo from "../../logo.png";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from "../../context/UserContext";
import Widget from "../../components/Widget/Widget";

import axios from "../../Util/axios"
import AuthService from "../../services/auth.service";

let user = {
  type: "",
  email: "",
  username: "",
  phoneNumber: 0,
  password: ""
}

let userLogin = {
  type: "",
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
  var [activeTabId, setActiveTabId] = useState(0);
  var [nameValue, setNameValue] = useState("");
  var [emailValue, setEmailValue] = useState("");
  var [loginValue, setLoginValue] = useState("");
  var [phoneValue, setphoneValue] = useState(0);
  var [passwordValue, setPasswordValue] = useState("");
  var [typeValue, setTypeValue] = useState('')
  var [users, setUsers] = useState([])
  var [userId, setUserId] = useState('')
  let signupBool;

  const useToggle = (initialState) => {
    const [isToggled, setIsToggled] = React.useState(initialState);

    // put [setIsToggled] into the useCallback's dependencies array
    // this value never changes so the callback is not going to be ever re-created
    const toggle = React.useCallback(
      () => setIsToggled(state => !state),
      [setIsToggled],
    );

    return [isToggled, toggle];
  }

  var [isToggled, toggle] = useToggle(false)

  const signUpSubmit = () => {
    if (typeValue === "" || emailValue === "" || nameValue === ""
      || phoneValue === 0 || passwordValue === "") {
      console.log('error, some field is empty')
      alert('error, some fields empty')
    } else {
      console.log("inside signUpSubmit")

      user.type = typeValue
      user.email = emailValue
      user.username = nameValue
      user.phoneNumber = phoneValue
      user.password = passwordValue

      console.log('inside signup')
      console.log(user)
      signupBool = true
      sendRequest(signupBool)
    }
  }

  const loginSubmit = () => {

    if (typeValue === "" || emailValue === "" || passwordValue === "") {
      console.log('error, some field is empty')
      alert('error, some fields empty')
    } else {

      console.log("inside loginSubmit")

      userLogin.type = typeValue
      userLogin.email = emailValue
      userLogin.password = passwordValue

      console.log(userLogin)
      signupBool = false
      sendRequest(signupBool)
    }
  }

  //Snippet of code which runs based on a specific condition 
  const sendRequest = useCallback(async (bool) => {
    //useEffect(() => {
    //Asyn is a request that is supposed to be send out of the application,
    //thats why we use async function

    console.log("inside useEffect")
    async function fetchData() {
      //await means wait for the requests come back
      console.log('inside fetchdata')
      console.log(bool)
      let request;

      if (bool === true) {
        console.log("inside signUp")
        AuthService.register(user).then(
          response => {
            console.log(response.data.message)
          },
          error => {
            console.log("SignUp Error")
            console.log(error)
          }
        );
      }
      /*
            if (bool === true) {
      
              console.log("inside signup")
              console.log(user)
              request = await axios.post(props.fetchUrl2, user)
              console.log(request)
              //setUserId(request.data.id)
            } 
            */
      else if (bool === false) {
        console.log("inside Login")
        console.log(userLogin)
        AuthService.login(userLogin).then(
          (response) => {
            console.log(response)
            if (response.type === "School") {
              props.history.push("/admin");
              window.location.reload();
            } else {
              props.history.push("/app/home");
              window.location.reload();
            }
          },
          error => {
            console.log(error)
          }
        );
        /*
        //request = await axios.get(props.fetchUrl1)
        request = await axios.post(props.fetchUrl1, userLogin).then((response) => {
          console.log(response)
          const status = response.status;
          //redirect logic
          if (status == 200) {
            props.history.push({ pathname: '/app/home', data: response.data })
            //Also use props.history.push("/app/Home") if no data to pass
          }
        })
          .catch(e => {
            console.error(e);
          });

        //.then(response => setUsers(response.data.total))
        //fetchUrl will send some url that is to be added infront of the base url
        //console.log(request)
        //window.location.href = "http://localhost:3000/app/Home";

        //setUsers(request.data)
        console.log('inside login')

        */
      } else {
        console.log("wrong boolean value")
      }
      console.log(request)
      return request;
    }
    //And here you call it
    fetchData()

  }, [props.fetchUrl1], [props.fetchUrl2])//now this is dependent on the url, everytime url changes it will run
  //[] means, run code once when it loads and dont run again, without it it runs in loop
  //[movies], runs everytime movies changes


  //console.log(users)
  console.log("Boolean")
  console.log(signupBool)

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>School-Hub</Typography>
      </div>

      <div className={classes.formContainer}>
        <Widget disableWidgetMenu>
          <div className={classes.form}>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => { setActiveTabId(id); toggle() }}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Login" classes={{ root: classes.tab }} />
              <Tab label="New User" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment>
                <Typography variant="h2" className={classes.greeting}>
                  Welcome to School-Hub
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
                <form onSubmit={loginSubmit}>
                  <text className={classes.signin}>Sign in as:</text>
                  <RadioGroup className={classes.radio} name="type" value={typeValue}
                    onChange={(e) => { setTypeValue(e.target.value) }}>
                    <FormControlLabel value="School" control={<Radio />} label="School" />
                    <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
                    <FormControlLabel value="Student" control={<Radio />} label="Student" />
                    {/* <FormControlLabel value="Parent" control={<Radio />} label="Parent" /> */}
                  </RadioGroup>
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
                        // onClick={() =>
                        //   loginUser(
                        //     userDispatch,
                        //     loginValue,
                        //     passwordValue,
                        //     props.history,
                        //     setIsLoading,
                        //     setError,
                        //   )
                        // }
                        type="submit"

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
                </form>
              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <Typography variant="h2" className={classes.greeting}>
                  Create your account
              </Typography>
                {/* <Typography variant="h3" className={classes.subGreeting}>
                Create your account
              </Typography> */}
                <Fade in={error}>
                  <Typography color="secondary" className={classes.errorMessage}>
                    Something is wrong with your login or password :(
                </Typography>
                </Fade>
                <text className={classes.signin}>Sign up as:</text>
                <form onSubmit={signUpSubmit}>
                  <RadioGroup class={classes.radio} name="type" value={typeValue}
                    onChange={(e) => { setTypeValue(e.target.value) }} >
                    <FormControlLabel value="School" control={<Radio />} label="School" />
                    <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
                    <FormControlLabel value="Student" control={<Radio />} label="Student" />
                    {/* <FormControlLabel value="Parent" control={<Radio />} label="Parent" /> */}
                  </RadioGroup>

                  <TextField
                    id="name"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={nameValue}
                    onChange={e => setNameValue(e.target.value)}
                    margin="normal"
                    placeholder="Full Name"
                    type="text"
                    fullWidth
                  />
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
                    placeholder="Email Address"
                    type="email"
                    fullWidth
                  />
                  <TextField
                    id="phone"
                    InputProps={{
                      classes: {
                        underline: classes.textFieldUnderline,
                        input: classes.textField,
                      },
                    }}
                    value={phoneValue}
                    onChange={e => setphoneValue(e.target.value)}
                    margin="normal"
                    placeholder="Phone number"
                    type="number"
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
                  <div className={classes.creatingButtonContainer}>
                    {isLoading ? (
                      <CircularProgress size={26} />
                    ) : (
                      <Button

                        disabled={
                          emailValue.length === 0 ||
                          passwordValue.length === 0 ||
                          nameValue.length === 0
                        }
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.createAccountButton}
                        type="submit"

                      >
                        Create your account
                      </Button>
                    )}
                  </div>
                </form>
                {/* <div className={classes.formDividerContainer}>
                  <div className={classes.formDivider} />
                  <Typography className={classes.formDividerWord}>or</Typography>
                  <div className={classes.formDivider} />
                </div> */}
                {/* <Button
                  size="large"
                  className={classnames(
                    classes.googleButton,
                    classes.googleButtonCreating,
                  )}
                >
                  <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button> */}
              </React.Fragment>
            )}
          </div>
        </Widget>
      </div>

    </Grid>
  );
}


export default withRouter(Login);
