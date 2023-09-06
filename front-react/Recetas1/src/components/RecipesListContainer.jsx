import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../store/receta/thunks';
import { Container } from '@mui/material';
import { RecipesList } from './RecipesList';
import Loader from './Loader';

const RecipesListContainer = () => {

    const dispatch = useDispatch();
  const {isLoading, recipes}= useSelector(state=> state.recipe);
    console.log(recipes);
  

  useEffect(() => {
    dispatch(getRecipes());
  }, [])

  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 10}} >

        {isLoading && <Loader/>}
        <RecipesList recipes={recipes}/>
        </Container>
    
  )
}

export default RecipesListContainer