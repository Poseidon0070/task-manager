import './App.css';
import { createTheme, ThemeProvider } from '@mui/material'
import TaskForm from './components/TaskForm'
import Header from './components/Header'
import TaskContainer from './components/TaskContainer';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { getTask, sendTask } from './store/store'
import Root from './components/Root';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UseSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { taskAction } from './store/store'; 

let initial = true

function App() {
  const theme = createTheme()
  let dispatch = useDispatch()
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    let fetchData = async() => {
      dispatch(taskAction.setLoading(true))
      const data = await fetch('http://localhost:8080/getTask')
      const parsedData = await data.json()
      console.log(parsedData)
      dispatch(taskAction.set(parsedData))
      dispatch(taskAction.setLoading(false))
    }
    fetchData()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <TaskForm />
      {loading && <p className='text-center mt-5'>Loading...</p>}
      {!loading && 
          <TaskContainer />
      }
    </ThemeProvider>
  );
}

export default App;

// const routes = createBrowserRouter([{
//   path: '/',
//   element: <Root />,
//   children: [
//     { index: true, element: <TaskContainer /> },
//     { path: '/createTask', element: <TaskForm /> }
//   ]
// }])