import React from 'react'
import { useRef } from 'react'
import styles from './TaskForm.module.css'
import { Box } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch } from 'react-redux'
import { taskAction } from '../store/store';
import { v4 as uuidv4 } from 'uuid';

let TaskForm = () => {
    let titleRef = useRef(null)
    let dateRef = useRef(null)
    let descriptionRef = useRef(null)
    let dispatch = useDispatch()

    let submitHandler = async(event) => {
        event.preventDefault()
        const newTask = {
            _id: uuidv4(),
            title: titleRef.current.value,
            date: dateRef.current.value,
            description: descriptionRef.current.value,
            complete: "0"
        }
        dispatch(taskAction.setLoading(true))
        try{
            const res = await fetch('http://192.168.0.105:8080/addTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            });
            
            if (res.ok) {
                dispatch(taskAction.add(newTask));
            }
        }catch(err){
            console.log(err) 
        }finally{
            dispatch(taskAction.setLoading(false))
        }
    }

    return (
        <>
            <div className="d-flex justify-content-center mt-4 font-monospace">
                <Box className={styles['form-container']} sx={{ width: { md: "650px", xs : "75vw" }, border: "1px solid #ffc107" }}>
                    <form className="d-flex flex-column">
                        <input ref={titleRef} type="text" placeholder="Title" className={`${styles['input']} form-control m-1`}></input>
                        <input ref={dateRef} type="date" placeholder="Date" className={`${styles['input']} form-control m-1`}></input>
                        <textarea className={`${styles['input']} form-control m-1`} id="text" ref={descriptionRef} name="description" placeholder="Take a note..." rows={3}></textarea>
                        <div className={`align-self-center`}>
                            <div className='d-flex align-items-center'>
                                <AddBoxIcon
                                    sx={{
                                        height: "60px", width: "60px", transitionProperty: "cursor transform", transition: '200ms ease-in-out',
                                        '&:hover': {
                                            cursor : "pointer",
                                            transform: 'scale(1.09)',
                                        },
                                    }}
                                    onClick={submitHandler}
                                />
                            </div>
                        </div>
                    </form>
                </Box>
            </div>
        </>
    )
}

export default TaskForm
