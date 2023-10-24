import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteRecipeThunk, ignoreReportThunk } from '../../store/receta/thunksRecipe';

const ReportRecipe = ({recipe}) => {

    const dispatch = useDispatch();

    const ignoreReport = () =>{

        dispatch(ignoreReportThunk(recipe.idReport))

    }

    const deleteRecipe = () =>{

        dispatch(deleteRecipeThunk(recipe.idRecipe))

    }

  return (
    <Card sx={{ maxWidth: 350, backgroundColor: "#223344" }}>
        <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#2D4356" }} aria-label="recipe">
            {recipe.username ? (recipe.username).charAt(0) : "U"}
          </Avatar>
        }
        titleTypographyProps={{ color: "#a8add3" }}
        title={recipe.title}
        subheaderTypographyProps={{ color: "#a8add3" }}
        subheader={`${recipe.username ? "por " + recipe.username : ""}`}
      />
      <CardContent>
          <Typography variant="body2" color="#a8add3">
            {recipe.description}
          </Typography>
          
        </CardContent>
        <CardContent>
        <Typography variant="body2" color="red">
            RAZON DE REPORTE: {recipe.reason}
          </Typography>
          </CardContent>
          <CardActions sx={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>

            <Button onClick={()=>ignoreReport()} sx={{color: "yellow"}}>IGNORAR</Button>
            <Button onClick={()=>deleteRecipe()} color='error'>ELIMINAR</Button>
          </CardActions>
    </Card>
  )
}

export default ReportRecipe