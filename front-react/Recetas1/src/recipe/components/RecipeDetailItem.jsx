import { Avatar, Card, CardActions, CardContent, CardHeader, IconButton, TextField, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import Loader from '../../utils/components/Loader';
import { Edit, Save } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { editRecipeThunk } from '../../store/receta/thunksRecipe';
import { useNavigate } from 'react-router-dom';

const RecipeDetailItem = ({recipe}) => {
  let hr = 0;
  let min = 0;
  if (recipe) {
    console.log(recipe.preparationTime)
    hr = recipe.preparationTime > 60 ? Math.round(recipe.preparationTime / 60) : 0;
    min = recipe.preparationTime - (hr * 60);
  }
  const [edit, setEdit] = useState(true);
  const {recipeDetail} = useSelector(state=> state.recipe)
  const {user} = useSelector(state=> state.auth)
  const [titulo, setTitulo] = useState();
    const [descripcion, setDescripcion] = useState();
    const [ingredientes, setIngredientes] = useState();
    const [categoria, setCategoria] = useState();
    const [pasos, setPasos] = useState();
    const [tiempo, setTiempo] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [disabledEdit, setDisabledEdit] = useState();

  useEffect(() => {
    if(recipe !== null || recipe !== undefined){
    setTitulo(recipe.title)
    setDescripcion(recipe.description)
    setIngredientes(recipe.ingredients)
    setCategoria(recipe.category)
    setPasos(recipe.steps)
    setTiempo(recipe.preparationTime)
    if(recipe.user && recipe.user.userId !== user.userId){
      setDisabledEdit(true);
    }else{
      setDisabledEdit(false);
    }
    }
    

  }, [recipe])
  

  const toEditRecipe = () =>{

    dispatch(editRecipeThunk(recipe.idRecipe, titulo, descripcion, ingredientes, categoria, pasos, tiempo));
    setEdit(true);
  }

  return (
    (recipe.user !== undefined && recipe.user !== null) && edit ? <Card sx={{ minWidth: 700, maxWidth: 700, backgroundColor: "#223344"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#2D4356" }} aria-label="recipe">
            {recipe.user.username ? (recipe.user.username).charAt(0) : "U"}
          </Avatar>
        }
        title={recipe.title}
        subheaderTypographyProps={{color: "#a8add3"}}
        subheader={`${recipe.user.username ? "por "+ recipe.user.username : ""}`}
        titleTypographyProps={{color: "#a8add3"}}
        action={
          <IconButton aria-label='Editar' disabled={disabledEdit} onClick={()=>setEdit(!edit)}>
            {disabledEdit ? <Edit sx={{color: "#595b6d"}}/> : <Edit sx={{color: "#0b1218"}}/>}
          </IconButton>
        }
      />
      
      <CardContent>
        <Typography variant="body2" color="#a8add3" >
          {recipe.description}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="#a8add3" fontWeight="bold">
          Categoria: {recipe.category}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="#a8add3"fontWeight="bold">
        Tiempo de preparación: {hr == 0 ? "" : hr + "hr."} {min + "min"}.
        </Typography>
      </CardContent>
      <CardContent>
        <Typography variant="body2" color="#a8add3" fontWeight="bold">
          Ingredientes: {recipe.ingredients}
        </Typography>
      </CardContent>
      <CardContent>
          <Typography paragraph color="#a8add3">Pasos:</Typography>
          <Typography paragraph color="#a8add3">
                {recipe.steps}
          </Typography>  
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "end"}}>
        <IconButton aria-label="Agregar a favoritos">
          <FavoriteIcon sx={{color: "#0b1218"}}/>
        </IconButton>
        
      </CardActions>
      
    </Card>: (recipe.user !== undefined && recipe.user !== null ) ? <Card sx={{ minWidth: 700, maxWidth: 700, backgroundColor: "#223344"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#2D4356" }} aria-label="recipe">
            {recipe.user.username ? (recipe.user.username).charAt(0) : "U"}
          </Avatar>
        }
        title={recipe.title}
        titleTypographyProps={{color: "#a8add3"}}
        subheader={`${recipe.user.username ? "por "+ recipe.user.username : ""}`}
        subheaderTypographyProps={{color: "#a8add3"}}
        action={
          <IconButton aria-label='Editar' onClick={()=>setEdit(!edit)}>
            <Edit sx={{color: "#0b1218"}}/>
          </IconButton>
        }
      />
      <CardContent>
      <TextField defaultValue={recipe.title} multiline sx={{width: "100%"}} inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} id="outlined-basic" label="Titulo" variant="outlined" onChange={({target})=>setTitulo(target.value)}/>
      </CardContent>
      <CardContent>
      <TextField defaultValue={recipe.description} multiline sx={{width: "100%"}} inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} id="outlined-basic" label="Descripcion" variant="outlined" onChange={({target})=>setDescripcion(target.value)}/>
      </CardContent>
      <CardContent>
      <TextField defaultValue={recipe.category}  sx={{width: "100%"}} id="outlined-basic" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} label="Categoria" variant="outlined" onChange={({target})=>setCategoria(target.value)}/>
      </CardContent>
      <CardContent>
      <TextField defaultValue={recipe.preparationTime} sx={{width: "100%"}} id="outlined-basic" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} label="Tiempo de preparacion" variant="outlined" onChange={({target})=>setTiempo(target.value)}/>
      </CardContent>
      <CardContent>
      <TextField defaultValue={recipe.ingredients} sx={{width: "100%"}} id="outlined-basic" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} label="Ingredientes" variant="outlined" onChange={({target})=>setIngredientes(target.value)}/>
      </CardContent>
      
      <CardContent>
          <Typography paragraph color="#a8add3">Pasos:</Typography>
          <TextField defaultValue={recipe.steps}  multiline sx={{width: "100%"}} id="outlined-basic" label="Pasos" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} variant="outlined" onChange={({target})=>setPasos(target.value)}/>
        </CardContent>
        <CardActions sx={{display: "flex", justifyContent: "end"}}>
        <IconButton aria-label="Guardar cambios" onClick={()=>toEditRecipe()}>
          <Save sx={{color: "#0b1218"}}/>
        </IconButton>
        <IconButton aria-label="Agregar a favoritos">
          <FavoriteIcon sx={{color: "#0b1218"}}/>
        </IconButton>
        
        
      </CardActions>
      
    </Card> :<Loader/> 
  )
}

export default RecipeDetailItem