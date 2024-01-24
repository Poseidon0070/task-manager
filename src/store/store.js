import {createSlice, configureStore} from '@reduxjs/toolkit'

let taskSlice = createSlice({
    name : 'Task',
    initialState : {
        tasks : []
    },
    reducers : {

        addTask : (state, action) => {
            let newTask = {
                title : action.payload.title,
                date : action.payload.date,
                description : action.payload.description
            }
            state.tasks.push(newTask)
            console.log(state.tasks[0])
        }

    }
})

const store = configureStore({
    reducer : taskSlice.reducer
})

export const taskAction = taskSlice.actions
export default store