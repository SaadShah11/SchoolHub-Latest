import React, {useRef} from "react";
import { Grid, Typography } from "@material-ui/core";
import { TextField, InputBase, Button } from "@material-ui/core";
import { makeStyles,withStyles } from '@material-ui/core/styles';
import Widget from "../../components/Widget/Widget";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  main:{
    marginLeft:'12%',
  },
  title:{
    textAlign:'center',
    marginBottom:'30px',
    fontWeight:'bold',
    fontSize:'30px'
  },
  delete:{
    color:'red',
    textDecoration:'underline',
    '&:hover':{
      cursor:'pointer'
    }
  },
}));
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
function CreateData(id, name, city, address, registeredon) {
  return { id, name, city, address, registeredon  };
}

const rows = [
  CreateData(1, 'PakTurk international School', 'Islamabad','Taramri chowk islamabad.', '4-2-2019'),
  CreateData(2, 'Roots millinium College', 'Islamabad','H-8/4 near FBISE islamabad','4-2-2019'),
  CreateData(3, 'Iqra School and College', 'Lahore','Park road, I-8/3 Islamabad','4-2-2019'),
  CreateData(4, 'PakTurk international School', 'Islamabad','Taramri chowk islamabad.', '4-2-2019'),
  CreateData(5, 'Roots millinium College', 'Islamabad','H-8/4 near FBISE islamabad','4-2-2019'),
  CreateData(6, 'Iqra School and College', 'Lahore','Park road, I-8/3 Islamabad','4-2-2019'),

];
export default function Schools() {
  var classes = useStyles()

  return(
    <div className={classes.main}>
    <Typography className={classes.title} >Registered Schools</Typography>
    <div >
                <TableContainer style={{marginBottom:'20vh'}} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead >
            <TableRow>
              <StyledTableCell style={{  fontWeight:'bold'}}>ID</StyledTableCell>
              <StyledTableCell  style={{ fontWeight:'bold'}} align="center">Name</StyledTableCell>
              <StyledTableCell style={{  fontWeight:'bold'}} align="center">City</StyledTableCell>
              <StyledTableCell style={{  fontWeight:'bold'}} align="center">Address</StyledTableCell>
              <StyledTableCell style={{  fontWeight:'bold'}} align="center">Registered On</StyledTableCell>
              <StyledTableCell  style={{  fontWeight:'bold'}} align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.description}>
                <StyledTableCell style={{width:'15px', backgroundColor:'#C5C5C5'}}>{row.id} </StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell align="center">{row.city}</StyledTableCell>
                <StyledTableCell align="center">{row.address}</StyledTableCell>
                <StyledTableCell align="center">{row.registeredon}</StyledTableCell>
                <StyledTableCell className={classes.delete} align="center">Delete </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
                </div>
                </div>
  )
}