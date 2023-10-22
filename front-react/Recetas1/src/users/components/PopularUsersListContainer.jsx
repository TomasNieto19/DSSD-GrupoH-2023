import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography } from '@mui/material';
import UsersList from './UsersList';
import Loader from '../../utils/components/Loader';
import UsersNotFound from './UsersNotFound';
import { getPopularUsers } from '../../store/user/thunksUser';

const PopularUsersListContainer = () => {

    const dispatch = useDispatch();
    const {popularUsers, isLoading} = useSelector(state=>state.user);
    const {user} = useSelector(state=>state.auth)
    let filter = popularUsers.length !== 0 ? popularUsers.filter(userFilter => userFilter.idUser !== user.userId) : []

    useEffect(() => {
      
        dispatch(getPopularUsers());

    }, [])
    

  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 5}} >
        <Typography variant='h3'>Popular Users</Typography>
    {isLoading ? <Loader/> : popularUsers && filter.length !== 0 ? <UsersList users={filter} type={"popularUsers"}/> : <UsersNotFound/>}
    </Container>
  )
}

export default PopularUsersListContainer