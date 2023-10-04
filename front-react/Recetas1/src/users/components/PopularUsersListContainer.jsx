import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularUsers } from '../../store/popularUsers/popularUsersThunk';
import { Container, Typography } from '@mui/material';
import UsersList from './UsersList';
import Loader from '../../utils/components/Loader';

const PopularUsersListContainer = () => {

    const dispatch = useDispatch();
    const {popularUsers, isLoading} = useSelector(state=>state.popularUsers);
    const {user} = useSelector(state=>state.auth)
    let filter = popularUsers.filter(userFilter => userFilter.idUser !== user.userId)

    useEffect(() => {
      
        dispatch(getPopularUsers());

    }, [])
    

  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 5}} >
        <Typography variant='h3'>Popular Users</Typography>
    {isLoading ? <Loader/> : <UsersList users={filter} type={"popularUsers"}/>}
    </Container>
  )
}

export default PopularUsersListContainer