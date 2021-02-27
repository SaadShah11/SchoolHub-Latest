import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      backgroundColor:'#C5C5C5'
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  function CreateData(description, junior, higher, college) {
    return { description, junior, higher, college };
  }
  
  const rows = [
    CreateData('Admission Fee', 500, 600, 240),
    CreateData('Tution Fee', 500, 600, 240),
    CreateData('Exam Fee', 500, 600, 240),
    CreateData('Sports Fee', 500, 600, 240),
    CreateData('Labortay Fee', 500, 600, 240),
    CreateData('Library Fee', 500, 600, 240),
    CreateData('Total Admission Fee', 500, 600, 240),
    CreateData('Total monthly Fee', 500, 600, 240),
  ];
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
  
  export default function SchoolFee() {
    const classes = useStyles();
  
    return (
      <TableContainer style={{marginBottom:'20vh'}} component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead >
            <TableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="right">Junior</StyledTableCell>
              <StyledTableCell align="right">Higher</StyledTableCell>
              <StyledTableCell align="right">College</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.description}>
                <StyledTableCell component="th" scope="row">{row.description} </StyledTableCell>
                <StyledTableCell align="right">{row.junior}</StyledTableCell>
                <StyledTableCell align="right">{row.higher}</StyledTableCell>
                <StyledTableCell align="right">{row.college}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

// const useStyles = makeStyles((theme) => ({
//     main:{
//         //justifyContent: "center"
        
//     },
//     table:{
//         width: "80%",
//         margin: "50px",  
//         fontSize: "25px"
//     }
    

// }));
// export default function Schoolprofile(){
//     const classes = useStyles();
//     const data = [
//         {id: 'Admission Fee', junior: '==', higher: '==', college:'=='},
//         {id: 'Tution Fee', junior: '==', higher: '==', college:'=='},
//         {id: 'Exam Fee', junior: '==', higher: '==', college:'=='},
//         {id: 'Sport Fee', junior: '==', higher: '==', college:'=='},
//         {id: 'Lab Fee', junior: '==', higher: '==', college:'=='},
//         {id: 'Library Fee', junior: '==', higher: '==', college:'=='},
//         {id: 'Total Admission Fee', junior: '==', higher: '==', college:'=='},
//         {id: 'Total Monthly Fee', junior: '==', higher: '==', college:'=='},  
//       ];
//       const columns = [
//         {dataField: 'id',text: 'Description'},
//         {dataField: 'junior',text: 'Junior',}, 
//         {dataField: 'higher',text: 'Higher',},
//         {dataField: 'college', text: 'College',}
//       ];

//     return (
//     <div className={classes.main}>
//         <div className={classes.table}>
//             <BootstrapTable keyField='id' data={ data } columns={ columns } />
//         </div>
//     </div>)
// }