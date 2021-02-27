import React from 'react';
import { Component } from 'react';
import "./signupNew.css"
import PropTypes from "prop-types";
import {TextField, InputBase} from "@material-ui/core";
import Logo from "./SchoolHubLogo.png";
import FormLabel from "@material-ui/core/FormLabel";

import {Link} from 'react-router-dom';
import RadioGroup from "@material-ui/core/RadioGroup"
import Radio from "@material-ui/core/Radio";
import {makeStyles} from '@material-ui/styles';
import FormControlLabel from "@material-ui/core/FormControlLabel"

export default class Register extends Component {
    
    state = {
        type: null,
        email: null,
        username: null,
        phoneNumber: null,
        password: null
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let code;
        fetch("http://localhost:8080/user_management/signup", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({
                type: this.state.type,
                email: this.state.email,
                username: this.state.username,
                phoneNumber: this.state.phoneNumber,
                password: this.state.password
            })
        }).then(res => {
            code = res.status;
            alert('Account created Successfully')
            window.location.href = "http://localhost:3000/signin";
            return res.json();
        }).catch(err => {
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
                <form className='form' onSubmit={this.handleSubmit}>
                    <h1 className="head">Registration</h1>
                    <div className='radio'>
                        <text className='usertype' component="legend">Sign up as:</text>
                        <RadioGroup className='radioB' aria-label="type" name="type" value={this.state.type} onChange={(e) => { this.setState({ type: e.target.value }) }}>
                            <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="Teacher" control={<Radio />} label="Teacher" />
                            <FormControlLabel value="Student" control={<Radio />} label="Student" />
                            <FormControlLabel value="Parent" control={<Radio />} label="Parent" />
                        </RadioGroup>
                    </div>
                    <InputBase className='input'
                    inputProps={{
                        style:{color:'white'}
                    }}
                        placeholder="email" type="email"
                        onChange={(e) => { this.setState({ email: e.target.value }) }} required />

                    <InputBase className='input'
                    inputProps={{
                        style:{color:'white'}
                    }}
                         placeholder="username" type="text"
                        onChange={(e) => { this.setState({ username: e.target.value }) }} required />
                    <InputBase className='input'
                    inputProps={{
                        style:{color:'white'}
                    }}
                         placeholder="phoneNumber" type="number"
                        onChange={(e) => { this.setState({ phoneNumber: e.target.value }) }} required />
                    <InputBase className='input'
                    inputProps={{
                        style:{color:'white'}
                    }} placeholder="Password" type="password"
                        onChange={(e) => { this.setState({ password: e.target.value }) }} required />
                    <button className='buttonDiv' style={{margin:'10px', padding:"10px", width:"100%",fontSize:"20px", cursor:"pointer" ,borderRadius:"15px", marginTop: "20px" , backgroundColor:'#af1b1b', color:'white' }} type="submit" className="btn btn-primary">Sign Up</button>
                    <Link to="/signin" style={{ backgroundColor:'#262626',color:'white', textDecoration:'none'}}>
                    {"Already have an account? Sign In"}
                     </Link>
                </form>
            </div>
        )
    }
}
