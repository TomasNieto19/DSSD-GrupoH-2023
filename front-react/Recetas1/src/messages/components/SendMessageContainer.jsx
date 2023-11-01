import { Comment, Email } from '@mui/icons-material';
import { Container, IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const SendMessageContainer = () => {

    const {users} = useSelector(state => state.user);
    const {user} = useSelector(state=> state.auth);
    console.log(user);
    const navigator = useNavigate();
    let arrayFiltrado = users.filter((userFilt => userFilt.idUser !== user.userId))
    const toNav = (user)=>{

        navigator("/sendMessage", {state: user});

    }

  return (
    <Container sx={{display: "flex",flexDirection:"column", borderRadius: 5, justifyContent: "center", alignItems: "center", backgroundColor: "#2D4356",width: "30%", padding: 10, marginTop: 10}}>
        <Typography sx={{color: "white", fontSize: 30}}>A quien deseas enviarle un mensaje?</Typography>
    <List sx={{ width: '100%', maxWidth: 360 }}>
        
      {arrayFiltrado.map((user) => (
        <ListItem
          key={user.idUser}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment" onClick={()=>toNav(user)}>
              <Email sx={{color: "white"}}/>
            </IconButton>
          }
        >
          <ListItemText sx={{color: "white"}} primary={user.username} />
        </ListItem>
      ))}
    </List>
    </Container>
  )
}

export default SendMessageContainer