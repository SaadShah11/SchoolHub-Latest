import React from 'react';
import { Component } from 'react';
import classes from "./signinNew.css";
import { Link } from 'react-router-dom';
import Logo from "./SchoolHubLogo.png";
import Grid from '@material-ui/core/Grid';
import {TextField, InputBase} from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio"
import FormControlLabel from "@material-ui/core/FormControlLabel"

export default class Signin extends Component {

    state = {
        type: null,
        email: null,
        password: null
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let code;
        fetch("http://localhost:8080/user_management/login", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                type: this.state.type,
                email: this.state.email,
                password: this.state.password
            })
        }).then(res => {
            code = res.status;
            window.location.href = "http://localhost:3000/home";
            return res.json();
        }).catch(err => {
            alert("Incorrect Credentials")
            console.log(err);
        })
    }

    render() {

        return (
            <div className='root'>
                <div className='info'>
                    <img src={Logo} height="200px" width='190px' style={{ backgroundColor: '#262626', }} />
                    <text className='welcome'>Welcome to SCHOOLHUB</text>
                    <text className='welcome2'>By using School-hub (web and mobile application), users will be able to find schools in specific area or city, get detailed information about schools, generate graphs (e.g. fee structure, school rating )  from school data, and get reviews about the school etc. Using home feed, user will get updates about schools, view posts by other users, join different groups and user can also privately chat with other users or use an AI Chabot.</text>
                </div>
                <form className={classes.form} onSubmit={this.handleSubmit}>
                    <h1 className={classes.head}>Sign In</h1>
                    <div style={{ marginTop: 20, width: "90%" }}>
                        <text className='form' component="legend">Sign in as:</text>
                        <RadioGroup aria-label="type" name="type" value={this.state.type} onChange={(e) => { this.setState({ type: e.target.value }) }}>
                            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
                            <FormControlLabel value="Student" control={<Radio />} label="Student" />
                            <FormControlLabel value="Parent" control={<Radio />} label="Parent" />
                        </RadioGroup>
                    </div>
                    <InputBase className='input'
                    inputProps={{
                        style:{color:'white'}
                    }} placeholder='Email'
                        onChange={(e) => { this.setState({ email: e.target.value }) }} required />
                    <InputBase className='input'
                    inputProps={{
                        style:{color:'white'}
                    }}placeholder="Password" type="password" onChange={(e) => { this.setState({ password: e.target.value }) }} required />
                    <button style={{ padding:"10px",marginTop: "20px", width:"100%",fontSize:"20px", cursor:"pointer" ,borderRadius:"15px", marginTop: "20px" , backgroundColor:'#af1b1b', color:'white' }} type="submit" className="btn btn-primary">Sign In</button>
                    
                    <Grid container  >
                            <Grid item xs style={{ backgroundColor: '#262626', }}>
                                <Link href="#" variant="body2"  style={{ backgroundColor: '#262626', color: 'white', float: 'left', textDecoration:"none" }}>
                                    Forgot password?
                        </Link>
                            </Grid>
                            <Grid item>
                                <Link to="/" style={{ backgroundColor: '#262626', color: 'white', textDecoration: "none" }}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    
                </form>
            </div>
        )
    }
}
