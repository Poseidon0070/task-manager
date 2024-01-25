import { Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
// import { removeItem } from '../store/store';
import { UseDispatch, useDispatch } from 'react-redux';

const customStyles = {
  height: '250px',
  width: '400px',
  overflowY: 'auto',
  padding: '5px',
  backgroundColor: '#f5fb1b2e',
  display: "flex",
  flexDirection: 'column',
};

function TaskBox({ title, date, description, _id }) {
  return (
    <Paper elevation={2} className='task-box' sx={{ ...customStyles, justifyContent: "space-between", borderLeft: '5px solid orange' }}>
      <div className='p-1'>
        <h2 className='mt-2 mx-3'>{title}</h2>
        <hr className='m-2' />
        <p className='mx-3 my-1'>created at : {date}</p>
        <p className='mx-3'>{description}</p>
      </div>
      <div className='d-flex justify-content-end align-self-end'>
        <DeleteIcon fontSize='large'
        sx={{
          transition: 'transform 200ms',
          '&:hover': {
            transform: 'scale(1.09)',
          },
        }}
        // onClick={() => dispatch(removeItem(_id))}
        />
      </div>
    </Paper>
  );
}

export default TaskBox;
