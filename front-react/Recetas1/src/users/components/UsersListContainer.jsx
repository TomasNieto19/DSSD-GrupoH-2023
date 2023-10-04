import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../store/user/thunksUser';
import UsersList from './UsersList';
import { Container, Typography } from '@mui/material';

const UsersListContainer = () => {

    const dispatch = useDispatch();
    const {users} = useSelector(state=>state.user);
    const {user} = useSelector(state=>state.auth)
    let filter = users.filter(userFilter => userFilter.idUser !== user.userId)
    
  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 5}} >
        <Typography variant='h3'>Users</Typography>
    <UsersList users={filter} type={"users"}/>
    </Container>
  )
}

export default UsersListContainer