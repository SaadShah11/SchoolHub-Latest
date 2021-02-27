import BootstrapTable from 'react-bootstrap-table-next';
import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    table:{
        textAlign:'center'
    }
}))
export default function Fee(){
    const classes = useStyles();
    const data = [
        {Des: 'Admission Fee', name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
        {Des: 'Tution Fee',name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
        {Des: 'Exam Fee', name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
        {Des: 'Sport Fee',name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
        {Des: 'Lab Fee', name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
        {Des: 'Library Fee', name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
        {Des: 'Total Admission Fee',name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},
        {Des: 'Total Monthly Fee', name:<TextField placeholder="" />, name2:  <TextField placeholder="" />,name3:  <TextField placeholder="" />},  
      ];
      const columns = [{
        dataField: 'Des',
        text: 'Description'
          
      }, {
        dataField: 'name',
        text: 'Junior',
        headerStyle: (colum, colIndex) => {
            return { justifyContent: 'center'};
          }
      }, {
        dataField: 'name',
        text: 'Higher',
        
      },{
        dataField: 'name',
        text: 'College',
        
      }];

    return(
        <div className={classes.table}>
            <BootstrapTable keyField='id' data={ data } columns={ columns } />
        </div>
        
    ) 
}