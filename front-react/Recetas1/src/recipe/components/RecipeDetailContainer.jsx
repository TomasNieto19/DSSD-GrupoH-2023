import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getRecipeByRecipeId } from '../../store/receta/thunksRecipe';
import { Box, Container } from '@mui/material';
import RecipeDetailItem from './RecipeDetailItem';

const RecipeDetail = () => {

  const {id} = useParams();
  const dispatch = useDispatch();
  const {recipeDetail} = useSelector(state=> state.recipe);

  useEffect(() => {
    
    dispatch(getRecipeByRecipeId(id));


  }, [])
  console.log(recipeDetail);

  return (
    <Box display="flex"
    justifyContent="center"
    alignItems="center"
    padding={10}
    minWidth="100vh">
      <RecipeDetailItem recipe={recipeDetail}/>
    </Box>
  )
}

export default RecipeDetail