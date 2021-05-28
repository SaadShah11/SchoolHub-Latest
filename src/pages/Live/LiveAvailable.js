import React, { useState, useEffect, useCallback } from "react";
import { InputAdornment, TextareaAutosize, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

import axios from "../../Util/axios"
import { withRouter } from "react-router-dom";
import Live from './live'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { AccountCircle, Delete, Cancel, CheckCircle, PlayArrow } from '@material-ui/icons'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
// context
import Widget from "../../components/Widget/Widget";
const useStyles = makeStyles((theme) => ({
    main: {

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

function LiveAvailable(props) {

    var classes = useStyles();
    var [allLiveStreams, setAllLiveStreams] = useState()

    const getLiveStreams = useCallback(async () => {
        async function fetchData() {
            let request;
            request = await axios.get("http://localhost:8080/videoStreaming/getStreams")
            console.log("request")
            console.log(request.data)
            setAllLiveStreams(request.data.reverse())
            return request.data;
        }
        fetchData()
    }, [])

    useEffect(() => {
        getLiveStreams()
    }, []);

    // props.history.push({ pathname: '/app/liveStream', data: response.data })
    let displayLiveStreams;

    try {
        if (allLiveStreams != undefined) {

            displayLiveStreams = allLiveStreams.map((row) => {
                if (row.status === "Accepted") {
                    return <StyledTableRow key={row.description}>
                        <StyledTableCell style={{ width: '15px', backgroundColor: '#C5C5C5' }}>{row._id} </StyledTableCell>
                        <StyledTableCell align="center">{row.schoolName}</StyledTableCell>
                        <StyledTableCell align="center">{row.title}</StyledTableCell>
                        <StyledTableCell align="center">{row.date}</StyledTableCell>
                        <StyledTableCell align="center">{row.startTime}</StyledTableCell>
                        <StyledTableCell align="center">{row.endTime}</StyledTableCell>
                        <StyledTableCell align="center" >
                            <PlayArrow fontSize="large" diabled={row.isLive} onClick={() => {
                                if (row.isLive) {
                                    (props.history.push({ pathname: '/app/liveStream', state: row }))
                                } else {
                                    alert('Live Stream Not Started yet, Play after Start Time for the Live Stream')
                                }
                            }} />
                        </StyledTableCell>
                    </StyledTableRow>
                }

            })
        } else {
            console.log("nothing")
        }
    } catch (err) {
        console.log("error")
        console.log(err)
    }

    // rows.map((row) => (
    //     <StyledTableRow key={row.description}>
    //         <StyledTableCell style={{ width: '15px', backgroundColor: '#C5C5C5' }}>{row.id} </StyledTableCell>
    //         <StyledTableCell align="center">{row.school}</StyledTableCell>
    //         <StyledTableCell align="center">{row.event}</StyledTableCell>
    //         <StyledTableCell align="center">{row.date}</StyledTableCell>
    //         <StyledTableCell align="center">{row.start}</StyledTableCell>
    //         <StyledTableCell align="center">{row.end}</StyledTableCell>
    //         <StyledTableCell align="center"><PlayArrow fontSize="large" onClick={() => props.history.push("/app/liveStream")} /> </StyledTableCell>
    //     </StyledTableRow>
    // ))

    return (
        <div className={classes.main}>

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
                                <StyledTableCell align="center">View</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayLiveStreams}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default withRouter(LiveAvailable);
