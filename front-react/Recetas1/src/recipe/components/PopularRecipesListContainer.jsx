import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography } from '@mui/material';
import { RecipesList } from './RecipesList';
import RecipeNotFound from './RecipeNotFound';
import { getPopularRecipes } from '../../store/receta/thunksRecipe';
import Loader from '../../utils/components/Loader';

const PopularRecipesListContainer = () => {

    const dispatch = useDispatch();
    const {popularRecipes, isLoading} = useSelector(state=>state.recipe);
    useEffect(() => {
      
      dispatch(getPopularRecipes());

    }, [])
    

  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 5}} >
        <Typography variant='h3'>Popular Recipes</Typography>
        {isLoading ? <Loader/> : popularRecipes && popularRecipes.length !== 0 ? <RecipesList recipes={popularRecipes} type={"popularRecipes"}/> : <RecipeNotFound/>}
    </Container>
  )
}

export default PopularRecipesListContainer