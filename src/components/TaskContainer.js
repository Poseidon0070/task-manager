import React, { useEffect, useState } from 'react';
import TaskBox from './TaskBox';
import styles from './TaskContainer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd'
import { taskAction } from '../store/store';

function TaskContainer() {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);
    const [boxesPerRow, setBoxesPerRow] = useState(Math.floor(window.innerWidth / 400));

    const dragHandler = async(result, sourceIndex, destinationIndex) => {
        // console.log(result, sourceIndex, destinationIndex)
        dispatch(taskAction.setLoading(true))
        try{
            const sourceId = tasks[sourceIndex]._id
            const destinationId = tasks[destinationIndex]._id
            const response = await fetch('http://localhost:8080/reorderTask', {
                method:"POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({ 
                    sourceId : sourceId,
                    destinationId : destinationId
                })
            })
            if(response.ok){
                dispatch(taskAction.reorder({
                    sourceIndex: sourceIndex,
                    destinationIndex: destinationIndex
                }))
            }
        }catch(err){
            console.log(err)
            throw err 
        }finally{
            dispatch(taskAction.setLoading(false))
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setBoxesPerRow(Math.floor(window.innerWidth / 400));
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    return (
        <div className='mx-5 mt-3'>
            {tasks.length === 0 && <h5 className='text-center mt-5'>No task added</h5>}
            {tasks.length > 0 && (
                <GridContextProvider onChange={dragHandler}>
                    <GridDropZone
                        id='DROPZONE'
                        boxesPerRow={boxesPerRow}
                        rowHeight={180}
                        style={{ height: '200vh', display: "flex" }}
                    >
                        {tasks.map((task, index) => (
                            <GridItem key={task._id} style={{ justifySelf: "center" }}>
                                <TaskBox
                                    key={task._id}
                                    _id={task._id}
                                    title={task.title}
                                    date={task.date}
                                    description={task.description}
                                    complete={task.complete}
                                />
                            </GridItem>
                        ))}
                    </GridDropZone>
                </GridContextProvider>
            )}
        </div>
    );
}

export default TaskContainer;
