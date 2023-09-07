import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipesByUserId } from '../../store/receta/thunksRecipe';
import { RecipesList } from './RecipesList';
import Loader from '../utils/Loader';
import { Container, Typography } from '@mui/material';

const MyRecipesContainer = () => {

    const dispatch = useDispatch();
    const {isLoading, recipes}= useSelector(state=> state.recipe);
    const {user}= useSelector(state=> state.auth);
    useEffect(() => {
        
        dispatch(getRecipesByUserId(user.userId));

    }, [user])
    

  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 10}} >
      <Typography variant='h3'>My Recipes</Typography>
        {isLoading && <Loader/>}
    <RecipesList recipes={recipes}/>
    </Container>
  )
}

export default MyRecipesContainer