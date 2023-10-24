import { Box, Button, Container, TextField, Typography } from '@mui/material';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { sendReplyThunk } from '../../store/messages/thunkMessages';

const ReplyMsg = () => {

    const {state} = useLocation();
    const [reply, setReply] = useState();
    const dispatch = useDispatch()
    const navigation = useNavigate();
    const sendReply = () =>{

        dispatch(sendReplyThunk(state.idMensaje, reply))
        navigation("/mymessages");

    }
  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 5}}>
      <Typography component="h1" fontSize={40}>De: {state.username}</Typography>
      <Typography>Asunto: {state.asunto}</Typography>
      <Box sx={{
            border: "1px solid black",
            padding: 2,
            borderRadius: 1.5, 
        }}>
            <Typography>Mensaje: </Typography>
            <Typography>{state.mensaje}</Typography>
        </Box>
      <TextField id="outlined-basic" label="Respuesta" rows={6} multiline  variant="outlined" onChange={({ target }) => setReply(target.value)} />
      <Button variant='contained' sx={{ width: "20%", alignSelf: "end" }} onClick={sendReply}>RESPONDER</Button>
     

    </Container>
  )
}

export default ReplyMsg