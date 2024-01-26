import './App.css';
import { Button, createTheme, ThemeProvider } from '@mui/material'
import TaskForm from './components/TaskForm'
import Header from './components/Header'
import TaskContainer from './components/TaskContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { taskAction } from './store/store';
import Modal from './components/Modal';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Filter from './components/Filter';

function App() {
  const theme = createTheme()
  let dispatch = useDispatch()
  const loading = useSelector(state => state.loading)
  let [open, setOpen] = useState(false);

  useEffect(() => {
    let fetchData = async () => {
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
      <div className='d-flex justify-content-center align-items-center mt-5'>
        <Button 
          color='error'
          variant="contained"
          onClick={() => setOpen(true)}
          endIcon={<EditNoteIcon />}
          sx={{height:"50px", mx:2}}>
          Add Task
        </Button>
        <Filter />
      </div>
      {open &&
        <Modal open={open} setOpen={setOpen}>
          <TaskForm />
        </Modal>}
      {loading && <p className='text-center mt-5'>Loading...</p>}
      {!loading &&
        <TaskContainer />
      }
    </ThemeProvider>
  );
}

export default App;

