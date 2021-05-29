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
  // console.log("SCHOOL")
  // console.log(schoolID)

  var [reloadHome, setReloadHome] = useState(false)
  var [allSchools, setAllSchools] = useState()

  var [bool1, setBool1] = useState(true)
  var [bool2, setBool2] = useState(true)
  var [bool3, setBool3] = useState(true)

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
    admissionFee: parseInt(row1_1, 10),
    tutionFee: parseInt(row2_1, 10),
    examFee: parseInt(row3_1, 10),
    sportsFee: parseInt(row4_1, 10),
    labFee: parseInt(row5_1, 10),
    libraryFee: parseInt(row6_1, 10),
    totalAdmissionFee: parseInt(row7_1, 10),
    monthlyFee: parseInt(row8_1, 10),
    othersFee: parseInt(row9_1, 10),
  }

  middle = {
    group: 'middle',
    admissionFee: parseInt(row1_2, 10),
    tutionFee: parseInt(row2_2, 10),
    examFee: parseInt(row3_2, 10),
    sportsFee: parseInt(row4_2, 10),
    labFee: parseInt(row5_2, 10),
    libraryFee: parseInt(row6_2, 10),
    totalAdmissionFee: parseInt(row7_2, 10),
    monthlyFee: parseInt(row8_2, 10),
    othersFee: parseInt(row9_2, 10)
  }

  higher = {
    group: 'higher',
    admissionFee: parseInt(row1_3, 10),
    tutionFee: parseInt(row2_3, 10),
    examFee: parseInt(row3_3, 10),
    sportsFee: parseInt(row4_3, 10),
    labFee: parseInt(row5_3, 10),
    libraryFee: parseInt(row6_3, 10),
    totalAdmissionFee: parseInt(row7_3, 10),
    monthlyFee: parseInt(row8_3, 10),
    othersFee: parseInt(row9_3, 10),
  }

  const getSchool = useCallback(async () => {
    async function fetchData() {
      let request;
      request = await axios.get("http://localhost:8080/searchSchool/search/specificSchool/" + schoolID.schoolID)
      console.log("request")
      console.log(request.data.schoolName)

      setAllSchools(request.data[0])
      console.log("Fee Structure")
      console.log(request.data[0].feeStructure)

      for (let i = 0; i < request.data[0].feeStructure.length; i++) {
        if (request.data[0].feeStructure[i].group == 'primary') {
          if (request.data[0].educationLevel.primary == true) {
            setBool1(false)
          }
          setRow1_1(request.data[0].feeStructure[i].admissionFee)
          setRow2_1(request.data[0].feeStructure[i].tutionFee)
          setRow3_1(request.data[0].feeStructure[i].examFee)
          setRow4_1(request.data[0].feeStructure[i].sportsFee)
          setRow5_1(request.data[0].feeStructure[i].labFee)
          setRow6_1(request.data[0].feeStructure[i].libraryFee)
          setRow7_1(request.data[0].feeStructure[i].totalAdmissionFee)
          setRow8_1(request.data[0].feeStructure[i].monthlyFee)
          setRow9_1(request.data[0].feeStructure[i].othersFee)
        }
        if (request.data[0].feeStructure[i].group == 'middle') {
          if (request.data[0].educationLevel.middle == true) {
            setBool2(false)
          }
          setRow1_2(request.data[0].feeStructure[i].admissionFee)
          setRow2_2(request.data[0].feeStructure[i].tutionFee)
          setRow3_2(request.data[0].feeStructure[i].examFee)
          setRow4_2(request.data[0].feeStructure[i].sportsFee)
          setRow5_2(request.data[0].feeStructure[i].labFee)
          setRow6_2(request.data[0].feeStructure[i].libraryFee)
          setRow7_2(request.data[0].feeStructure[i].totalAdmissionFee)
          setRow8_2(request.data[0].feeStructure[i].monthlyFee)
          setRow9_2(request.data[0].feeStructure[i].othersFee)
        }
        if (request.data[0].feeStructure[i].group == 'higher') {
          if (request.data[0].educationLevel.higher == true) {
            setBool3(false)
          }
          setRow1_3(request.data[0].feeStructure[i].admissionFee)
          setRow2_3(request.data[0].feeStructure[i].tutionFee)
          setRow3_3(request.data[0].feeStructure[i].examFee)
          setRow4_3(request.data[0].feeStructure[i].sportsFee)
          setRow5_3(request.data[0].feeStructure[i].labFee)
          setRow6_3(request.data[0].feeStructure[i].libraryFee)
          setRow7_3(request.data[0].feeStructure[i].totalAdmissionFee)
          setRow8_3(request.data[0].feeStructure[i].monthlyFee)
          setRow9_3(request.data[0].feeStructure[i].othersFee)
        }

      }
      return request.data;
    }
    //And here you call it
    fetchData()
    setReloadHome(true)
  }, [])

  let updateFee = () => {
    let finalArr = []
    if (allSchools.educationLevel.primary == true) {
      finalArr.push(primary)
    }
    if (allSchools.educationLevel.middle == true) {
      finalArr.push(middle)
    }
    if (allSchools.educationLevel.higher == true) {
      finalArr.push(higher)
    }

    console.log("Final Object")
    console.log(finalArr)
    updateSchoolFee(finalArr)
  }

  const updateSchoolFee = useCallback(async (schoolFinal) => {

    async function fetchData(schoolFinal) {

      let request;
      console.log('inside fetchdata')
      console.log(schoolFinal)

      request = await axios.patch("http://localhost:8080/school/Edit_SchoolFee/" + schoolID.schoolID, schoolFinal)
      console.log("request")
      console.log(request)
      alert("School Fee Updated!")
      return request;
    }
    fetchData(schoolFinal)

  }, [])


  useEffect(() => {
    getSchool()

    setReloadHome(false)
  }, [reloadHome])

  const data = [
    { Des: 'Admission Fee', name: <TextField type="number" value={row1_1} disabled={bool1} placeholder="" onChange={e => setRow1_1(e.target.value)} />, name2: <TextField type="number" value={row1_2} disabled={bool2} placeholder="" onChange={e => setRow1_2(e.target.value)} />, name3: <TextField type="number" value={row1_3} disabled={bool3} placeholder="" onChange={e => setRow1_3(e.target.value)} /> },
    { Des: 'Tution Fee', name: <TextField type="number" value={row2_1} disabled={bool1} placeholder="" onChange={e => setRow2_1(e.target.value)} />, name2: <TextField type="number" value={row2_2} disabled={bool2} placeholder="" onChange={e => setRow2_2(e.target.value)} />, name3: <TextField type="number" value={row2_3} disabled={bool3} placeholder="" onChange={e => setRow2_3(e.target.value)} /> },
    { Des: 'Exam Fee', name: <TextField type="number" value={row3_1} disabled={bool1} placeholder="" onChange={e => setRow3_1(e.target.value)} />, name2: <TextField type="number" value={row3_2} disabled={bool2} placeholder="" onChange={e => setRow3_2(e.target.value)} />, name3: <TextField type="number" value={row3_3} disabled={bool3} placeholder="" onChange={e => setRow3_3(e.target.value)} /> },
    { Des: 'Sport Fee', name: <TextField type="number" value={row4_1} disabled={bool1} placeholder="" onChange={e => setRow4_1(e.target.value)} />, name2: <TextField type="number" value={row4_2} disabled={bool2} placeholder="" onChange={e => setRow4_2(e.target.value)} />, name3: <TextField type="number" value={row4_3} disabled={bool3} placeholder="" onChange={e => setRow4_3(e.target.value)} /> },
    { Des: 'Lab Fee', name: <TextField type="number" value={row5_1} disabled={bool1} placeholder="" onChange={e => setRow5_1(e.target.value)} />, name2: <TextField type="number" value={row5_2} disabled={bool2} placeholder="" onChange={e => setRow5_2(e.target.value)} />, name3: <TextField type="number" value={row5_3} disabled={bool3} placeholder="" onChange={e => setRow5_3(e.target.value)} /> },
    { Des: 'Library Fee', name: <TextField type="number" value={row6_1} disabled={bool1} placeholder="" onChange={e => setRow6_1(e.target.value)} />, name2: <TextField type="number" value={row6_2} disabled={bool2} placeholder="" onChange={e => setRow6_2(e.target.value)} />, name3: <TextField type="number" value={row6_3} disabled={bool3} placeholder="" onChange={e => setRow6_3(e.target.value)} /> },
    { Des: 'Total Admission Fee', name: <TextField type="number" value={row7_1} disabled={bool1} placeholder="" onChange={e => setRow7_1(e.target.value)} />, name2: <TextField type="number" value={row7_2} disabled={bool2} placeholder="" onChange={e => setRow7_2(e.target.value)} />, name3: <TextField type="number" value={row7_3} disabled={bool3} placeholder="" onChange={e => setRow7_3(e.target.value)} /> },
    { Des: 'Total Monthly Fee', name: <TextField type="number" value={row8_1} disabled={bool1} placeholder="" onChange={e => setRow8_1(e.target.value)} />, name2: <TextField type="number" value={row8_2} disabled={bool2} placeholder="" onChange={e => setRow8_2(e.target.value)} />, name3: <TextField type="number" value={row8_3} disabled={bool3} placeholder="" onChange={e => setRow8_3(e.target.value)} /> },
    { Des: 'Others Fee', name: <TextField type="number" value={row9_1} disabled={bool1} placeholder="" onChange={e => setRow9_1(e.target.value)} />, name2: <TextField type="number" value={row9_2} disabled={bool2} placeholder="" onChange={e => setRow9_2(e.target.value)} />, name3: <TextField type="number" value={row9_3} disabled={bool3} placeholder="" onChange={e => setRow9_3(e.target.value)} /> },
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

  console.log("Data:")
  // console.log(primary)
  // console.log(middle)
  // console.log(higher)
  console.log(bool1)
  console.log(bool2)
  console.log(bool3)

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
              className={classes.button} onClick={()=>updateFee()}
            > Update</Button>
          </Widget>

        </div>

      </Grid>
      <Footer />
    </div>
  );
}

export default withRouter(EditFee);
