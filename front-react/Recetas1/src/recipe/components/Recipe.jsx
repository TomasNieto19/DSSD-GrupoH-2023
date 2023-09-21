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
import { useDispatch, useSelector } from 'react-redux';
import { favRecipeThunk } from '../../store/receta/thunksRecipe';

export default function Recipe({ recipe }) {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user}= useSelector(state=> state.auth);
  let hr = 0;
  let min = 0;
  if (recipe) {
    hr = recipe.preparationTime > 60 ? Math.round(recipe.preparationTime / 60) : 0;
    min = recipe.preparationTime - (hr * 60);
  }
  const toRecipeDetalle = (id) => {


    navigate(`/recipe/${id}`);

  }

  const toFavRecipe = (id, recipe) =>{

    dispatch(favRecipeThunk(id, recipe));

  }

  return (
    <Card sx={{ maxWidth: 350, backgroundColor: "#223344" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#2D4356" }} aria-label="recipe">
            {recipe.user.username ? (recipe.user.username).charAt(0) : "U"}
          </Avatar>
        }
        titleTypographyProps={{color: "#a8add3"}}
        title={recipe.title}
        subheaderTypographyProps={{color: "#a8add3"}}
        subheader={`${recipe.user.username? "por " + recipe.user.username : ""}`}
      />

      <CardContent>
        <Typography variant="body2" color="#a8add3">
          {recipe.description}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="#a8add3" fontWeight="bold">
          Categoria: {recipe.category}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="#a8add3" fontWeight="bold">
          Tiempo de preparación: {hr == 0 ? "" : hr + "hr."} {min + "min"}.
        </Typography>
      </CardContent>

      <CardContent>
        <Typography paragraph color={"#a8add3"}>Pasos:</Typography>
        <Typography paragraph color={"#a8add3"}>
          {recipe.steps}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between", paddingRight: 1, paddingLeft: 1}}>
      <Button sx={{textTransform: 'lowercase'}} onClick={()=>toRecipeDetalle(recipe.idRecipe)}><Typography>
          Ver detalle
        </Typography>
        </Button>
        {recipe.fav ? <IconButton aria-label="Agregar a favoritos" onClick={()=>toFavRecipe(user.userId, recipe)}>
          <FavoriteIcon sx={{color: "#8b9dad"}}/>
        </IconButton> : <IconButton aria-label="Agregar a favoritos" onClick={()=>toFavRecipe(user.userId, recipe)}>
          <FavoriteIcon sx={{color: "#0b1218"}}/>
        </IconButton>}
        
      </CardActions>

    </Card>
  );
}