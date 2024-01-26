import { Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useDispatch } from 'react-redux';
import { taskAction } from '../store/store';

const customStyles = {
  height: '175px',
  width: '500px',
  overflowX: 'auto',
  padding: '5px',
  backgroundColor: '#f5fb1b2e',
  display: "flex",
  flexDirection: 'row',
};


function TaskBox({ title, date, description, _id }) {
  let dispatch = useDispatch()
  let removeTask = async (task_id) => {
    try{
        dispatch(taskAction.setLoading(true))
        const res = await fetch(`http://localhost:8080/deleteTask/${task_id}`, {
          method: 'DELETE',
        })
        dispatch(taskAction.setLoading(false))
        if (res.ok) {
          dispatch(taskAction.delete(task_id))
        }
    }catch(err){
      console.log(err)
    }finally{
      dispatch(taskAction.setLoading(false))
    }
  }

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
            transitionProperty : "cursor, transform",
            transition: '200ms ease-in-out',
            '&:hover': {
              cursor : "pointer",
              transform: 'scale(1.09)',
            },
          }}
          onClick={() => removeTask(_id)}
        />
      </div>
    </Paper>
  );
}

export default TaskBox;
