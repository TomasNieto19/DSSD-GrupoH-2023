import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography } from '@mui/material';
import { getPopularRecipes } from '../../store/popularRecipes/popularRecipesThunk';
import { RecipesList } from './RecipesList';

const PopularRecipesListContainer = () => {

    const dispatch = useDispatch();
    const {popularRecipes, isLoading} = useSelector(state=>state.popularRecipes);
    useEffect(() => {
      
      dispatch(getPopularRecipes());

    }, [])
    

  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 5}} >
        <Typography variant='h3'>Popular Recipes</Typography>
        {isLoading ? <Loader/> : <RecipesList recipes={popularRecipes} type={"popularRecipes"}/>}
    </Container>
  )
}

export default PopularRecipesListContainer