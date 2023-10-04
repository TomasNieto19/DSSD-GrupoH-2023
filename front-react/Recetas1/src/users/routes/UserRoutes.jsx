import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UsersListContainer from '../components/UsersListContainer'
import PopularUsersListContainer from '../components/PopularUsersListContainer'

export const UserRoutes = () => {
  return (
    <Routes>
    <Route path='/users' element={<UsersListContainer/>}/>
    <Route path='/popularUsers' element={<PopularUsersListContainer/>}/>
    </Routes>
  )
}
