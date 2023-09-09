import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { PrivateRoute } from './PrivateRoute'
import { RecipeRoutes } from '../recipe/routes/RecipeRoutes'
import Login from '../auth/components/Login'
import { PublicRoute } from './PublicRoute'
import Register from '../auth/components/Register'
import { UserRoutes } from '../users/routes/UserRoutes'

export const AppRouter = () => {
  return (
    <>

        
        <Routes>

        
            <Route path="/login/*" element={
                <PublicRoute>
                  
                      <Login/>
                  
                </PublicRoute>
              }
            />
            <Route path="/register/*" element={
                <PublicRoute>
                  <Register/>
                </PublicRoute>
              }
            />

            <Route path={"/*"} element={
                <PrivateRoute>
                    <RecipeRoutes/>
                    <UserRoutes/>
                </PrivateRoute>
            }/>

        </Routes>
    </>
  )
}
