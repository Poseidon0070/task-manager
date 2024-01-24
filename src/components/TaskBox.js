import { Paper } from '@mui/material'
import React from 'react'

const customStyles = {
  height: '250px',
  width: '400px',
  overflowY: 'auto',
  padding: '5px',
  backgroundColor: '#f5fb1b2e',
};


function TaskBox({title, date, description}) {
  console.log(date,title)
  return (
    <div className='p-1'>
      <Paper elevation={2} className='task-box' sx={{...customStyles}}>
          <h2 className='mt-2 mx-3'>{title}</h2>
          <hr className='m-2'/>
          <p className='mx-3 my-1'>created at : {date}</p>
          <p className='mx-3'>{description}</p>
      </Paper>
    </div>
  )
}

export default TaskBox
