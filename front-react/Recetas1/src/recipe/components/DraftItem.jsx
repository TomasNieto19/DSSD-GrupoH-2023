import { Button, Card, CardActions, CardContent, Container, ImageList, ImageListItem, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addRecipeThunk, deleteDraft, updateDraft } from '../../store/receta/thunksRecipe';
import { Add, DeleteOutline } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const DraftItem = ({draft}) => {
  const dispatch = useDispatch();
    const [titulo, setTitulo] = useState(draft.title);
  const [descripcion, setDescripcion] = useState(draft.description);
  const [ingredientes, setIngredientes] = useState(draft.ingredients);
  const [categoria, setCategoria] = useState(draft.category);
  const [pasos, setPasos] = useState(draft.steps);
  const [tiempo, setTiempo] = useState(draft.preparation_time);
  const [images, setImages] = useState([]);
  const [image, setImage] = useState();
  const navigate = useNavigate();
  const [guardarRecipe, setGuardarRecipe] = useState(false);
  const [photos, setPhotos] = useState(draft && draft.photos && draft.photos[0].url !== null ? draft.photos : []);
  useEffect(() => {
    if(titulo && titulo !== "" && descripcion && descripcion !== "" && categoria && categoria !== ""
    && tiempo && tiempo !== "" && ingredientes && ingredientes !== "" && 
    pasos && pasos !== "" && ((photos.length >=2 && images.length >= 2) || (images.length + photos.length >=2))){
      setGuardarRecipe(true)
    }
  }, [titulo, descripcion, ingredientes, categoria, pasos, tiempo, images, photos])
  
  const guardarCambios = () => {

    if((photos.length === 0 && images.length === 0) || (photos.length >=2 && images.length >= 2) || (images.length + photos.length >=2)){

    let draftUpdate = {
        "title": titulo !== "" ? titulo : null,
        "description": descripcion !== "" ? descripcion : null,
        "category": categoria !== "" ? categoria : null,
        "preparation_time": tiempo !== "" ? tiempo : null,
        "ingredients": ingredientes !== "" ? ingredientes : null,
        "steps": pasos !== "" ? pasos : null
    }
    if(draftUpdate.title && draftUpdate.title !== "" && draftUpdate.description && draftUpdate.description !== "" && draftUpdate.category && draftUpdate.category !== ""
    && draftUpdate.preparation_time && draftUpdate.preparation_time !== "" && draftUpdate.ingredients && draftUpdate.ingredients !== "" && 
    draftUpdate.steps && draftUpdate.steps !== ""){
      dispatch(addRecipeThunk(draftUpdate.title, draftUpdate.description, draftUpdate.ingredients, draftUpdate.category, draftUpdate.steps, draftUpdate.preparation_time, images,
        photos))
      dispatch(deleteDraft(draft.id_draft));
      navigate("/drafts")
    }else{
      dispatch(updateDraft(draft.id_draft, draftUpdate, photos, images));
      navigate("/drafts")
    }
    }else{
      toast.error("Debe subir dos imagenes o más");
    }
    
  }
  const deleteImg = (photo) =>{

    let arrayFilter = photos.filter((photoF)=> photoF.url !== photo.url);
    setPhotos(arrayFilter);
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

  const onDeleteImage = (url) =>{

    let arrayFilter = images.filter((photoF)=> photoF.url !== url);
    setImages(arrayFilter);
    
  }

  const onAddImage = () => {
    if(image !== undefined && image !== null){
      if(images.length >= 5){
        setImage(undefined);
        toast("El limite es 5");
      }else{

        setImages([...images, image]);
        setImage(undefined);
      }
    }
  }
  return (
    <Card sx={{ minWidth: 700, maxWidth: 700, backgroundColor: "#223344" }}>
    <CardContent>
        <TextField value={titulo} multiline sx={{ width: "100%" }} inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} id="outlined-basic" label="Titulo" variant="outlined" onChange={({ target }) => setTitulo(target.value)} />
      </CardContent>
      <CardContent>
        <TextField value={descripcion} multiline sx={{ width: "100%" }} inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} id="outlined-basic" label="Descripcion" variant="outlined" onChange={({ target }) => setDescripcion(target.value)} />
      </CardContent>
      <CardContent>
        <TextField value={categoria} sx={{ width: "100%" }} id="outlined-basic" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} label="Categoria" variant="outlined" onChange={({ target }) => setCategoria(target.value)} />
      </CardContent>
      <CardContent>
        <TextField value={tiempo} sx={{ width: "100%" }} id="outlined-basic" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} label="Tiempo de preparacion" variant="outlined" onChange={({ target }) => setTiempo(target.value)} />
      </CardContent>
      <CardContent>
        <TextField value={ingredientes} sx={{ width: "100%" }} id="outlined-basic" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} label="Ingredientes" variant="outlined" onChange={({ target }) => setIngredientes(target.value)} />
      </CardContent>

      <CardContent>
        <Typography paragraph color="#a8add3">Pasos:</Typography>
        <TextField value={pasos} multiline sx={{ width: "100%" }} id="outlined-basic" label="Pasos" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} variant="outlined" onChange={({ target }) => setPasos(target.value)} />
      </CardContent>
      {photos.length !== 0 && <ImageList sx={{ width: "%100", height: 200, justifyContent: "center", alignItems: "center" }} cols={3} rowHeight={164}>
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
        </ImageList>}
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
      <Container sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
      <input accept="image/*" type='file' onChange={event => onChangeFile(event)} />
      <Button variant="contained" onClick={()=>onAddImage()}><Add/></Button>
      </Container>
      <CardActions sx={{display: "flex", justifyContent: "end", padding: 2}}>
      <Button variant='contained' disabled={guardarRecipe} onClick={guardarCambios}>Guardar Cambios</Button>
      <Button variant='contained' disabled={!guardarRecipe} onClick={guardarCambios}>Guardar Receta</Button>
      </CardActions>
      </Card>
  )
}

export default DraftItem