import React from 'react'
import TaskBox from './TaskBox'
import styles from './TaskContainer.module.css'
import { UseSelector, useSelector } from 'react-redux'

function TaskContainer() {
    let tasks = useSelector(state => state.tasks)
    return (
        <div className={styles['task-container']}>
            {
                tasks.map(task => {
                    return <TaskBox
                        title={task.title}
                        date={task.date}
                        description={task.description} />
                })
            }
        </div>
    )
}

export default TaskContainer
