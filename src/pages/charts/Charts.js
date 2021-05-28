import React, { useState, useEffect, useCallback } from "react";
import { Typography, Button, Grid, InputBase } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { BarChart, Bar, CartesianGrid, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Sector, Tooltip, XAxis, YAxis, } from "recharts";
import axios from "../../Util/axios"
import AuthService from "../../services/auth.service";
import SearchIcon from '@material-ui/icons/Search';
// components
import Widget from "../../components/Widget/Widget";
import { useRechartToPng } from "recharts-to-png";
import FileSaver from "file-saver";


const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: "row",
  },
  Button: {
    color: "white",
    fontSize: '12px',
    backgroundColor: "#43425d",
    padding: '2px 10px 2px 10px',
    borderRadius: '5px',
    marginLeft: '4px',
    '&:hover': {
      cursor: 'pointer',
    }
  },
  addschool: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: "8px",
    marginLeft: '6px',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  input: {
    border: '1px solid rgba(0, 0, 0, 0.3)',
    borderRadius: '5px',
    marginTop: '3px',
    width: '100%',
  },
  remove: {
    textDecoration: 'underline',
    paddingLeft: '10px',
    backgroundColor: 'white',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  result: {
    borderBottom: '1px solid rgba(0,0,0, 0.3)',
    width: '80%',
    marginTop: '5px',
    '&:hover': {
      backgroundColor: '#F7F7F7',
      cursor: 'default',
      borderRadius: '3px'
    }
  },
  charts: {
    display: 'flex',
    flexDirection: 'column',
    width: '60%',
    marginLeft: '10px',

  },
  searchdiv: {
    width: '35%',
    height: '90vh'
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  searchb: {
    display: 'flex',
    flexDirection: 'row',

  },
  selectedschools: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center',
  }
}))
const ratingsdata = [
  { name: "Pak turk international school", Ratings: 5 },
  { name: "Roots school and college", Ratings: 4 },
  { name: "Allied schools system", Ratings: 2 },
  { name: "Army public school", Ratings: 5 },
];

const datafee = [
  { name: "Pak turk international school", primary: 5000, middle: 10000, higher: 12000 },
  { name: "Roots school and college", primary: 3000, middle: 7000, higher: 10000 },
  { name: "Allied schools system", primary: 8000, middle: 10000, higher: 11000 },
];
const searchresults = [
  { id: '1', name: 'Army Public School, Islamabad', location: 'I-8 markaz, Islamabad' },
  { id: '2', name: 'Pak Turk International School, Islamabad', location: 'Taramri chowk, Islamabad' },
  { id: '3', name: 'Grafton School, Islamabad', location: 'Taramri chowk, Islamabad' }
]

let newData = {}

let currentLocation = {}

