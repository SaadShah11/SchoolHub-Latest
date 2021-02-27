import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  mapContainer: {
    height: "75vh",
    width:'113vh',
  },
  searchfield:{
    display:'flex',
    flexDirection:'row',
    borderBottom:'1px solid black'
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
    disply:"flex",
    flexDirection:'row',
    justifyContent:'space-around',
    width:'100%'
  },
  buttons:{
    float:'right',
  },
  feefield:{
    textAlign:'center',
    borderBottom:'1px solid rgba(0,0,0, 0.2)', 
    width:'20%', 
    height:"25px",
    borderRadius:'5px'
  },
}));