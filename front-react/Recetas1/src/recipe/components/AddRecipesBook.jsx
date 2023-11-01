import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AddRecipesBook() {
  const { user } = useSelector((state) => state.auth);
  const { userId } = user;
  const navigate = useNavigate();
  const [name, setName] = useState();

  const toInicio = () => {
   

    axios
      .post("http://localhost:8085/soap/agregarRecetario", {
        name,
        iduser: userId,
      })
      .then((res) => {toast.success("Recetario agregado con exito")})
      .catch((err) => console.log(err));

    /*
    
    useDispatch(
        // addRecipeBookThunk
        //mandar el id del usuario y el nombre
    );
*/
    navigate("/recipesBooks");
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 5 }}
    >
      <Typography component="h1" fontSize={40}>
        Agregar un nuevo recetario
      </Typography>
      <TextField
        id="outlined-basic"
        label="Nombre del recetario"
        variant="outlined"
        onChange={({ target }) => setName(target.value)}
      />

      <Button
        variant="contained"
        sx={{ width: "20%", alignSelf: "end" }}
        onClick={toInicio}
      >
        Agregar
      </Button>
    </Container>
  );
}
