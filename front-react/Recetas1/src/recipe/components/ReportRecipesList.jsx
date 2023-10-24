import React from 'react'
import ReportRecipe from './ReportRecipe'
import { Grid } from '@mui/material'

const ReportRecipesList = ({recipesReported}) => {

  return (
    <Grid container padding={10}>
      {recipesReported.map(recipe=>{

        return <Grid xs={12} md={4} padding={3} key={recipe.idRecipe} item={true}><ReportRecipe key={recipe.idRecipe} recipe={recipe}/></Grid>

      })}
    </Grid>
  )
}

export default ReportRecipesList