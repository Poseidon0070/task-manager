import { createSlice, configureStore } from '@reduxjs/toolkit'

let taskSlice = createSlice({
    name: 'Task',
    initialState: {
        tasks: [],
        loading : false
    },
    reducers: { 

        add: (state, action) => {
            const newTask = action.payload
            state.tasks.push(newTask)
        },

        set: (state, action) => {
            state.tasks = action.payload 
            console.log("tasks : ", state.tasks)
        },

        setLoading : (state, action) => {
            state.loading = action.payload
        }

    }
})

// const addTask = (newTask) => {
//     return async (dispatch) => {
//         dispatch(taskSlice.actions.setLoading(true))
//         dispatch(taskSlice.actions.add(newTask))
//         await fetch('http://localhost:8080/addTask', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newTask),
//         })
//         dispatch(taskSlice.actions.setLoading(false))
//     }
// } 

// const sendTask = (newTask) => {
//     return async (dispatch) => {
//         dispatch(taskSlice.actions.setLoading(true))
//         const res = await fetch('http://localhost:8080/sendTask', {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(newTask),
//         })
//         if(!res.ok){
//             throw new Error("Failed to add task!");
//         }
//         dispatch(taskSlice.actions.setLoading(false))
//     }
// } 

// const getTask = () => {
//     return async (dispatch) => {
//         dispatch(taskSlice.actions.setLoading(true))
//         const data = await fetch('http://localhost:8080/getTask')
//         const parsedData = await data.json()
//         dispatch(taskSlice.actions.set(parsedData))
//         dispatch(taskSlice.actions.setLoading(false))
//     }
// }

const removeItem = (id) => {
    return async (dispatch) => {
        console.log("hii")
    }
}

const store = configureStore({
    reducer: taskSlice.reducer
})

// export { addTask, getTask, removeItem }

export const taskAction = taskSlice.actions
export default store