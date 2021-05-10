import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  root: {
    display: "flex",
    maxWidth: "100vw",
    overflowX: "hidden",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: `calc(100vw - 240px)`,
    minHeight: "100vh",
  },
  fakeToolbar: {
    ...theme.mixins.toolbar,
  },
  link: {
    '&:not(:first-child)': {
      paddingLeft: 30
    }
  }
}));
