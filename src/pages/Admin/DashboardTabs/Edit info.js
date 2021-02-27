import React, { useState } from "react";
import {InputAdornment, TextareaAutosize, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import Header from '../Header/Header'
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Footer from "../../../components/Footer/footer"
// context
import Widget from "../../../components/Widget/Widget";
import {AccountCircle, Room, PhoneAndroid, AlternateEmail, Code, Facebook } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  box: {
    width: "50%",
    margin: 'auto',
  },
  tabs:{
   color:'#43425d',
  },
  radio:{
    '&:checked': {
      fill: 'red',
    },
  },
  indicator:{
    backgroundColor:'#43425d',
    height:'3px'
   },
  Checks: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: '#43425d',
    color: 'white',
    width: '100px',
    float: 'right',
    marginLeft: '10px'
  },
  textarea: {
    width: '100%',
    minHeight: '300px'
  },

}))
function EditInfo(props) {
  var [activeTabId, setActiveTabId] = useState(0);
  var classes = useStyles();
  const [value, setValue] = React.useState('Co-Education');
  const [value3, setValue3] = React.useState('Matric/Fsc');
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChange3 = (event) => {
    setValue3(event.target.value);
  };
  return (
    <div>
      <Header />
      <br /><br /><br /><br />
      <Grid container >
        <div className={classes.box}>
          <Widget title='Edit General Information' disableWidgetMenu>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}
              classes={{indicator: classes.indicator, root:classes.tabs}}
              centered
            >
              <Tab label="General" classes={{ root: classes.tab }} />
              <Tab label="About School" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment>
                <TextField InputProps={{startAdornment: (
                            <InputAdornment position="start"><AccountCircle /></InputAdornment>
                          ),}}  id="name" placeholder="School Name" fullWidth />
                <TextField InputProps={{startAdornment: (
                            <InputAdornment position="start"><Room /></InputAdornment>
                          ),}}  id="address" placeholder="School Address" fullWidth />
                <TextField InputProps={{startAdornment: (
                            <InputAdornment position="start"><Code /></InputAdornment>
                          ),}}  id="zip" placeholder="Zip code" fullWidth />
                <TextField InputProps={{startAdornment: (
                            <InputAdornment position="start"><AlternateEmail /></InputAdornment>
                          ),}}  id="email" placeholder="School Email" fullWidth />
                <TextField InputProps={{startAdornment: (
                            <InputAdornment position="start"><PhoneAndroid /></InputAdornment>
                          ),}}  id="contact" placeholder="School Phone Number" fullWidth />
                <TextField InputProps={{startAdornment: (
                            <InputAdornment position="start"><Facebook /></InputAdornment>
                          ),}}  id="facebook" placeholder="School Facebook Link" fullWidth />

                <div className={classes.Checks}>
                  <text style={{ fontWeight: 'bold' }}>School type: </text>
                  <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="type" name="type" value={value} onChange={handleChange}>
                    <FormControlLabel  value="Co-Education" control={<Radio color='defualt'/>} label="Co-Education" />
                    <FormControlLabel value="Boys" control={<Radio color='defualt'/>} label="Boys" />
                    <FormControlLabel value="Girls" control={<Radio color='defualt'/>} label="Girls " />
                  </RadioGroup>
                </div >
                <div className={classes.Checks}>
                  <text style={{ fontWeight: 'bold' }}>Education level: </text>
                  <div>
                    <FormControlLabel control={<Checkbox name="checkedC" color='defualt'/>} label="Junior" />
                    <FormControlLabel control={<Checkbox name="checkedC" color='defualt'/>} label="Middle" />
                    <FormControlLabel control={<Checkbox name="checkedC" color='defualt'/>} label="Higher" />
                  </div>

                </div>
                <div className={classes.Checks}>
                  <text style={{ fontWeight: 'bold' }}>Education type: </text>
                  <RadioGroup style={{ dispaly: 'flex', flexDirection: 'row' }} aria-label="educationtype" name="educationtype  " value={value3} onChange={handleChange3}>
                    <FormControlLabel value="Matric/Fsc" control={<Radio color='defualt'/>} label="Matric/Fsc" />
                    <FormControlLabel value="IGCSE" control={<Radio color='defualt'/>} label="IGCSE" />
                  </RadioGroup>
                </div>
              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <TextareaAutosize
                  rowsMax={7}
                  aria-label="maximum height"
                  placeholder="Enter Short description about your school"
                  className={classes.textarea}
                />
              </React.Fragment>
            )}
            <Button size="large" variant="contained" color="seconadary"
              className={classes.button}
              onClick={() => { props.history.goBack() }}
            > Cancel</Button>
            <Button size="large" variant="contained" color="seconadary"
              className={classes.button}
            > Save</Button>
          </Widget>
        </div>

      </Grid>
      <Footer/>
    </div>

  );
}

export default withRouter(EditInfo);
