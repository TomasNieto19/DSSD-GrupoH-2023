import { Button, Grid, Link, TextField, Typography } from '@mui/material'
import { Link as RouterLink, useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import AuthLayout from './layout/AuthLayout'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../store/auth/thunksAuth'

const Register = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const toLogin = () =>{

        dispatch(registerUser(username, name, email, password))
        navigate("/login");

    }
    

  return (
    <AuthLayout title="Crear cuenta">
        <form>
          <Grid container>
          <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Nombre de usuario"
                placeholder="Nombre de usuario"
                type="text"
                fullWidth
                onChange={({target})=>setUsername(target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Nombre completo"
                placeholder="Nombre completo"
                type="text"
                fullWidth
                onChange={({target})=>setName(target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Correo electronico"
                placeholder="correo@gmail.com"
                type="email"
                fullWidth
                onChange={({target})=>setEmail(target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField
                label="Contraseña"
                placeholder="Contraseña"
                type="password"
                fullWidth
                onChange={({target})=>setPassword(target.value)}
              />
            </Grid>
            <Grid container sx={{ mt: 2 }} direction="row" justifyContent="center">
              <Grid item xs={12} sm={12} md={8} >
                <Button variant='contained' onClick={()=>toLogin()} fullWidth>Crear cuenta</Button>
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="end" sx={{mt: 1}}>
              <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
              <Link component={RouterLink} color="inherit" to="/login">Ingresar</Link>

            </Grid>
          </Grid>

        </form>
        </AuthLayout>
  )
}

export default Register