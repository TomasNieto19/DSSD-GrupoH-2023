import { Button, Card, CardActions, CardContent, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'

const DraftItem = ({draft}) => {

    const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [ingredientes, setIngredientes] = useState();
  const [categoria, setCategoria] = useState();
  const [pasos, setPasos] = useState();
  const [tiempo, setTiempo] = useState();
  return (
    <Card sx={{ minWidth: 700, maxWidth: 700, backgroundColor: "#223344" }}>
    <CardContent>
        <TextField defaultValue={draft.title} multiline sx={{ width: "100%" }} inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} id="outlined-basic" label="Titulo" variant="outlined" onChange={({ target }) => setTitulo(target.value)} />
      </CardContent>
      <CardContent>
        <TextField defaultValue={draft.description} multiline sx={{ width: "100%" }} inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} id="outlined-basic" label="Descripcion" variant="outlined" onChange={({ target }) => setDescripcion(target.value)} />
      </CardContent>
      <CardContent>
        <TextField defaultValue={draft.category} sx={{ width: "100%" }} id="outlined-basic" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} label="Categoria" variant="outlined" onChange={({ target }) => setCategoria(target.value)} />
      </CardContent>
      <CardContent>
        <TextField defaultValue={draft.preparation_time} sx={{ width: "100%" }} id="outlined-basic" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} label="Tiempo de preparacion" variant="outlined" onChange={({ target }) => setTiempo(target.value)} />
      </CardContent>
      <CardContent>
        <TextField defaultValue={draft.ingredients} sx={{ width: "100%" }} id="outlined-basic" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} label="Ingredientes" variant="outlined" onChange={({ target }) => setIngredientes(target.value)} />
      </CardContent>

      <CardContent>
        <Typography paragraph color="#a8add3">Pasos:</Typography>
        <TextField defaultValue={draft.steps} multiline sx={{ width: "100%" }} id="outlined-basic" label="Pasos" inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }} variant="outlined" onChange={({ target }) => setPasos(target.value)} />
      </CardContent>
      <CardActions sx={{display: "flex", justifyContent: "end", padding: 2}}>
      <Button variant='contained' onClick={()=>{}}>Guardar Cambios</Button>
      </CardActions>
      </Card>
  )
}

export default DraftItem