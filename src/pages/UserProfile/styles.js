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
  main:{
    width:'95vw',
    display:'flex',
    flexDirection:'row',
    height:'88vh',
  },
  info:{
    width:'350px',
    textAlign:'center',
    position:'fixed',
    height:'88vh'
  },
  editinputs:{
    border:'1px solid rgba(0,0,0,0.2)',
    borderRadius:'5%',
    paddingLeft:'2px'
  },
  editfields:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between'
  },
  editimage:{
    position: "absolute",
    top: 248,
    width:'33px',
    height:'33px',
    left: 165,
    padding:'5px',
    color:'black',
    fill:'white',
    backgroundColor:'rgba(0,0,0,0.2)',
    borderRadius:'50%',
    '&:hover':{
      backgroundColor:'rgba(0,0,0,0.5)',
      cursor:'pointer',
      width:'31px',
    height:'31px',
    }
  },
  text: {
    marginBottom: theme.spacing(2),
  },
  textfield:{
    width:'100%',
  },
  dp:{
    height:'250px',
    width:'250px',
    borderRadius:'50%'
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

  commentbox:{
    display:"flex",
    flexDirection:'row',
    borderBottom:'1px solid rgba(0,0,0, 0.2)',
  },
  postButton:{
      color:"white",
      fontSize:'20px',
      backgroundColor:"#43425d",
      padding:'2px 10px 2px 10px',
    //   paddingLeft:'10px',
    //   paddingRight:'10px',
      borderRadius:'5px',
      '&:hover':{
        cursor:'pointer',
    }
  },
  pic:{
      maxWidth:"645px",
      maxHeight:"645px",
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
  },
  updateImg:{
    display: 'none'
  }
}));
