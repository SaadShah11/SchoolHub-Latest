import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  dashedBorder: {
    border: "10px dashed",
    borderColor: theme.palette.primary.main,
    padding: theme.spacing(2),
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
  },
  dp:{
    height:'50px',
    width:'50px',
    borderRadius:'70%'
  },
  dp1:{
    height:'25px',
    width:'25px',
    borderRadius:'70%'
  },
  text: {
    marginBottom: theme.spacing(2),
  },
  textfield:{
    width:'100%',
  },
  postbottom:{
    display:"flex",
    flexDirection:'row',
    justifyContent:'space-between',
    textAlign:'center',
    alignItems:'center',
    marginTop:'5px',
  },
  postbottomL:{
      color:"white",
    display:"flex",
    flexDirection:'row',
    justifyContent:'space-between',
    textAlign:'center',
    alignItems:'center',
    marginTop:'5px',
    border: "1px solid black",
    borderRadius:"8px",
    paddingRight:'2px',
    backgroundColor:'#5F5F5F',
    '&:hover':{
        cursor:'pointer',
        backgroundColor:'#767575'
    }
  },
  nameanddate:{
      display:'flex',
      flexDirection:'column'
  },
//   postmain:{
//       border:'2px solid black',
//       borderRadius:'4px',
//       padding:'2px'
//   },
  comment:{
      padding:'5px',
      width:"95%"
  },
  time:{
      fontSize:'12px',
  },
  name:{
    fontWeight:'bold',
    '&:hover':{
        cursor:'pointer',
        color:'#767575'
    }
  },
  posttext:{
      
      marginBottom:'10px'
  },
  likeComm:{
    display:"flex",
    flexDirection:'row',
    justifyContent:'space-around',
    textAlign:'center',
    alignItems:'center',
    marginTop:'5px',
    borderTop:'1px solid rgba(0,0,0, 0.2)',
    borderBottom:'1px solid rgba(0,0,0, 0.2)',
    
  },
  like:{
    display:"flex",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:'6px',
    paddingTop:'6px',
    borderRadius:'7px',
    width:'50%',
    '&:hover':{
        cursor:'pointer',
        backgroundColor:'#E6E6E6'
    }
  },
  comm:{
    display:"flex",
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingBottom:'6px',
    paddingTop:'6px',
    borderRadius:'7px',
    width:'50%',
    '&:hover':{
        cursor:'pointer',
        backgroundColor:'#E6E6E6'
    }
  },
  commButton:{
      width:'30px',
      '&:hover ':{
        cursor:'pointer',
        fill:'#767575'
    }
  },
  commentbox:{
    display:"flex",
    flexDirection:'row',
    borderBottom:'1px solid rgba(0,0,0, 0.2)',
  },
  postButton:{
      color:"white",
      fontSize:'20px',
      backgroundColor:"#373737",
      padding:'2px 10px 2px 10px',
    //   paddingLeft:'10px',
    //   paddingRight:'10px',
      borderRadius:'5px',
      '&:hover':{
        cursor:'pointer',
        backgroundColor:'#767575'
    }
  },
  pic:{
      maxWidth:"700px",
      maxHeight:"700px",
  },
  profile:{
    display:"flex",
    flexDirection:'row',
    alignItems:"center",
    borderBottom:'1px solid rgba(0,0,0, 0.3)',
    paddingBottom:"5px",
    marginBottom:'5px',

  },
  profile1:{
    margin:'auto',
    width:'95%',
    backgroundColor:'#F3F3F3',
    borderRadius:'6px',
    display:"flex",
    flexDirection:'row',
    alignItems:"center",
    marginTop:"5px",
  }
}));
