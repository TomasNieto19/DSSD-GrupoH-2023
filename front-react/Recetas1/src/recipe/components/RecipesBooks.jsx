import { Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function RecipesBooks() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8085/soap/traerTodosRecetarios")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  console.log(data);

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
        <Box  sx={{ display: "flex", justifyContent: "center" }}>
          <Typography component="h1" fontSize={50}>
            Recetarios
          </Typography>
        </Box>

      {data.map((item, index) => (
        <Box key={index} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography component="h1" fontSize={30}>
            Nombre: {item.name} {"->>>"} Pertenece al Usuario: {item.idUser}
          </Typography>
        </Box>
      ))}
    </>
  );
}