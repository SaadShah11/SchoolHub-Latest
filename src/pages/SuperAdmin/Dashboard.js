import React, {useRef} from "react";
import { Grid, Typography } from "@material-ui/core";
import { TextField, InputBase, Button } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Widget from "../../components/Widget/Widget";
import {AddToPhotos as Posts, ThreeDRotation as AR, Apartment as Apartment, LiveTv as Stream, People as People} from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
    main:{
      marginLeft:'15%',
    },
    title:{
      textAlign:'center',
      marginBottom:'30px',
      fontWeight:'bold',
      fontSize:'30px'
    },
    tab:{
      display:'flex',
      flexDirection:'row',
      justifyContent:'space-between'
    },
    iconname:{

      display:'flex',
      flexDirection:'row'
    }
}));
const stats=[
  {name: 'Total Users', content:'500', icon: <People/>},
  {name: 'Total Schools', content:'10', icon: <Apartment /> },
  {name: 'Total Teachers', content:'50', icon: <People/> },
  {name: 'Total students', content:'400', icon: <People/> },
  {name: 'Total Posts', content:'400', icon: <Posts/> },
  {name: 'AR Requests ', content:'4', icon: <AR />  },
  {name: 'Live Stream Requests ', content:'3', icon: <Stream /> }
]
export default function Dashboard() {
  var classes = useStyles()

  return(
    <div className={classes.main}>
          <Typography className={classes.title} variant="h5" weight="bold"> SchoolHub Admin Dashboard</Typography>
          <Grid container spacing={5}>

          
          {stats.map(function(item){return(
                <Grid item md={4}>
                <Widget disableWidgetMenu>
                <div className={classes.tab}>
                <div className={classes.iconname}>
                {item.icon}
                <Typography>{item.name}:</Typography>
                </div>
                <Typography>{item.content}</Typography>
                
                </div>
                </Widget>
                </Grid>
              )})}
              </Grid>
    </div>

  )
}