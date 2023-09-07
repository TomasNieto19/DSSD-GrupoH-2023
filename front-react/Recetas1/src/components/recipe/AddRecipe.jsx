import { Label } from '@mui/icons-material'
import { Button, Container, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addRecipeThunk } from '../../store/receta/thunksRecipe'
import { recetasApi } from '../../api/api'


export const AddRecipe = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [titulo, setTitulo] = useState();
    const [descripcion, setDescripcion] = useState();
    const [ingredientes, setIngredientes] = useState();
    const [categoria, setCategoria] = useState();
    const [pasos, setPasos] = useState();
    const [tiempo, setTiempo] = useState();
    
    const toInicio = () =>{
        dispatch(addRecipeThunk(titulo, descripcion, ingredientes, categoria, pasos, tiempo));
        navigate("/");

    }

  return (
    <Container sx={{display:"flex", flexDirection: "column", gap: 3}}>
        <Typography component="h1" fontSize={40}>Add Recipe</Typography>
        <TextField id="outlined-basic" label="Titulo" variant="outlined" onChange={({target})=>setTitulo(target.value)}/>
        <TextField id="outlined-basic" label="Descripcion" multiline variant="outlined" onChange={({target})=>setDescripcion(target.value)}/>
        <TextField id="outlined-basic" label="Ingredientes" multiline variant="outlined" onChange={({target})=>setIngredientes(target.value)}/>
        <TextField id="outlined-basic" label="Categoria" variant="outlined" onChange={({target})=>setCategoria(target.value)}/>
        <TextField id="outlined-basic" label="Pasos" multiline variant="outlined" onChange={({target})=>setPasos(target.value)}/>
        <TextField id="outlined-basic" label="Tiempo de preparacion" variant="outlined" onChange={({target})=>setTiempo(target.value)} />
        <Button variant='contained' sx={{width: "20%", alignSelf: "end"}} onClick={toInicio}>Agregar</Button>
        
    </Container>
  )
}
