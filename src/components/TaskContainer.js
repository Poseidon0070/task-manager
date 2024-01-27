import React, { useEffect, useState } from 'react';
import TaskBox from './TaskBox';
import styles from './TaskContainer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { GridContextProvider, GridDropZone, GridItem, swap } from 'react-grid-dnd'
import { taskAction } from '../store/store';

function TaskContainer() {
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter)
    const tasks = useSelector(state => state.tasks);
   //-----------------------------------------------------------------------------------------------------------------------------------------------------------
   let filteredTasks = tasks
   .filter((task) => {
     return (
       (task.complete.toString() === '0' && filter === 'Incomplete') ||
       (task.complete.toString() === '1' && filter === 'Complete') ||
       filter === 'All'
     );
   })
   .map((task, index) => (
     <GridItem key={task._id} style={{ justifySelf: 'center' }}>
       <TaskBox
         key={task._id}
         _id={task._id}
         title={task.title}
         date={task.date}
         description={task.description}
         complete={task.complete}
       />
     </GridItem>
   ));
 
    const [boxesPerRow, setBoxesPerRow] = useState(Math.floor(window.innerWidth / 400));
    const calculateHeight = () => {
      return Math.ceil(filteredTasks.length / boxesPerRow) * 180 + 20;
    };
    const dragHandler = async (result, sourceIndex, destinationIndex) => {
      
        try {
          if (
            sourceIndex >= 0 &&
            sourceIndex < filteredTasks.length &&
            destinationIndex >= 0 &&
            destinationIndex < filteredTasks.length
          ) {
            const sourceId = filteredTasks[sourceIndex]._id;
            const destinationId = filteredTasks[destinationIndex]._id;
      
            const response = await fetch('http://192.168.0.105:8080/reorderTask', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                sourceId: sourceId,
                destinationId: destinationId,
              }),
            });
      
            if (response.ok) {
              dispatch(taskAction.reorder({
                sourceIndex: sourceIndex,
                destinationIndex: destinationIndex,
              }));
            }
          }
        } catch (err) {
          console.log(err);
          throw err;
        } 
      };


      useEffect(() => {
        const handleResize = () => {
          const newBoxesPerRow = Math.floor(window.innerWidth / 400);
          setBoxesPerRow(newBoxesPerRow);
        };
      
        window.addEventListener('resize', handleResize);
      
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, [filteredTasks.length, boxesPerRow]);
    //   style={{border:"3px solid black"}}
    console.log(filter)
    return (
        <div className='mx-md-5 mx-2 mt-3'>
            {tasks.length === 0 && <h5 className='text-center mt-5'>No task added</h5>}
            {tasks.length > 0 && (
                <GridContextProvider onChange={dragHandler}>
                    <GridDropZone
                        id='DROPZONE'
                        boxesPerRow={boxesPerRow}
                        rowHeight={180}
                        style={{ height: `${calculateHeight()}px`, display: 'flex' }}
                    >
                        {filteredTasks.map((task) => task)}
                    </GridDropZone>
                </GridContextProvider>
            )}
        </div>
    );
}

export default TaskContainer;