export default function Charts(props) {
  var theme = useTheme();
  var classes = useStyles();

  const [png, ref] = useRechartToPng();

  const handleDownload = React.useCallback(async () => {
    FileSaver.saveAs(png, "myChart.png");
  }, [png]);

  const handleDownload1 = React.useCallback(async () => {
    FileSaver.saveAs(png, "myChart1.png");
  }, [png]);

  let [searchValue, setSearchValue] = useState("");
  var [searchResults, setSearchResults] = useState();
  var [allSchools, setAllSchools] = useState()

  var [feeMin, setFeeMin] = useState();
  var [feeMax, setFeeMax] = useState();
  var [distance, setDistance] = useState();
  var [schoolType, setSchoolType] = useState();
  var [educationLevel, setEducationLevel] = useState();
  var [educationType, setEducationType] = useState()

  var [reload, setReload] = useState(false)

  let [getReviews, setAllReviews] = React.useState()
  const [getschools, setschool] = React.useState([])
  // 'Pak turk international school',
  //   'Roots international school',
  //   'Some international school'
  // local
  var [activeIndex, setActiveIndexId] = useState(0);

  const remove = (index) => {
    console.log(index)
    const newe = getschools.filter((item) => item !== index);
    setschool(newe)
  }

  let handleSend = () => {
    let finalFilters = {
      //filters: filterValue,
      fee: { min: feeMin, max: feeMax },
      distance: distance,
      schoolType: schoolType,
      educationLevel: educationLevel,
      educationType: educationType,
      currentLocation: currentLocation
    }
    newData.filters = finalFilters
    console.log("search Value")
    console.log(searchValue)
    newData.search = searchValue
    console.log("NewData")
    console.log(newData)
    postSearch()
  }

  let handleCompare = () => {
    //displayBarGraph()
    const neww = getschools
    setschool(neww)
    setReload(true)
  }

  const getAllSchools = useCallback(async (bool) => {
    async function fetchData() {
      let request;
      console.log("inside get all schools")
      request = await axios.get("http://localhost:8080/searchSchool/search/")
      console.log("request")
      setAllSchools(request.data)
      return request.data;
    }
    //And here you call it
    fetchData()
  }, [])

  const getAllReviews = useCallback(async () => {
    async function fetchData() {
      let request;
      console.log("inside get all reviews")
      request = await axios.get("http://localhost:8080/review/reviews")
      console.log("request")
      setAllReviews(request.data)
      return request.data;
    }
    //And here you call it
    fetchData()
  }, [])

  let getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      //setCurrentLocation({ latitude:position.coords.latitude, longitude:position.coords.longitude })
      currentLocation.latitude = position.coords.latitude
      currentLocation.longitude = position.coords.longitude
      console.log("Current Location")
      console.log(currentLocation)
    });
  }

  useEffect(() => {
    getAllReviews()
    getAllSchools()
    getCurrentLocation()
  }, []);

  useEffect(() => {

    setReload(false)
  }, [reload])

  const postSearch = useCallback(async () => {
    async function fetchData() {
      let request;
      console.log("NewData")
      console.log(newData)
      request = await axios.post("http://localhost:8080/searchSchool/search/" + newData.search, newData.filters)
      console.log("request")
      console.log(request)
      setSearchResults(request.data)
      //window.location.reload()
      return request.data;
    }
    fetchData()
  }, [])


  let selectedSchools;

  selectedSchools = getschools.map((index) => {
    return (
      <div className={classes.addschool}>
        <Typography>{getschools.indexOf(index) + 1}. {index.schoolName}</Typography>
        <Typography className={classes.remove} onClick={() => remove(index)}>remove</Typography>
      </div>
    )
  })


  let displayResults //= () => { let displayPostsVar

  if (searchResults != undefined) {
    console.log("inside displayresults")
    // {return <GetAllPosts allPosts= {allPosts}/>}
    displayResults = searchResults.map((i) => {

      const ratingObject = getReviews.filter((items) => items.schoolID == i._id)
      //console.log("rating Obj")
      //console.log(ratingObject)
      let totalRating = 0;
      for (let i = 0; i < ratingObject.length; i++) {
        //console.log(ratingObject[i])
        totalRating = totalRating + ratingObject[i].rating
      }
      let avgRating = totalRating / ratingObject.length
      //console.log("Ratings")
      //console.log(totalRating)
      //console.log(ratingObject.length)
      //console.log(avgRating)

      i.schoolRating = avgRating

      let primary = 0;
      let middle = 0
      let higher = 0
      //console.log("Length of FeeStruc")
      //console.log(i.feeStructure.length)
      for (let ii = 0; ii < i.feeStructure.length; ii++) {
        if (i.feeStructure[ii].group === "1-5") {
          primary = i.feeStructure[ii].tutionFee
        } else if (i.feeStructure[ii].group === "5-8") {
          middle = i.feeStructure[ii].tutionFee
        }
      }

      i.primary = primary
      i.middle = middle
      i.higher = higher

      return (
        <div class={classes.result} onClick={() => {
          //setschool(getschools.push(i))
          //getschools.push(i)

          //This is how you update an array
          setschool(schools => [...schools, i]);
          setReload(true)
          console.log("F-Arr")
          console.log(getschools)
        }}>
          <text>{i.schoolName}</text>
          <br />
          <text style={{ fontSize: '10px' }}>{i.schoolAddress}</text>
        </div>
      )
    })
  } else {
    console.log("nothing")
  }

  let displayBarGraph;
  //let displayBarGraph = () => {
  try {
    displayBarGraph = <Widget title="Ratings Comparision" noBodyPadding upperTitle disableWidgetMenu>
      <ResponsiveContainer width="100%" height={350} >
        <BarChart ref={ref} width={730} height={250} data={getschools}>

          <XAxis dataKey="schoolName" />
          <YAxis domain={[0, 5]} label={{ value: 'Average Ratings', angle: -90 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="schoolRating" fill="#43425d" />
        </BarChart>

      </ResponsiveContainer>
      <Button onClick={handleDownload}>Download</Button>
    </Widget>
  } catch (err) {
    console.log(err)
  }

  //}, [reload])
  //}

  let displayBarGraph1 = () => {
    return <Widget title="Fee Comparision" noBodyPadding upperTitle disableWidgetMenu>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          ref={ref}
          width={500}
          height={400}
          data={getschools}
          margin={{
            top: 20,
            right: 30,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="schoolName" />

          <YAxis label={{ value: 'FEE(PKR)', angle: -90, position: 'insideLeft' }} />/>
        <Tooltip />
          <Legend />
          <Bar dataKey="primary" fill="#8884d8" />
          <Bar dataKey="middle" fill="#6884d8" />
          <Bar dataKey="higher" fill="#43445d" />
        </BarChart>
      </ResponsiveContainer>
      <Button onClick={handleDownload1}>Download</Button>
    </Widget>
    //}, [reload])
  }

  return (
    <div className={classes.main}>
      <div className={classes.searchdiv}>
        <Widget title="Schools Comparision" disableWidgetMenu>
          {/* <Typography >Comparing Schools makes it easier to choose a school. Add schools below to
         compare them using multiple factors.</Typography> */}
          <div className={classes.selectedschools}>
            {
              selectedSchools
            }
          </div>
          <div className={classes.searchb}>
            <InputBase className={classes.input} placeholder='Search school' onChange={e => setSearchValue(e.target.value)}></InputBase>

            <Button onClick={() => handleSend()}> <SearchIcon fontSize='large' class={classes.icon} /></Button>
          </div>
          <div>
            {
              displayResults
            }
            {/* {searchresults.map(function (item) {
                return (
                  <div class={classes.result}>
                    <text>{item.name}</text>
                    <br />
                    <text style={{ fontSize: '10px' }}>{item.location}</text>
                  </div>
                )
              })} */}
          </div>
          {/* <Button className={classes.Button} onClick={() => handleCompare()}>Compare</Button> */}
        </Widget>
      </div>
      <br />
      <div className={classes.charts}>

        <div>

          {
            displayBarGraph
          }
        </div>
        <br />
        <div>
          {
            displayBarGraph1()
          }
        </div>

      </div>
    </div>
  );
}

// ################################################################
