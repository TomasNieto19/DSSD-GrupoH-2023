import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../store/receta/thunksRecipe';
import { Container} from '@mui/material';
import { RecipesList } from './RecipesList';
import Loader from '../../utils/components/Loader';
import { getUsers } from '../../store/user/thunksUser';

const RecipesListContainer = () => {

    const dispatch = useDispatch();
  const {isLoading, recipes}= useSelector(state=> state.recipe);
  
  useEffect(() => {
    dispatch(getRecipes());
    dispatch(getUsers());
  }, [])
  console.log(recipes);
  return (
    <Container sx={{minWidth:'80%', minHeight: '100%'}} >
      
        {isLoading ? <Loader/> : <RecipesList recipes={recipes}/>}
        
        </Container>
    
  )
}

export default RecipesListContainer