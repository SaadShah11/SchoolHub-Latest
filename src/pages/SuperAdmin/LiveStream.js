import React, { useState, useEffect, useCallback } from "react";
import { InputAdornment, TextareaAutosize, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

import axios from "../../Util/axios"

import { withRouter } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { AccountCircle, Delete, Cancel, CheckCircle } from '@material-ui/icons'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
// context
import Widget from "../../components/Widget/Widget";
const useStyles = makeStyles((theme) => ({
  main: {
    marginLeft: '15%',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  indicator: {
    backgroundColor: '#43425d',
    height: '3px'
  },
  tick: {

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
}))
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    backgroundColor: '#C5C5C5'
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
function CreateData(id, school, event, date, start, end, status) {
  return { id, school, event, date, start, end, status };
}

const rows = [
  CreateData(1, 'PakTurk International School', 'Seminar', '10-3-2020', '14:00', '15:00', 'Pending'),
  CreateData(2, 'PakTurk International School', 'Seminar', '10-3-2020', '14:00', '15:00', 'Completed'),
  CreateData(3, 'PakTurk International School', 'Seminar', '10-3-2020', '14:00', '15:00', 'Rejected'),
  CreateData(4, 'PakTurk International School', 'Seminar', '10-3-2020', '14:00', '15:00', 'Completed'),
  CreateData(5, 'PakTurk International School', 'Seminar', '10-3-2020', '14:00', '15:00', 'Completed'),
  CreateData(6, 'PakTurk International School', 'Seminar', '10-3-2020', '14:00', '15:00', 'Completed'),
  CreateData(7, 'PakTurk International School', 'Seminar', '10-3-2020', '14:00', '15:00', 'Completed'),
];


function LiveStream(props) {

  var classes = useStyles();
  var [activeTabId, setActiveTabId] = useState(0);
  let [reloadHome, setReloadHome] = useState(false)
  var [allLiveStreams, setAllLiveStreams] = useState()
  var [status, setStatus] = useState()

  const getLiveStreams = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/videoStreaming/getStreams")
      console.log("request")
      console.log(request.data)
      setAllLiveStreams(request.data.reverse())
      return request.data;
    }
    //And here you call it
    fetchData()
    setReloadHome(true)
  }, [])

  let handleUpdateStatus = (stat, id) => {
    let finalObject = {
      status: stat
    }

    updateLiveStream(finalObject, id)
  }

  const updateLiveStream = useCallback(async (stat, id) => {
    async function fetchData() {
      let request;
      console.log("NewData")
      console.log(stat)
      console.log(id)
      //console.log(status)
      request = await axios.patch("http://localhost:8080/videoStreaming/updateStream/" + id, stat)
      console.log("request")
      console.log(request)
      //setReloadPost(true)
      window.location.reload()
      return request.data;
    }
    fetchData()
  }, [])

  useEffect(() => {
    getLiveStreams()
    //setIsLoading(true)
    setReloadHome(false)
    //getItems().then(data => setItems(data));
  }, [reloadHome]);

  let displayLiveStreams //= () => { let displayPostsVar

  try {
    if (allLiveStreams != undefined) {

      displayLiveStreams = allLiveStreams.map((row) => {
        if (row.status === "Pending") {
          return <StyledTableRow key={row.description}>
            <StyledTableCell style={{ width: '15px', backgroundColor: '#C5C5C5' }}>{row._id} </StyledTableCell>
            <StyledTableCell align="center">{row.schoolName}</StyledTableCell>
            <StyledTableCell align="center">{row.title}</StyledTableCell>
            <StyledTableCell align="center">{row.date}</StyledTableCell>
            <StyledTableCell align="center">{row.startTime}</StyledTableCell>
            <StyledTableCell align="center">{row.endTime}</StyledTableCell>
            <StyledTableCell align="center">
              <CheckCircle onClick={() => { handleUpdateStatus("Accepted", row._id) }} className={classes.tick} />
              <Cancel onClick={() => { handleUpdateStatus("Rejected", row._id) }} className={classes.cross} /></StyledTableCell>
          </StyledTableRow>
        }

      })
      //setIsLoading(false)
    } else {
      console.log("nothing")
    }
  } catch (err) {
    console.log("error")
    console.log(err)
  }

  let displayLiveStreamsTab2 //= () => { let displayPostsVar

  try {
    if (allLiveStreams != undefined) {

      displayLiveStreamsTab2 = allLiveStreams.map((row, i) => (
        <StyledTableRow key={row._id}>
          <StyledTableCell style={{ width: '15px', backgroundColor: '#C5C5C5' }}>{i} </StyledTableCell>
          <StyledTableCell align="center">{row.schoolName}</StyledTableCell>
          <StyledTableCell align="center">{row.title}</StyledTableCell>
          <StyledTableCell align="center">{row.date}</StyledTableCell>
          <StyledTableCell align="center">{row.startTime}</StyledTableCell>
          <StyledTableCell align="center">{row.endTime}</StyledTableCell>
          <StyledTableCell align="center">{row.status}</StyledTableCell>
    
        </StyledTableRow>
      ))
    } else {
      console.log("nothing")
    }
  } catch (err) {
    console.log("error")
    console.log(err)
  }

  

  return (
    <div className={classes.main}>
      <Typography className={classes.title} variant="h5" weight="bold"> Live Streams</Typography>
      <Tabs
        value={activeTabId}
        onChange={(e, id) => setActiveTabId(id)}
        classes={{ indicator: classes.indicator, root: classes.tabs }}
        centered
      >
        <Tab label="Live Stream Request" classes={{ root: classes.tab }} />
        <Tab label=" Events" classes={{ root: classes.tab }} />
      </Tabs>
      {activeTabId === 0 && (
        <React.Fragment >
          <div >
            <TableContainer style={{ marginBottom: '20vh' }} component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead >
                  <TableRow>
                    <StyledTableCell style={{ width: '15px', backgroundColor: '#C5C5C5' }}>ID</StyledTableCell>
                    <StyledTableCell align="center">School Name</StyledTableCell>
                    <StyledTableCell align="center">Event Name</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Starting Time</StyledTableCell>
                    <StyledTableCell align="center">Ending time</StyledTableCell>
                    <StyledTableCell align="center">Action</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    displayLiveStreams
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </React.Fragment>
      )}
      {activeTabId === 1 && (
        <React.Fragment >
          <div >
            <TableContainer style={{ marginBottom: '20vh' }} component={Paper}>
              <Table className={classes.table} aria-label="customized table">
                <TableHead >
                  <TableRow>
                    <StyledTableCell style={{ width: '15px', backgroundColor: '#C5C5C5' }}>SNo</StyledTableCell>
                    <StyledTableCell align="center">School Name</StyledTableCell>
                    <StyledTableCell align="center">Event Name</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Starting Time</StyledTableCell>
                    <StyledTableCell align="center">Ending time</StyledTableCell>
                    <StyledTableCell align="center">Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  

                  {
                    displayLiveStreamsTab2
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </React.Fragment>
      )}
    </div>


  );
}

export default withRouter(LiveStream);
