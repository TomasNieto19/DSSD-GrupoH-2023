import { Google } from '@mui/icons-material'
import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import AuthLayout from './layout/AuthLayout'
import { loginUserThunk } from '../../store/auth/thunksAuth'
import { useDispatch } from 'react-redux'
import { getUsers } from '../../store/user/thunksUser'

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  const toRecipes = () =>{

    dispatch(loginUserThunk(username, password));
    dispatch(getUsers());
    navigate("/");

  }

  return (
    <AuthLayout title="Login">
        <form>
          <Grid container>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Usuario"
                placeholder="Usuario"
                
                fullWidth
                onChange={({target})=>setUsername(target.value)}
                inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                placeholder="Contraseña"
                type="password"
                fullWidth
                onChange={({target})=>setPassword(target.value)}
                inputProps={{ style: { color: "white" } }} InputLabelProps={{ style: { color: "gray" } }}
              />
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} sm={12} md={12}>
                <Button variant='contained' sx={{backgroundColor: "#0b1218"}} onClick={()=>toRecipes()} fullWidth>Login</Button>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="end" sx={{mt: 1}}>

              <Link component={RouterLink} to="/register">Crear una cuenta</Link>

            </Grid>
          </Grid>

        </form>
        </AuthLayout>
  )
}

export default Login