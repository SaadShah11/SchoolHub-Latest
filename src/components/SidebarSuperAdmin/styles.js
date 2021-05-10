import { makeStyles } from "@material-ui/styles";
export default makeStyles(theme => ({
  drawer: {
    width: "15%",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: "15%",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  sidebarList:{
    width:"100%",
    
  },
  
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },

}));
