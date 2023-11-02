import { Button, Container, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'
import { sendMsgThunk } from '../../store/messages/thunkMessages';

const SendMessage = () => {
    const {state} = useLocation();
    const navigation = useNavigate();
    const [asunto, setAsunto] = useState();
    const [mensaje, setMensaje] = useState();
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.auth);
    const sendMsg = () =>{

        dispatch(sendMsgThunk(user.userId, state.idUser, asunto, mensaje));
        navigation("/messages")

    }
  return (
    <Container sx={{ display: "flex", flexDirection: "column", gap: 3, padding: 5}}>
      <Typography component="h1" fontSize={40}>Enviar mensaje a {state.username}</Typography>
      <TextField id="outlined-basic" label="Asunto" variant="outlined" onChange={({ target }) => setAsunto(target.value)} />
      <TextField id="outlined-basic" label="Mensaje" rows={6} multiline variant="outlined" onChange={({ target }) => setMensaje(target.value)}/>
      <Button variant='contained' sx={{ width: "20%", alignSelf: "end" }} onClick={sendMsg}>ENVIAR</Button>
     

    </Container>
  )
}

export default SendMessage