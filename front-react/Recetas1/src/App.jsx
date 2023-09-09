import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store/store'
import {NavBar} from './utils/components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppRouter } from './router/AppRouter'


const App = () => {
  return (
    <Provider store={store}>
        <BrowserRouter>
      <NavBar />
      <AppRouter/>
      </BrowserRouter>
    </Provider>
  )
}

export default App