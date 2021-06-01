import React, { useState, useCallback, useEffect } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  Tabs,
  Tab,
  TextField,
  Fade,
  Link
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Logo from './logo.jpg'
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"
// styles
import useStyles from "./styles";
import AuthService from "../../services/auth.service";
import axios from "../../Util/axios"
import { CometChat } from "@cometchat-pro/chat"


// logo
import logo from "../../logo.png";
import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser, admin } from "../../context/UserContext";
import Widget from "../../components/Widget/Widget";

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
  var [phoneValue, setphoneValue] = useState();
  var [passwordValue, setPasswordValue] = useState("");
  var [typeValue, setTypeValue] = useState('')
  var [users, setUsers] = useState([])
  var [userId, setUserId] = useState('')
  var [allSchools, setAllSchools] = useState()
  let signupBool;

  const getSchools = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/school/School_Details")
      console.log("request")
      console.log(request.data)
      setAllSchools(request.data)
      return request.data;
    }
    fetchData()
  }, [])

  useEffect(() => {
    getSchools()
  }, [])

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
      sendRequest(signupBool, allSchools)
    }
  }



  const sendRequest = useCallback(async (bool, allSchoolss) => {
    console.log("inside useEffect")
    async function fetchData() {
      console.log('inside fetchdata')
      console.log(bool)
      let request;

      if (bool === true) {
        console.log("inside signUp")
        AuthService.register(user).then(
          response => {
            console.log(response.data.message)

            let authKey = "6686381f7d6999ea04c5eb3feea375ae7d205b0f";
            var uid = response.data._id;
            var name = response.data.username;

            var user = new CometChat.User(uid);

            user.setName(name);
            console.log("Creating User in Comet chat")
            CometChat.createUser(user, authKey).then(
              user => {
                console.log("user created", user);
              }, error => {
                console.log("error", error);
              }
            )

            setActiveTabId(0)
          },
          error => {
            console.log("SignUp Error")
            console.log(error)
          }
        );
      }

      else if (bool === false) {
        console.log("inside Login")
        console.log(userLogin)
        AuthService.login(userLogin).then(
          (response) => {
            console.log(response)
            if (response.type === "School") {
              // props.history.push("/adminDashboard");
              console.log("STEP1")
              console.log(allSchoolss)
              if (allSchoolss != undefined) {
                console.log("STEP2")
                let existingSchool = '';
                existingSchool = allSchoolss.filter((item) => {
                  if (item.adminID == response._id) {
                    return item
                  }
                })
                if (existingSchool == '') {
                  props.history.push("/admin");
                } else {
                  props.history.push("/adminDashboard");
                }

                //window.location.reload();
              }

            } else {
              // console.log("Response")
              // console.log(response)

              var UID = response._id
              var authKey = "6686381f7d6999ea04c5eb3feea375ae7d205b0f";

              CometChat.login(UID, authKey).then(
                user => {
                  console.log("Login Successful:", { user });
                },
                error => {
                  console.log("Login failed with exception:", { error });
                }
              );
              props.history.push("/app/home");
              // window.location.reload();
            }
          },
          error => {
            console.log(error)
          }
        );
      } else {
        console.log("wrong boolean value")
      }
      console.log(request)
      return request;
    }
    //And here you call it
    fetchData()
  }, [])



  //}, [props.fetchUrl1], [props.fetchUrl2])

  console.log("Boolean")
  console.log(signupBool)

  return (
    <div style={{ backgroundImage: `url(${Logo})` }}>
      <Grid container className={classes.container}>
        <div className={classes.logotypeContainer}>
          {/* <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography  className={classes.logotypeText}>School-Hub</Typography>
        <Typography variant="h6" >
                Finding the right school just got easier
        </Typography> */}
        </div>

        <div className={classes.formContainer}>
          <Widget disableWidgetMenu>
            <div className={classes.form}>
              <Tabs
                value={activeTabId}
                onChange={(e, id) => setActiveTabId(id)}
                indicatorColor="primary"
                textColor="primary"
                classes={{ indicator: classes.indicator, root: classes.tabs }}
                centered
              >
                <Tab label="Login" classes={{ root: classes.tab }} />
                <Tab label="New User" classes={{ root: classes.tab }} />
              </Tabs>
              {activeTabId === 0 && (
                <React.Fragment>
                  <Typography variant="h6" className={classes.greeting}>
                    Already Registered?
              </Typography>
                  <Typography variant="h2" className={classes.greeting}>
                    Login Here!
              </Typography>


                  <div className={classes.formDividerContainer}>
                    <div className={classes.formDivider} />
                    <Typography className={classes.formDividerWord}></Typography>
                    <div className={classes.formDivider} />
                  </div>
                  <Fade in={error}>
                    <Typography color="secondary" className={classes.errorMessage}>
                      Something is wrong with your login or password :(
                </Typography>
                  </Fade>
                  {/* <form onSubmit={loginSubmit}> */}
                  <text class={classes.signin}>Sign in as:</text>
                  <RadioGroup class={classes.radio} name="type" value={typeValue}
                    onChange={(e) => { setTypeValue(e.target.value) }} >
                    <FormControlLabel value="School" control={<Radio color='inherit' />} label="School" />
                    <FormControlLabel value="Teacher" control={<Radio color='inherit' />} label="Teacher" />
                    <FormControlLabel value="Student" control={<Radio color='inherit' />} label="Student" />
                    {/* <FormControlLabel value="Parent" control={<Radio color='inherit' />} label="Parent" /> */}
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

                  <Button
                    onClick={() =>
                      loginSubmit()
                    }

                    disabled={
                      emailValue.length === 0 || passwordValue.length === 0 || typeValue === undefined
                    }
                    variant="contained"
                    size="large"
                    fullWidth
                  >
                    Login
                  </Button>

                  {/* <Button
                    size="large"
                    className={classes.forgetButton}
                  >
                    Forget Password
                </Button> */}

                  {/* <Link onClick={() => admin(props.history)}>hi</Link> */}
                  {/* </form> */}
                </React.Fragment>
              )}
              {activeTabId === 1 && (
                <React.Fragment>
                  <Typography variant="h6" className={classes.greeting}>
                    New to SchoolHub?
              </Typography>
                  <Typography variant="h2" className={classes.greeting}>
                    Register Here!
              </Typography>
                  <div className={classes.formDividerContainer}>
                    <div className={classes.formDivider} />
                    <Typography className={classes.formDividerWord}></Typography>
                    <div className={classes.formDivider} />
                  </div>

                  <text class={classes.signin}>Sign up as:</text>
                  <RadioGroup class={classes.radio} name="type" value={typeValue}
                    onChange={(e) => { setTypeValue(e.target.value) }}>
                    <FormControlLabel value="School" control={<Radio color='inherit' />} label="School" />
                    <FormControlLabel value="Teacher" control={<Radio color='inherit' />} label="Teacher" />
                    <FormControlLabel value="Student" control={<Radio color='inherit' />} label="Student" />
                    {/* <FormControlLabel value="Parent" control={<Radio color='inherit' />} label="Parent" /> */}
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
                    placeholder="Email Adress"
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

                        onClick={() => { signUpSubmit() }}

                        disabled={
                          emailValue.length === 0 ||
                          passwordValue.length === 0 ||
                          nameValue.length === 0 ||
                          typeValue === undefined
                        }
                        size="large"
                        variant="contained"
                        color="primary"
                        fullWidth
                        className={classes.createAccountButton}
                      >
                        Create your account
                      </Button>
                    )}
                  </div>

                </React.Fragment>
              )}
            </div>
          </Widget>
        </div>

      </Grid>
    </div>
  );
}

export default withRouter(Login);
