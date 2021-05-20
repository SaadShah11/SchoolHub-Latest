import React, { useState, useCallback, useEffect } from "react";
import { Link, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import Header from '../Header/Header'
import 'react-calendar/dist/Calendar.css';
import { withRouter } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Footer from "../../../components/Footer/footer"
import axios from "../../../Util/axios"
import AuthService from "../../../services/auth.service";
// context
import Widget from "../../../components/Widget/Widget";
import { AccountCircle, Delete, Cancel, CheckCircle } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
    box: {
        width: "80%",
        margin: 'auto',
    },
    button: {
        backgroundColor: '#43425d',
        color: 'white',
        width: '100px',
        float: 'right',
        marginLeft: '10px'
    },
    button2: {
        backgroundColor: '#43425d',
        color: 'white',
        width: '90%',
        float: 'right',
        marginLeft: '10px'
    },
    dp: {
        height: '80px',
        width: '80px'
    },
    profile: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
        padding: 5
    },
    name: {
        display: 'flex',
        flexDirection: 'column',
        "&:hover": {
            color: '#9F9F9F',
            cursor: 'pointer',
        }
    },

    cancel: {
        '&:hover': {
            fill: '#9F9F9F'
        }
    },
    tabs: {
        color: '#43425d',
    },
    delete: {
        marginLeft: '40px',
        fill: '#43425d',
        "&:hover": {
            fill: '#9F9F9F',
            cursor: 'pointer'
        }
    },
    tick: {
        marginLeft: '40px',
        fill: 'green',
        "&:hover": {
            fill: '#9F9F9F',
            cursor: 'pointer'
        }
    },
    cross: {
        fill: 'red',
        "&:hover": {
            fill: '#9F9F9F',
            cursor: 'pointer'
        }
    },
    indicator: {
        backgroundColor: '#43425d',
        height: '3px'
    },

}))


function Faculty(props) {
    var classes = useStyles();

    //let [reloadHome, setReloadHome] = useState(false)
    var [allTeachers, setAllTeachers] = useState()

    let school = props.school

    const user = AuthService.getCurrentUser()
    console.log(user)

    const getTeachers = useCallback(async () => {
        async function fetchData() {
            let request;
            request = await axios.get("http://localhost:8080/searchSchool/search/")
            console.log("request")
            console.log(request.data)

            let finalReqs = []
            let allReqs = request.data
            allReqs.map((i) => {
                if (school[0]._id == i._id) {
                    finalReqs = i
                }
            })
            setAllTeachers(finalReqs.teachers)

            return request.data;
        }
        //And here you call it
        fetchData()
    }, [])

    useEffect(() => {
        getTeachers()
    }, []);

    let displayTeachers //= () => { let displayPostsVar

    try {
        if (allTeachers != undefined) {

            // displayTeachers = allTeachers.map((row) => {
            //   return


            // })
            console.log("All Teachers")
            console.log(allTeachers)

            displayTeachers = allTeachers.map(function (item) {
                return (

                    <Widget disableWidgetMenu>
                        <div className={classes.profile}>
                            {/* {item.teacherProfilePic} */}
                            <img className={classes.dp} src={item.teacherProfilePic} />
                            <div className={classes.name}>
                                <Typography variant='h6'>{item.teacherName}</Typography>
                                <text>{item.teacherEmail}</text>
                            </div>
                        </div>
                    </Widget>

                )
            })
            //setIsLoading(false)
        } else {
            console.log("nothing")
        }
    } catch (err) {
        console.log("error")
        console.log(err)
    }

    return (
        <div>
            <Header />
            <br /><br /><br /><br />
            <Grid container >
                <div className={classes.box}>
                    <Widget title='Faculty' disableWidgetMenu>


                        <React.Fragment >
                            <div style={{ marginTop: '10px' }}>
                                <Grid container spacing={2}>
                                    {
                                        displayTeachers
                                    }
                                </Grid>
                            </div>

                        </React.Fragment>

                    </Widget>
                </div>

            </Grid>
            <Footer />
        </div>

    );
}

export default withRouter(Faculty);
