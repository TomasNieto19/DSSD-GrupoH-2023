import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children}) => {
    const { user } = useSelector(state=>state.auth);
    const { userId } = user;

    
  return (
    (user.userId !== 0)
        ? children
        : <Navigate to="/login" />
  )
}
