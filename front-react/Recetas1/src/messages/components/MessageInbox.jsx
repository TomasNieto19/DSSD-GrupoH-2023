import { Email, Reply } from '@mui/icons-material'
import { Box, Container, IconButton, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const MessageInbox = ({message}) => {

    const {users} = useSelector(state=> state.user)
    let findUsername = users.find((userList => userList.idUser === message.idRemitente))
    const navigation = useNavigate();
    console.log(message)
    const toReplyMsg = () =>{
        navigation("/replyMsg", {state: {...message, username: findUsername.username}});
    }


  return (
    <Container sx={{minWidth: 350,display: "flex", color: "white", flexDirection: "row",alignItems: "center", justifyContent: "space-between", borderWidth: 2, borderColor: "white"}}>
        <Box>
            <Typography>De: {findUsername.username}</Typography>
            <Typography>Asunto: {message.asunto}</Typography>
            <Typography>Mensaje:</Typography>
            <Typography>{message.mensaje}</Typography>
        </Box>
        <IconButton onClick={()=>toReplyMsg()} disabled={message.respuesta !== null ? true : false}>
            <Reply sx={{color: message.respuesta !== null ? "gray" : "white"}}/>
        </IconButton>
    </Container>
  )
}

export default MessageInbox