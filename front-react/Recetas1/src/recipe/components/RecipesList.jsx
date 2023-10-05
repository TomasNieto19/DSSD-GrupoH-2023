import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes } from '../../store/receta/thunksRecipe';
import Recipe from './Recipe';
import { Box, Container, Grid } from '@mui/material';

export const RecipesList = ({recipes, type}) => {

  return (
    
      <Grid container padding={10}>
      {recipes.map((recipe)=>{
        console.log("LA RECIPE",recipe)
        return <Grid xs={12} md={4} padding={3} key={recipe.idRecipe} item={true}><Recipe recipe={recipe} type={type} key={recipe.idRecipe}/></Grid>

      })}
      </Grid>
   
  )
}
