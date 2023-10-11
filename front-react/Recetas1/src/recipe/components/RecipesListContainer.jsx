import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../store/receta/thunksRecipe';
import { Container, Typography} from '@mui/material';
import { RecipesList } from './RecipesList';
import Loader from '../../utils/components/Loader';
import { getUsers } from '../../store/user/thunksUser';
import LastFiveRecipes from './LastFiveRecipes';

const RecipesListContainer = () => {

    const dispatch = useDispatch();
  const {isLoading, recipes}= useSelector(state=> state.recipe);
  
  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getUsers());
  }, [])

  return (
    <Container sx={{minWidth:'80%', minHeight: '100%'}} >
        <LastFiveRecipes/>
        <Typography variant='h3'>Recipes</Typography>
        {isLoading ? <Loader/> : <RecipesList recipes={recipes}/>}
        
        </Container>
    
  )
}

export default RecipesListContainer