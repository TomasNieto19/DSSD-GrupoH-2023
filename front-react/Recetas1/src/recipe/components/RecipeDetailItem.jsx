import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Container, IconButton, ImageList, ImageListItem, InputAdornment, Rating, TextField, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import Loader from '../../utils/components/Loader';
import { Add, DeleteOutline, Edit, House, Save, Send } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { editRecipeThunk, favRecipeThunk, setCommentsThunk, setScoreInRecipe, setScoreThunk } from '../../store/receta/thunksRecipe';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { addCommentToList } from '../../store/receta/recipeSlice';
import { kafkaApi } from '../../api/api';

const RecipeDetailItem = ({ recipe }) => {
  let hr = 0;
  let min = 0;
  if (recipe) {

    hr = recipe.preparationTime > 60 ? Math.round(recipe.preparationTime / 60) : 0;
    min = recipe.preparationTime - (hr * 60);
  }
  console.log(recipe);
  const [commentary, setCommentary] = useState();
  const [value, setValue] = useState(recipe.averageScore);
  const [edit, setEdit] = useState(true);
  const {users} = useSelector(state=>state.user);
  const { isLoading,recipeDetail } = useSelector(state => state.recipe)
  const { user } = useSelector(state => state.auth)
  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [ingredientes, setIngredientes] = useState();
  const [categoria, setCategoria] = useState();
  const [pasos, setPasos] = useState();
  const [tiempo, setTiempo] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [disabledEdit, setDisabledEdit] = useState();
  const [photos, setPhotos] = useState([]);
  const [images, setImages] = useState([]);
  const [disabledVote, setDisabledVote] = useState(false);
  const [image, setImage] = useState();

  const toFavRecipe = (id, recipe) =>{

    dispatch(favRecipeThunk(id, recipe));

  }

  useEffect(() => {
    verify(user.userId, recipe.idRecipe);
    setImages([]);
    setImage(undefined);
    if (recipe !== null || recipe !== undefined) {
      setTitulo(recipe.title)
      setDescripcion(recipe.description)
      setIngredientes(recipe.ingredients)
      setCategoria(recipe.category)
      setPasos(recipe.steps)
      setTiempo(recipe.preparationTime)
      if (recipe.user && recipe.user.userId !== user.userId) {
        setDisabledEdit(true);
      } else {
        setDisabledEdit(false);
      }
    }
    setPhotos(recipe.photos)

  }, [recipe])

  const deleteImg = (photo) =>{

    let arrayFilter = photos.filter((photoF)=> photoF.url !== photo.url);
    setPhotos(arrayFilter);
  }

  const verify = async(idUser, recipeId) =>{

    const {data, status} = await kafkaApi.get(`/kafka/getVoteNotVote/${idUser}/${recipeId}`)
    const {vote} = data;
    setDisabledVote(vote);

  }

  const toEditRecipe = () => {
    if((photos.length >=2 && images.length >= 2) || (images.length + photos.length >=2)){
    dispatch(editRecipeThunk(recipe, titulo, descripcion, ingredientes, categoria, pasos, tiempo, photos, images));
    setEdit(true);
    }else{

      toast("Debe ingresar un minimo de 2 fotos");

    }
  }

  const onChangeFile = event => {
    var file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {

      setImage({
        file: event.target.files[0],
        url: reader.result
      });

    }

  }

  const onAddImage = () => {
    if(image !== undefined && image !== null){

      if((photos.length >=5 && images.length >= 5) || (images.length + photos.length >=5)){

        setImage(undefined);
        toast("El limite es 5");

      }else{

        setImages([...images, image]);
        setImage(undefined);

      }
      

    }
    


  }
  const onDeleteImage = (url) =>{

    let arrayFilter = images.filter((photoF)=> photoF.url !== url);
    setImages(arrayFilter);

  }

  const addCommentary = () =>{

    dispatch(setCommentsThunk(user.userId, recipe,commentary));
    setCommentary(' ');
  }
  
  const toVote = (value) =>{
    dispatch(setScoreThunk(user.userId, recipe.idRecipe, value));
    setValue(value);
    setDisabledVote(true);
    

      dispatch(setScoreInRecipe(recipe.idRecipe));

    
    

  }

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCommentary();
    }
  };


  return (
    
(recipe.user !== undefined && recipe.user !== null) && edit ? <Card sx={{ minWidth: 700, maxWidth: 700, backgroundColor: "#223344" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#2D4356" }} aria-label="recipe">
            {recipe.user.username ? (recipe.user.username).charAt(0) : "U"}
          </Avatar>
        }
        title={recipe.title}
        subheaderTypographyProps={{ color: "#a8add3" }}
        subheader={`${recipe.user.username ? "por " + recipe.user.username : ""}`}
        titleTypographyProps={{ color: "#a8add3" }}
        action={
          <IconButton aria-label='Editar' disabled={disabledEdit} onClick={() => setEdit(!edit)}>
            {disabledEdit ? <Edit sx={{ color: "#595b6d" }} /> : <Edit sx={{ color: "#0b1218" }} />}
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
        <Typography variant="body2" color="#a8add3" fontWeight="bold">
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
      {<CardContent sx={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        {!disabledVote && disabledEdit && <Rating
        value={value}
        defaultValue={0}
        onChange={(event, newValue) => {
          toVote(newValue);
        }}
        size='large'
      />}
      {recipe.averageScore !== 0 && 
      <Typography color={"white"}>Puntaje promedio: {recipe.averageScore.toFixed(2)}</Typography>}

      
      </CardContent>}
      
      <CardContent sx={{alignItems: "center", justifyContent: "center", alignSelf: "center", justifySelf: "center"}}>
      {isLoading ? <Loader/> : <ImageList sx={{ width: "%100", height: 200, justifyContent: "center", alignItems: "center" }} cols={3} rowHeight={164}>
          {recipe.photos.map((photo) => (
            
            <ImageListItem key={photo.url}>
              <img
                src={photo.url}
                loading="lazy"
                referrerPolicy="no-referrer"
                
                
              />   
            </ImageListItem>
          ))}
        </ImageList>}
        
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "end" }}>
      {recipe.fav ? <IconButton aria-label="Agregar a favoritos" disabled={!disabledEdit} onClick={()=>toFavRecipe(user.userId, recipe)}>
        {disabledEdit && <FavoriteIcon sx={{color: "#8b9dad"}}/>}
        </IconButton> : <IconButton aria-label="Agregar a favoritos" disabled={!disabledEdit} onClick={()=>toFavRecipe(user.userId, recipe)}>
        {disabledEdit && <FavoriteIcon sx={{ color: "#0b1218" }}/>}
        </IconButton>}
      </CardActions>
      <CardContent>
      <Typography paragraph color="#a8add3">Comentarios:</Typography>
      <TextField multiline sx={{ width: "100%" }} id="outlined-basic" onKeyDown={handleEnterPress} InputProps={{style:{color:"white"},
    endAdornment: (
      <IconButton onClick={()=>addCommentary()}>
        <Send sx={{color: "#a8add3"}}/>
      </IconButton>
    ),
  }} placeholder='Ingrese un comentario...' variant="outlined" value={commentary} onChange={({ target }) => setCommentary(target.value)} />
      </CardContent>
      <CardContent>
      {recipe.commentarys.map((commentary)=>{
        let userFind = users.find((user)=> user.idUser === commentary.idUserComment);
        return <Card sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "space-around",
          flexDirection: "column",
          backgroundColor: "#223344",
          marginBottom: "10px",
          border: 1,
          borderColor: "#a8add3"
        }}>
          <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#2D4356" }} aria-label="recipe">
            {userFind.username ? (userFind.username).charAt(0) : "U"}
          </Avatar>
        }
        subheaderTypographyProps={{ color: "#a8add3" }}
        subheader={`${userFind.username ? "por " + userFind.username : ""}`}
        titleTypographyProps={{ color: "#a8add3" }}
      />
          <Typography sx={{padding: 2}} color={"white"}>{commentary.comment}</Typography>
          </Card>

      })}
      </CardContent>
    </Card> : (recipe.user !== undefined && recipe.user !== null) ? <Card sx={{ minWidth: 700, maxWidth: 700, backgroundColor: "#223344" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#2D4356" }} aria-label="recipe">
            {recipe.user.username ? (recipe.user.username).charAt(0) : "U"}
          </Avatar>
        }
        title={recipe.title}
        titleTypographyProps={{ color: "#a8add3" }}
        subheader={`${recipe.user.username ? "por " + recipe.user.username : ""}`}
        subheaderTypographyProps={{ color: "#a8add3" }}
        action={
          <IconButton aria-label='Editar' onClick={() => setEdit(!edit)}>
            <Edit sx={{ color: "#0b1218" }} />
          </IconButton>
        }
      />
      <CardContent>
        <TextField defaultValue={recipe.title} multiline sx={{ width: "100%" }} inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} id="outlined-basic" label="Titulo" variant="outlined" onChange={({ target }) => setTitulo(target.value)} />
      </CardContent>
      <CardContent>
        <TextField defaultValue={recipe.description} multiline sx={{ width: "100%" }} inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} id="outlined-basic" label="Descripcion" variant="outlined" onChange={({ target }) => setDescripcion(target.value)} />
      </CardContent>
      <CardContent>
        <TextField defaultValue={recipe.category} sx={{ width: "100%" }} id="outlined-basic" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} label="Categoria" variant="outlined" onChange={({ target }) => setCategoria(target.value)} />
      </CardContent>
      <CardContent>
        <TextField defaultValue={recipe.preparationTime} sx={{ width: "100%" }} id="outlined-basic" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} label="Tiempo de preparacion" variant="outlined" onChange={({ target }) => setTiempo(target.value)} />
      </CardContent>
      <CardContent>
        <TextField defaultValue={recipe.ingredients} sx={{ width: "100%" }} id="outlined-basic" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} label="Ingredientes" variant="outlined" onChange={({ target }) => setIngredientes(target.value)} />
      </CardContent>

      <CardContent>
        <Typography paragraph color="#a8add3">Pasos:</Typography>
        <TextField defaultValue={recipe.steps} multiline sx={{ width: "100%" }} id="outlined-basic" label="Pasos" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} variant="outlined" onChange={({ target }) => setPasos(target.value)} />
      </CardContent>
      <CardContent sx={{alignItems: "center", justifyContent: "center", alignSelf: "center", justifySelf: "center"}}>
        <ImageList sx={{ width: "%100", height: 200, justifyContent: "center", alignItems: "center" }} cols={3} rowHeight={164}>
          {photos.map((photo) => (
            
            <ImageListItem key={photo.url}>
              <img
                src={photo.url}
                loading="lazy"
                referrerPolicy="no-referrer"
                
                
              />
              <Button color='error' onClick={()=>deleteImg(photo)}><DeleteOutline/></Button>   
            </ImageListItem>
          ))}
        </ImageList>
        {images.length !== 0 && <ImageList sx={{ width: "100%", height: 300}} cols={3} rowHeight={164}>
        {images.map((item) => (
          <ImageListItem key={item.file.name}>
            <img
              src={item.url}
              width="300"
              height="300"
              loading="lazy"
            />
            <Button color='error' onClick={()=>onDeleteImage(item.url)}><DeleteOutline/></Button>  
          </ImageListItem>
        ))}
      </ImageList>}
        <input accept="image/*" type='file' onChange={event => onChangeFile(event)} />
      <Button variant="contained" onClick={()=>onAddImage()}><Add/></Button>
      
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "end" }}>
        <IconButton aria-label="Guardar cambios" onClick={() => toEditRecipe()}>
          <Save sx={{ color: "#0b1218" }} />
        </IconButton>
        {recipe.fav ? <IconButton aria-label="Agregar a favoritos" disabled={!disabledEdit} onClick={()=>toFavRecipe(user.userId, recipe)}>
        {disabledEdit && <FavoriteIcon sx={{color: "#8b9dad"}}/>}
        </IconButton> : <IconButton aria-label="Agregar a favoritos" disabled={!disabledEdit} onClick={()=>toFavRecipe(user.userId, recipe)}>
        {disabledEdit && <FavoriteIcon sx={{ color: "#0b1218" }}/>}
        </IconButton>}


      </CardActions>

    </Card> : <Loader />
  )
}

export default RecipeDetailItem