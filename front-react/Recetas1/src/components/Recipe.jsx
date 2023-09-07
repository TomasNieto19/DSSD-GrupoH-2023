import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Recipe({recipe}) {

    console.log(recipe);
    const navigate = useNavigate();

  const toRecipeDetalle = (id) =>{


    navigate(`/recipe/${id}`);

  }


  return (
    <Card sx={{ maxWidth: 350}} onClick={()=>toRecipeDetalle(recipe.idRecipe)}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {recipe.user.nombre ? (recipe.user.nombre).charAt(0) : "U"}
          </Avatar>
        }
        title={recipe.title}
        subheader={`${recipe.user.nombre ? "por "+ recipe.user.nombre : ""}`}
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {recipe.description}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary" fontWeight="bold">
          Categoria: {recipe.category}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="text.secondary" fontWeight="bold">
          Tiempo de preparación: {recipe.preparationTime}min.
        </Typography>
      </CardContent>
      
      <CardContent>
          <Typography paragraph>Pasos:</Typography>
          <Typography paragraph>
                {recipe.steps}
          </Typography>  
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "end"}}>
        <IconButton aria-label="Agregar a favoritos">
          <FavoriteIcon />
        </IconButton>
        
      </CardActions>
      
    </Card>
  );
}