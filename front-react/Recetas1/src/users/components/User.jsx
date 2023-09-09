import { Avatar, Button, Card, CardActions, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setFollowThunk } from '../../store/user/thunksUser';

const User = ({user}) => {

    const {user: userLogged}= useSelector(state=>state.auth)
    const dispatch = useDispatch();
    console.log(userLogged);
    const toFollow = () =>{

        dispatch(setFollowThunk(userLogged.userId, user));

    }
  return (
    <>
    <Card sx={{ maxWidth: 350, display: "flex", flexDirection: "column", padding: 2, backgroundColor: "#223344" }}>
      <Avatar sx={{ bgcolor: "#2D4356", width: 150, height: 150, alignSelf: "center"}} aria-label="avatar">
            <Typography fontSize={80}>{user.username ? (user.username).charAt(0) : "U"}</Typography>
          </Avatar>
      <CardContent sx={{alignSelf: "center"}}>
        <Typography variant="body2" fontSize={30} color="text.secondary" fontWeight="bold">
          {user.username}
        </Typography>
      </CardContent>
      <CardContent sx={{alignSelf: "center"}}>
        <Typography variant="body2" color="#a8add3" fontWeight="bold">
          Nombre completo: {user.name}
        </Typography>
      </CardContent>
      <CardActions sx={{alignSelf: "center"}}>
      
        {!user.followed ? <Button variant='contained' sx={{backgroundColor: "black"}} onClick={()=> toFollow()}>
          <Typography>Seguir</Typography>
        </Button> : <Button variant='contained' color='error' onClick={()=> toFollow()}>
          <Typography>Dejar de seguir</Typography>
        </Button>}
        
      </CardActions>
      

    </Card>
    
    </>
  )
}

export default User