import React, { useRef, useEffect, useCallback, useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import { TextField, InputBase, Button } from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import axios from "../../Util/axios"
import Widget from "../../components/Widget/Widget";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  main: {
    marginLeft: '15%',
  },
  title: {
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: 'bold',
    fontSize: '30px'
  },
  delete: {
    color: 'red',
    textDecoration: 'underline',
    '&:hover': {
      cursor: 'pointer'
    }
  },
}));
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
function CreateData(id, name, city, address, registeredon) {
  return { id, name, city, address, registeredon };
}

const rows = [
  CreateData(1, 'PakTurk international School', 'Islamabad', 'Taramri chowk islamabad.', '4-2-2019'),
  CreateData(2, 'Roots millinium College', 'Islamabad', 'H-8/4 near FBISE islamabad', '4-2-2019'),
  CreateData(3, 'Iqra School and College', 'Lahore', 'Park road, I-8/3 Islamabad', '4-2-2019'),
  CreateData(4, 'PakTurk international School', 'Islamabad', 'Taramri chowk islamabad.', '4-2-2019'),
  CreateData(5, 'Roots millinium College', 'Islamabad', 'H-8/4 near FBISE islamabad', '4-2-2019'),
  CreateData(6, 'Iqra School and College', 'Lahore', 'Park road, I-8/3 Islamabad', '4-2-2019'),

];
export default function Schools() {
  var classes = useStyles()

  let [reloadHome, setReloadHome] = useState(false)
  var [allSchools, setAllSchools] = useState()
  var [status, setStatus] = useState()

  const getSchools = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/school/School_Details")
      console.log("request")
      console.log(request.data)
      setAllSchools(request.data.reverse())
      return request.data;
    }
    //And here you call it
    fetchData()
    setReloadHome(true)
  }, [])

  useEffect(() => {
    getSchools()
    //setIsLoading(true)
    setReloadHome(false)
    //getItems().then(data => setItems(data));
  }, [reloadHome]);

  let handleUpdateDelete = (id) => {
    //deleteSchool(id)
  }

  let displaySchools //= () => { let displayPostsVar

  try {
    if (allSchools != undefined) {

      displaySchools = allSchools.map((row, i) => {

        return <StyledTableRow key={row._id}>
          <StyledTableCell style={{ width: '15px', backgroundColor: '#C5C5C5' }}>{i} </StyledTableCell>
          <StyledTableCell align="center">{row.schoolName}</StyledTableCell>
          <StyledTableCell align="center">{row.educationLevel}</StyledTableCell>
          <StyledTableCell align="center">{row.schoolAddress}</StyledTableCell>
          <StyledTableCell align="center">{row.contactNumber}</StyledTableCell>
          <StyledTableCell onClick={() => { handleUpdateDelete(row._id)}} className={classes.delete} align="center">Delete</StyledTableCell>
        </StyledTableRow>

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
    <div className={classes.main}>
      <Typography className={classes.title} >Registered Schools</Typography>
      <div >
        <TableContainer style={{ marginBottom: '20vh' }} component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead >
              <TableRow>
                <StyledTableCell style={{ fontWeight: 'bold' }}>ID</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Name</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Education Level</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Address</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Contact No</StyledTableCell>
                <StyledTableCell style={{ fontWeight: 'bold' }} align="center">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                displaySchools
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}