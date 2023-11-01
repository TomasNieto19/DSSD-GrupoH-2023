import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipesReportedThunk } from '../../store/receta/thunksRecipe';
import ReportRecipesList from './ReportRecipesList';
import { Container } from '@mui/material';
import Loader from '../../utils/components/Loader';

const ReportRecipesContainer = () => {

  const dispatch = useDispatch();
  const {recipesReported, recipes, isLoadingReports} = useSelector(state=> state.recipe);
  console.log(recipesReported);
  let recetasData = recipes.map(recipeCompleta =>{

    let recipeFind = recipesReported.find(recipe=> recipe.id_recipe === recipeCompleta.idRecipe);
    if(recipeFind){

      return {

        idRecipe: recipeFind.id_recipe,
        reason: recipeFind.reason,
        title: recipeCompleta.title,
        description: recipeCompleta.description,
        userCreator: recipeCompleta.user.username,
        idReport: recipeFind.id_report

      }

    }

  }).filter(recipe=> recipe!==undefined)

  useEffect(() => {
    
    dispatch(getRecipesReportedThunk());

  }, [])
  
  return (
    <Container sx={{minWidth:'80%', minHeight: '100%'}} >
     {isLoadingReports ? <Loader/> : <ReportRecipesList recipesReported={recetasData}/>} 
    </Container>
  )
}

export default ReportRecipesContainer