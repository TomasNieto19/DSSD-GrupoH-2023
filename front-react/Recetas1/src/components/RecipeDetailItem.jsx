import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, TextField, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import Loader from './Loader';
import { Edit, Save } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { editRecipeThunk } from '../store/receta/thunks';
import { useNavigate } from 'react-router-dom';

const RecipeDetailItem = ({recipe}) => {

  const [edit, setEdit] = useState(true);
  const {recipeDetail} = useSelector(state=> state.recipe)
  const [titulo, setTitulo] = useState();
    const [descripcion, setDescripcion] = useState();
    const [ingredientes, setIngredientes] = useState();
    const [categoria, setCategoria] = useState();
    const [pasos, setPasos] = useState();
    const [tiempo, setTiempo] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [disabledEdit, setDisabledEdit] = useState(false);

  useEffect(() => {
    if(recipe !== null || recipe !== undefined){
    setTitulo(recipe.title)
    setDescripcion(recipe.description)
    setIngredientes(recipe.ingredients)
    setCategoria(recipe.category)
    setPasos(recipe.steps)
    setTiempo(recipe.preparationTime)
    if(recipe.user && recipe.user.userId !== 1){
      setDisabledEdit(true);
    }
    }
    

  }, [recipe])
  

  const toEditRecipe = () =>{

    dispatch(editRecipeThunk(recipe.idRecipe, titulo, descripcion, ingredientes, categoria, pasos, tiempo));
    setEdit(true);
  }

  return (
    (recipe.user !== undefined && recipe.user !== null) && edit ? <Card sx={{ minWidth: 700, maxWidth: 700}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {recipe.user.nombre ? (recipe.user.nombre).charAt(0) : "U"}
          </Avatar>
        }
        title={recipe.title}
        subheader={`${recipe.user.nombre ? "por "+ recipe.user.nombre : ""}`}
        action={
          <IconButton aria-label='Editar' disabled={disabledEdit} onClick={()=>setEdit(!edit)}>
            <Edit/>
          </IconButton>
        }
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
        <Typography variant="body2" color="text.secondary" fontWeight="bold">
          Ingredientes: {recipe.ingredients}
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
      
    </Card>: (recipe.user !== undefined && recipe.user !== null ) ? <Card sx={{ minWidth: 700, maxWidth: 700}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {recipe.user.nombre ? (recipe.user.nombre).charAt(0) : "U"}
          </Avatar>
        }
        title={recipe.title}
        subheader={`${recipe.user.nombre ? "por "+ recipe.user.nombre : ""}`}
        action={
          <IconButton aria-label='Editar' onClick={()=>setEdit(!edit)}>
            <Edit/>
          </IconButton>
        }
      />
      <CardContent>
      <TextField defaultValue={recipe.title} multiline sx={{width: "100%"}} id="outlined-basic" label="Titulo" variant="outlined" onChange={({target})=>setTitulo(target.value)}/>
      </CardContent>
      <CardContent>
      <TextField defaultValue={recipe.description} multiline sx={{width: "100%"}} id="outlined-basic" label="Descripcion" variant="outlined" onChange={({target})=>setDescripcion(target.value)}/>
      </CardContent>
      <CardContent>
      <TextField defaultValue={recipe.category}  sx={{width: "100%"}} id="outlined-basic" label="Categoria" variant="outlined" onChange={({target})=>setCategoria(target.value)}/>
      </CardContent>
      <CardContent>
      <TextField defaultValue={recipe.preparationTime} sx={{width: "100%"}} id="outlined-basic" label="Tiempo de preparacion" variant="outlined" onChange={({target})=>setTiempo(target.value)}/>
      </CardContent>
      <CardContent>
      <TextField defaultValue={recipe.ingredients} sx={{width: "100%"}} id="outlined-basic" label="Ingredientes" variant="outlined" onChange={({target})=>setIngredientes(target.value)}/>
      </CardContent>
      
      <CardContent>
          <Typography paragraph>Pasos:</Typography>
          <TextField defaultValue={recipe.steps}  multiline sx={{width: "100%"}} id="outlined-basic" label="Pasos" variant="outlined" onChange={({target})=>setPasos(target.value)}/>
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "end"}}>
        <IconButton aria-label="Guardar cambios" onClick={()=>toEditRecipe()}>
          <Save />
        </IconButton>
        <IconButton aria-label="Agregar a favoritos">
          <FavoriteIcon />
        </IconButton>
        
        
      </CardActions>
      
    </Card> :<Loader/> 
  )
}

export default RecipeDetailItem