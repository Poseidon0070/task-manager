import './App.css';
import { createTheme, ThemeProvider } from '@mui/material'
import TaskForm from './components/TaskForm'
import Header from './components/Header'
import TaskContainer from './components/TaskContainer';
import { Provider } from 'react-redux';
import store from './store/store'

function App() {
  const theme = createTheme()

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
          <Header />
          <TaskForm />
          <TaskContainer/>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
