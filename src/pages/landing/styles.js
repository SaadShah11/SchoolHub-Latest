import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  mapContainer: {
    height: "100vh",
    width:'130vh',
  },
  searchfield:{
    display:'flex',
    flexDirection:'row',
    borderBottom:'1px solid black',
    '&:focus':{
      borderBottom:'1px solid black',
    }
  },
  result:{
    borderBottom:'1px solid rgba(0,0,0, 0.3)',
    marginTop:'5px',
    '&:hover':{
      backgroundColor:'#F7F7F7',
      cursor:'default',
      borderRadius:'3px'
    }
  },
  search:{
    display:'flex',
    flexDirection:'row'
  },
  top:{
    marginLeft:'15px',
    width:'250px',
    borderRadius:'5px',
    '&:hover':{
      cursor:'pointer',
     opacity:'0.7'
    }
  },
  toptitle:{
    width:'100%',
    marginLeft:'15px',
    marginBottom:'10px',
    fontSize:'30px',
    fontWeight:'bold',
    color:'#696969'
  },
  icon:{
    width:'30px',
    '&:hover':{
      fill:'#626262'
    }
  },
  popup:{
    width:'100vh',
    height:'100vh',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'red  '
  },
  popup2:{
    display:'flex',
    flexDirection:'column',
    position:'fixed',
    zIndex:'1',
    marginTop:'50px',
    
  },
  eachF:{
    alignItems:'center',
    display:"flex",
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    paddingBottom:'10px'
  },
  buttons:{
    float:'right',
  },
  feefield:{
    width:'30%', 
    marginLeft:'5px'
  },

  
}));