import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularUsers } from '../../store/popularUsers/popularUsersThunk';
import { Container, Typography } from '@mui/material';

const PopularRecipesListContainer = () => {

    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth)
    //let filter = popularUsers.filter(userFilter => userFilter.idUser !== user.userId)

    useEffect(() => {
      
        console.log("hola")

    }, [])
    

  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 5}} >
        <Typography variant='h3'>Popular Recipes</Typography>
    </Container>
  )
}

export default PopularRecipesListContainer