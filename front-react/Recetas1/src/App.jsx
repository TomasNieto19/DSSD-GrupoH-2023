import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import {NavBar} from './utils/components/NavBar'
import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'
import { ToastContainer } from 'react-toastify';

  import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer/>
        <BrowserRouter>
      <NavBar />
      <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}

export default App