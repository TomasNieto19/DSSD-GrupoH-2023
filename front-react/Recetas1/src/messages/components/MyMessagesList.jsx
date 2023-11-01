import { Email } from '@mui/icons-material'
import { Container, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material'
import React from 'react'
import MessageInbox from './MessageInbox'

const MyMessagesList = ({messages}) => {
  return (
    <Container sx={{display: "flex",flexDirection:"column", borderRadius: 5, justifyContent: "center",borderWidth: 4, alignItems: "center", backgroundColor: "#2D4356",width: "30%", padding: 10, marginTop: 10}}>
        <Typography sx={{color: "white", fontSize: 30}}>Mensajes</Typography>
    <List sx={{ width: '100%', maxWidth: 360 }}>
        
      {messages.map((message) => (
        <ListItem
          key={message.idMensaje}
          disableGutters
        >
          <MessageInbox message={message}/>
        </ListItem>
      ))}
    </List>
    </Container>
  )
}

export default MyMessagesList