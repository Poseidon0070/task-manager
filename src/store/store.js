import { createSlice, configureStore } from '@reduxjs/toolkit'

let taskSlice = createSlice({
    name: 'Task',
    initialState: {
        tasks: [],
        loading : false,
        filter : "All"
    },

    reducers: { 

        add: (state, action) => {
            const newTask = action.payload
            console.log(newTask)
            state.tasks.push(newTask)
        },

        set: (state, action) => {
            state.tasks = action.payload 
            console.log("tasks : ", state.tasks)
        },

        delete : (state, action) => {
            let requiredId = action.payload
            let requiredIndex = state.tasks.findIndex(task => task._id === requiredId)
            state.tasks.splice(requiredIndex,1)
        },

        setLoading : (state, action) => {
            state.loading = action.payload
        },

        setFilter : (state, action) => {
            state.filter = action.payload
        },

        reorder : (state, action) => {
            const sourceIndex = action.payload.sourceIndex;
            const destinationIndex = action.payload.destinationIndex;
            let modifiedTasks = state.tasks
            let [removedTask] = modifiedTasks.splice(sourceIndex, 1)
            modifiedTasks.splice(destinationIndex, 0, removedTask)
            state.tasks = modifiedTasks 
        },

        check : (state, action) => {
            const taskId = action.payload.taskId
            const isCheck = action.payload.isCheck
            const taskIndex = state.tasks.findIndex(task => task._id.toString() === taskId)
            state.tasks[taskIndex].complete = isCheck ? "1" : "0"
        }

    }
})


const store = configureStore({
    reducer: taskSlice.reducer
})


export const taskAction = taskSlice.actions
export default store