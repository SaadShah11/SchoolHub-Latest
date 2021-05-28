import BootstrapTable from 'react-bootstrap-table-next';
import React, { useEffect, useState, useCallback } from 'react'
import { TextField, Grid, Button } from '@material-ui/core';
import Header from '../Header/Header'
import { withRouter } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Footer from "../../../components/Footer/footer"
import axios from "../../../Util/axios"
import AuthService from "../../../services/auth.service";

// context
import Widget from "../../../components/Widget/Widget";
import { AccountCircle, Room, PhoneAndroid, AlternateEmail, Code, Facebook } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  table: {
    textAlign: 'center'
  },
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
}))

let primary = {}
let middle = {}
let higher = {}

function EditFee(props) {

  var classes = useStyles();

  const schoolID = AuthService.getCurrentSchool()
  console.log("SCHOOL")
  console.log(schoolID)

  var [reloadHome, setReloadHome] = useState(false)

  var [bool1, setBool1] = useState(false)
  var [bool2, setBool2] = useState(false)
  var [bool3, setBool3] = useState(false)

  var [row1_1, setRow1_1] = useState()
  var [row1_2, setRow1_2] = useState()
  var [row1_3, setRow1_3] = useState()

  var [row2_1, setRow2_1] = useState()
  var [row2_2, setRow2_2] = useState()
  var [row2_3, setRow2_3] = useState()

  var [row3_1, setRow3_1] = useState()
  var [row3_2, setRow3_2] = useState()
  var [row3_3, setRow3_3] = useState()

  var [row4_1, setRow4_1] = useState()
  var [row4_2, setRow4_2] = useState()
  var [row4_3, setRow4_3] = useState()

  var [row5_1, setRow5_1] = useState()
  var [row5_2, setRow5_2] = useState()
  var [row5_3, setRow5_3] = useState()

  var [row6_1, setRow6_1] = useState()
  var [row6_2, setRow6_2] = useState()
  var [row6_3, setRow6_3] = useState()

  var [row7_1, setRow7_1] = useState()
  var [row7_2, setRow7_2] = useState()
  var [row7_3, setRow7_3] = useState()

  var [row8_1, setRow8_1] = useState()
  var [row8_2, setRow8_2] = useState()
  var [row8_3, setRow8_3] = useState()

  var [row9_1, setRow9_1] = useState()
  var [row9_2, setRow9_2] = useState()
  var [row9_3, setRow9_3] = useState()

  primary = {
    group: 'primary',
    admissionFee: row1_1,
    tutionFee: row2_1,
    examFee: row3_1,
    sportsFee: row4_1,
    labFee: row5_1,
    libraryFee: row6_1,
    totalAdmissionFee: row7_1,
    monthlyFee: row8_1,
    othersFee: row9_1,
  }

  middle = {
    group: 'middle',
    admissionFee: row1_2,
    tutionFee: row2_2,
    examFee: row3_2,
    sportsFee: row4_2,
    labFee: row5_2,
    libraryFee: row6_2,
    totalAdmissionFee: row7_2,
    monthlyFee: row8_2,
    othersFee: row9_2,
  }

  higher = {
    group: 'higher',
    admissionFee: row1_3,
    tutionFee: row2_3,
    examFee: row3_3,
    sportsFee: row4_3,
    labFee: row5_3,
    libraryFee: row6_3,
    totalAdmissionFee: row7_3,
    monthlyFee: row8_3,
    othersFee: row9_3,
  }

  const getSchool = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/searchSchool/search/specificSchool/" + schoolID.schoolID)
      console.log("request")
      console.log(request.data.schoolName)

      //setAllSchools(request.data)

      if (request.data[0].educationLevel.primary == true) {
        console.log("inside bool1")
        setBool1(true)
        setRow1_1(request.data[0].feeStructure.admissionFee)
        setRow2_1(request.data[0].feeStructure.tutionFee)
        setRow3_1(request.data[0].feeStructure.examFee)
        setRow4_1(request.data[0].feeStructure.sportsFee)
        setRow5_1(request.data[0].feeStructure.labFee)
        setRow6_1(request.data[0].feeStructure.libraryFee)
        setRow7_1(request.data[0].feeStructure.totalAdmissionFee)
        setRow8_1(request.data[0].feeStructure.monthlyFee)
        setRow9_1(request.data[0].feeStructure.othersFee)
      }
      if (request.data[0].educationLevel.middle == true) {
        console.log("inside bool2")
        setBool2(true)
        setRow1_2(request.data[0].feeStructure.admissionFee)
        setRow2_2(request.data[0].feeStructure.tutionFee)
        setRow3_2(request.data[0].feeStructure.examFee)
        setRow4_2(request.data[0].feeStructure.sportsFee)
        setRow5_2(request.data[0].feeStructure.labFee)
        setRow6_2(request.data[0].feeStructure.libraryFee)
        setRow7_2(request.data[0].feeStructure.totalAdmissionFee)
        setRow8_2(request.data[0].feeStructure.monthlyFee)
        setRow9_2(request.data[0].feeStructure.othersFee)
      }
      if (request.data[0].educationLevel.higher == true) {
        console.log("inside bool3")
        setBool3(true)
        setRow1_3(request.data[0].feeStructure.admissionFee)
        setRow2_3(request.data[0].feeStructure.tutionFee)
        setRow3_3(request.data[0].feeStructure.examFee)
        setRow4_3(request.data[0].feeStructure.sportsFee)
        setRow5_3(request.data[0].feeStructure.labFee)
        setRow6_3(request.data[0].feeStructure.libraryFee)
        setRow7_3(request.data[0].feeStructure.totalAdmissionFee)
        setRow8_3(request.data[0].feeStructure.monthlyFee)
        setRow9_3(request.data[0].feeStructure.othersFee)
      }

      return request.data;
    }
    //And here you call it
    fetchData()
    setReloadHome(true)
  }, [])

  useEffect(()=>{
    getSchool()
    setReloadHome(false)
  },[reloadHome])

  const data = [
    { Des: 'Admission Fee', name: <TextField disabled={bool1} placeholder="" onChange={e => setRow1_1(e.target.value)} />, name2: <TextField disabled={bool2} placeholder="" onChange={e => setRow1_2(e.target.value)} />, name3: <TextField disabled={bool3} placeholder="" onChange={e => setRow1_3(e.target.value)} /> },
    { Des: 'Tution Fee', name: <TextField disabled={bool1} placeholder="" onChange={e => setRow2_1(e.target.value)} />, name2: <TextField disabled={bool2} placeholder="" onChange={e => setRow2_2(e.target.value)} />, name3: <TextField disabled={bool3} placeholder="" onChange={e => setRow2_3(e.target.value)} /> },
    { Des: 'Exam Fee', name: <TextField disabled={bool1} placeholder="" onChange={e => setRow3_1(e.target.value)} />, name2: <TextField disabled={bool2} placeholder="" onChange={e => setRow3_2(e.target.value)} />, name3: <TextField disabled={bool3} placeholder="" onChange={e => setRow3_3(e.target.value)} /> },
    { Des: 'Sport Fee', name: <TextField disabled={bool1} placeholder="" onChange={e => setRow4_1(e.target.value)} />, name2: <TextField disabled={bool2} placeholder="" onChange={e => setRow4_2(e.target.value)} />, name3: <TextField disabled={bool3} placeholder="" onChange={e => setRow4_3(e.target.value)} /> },
    { Des: 'Lab Fee', name: <TextField disabled={bool1} placeholder="" onChange={e => setRow5_1(e.target.value)} />, name2: <TextField disabled={bool2} placeholder="" onChange={e => setRow5_2(e.target.value)} />, name3: <TextField disabled={bool3} placeholder="" onChange={e => setRow5_3(e.target.value)} /> },
    { Des: 'Library Fee', name: <TextField disabled={bool1} placeholder="" onChange={e => setRow6_1(e.target.value)} />, name2: <TextField disabled={bool2} placeholder="" onChange={e => setRow6_2(e.target.value)} />, name3: <TextField disabled={bool3} placeholder="" onChange={e => setRow6_3(e.target.value)} /> },
    { Des: 'Total Admission Fee', name: <TextField disabled={bool1} placeholder="" onChange={e => setRow7_1(e.target.value)} />, name2: <TextField disabled={bool2} placeholder="" onChange={e => setRow7_2(e.target.value)} />, name3: <TextField disabled={bool3} placeholder="" onChange={e => setRow7_3(e.target.value)} /> },
    { Des: 'Total Monthly Fee', name: <TextField disabled={bool1} placeholder="" onChange={e => setRow8_1(e.target.value)} />, name2: <TextField disabled={bool2} placeholder="" onChange={e => setRow8_2(e.target.value)} />, name3: <TextField disabled={bool3} placeholder="" onChange={e => setRow8_3(e.target.value)} /> },
    { Des: 'Others Fee', name: <TextField disabled={bool1} placeholder="" onChange={e => setRow9_1(e.target.value)} />, name2: <TextField disabled={bool2} placeholder="" onChange={e => setRow9_2(e.target.value)} />, name3: <TextField disabled={bool3} placeholder="" onChange={e => setRow9_3(e.target.value)} /> },
  ];
  const columns = [{
    dataField: 'Des',
    text: 'Description'

  }, {
    dataField: 'name',
    text: 'Primary',
    headerStyle: (colum, colIndex) => {
      return { justifyContent: 'center' };
    }
  }, {
    dataField: 'name2',
    text: 'Middle',

  }, {
    dataField: 'name3',
    text: 'Higher',

  }];

  return (
    <div>
      <Header history={props.history} />
      <br /><br /><br /><br />
      <Grid container >
        <div className={classes.box}>
          <Widget title='Edit Fee Structure' disableWidgetMenu>
            <BootstrapTable keyField='id' data={data} columns={columns} />
            <Button size="large" variant="contained"
              className={classes.button}
              onClick={() => { props.history.goBack() }}
            > Cancel</Button>
            <Button size="large" variant="contained"
              className={classes.button}
            > Update</Button>
          </Widget>

        </div>

      </Grid>
      <Footer />
    </div>
  );
}

export default withRouter(EditFee);
