import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../store/user/thunksUser';
import UsersList from './UsersList';
import { Container, Typography } from '@mui/material';

const UsersListContainer = () => {

    const dispatch = useDispatch();
    const {users} = useSelector(state=>state.user);

    useEffect(() => {
        
        dispatch(getUsers());

    }, [])
    
    
  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 5}} >
        <Typography variant='h3'>Users</Typography>
    <UsersList users={users}/>
    </Container>
  )
}

export default UsersListContainer