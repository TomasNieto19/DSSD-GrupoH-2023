import { Add, DeleteOutline, Label } from '@mui/icons-material'
import { Button, Container, ImageList, ImageListItem, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addRecipeThunk, setCSVFile } from '../../store/receta/thunksRecipe'
import { recetasApi } from '../../api/api'
import { toast } from 'react-toastify'
import Papa from 'papaparse';


export const AddRecipe = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user}= useSelector(state=> state.auth);
  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [ingredientes, setIngredientes] = useState();
  const [categoria, setCategoria] = useState();
  const [pasos, setPasos] = useState();
  const [tiempo, setTiempo] = useState();
  const [images, setImages] = useState([]);
  const [image, setImage] = useState();
  const [dataCSV, setDataCSV] = useState([]);

  const toInicio = () => {
    if(images.length >= 2){

      dispatch(addRecipeThunk(titulo, descripcion, ingredientes, categoria, pasos, tiempo, images));
      navigate("/");
    }else{

      toast("Debe subir dos fotos como minimo");

    }
    

    

  }

  	const onChangeFileCSV = event =>{
      let csvsRecipes;
      var file = event.target.files[0];
      Papa.parse(file, {
        complete: function(results) {
          csvsRecipes = results.data.map(recipe=>{
            return{

              titulo: recipe.titulo,
              descripcion: recipe.descripcion,
              categoria: recipe.categoria,
              tiempoDePreparacion: parseInt(recipe["tiempo de preparacion"]),
              id_user: parseInt(user.userId)

            }

          })
          setDataCSV(csvsRecipes);
        }, header: true
      });
      
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
  
  const sendCSVData = () =>{
    console.log(dataCSV)
    dispatch(setCSVFile(dataCSV))

  }

  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 5}}>
      <Typography component="h1" fontSize={40}>Add Recipe</Typography>
      <TextField id="outlined-basic" label="Titulo" variant="outlined" onChange={({ target }) => setTitulo(target.value)} />
      <TextField id="outlined-basic" label="Descripcion" multiline variant="outlined" onChange={({ target }) => setDescripcion(target.value)} />
      <TextField id="outlined-basic" label="Ingredientes" multiline variant="outlined" onChange={({ target }) => setIngredientes(target.value)} />
      <TextField id="outlined-basic" label="Categoria" variant="outlined" onChange={({ target }) => setCategoria(target.value)} />
      <TextField id="outlined-basic" label="Pasos" multiline variant="outlined" onChange={({ target }) => setPasos(target.value)} />
      <TextField id="outlined-basic" label="Tiempo de preparacion" variant="outlined" onChange={({ target }) => setTiempo(target.value)} />
      <Container sx={{ display: "flex", flexDirection: "row", gap: 3 }}>
      <input accept="image/*" type='file' onChange={event => onChangeFile(event)} />
      <Button variant="contained" onClick={()=>onAddImage()}><Add/></Button>
      </Container>
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
      <input accept=".csv" type='file' onChange={event => onChangeFileCSV(event)} />
      <Button variant="contained" onClick={()=>sendCSVData()}>ENVIAR CSV</Button>
      </Container>
      <Button variant='contained' sx={{ width: "20%", alignSelf: "end" }} onClick={toInicio}>Agregar</Button>

    </Container>
  )
}
