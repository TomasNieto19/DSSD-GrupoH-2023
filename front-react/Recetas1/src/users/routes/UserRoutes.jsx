import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UsersListContainer from '../components/UsersListContainer'

export const UserRoutes = () => {
  return (
    <Routes>
    <Route path='/users' element={<UsersListContainer/>}/>
    </Routes>
  )
}
