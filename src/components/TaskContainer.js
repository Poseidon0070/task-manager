import React from 'react';
import TaskBox from './TaskBox';
import styles from './TaskContainer.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { taskAction } from '../store/store';

function TaskContainer() {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks);

    // Implement a simple handleDragEnd function
    const handleDragEnd = result => {
        if (!result.destination) return; // Drop outside the list
        const sourceIndex = result.source.index;
        const destinationIndex = result.destination.index;

        // Dispatch action to update the task order in the Redux state
        dispatch(taskAction.reorder({ sourceIndex, destinationIndex }));
    };

    return (
        <>
            {tasks.length === 0 && <h5 className='text-center mt-5'>No task added</h5>}
            {tasks.length > 0 && (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId='ROOT' type='group'>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className={styles['task-container']}>
                                {tasks.map((task, index) => (
                                    <Draggable key={task._id} draggableId={task._id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <TaskBox
                                                    _id={task._id}
                                                    key={task._id}
                                                    title={task.title}
                                                    date={task.date}
                                                    description={task.description}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext> 
            )}
        </>
    );
}

export default TaskContainer;
