import { Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react';
import { useDispatch } from 'react-redux';
import { taskAction } from '../store/store';
import Checkbox from '@mui/material/Checkbox';

const customStyles = {
  height: '88%',
  width: {md : '93%', xs : '98%'},
  overflowY: 'auto',
  padding: '5px',
  backgroundColor: '#f5fb1b2e',
  display: "flex",
  flexDirection: 'column',
};

function TaskBox({ title, date, description, _id, complete }) {
  let dispatch = useDispatch()
  let removeTask = async (task_id) => {
    try {
      const res = await fetch(`http://localhost:8080/deleteTask/${task_id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        dispatch(taskAction.delete(task_id))
      }
    } catch (err) {
      console.log(err)
    }
  }

  let taskCheckHandler = async(event) => {
    event.preventDefault()
    const isCheck = event.target.checked 
    console.log(isCheck)
    try{
      dispatch(taskAction.setLoading(true))
      const response = await fetch('http://localhost:8080/checkTask', {
        method : "POST",
        headers : {
          'Content-Type' : 'application/json'  
        },
        body : JSON.stringify({
          taskId: _id,
          isCheck: isCheck 
        })
      })
      if(response.ok){
        dispatch(taskAction.check({
          taskId : _id,
          isCheck:isCheck
        }))
      }
    }catch(err){
      console.log(err)
      throw err 
    }finally{
      dispatch(taskAction.setLoading(false))
    }
  }

  return (
    <Paper elevation={2} className='task-box' sx={{
      ...customStyles, mx: "5px",
      justifyContent: "space-between",
      borderLeft: `5px solid ${complete === "1" ? "green" : "orange"}`
    }}>
      <div className='p-0'>
        <h4 className='mt-0 ms-3 d-flex justify-content-between align-items-center'>
          {title === '' ? 'No title' : title}
          <Checkbox color="success" 
          sx={{ mt: "3px" }} 
          onChange={taskCheckHandler} 
          checked={complete === "1"}
          />
        </h4>
        <hr className='m-2' />
        <p className='mx-3 font-monospace'>{description === '' ? 'No description' : description}</p>
      </div>
      <div className='d-flex justify-content-between align-items-center'>
        <p className='mx-3 mb-1 fw-medium'>created at : {date === '' ? 'Not mentioned' : date}</p>
        <DeleteIcon fontSize='large'
          sx={{
            justifySelf: 'flex-end',
            transitionProperty: "cursor, transform",
            transition: '200ms ease-in-out',
            mb: "2px",
            '&:hover': {
              cursor: "pointer",
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
