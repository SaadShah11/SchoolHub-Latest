import React, { useState } from "react";
import { InputBase, Grid, Typography, Button, Tabs, Tab, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import Header from '../Header/Header'
import 'react-calendar/dist/Calendar.css';
import { withRouter } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Footer from "../../../components/Footer/footer"
import StarRatings from 'react-star-ratings';
// context
import Widget from "../../../components/Widget/Widget";
import { AccountCircle, Send, Cancel, CheckCircle, BorderRight } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  box: {
    width: "80%",
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
  maindiv:{
    display:'flex',
    flexDirection:'row',
    marginTop:'10px'
  },
  reply:{
    width:'100%',
    paddingLeft:'3px',
    paddingRight:'3px',
  },
  commButton:{
    width:'30px',
    fill:"#43425d",
    '&:hover ':{
      cursor:'pointer',
      fill:'#767575'
  }
},
  name:{
    fontWeight:'bold',
    '&:hover':{
        cursor:'pointer',
        color:'#767575'
    }
  },
  commentbox:{
    marginTop:'7px',
    display:"flex",
    flexDirection:'row',

    borderBottom:'1px solid rgba(0,0,0, 0.2)',
  },
  cancel: {
    '&:hover': {
      fill: '#9F9F9F'
    }
  },
  tabs: {
    color: '#43425d',
  },
  
  indicator: {
    backgroundColor: '#43425d',
    height: '3px'
  },

}))


function Feedback(props) {
  var classes = useStyles();
  const reviews = [
    { id: '1', name: 'Ali Khan', content: 'One of my favourite sohool, very good services and reponse. rating it 5 because it is the best.', rating: 5, date: '5 aug 2020' },
    { id: '2', name: 'John Snow', content: 'Congratulation on your shadi.', rating: 4.5, date: '5 aug 2020' },
    { id: '3', name: 'Another Name', content: 'Brother asked a very good questions.', rating: 3, date: '5 aug 2020' },
    { id: '4', name: 'Ali Khan', content: 'One of my favourite sohool, very good services and reponse. rating it 5 because it is the best.', rating: 5, date: '5 aug 2020' },
    { id: '5', name: 'John Snow', content: 'Congratulation on your shadi.', rating: 4.5, date: '5 aug 2020' },
    { id: '6', name: 'Another Name', content: 'Brother asked a very good questions.', rating: 3, date: '5 aug 2020' }
  ]

  var [activeTabId, setActiveTabId] = useState(0);
  const [Tvalue1, setTValue1] = useState('');
  return (
    <div>
      <Header />
      <br /><br /><br /><br />
      <Grid container >
        <div className={classes.box}>
          <Widget title='Feedback' disableWidgetMenu>
            <Tabs
              value={activeTabId}
              onChange={(e, id) => setActiveTabId(id)}
              classes={{ indicator: classes.indicator, root: classes.tabs }}
              centered
            >
              <Tab label="School Feedback" classes={{ root: classes.tab }} />
              <Tab label="Rate SchoolHub" classes={{ root: classes.tab }} />
            </Tabs>
            {activeTabId === 0 && (
              <React.Fragment >
                <div  className={classes.maindiv}>
                <Grid container spacing={2}>
                  {reviews.map(function (item) {
                    return (
                      <Grid item xs={4} class={classes.top}>
                        <Widget disableWidgetMenu>
                          <AccountCircle style={{ fontSize: '40' }} />
                          <div className={classes.nameanddate}>
                            <StarRatings rating={item.rating} starDimension="20px" starSpacing="3px" starRatedColor="#D10B0B" />
                            <text className={classes.name}><br />by <b>{item.name}</b> on {item.date}</text>
                          </div>
                          <text className={classes.time}>{item.content}</text>
                          
                          <div class={classes.commentbox}>
                          <InputBase className={classes.reply}  placeholder='Reply'></InputBase>
                          <Send class={classes.commButton} />
                          </div>
                        </Widget>
                      </Grid>
                    )
                  })}
                  </Grid>
                </div>

              </React.Fragment>
            )}
            {activeTabId === 1 && (
              <React.Fragment>
                <div>

                </div>
              </React.Fragment>
            )}
            <br/>
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

export default withRouter(Feedback);
