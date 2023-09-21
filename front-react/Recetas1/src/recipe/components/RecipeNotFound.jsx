import { Typography } from '@mui/material'
import React from 'react'

const RecipeNotFound = () => {
  return (
    <Typography sx={{textAlign: "center", padding: 5, fontSize: 35}}>
        No se encontraron recetas.
    </Typography>
  )
}

export default RecipeNotFound