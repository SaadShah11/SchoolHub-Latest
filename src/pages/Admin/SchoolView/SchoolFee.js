import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    backgroundColor: '#C5C5C5'
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



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

let defaultFee = {
  admissionFee: '',
  tutionFee: '',
  examFee: '',
  sportsFee: '',
  labFee: '',
  libraryFee: '',
  totalAdmissionFee: '',
  monthlyFee: '',
  othersFee: ''
}


export default function SchoolFee(props) {
  const classes = useStyles();

  let schoolFee = props.school[0].feeStructure
  let educationLevel = props.school[0].educationLevel
  console.log("Fee Props")
  console.log(schoolFee)
  if (educationLevel.primary == false) {
    schoolFee[0] = defaultFee
  }
  if (educationLevel.middle == false) {
    schoolFee[1] = defaultFee
  }
  if (educationLevel.higher == false) {
    schoolFee[2] = defaultFee
  }
  console.log(educationLevel)

  function CreateData(description, junior, higher, college) {
    return { description, junior, higher, college };
  }

  const rows = [
    CreateData('Admission Fee', schoolFee[0].admissionFee, schoolFee[1].admissionFee, schoolFee[2].admissionFee),
    CreateData('Tution Fee', schoolFee[0].tutionFee, schoolFee[1].tutionFee, schoolFee[2].tutionFee),
    CreateData('Exam Fee', schoolFee[0].examFee, schoolFee[1].examFee, schoolFee[2].examFee),
    CreateData('Sports Fee', schoolFee[0].sportsFee, schoolFee[1].sportsFee, schoolFee[2].sportsFee),
    CreateData('Labortay Fee', schoolFee[0].labFee, schoolFee[1].labFee, schoolFee[2].labFee),
    CreateData('Library Fee', schoolFee[0].libraryFee, schoolFee[1].libraryFee, schoolFee[2].libraryFee),
    CreateData('Total Admission Fee', schoolFee[0].totalAdmissionFee, schoolFee[1].totalAdmissionFee, schoolFee[2].totalAdmissionFee),
    CreateData('Total monthly Fee', schoolFee[0].monthlyFee, schoolFee[1].monthlyFee, schoolFee[2].monthlyFee),
    CreateData('Others Fee', schoolFee[0].othersFee, schoolFee[1].othersFee, schoolFee[2].othersFee),
  ];


  return (
    <TableContainer style={{ marginBottom: '20vh' }} component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead >
          <TableRow>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell align="right">Primary</StyledTableCell>
            <StyledTableCell align="right">Middle</StyledTableCell>
            <StyledTableCell align="right">Higher</StyledTableCell>
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