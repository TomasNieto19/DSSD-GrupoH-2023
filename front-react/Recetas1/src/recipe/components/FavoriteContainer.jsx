import React, { useEffect } from 'react'
import { RecipesList } from './RecipesList'
import { useDispatch, useSelector } from 'react-redux';
import { getFavRecipes } from '../../store/receta/thunksRecipe';
import RecipeNotFound from './RecipeNotFound';
import { Container, Typography } from '@mui/material';

const FavoriteContainer = () => {

  const dispatch = useDispatch();

  useEffect(() => {
      
    dispatch(getFavRecipes());

}, [])
    const {user: userLogged}= useSelector(state=>state.auth);


  return (
    <Container sx={{minWidth:'80%', minHeight: '100%', padding: 10}}>
      <Typography variant='h3'>My Favorite Recipes</Typography>
    {userLogged.favoriteRecipes !== undefined && userLogged.favoriteRecipes.length !== 0  ? <RecipesList recipes={userLogged.favoriteRecipes}/> : <RecipeNotFound/>}
    </Container>
  )
}

export default FavoriteContainer