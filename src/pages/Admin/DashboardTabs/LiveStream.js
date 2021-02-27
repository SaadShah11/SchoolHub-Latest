import React, { useState } from "react";
import { InputAdornment, TextareaAutosize, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import Header from '../Header/Header'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import TimeInput from 'material-ui-time-picker'
import { withRouter } from "react-router-dom";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker, } from '@material-ui/pickers';
import Footer from "../../../components/Footer/footer"
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
// context
import Widget from "../../../components/Widget/Widget";
import { Cancel, AddBox, PhotoSizeSelectActual, PlayArrow, PartyMode } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  box: {
    width: "50%",
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
  request: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    padding: '10px'
  },
  time: {
    width: '100px',
    marginRight: '5px'
  },
  cancel: {
    '&:hover': {
      fill: '#9F9F9F'
    }
  },
  tabs: {
    color: '#43425d',
  },
  time2: {
    marginBottom: '10px',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '30px',
    height: '100px'
  },
  indicator: {
    backgroundColor: '#43425d',
    height: '3px'
  },
  textfield: {
    marginLeft: '10px',
    width: '95%'
  },
  radio:{
    marginLeft:'10px',
    textAlign:'center',
    alignItems:'center',
    display:'flex',
    width:'100%',
    flexDirection:'row'
  },
}))
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    backgroundColor:'#C5C5C5'
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);
function CreateData(id, name, description, status) {
  return { id, name, description, status };
}

const rows = [
  CreateData(1, 'Expo Event', 'Event for students and Event for students','Completed'),
  CreateData(2, 'Expo Event', 'Event for students','Rejected'),
  CreateData(3, 'Expo Event', 'Event for students','Pending'),
];


function LiveStream(props) {

  var classes = useStyles();
  var [activeTabId, setActiveTabId] = useState(0);
  const [Dvalue, setDvalue] = useState(new Date());
  const [Tvalue, setTValue] = useState('');
  const [eventValue, seteventValue] = useState('Public');
  const [Tvalue1, setTValue1] = useState('');
  return (
    <div>
      <Header />
      <br /><br /><br /><br />
      <Grid container >
        <div className={classes.box}>
          <Widget title='Live Streaming' disableWidgetMenu>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}
              classes={{ indicator: classes.indicator, root: classes.tabs }}
              centered
            >
              <Tab label="Live Stream Request" classes={{ root: classes.tab }} />
              <Tab label="My Events" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment >
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <TextField className={classes.textfield} id="name" placeholder="Event Name" fullWidth />
                  <TextField className={classes.textfield}  placeholder="Event Details" fullWidth />
                  
                <RadioGroup class={classes.radio} value={eventValue} onChange={(event)=> seteventValue(event.target.value)}>
                <text class={classes.signin}>Event Type:</text>
                  <FormControlLabel style={{marginLeft:'30px'}}  value="Private" control={<Radio color='defualt'/>} label="Private" />
                  <FormControlLabel value="Public" control={<Radio color='defualt'/>} label="Public" />
                </RadioGroup>
                </div>

                <div className={classes.request}>
                  <div>
                    <Widget disableWidgetMenu>
                      <Calendar
                      minDate={Dvalue}
                        onChange={setDvalue}
                        value={Dvalue}
                      />
                    </Widget>
                  </div>
                  <div>
                    <div className={classes.time2}>
                      <Widget disableWidgetMenu>
                        <TimeInput
                          mode='12h'
                          className={classes.time}
                          placeholder='Start Time'
                          onChange={setTValue}
                        />
                        <TimeInput
                          mode='12h'
                          className={classes.time}
                          placeholder='End Time'
                          onChange={setTValue1}
                        />
                      </Widget>
                    </div>
                    <Button size="large" variant="contained" color="seconadary"
                      className={classes.button2}
                      disabled={Dvalue.length===0 || Tvalue.length===0 || Tvalue1.length ===0}
                    > Send Request</Button>
                  </div>
                </div>

              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <div >
                <TableContainer style={{marginBottom:'20vh'}} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead >
            <TableRow>
              <StyledTableCell style={{width:'15px', backgroundColor:'#C5C5C5'}}>ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Description</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.description}>
                <StyledTableCell style={{width:'15px', backgroundColor:'#C5C5C5'}}>{row.id} </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.description}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
                </div>
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
      <Footer />
    </div>

  );
}

export default withRouter(LiveStream);
