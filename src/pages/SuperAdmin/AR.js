import React, { useState } from "react";
import { InputAdornment, TextareaAutosize, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";

import { withRouter } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {AccountCircle, Delete, Cancel, PartyMode} from '@material-ui/icons'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
// context
import Widget from "../../components/Widget/Widget";
const useStyles = makeStyles((theme) => ({
  main:{
    marginLeft:'15%',
  },

  AR:{
    display:"flex",
    flexDirection:'row',
    textAlign:'center',
    alignItems:'center',
    width:'160px',
    border: "1px solid black",
    borderRadius:"8px",
    padding:'10px',
    margin:'auto',
    '&:hover':{
        color:'white',
        cursor:'pointer',
        backgroundColor:'#43425d'
    }
},
delete:{
  color:'red',
  textDecoration:'underline',
  '&:hover':{
    cursor:'pointer'
  }
},
  indicator: {
    backgroundColor: '#43425d',
    height: '3px'
  },

   title:{
    textAlign:'center',
    marginBottom:'30px',
    fontWeight:'bold',
    fontSize:'30px'
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
function CreateData(id, school, description) {
  return { id, school, description};
}

const rows = [
  CreateData(1, 'PakTurk International School', 'Need AR for pakturk with all details',  '10-3-2020', '14:00', '15:00', 'Pending'),
  CreateData(2, 'PakTurk International School', 'Seminar',  '10-3-2020', '14:00', '15:00', 'Completed'),
  CreateData(3, 'PakTurk International School', 'Seminar',  '10-3-2020', '14:00', '15:00', 'Rejected'),
  CreateData(4, 'PakTurk International School', 'Seminar',  '10-3-2020', '14:00', '15:00', 'Completed'),
  CreateData(5, 'PakTurk International School', 'Seminar',  '10-3-2020', '14:00', '15:00', 'Completed'),
  CreateData(6, 'PakTurk International School', 'Seminar',  '10-3-2020', '14:00', '15:00', 'Completed'),
  CreateData(7, 'PakTurk International School', 'Seminar',  '10-3-2020', '14:00', '15:00', 'Completed'),
];
const rows2 = [
  CreateData(1, 'PakTurk International School', 'Need AR for pakturk with all details',  '10-3-2020', '14:00', '15:00', 'Pending'),
  CreateData(2, 'PakTurk International School', 'Seminar',  '10-3-2020', '14:00', '15:00', 'Completed'),
  CreateData(3, 'PakTurk International School', 'Seminar',  '10-3-2020', '14:00', '15:00', 'Rejected'),
  CreateData(4, 'PakTurk International School', 'Seminar',  '10-3-2020', '14:00', '15:00', 'Completed'),
  ];


function AR(props) {

  var classes = useStyles();
  var [activeTabId, setActiveTabId] = useState(0);
  return (
    <div className={classes.main}>
      <Typography className={classes.title}> School AR Models</Typography>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}
              classes={{ indicator: classes.indicator, root: classes.tabs }}
              centered
            >
              <Tab label="AR Requests" classes={{ root: classes.tab }} />
              <Tab label="AR Models" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment >
                <div >
                  <TableContainer style={{ marginBottom: '20vh' }} component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                      <TableHead >
                        <TableRow>
                          <StyledTableCell style={{ width: '15px', backgroundColor: '#C5C5C5' }}>ID</StyledTableCell>
                          <StyledTableCell style={{ width: '300px'}}align="center">School Name</StyledTableCell>
                          <StyledTableCell style={{ width: '300px'}}  align="center">Description</StyledTableCell>
                          <StyledTableCell style={{ width: '15px'}} align="center">Action</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <StyledTableRow key={row.description}>
                            <StyledTableCell style={{ width: '15px', backgroundColor: '#C5C5C5' }}>{row.id} </StyledTableCell>
                            <StyledTableCell align="center">{row.school}</StyledTableCell>
                            <StyledTableCell align="center">{row.description}</StyledTableCell>
                            <StyledTableCell align="center"><div className={classes.AR}>
                                <PartyMode/>
                                <text>Upload AR model</text>
                                </div></StyledTableCell>
                          </StyledTableRow>
                        ))}
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
                          <StyledTableCell style={{ width: '15px', backgroundColor: '#C5C5C5' }}>ID</StyledTableCell>
                          <StyledTableCell style={{ width: '300px'}}align="center">School Name</StyledTableCell>
                          <StyledTableCell style={{ width: '300px'}}  align="center">Description</StyledTableCell>
                          <StyledTableCell style={{ width: '15px'}} align="center">Action</StyledTableCell>
                        </TableRow>
                        </TableHead >
                     <TableBody>
                       {rows2.map((row) => (
                         <StyledTableRow key={row.description}>
                         <StyledTableCell style={{ width: '15px', backgroundColor: '#C5C5C5' }}>{row.id} </StyledTableCell>
                         <StyledTableCell align="center">{row.school}</StyledTableCell>
                         <StyledTableCell align="center">{row.description}</StyledTableCell>
                         <StyledTableCell className={classes.delete} align="center"><text>Delete AR</text></StyledTableCell>
                       </StyledTableRow>
                       ))}
                     </TableBody>
                   </Table>
                 </TableContainer>
               </div>
             </React.Fragment>
            )}
</div>
  );
}

export default withRouter(AR);
