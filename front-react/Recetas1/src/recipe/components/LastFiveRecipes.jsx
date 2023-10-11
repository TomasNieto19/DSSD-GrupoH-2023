import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setLastFiveRecipesThunk } from '../../store/receta/thunksRecipe';
import { Container, Typography } from '@mui/material';
import Loader from '../../utils/components/Loader';
import RecipeNotFound from './RecipeNotFound';
import { RecipesList } from './RecipesList';

const LastFiveRecipes = () => {
  const { lastFiveRecipes, isLoadingFive } = useSelector(state => state.recipe);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setLastFiveRecipesThunk());
  }, [])
  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 5}} >
        <Typography variant='h3'>Last five recipes</Typography>
        {isLoadingFive ? <Loader/> : lastFiveRecipes && lastFiveRecipes.length !== 0 ? <RecipesList recipes={lastFiveRecipes} type={"lastFiveRecipes"}/> : <RecipeNotFound/>}
    </Container>
  )
}

export default LastFiveRecipes