import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipesByUserId } from '../store/receta/thunks';
import { RecipesList } from './RecipesList';
import Loader from './Loader';
import { Container } from '@mui/material';

const MyRecipesContainer = () => {

    const dispatch = useDispatch();
    const {isLoading, recipes}= useSelector(state=> state.recipe);

    useEffect(() => {
      
        dispatch(getRecipesByUserId(1));

    }, [])
    

  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 10}} >
        {isLoading && <Loader/>}
    <RecipesList recipes={recipes}/>
    </Container>
  )
}

export default MyRecipesContainer