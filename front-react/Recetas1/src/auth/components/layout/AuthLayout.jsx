import { Grid, Typography } from '@mui/material'
import React from 'react'

const AuthLayout = ({children, title=''}) => {
  return (
    <Grid container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh', backgroundColor: '#0b73aa', padding: 4 }}
    >

      <Grid item
        className='box-shadow'
        xs={12}
        sm={6}
        md={4}
        sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}
      >

        <Typography variant='h5' sx={{ mb: 1, textAlign: "center" }}>{title}</Typography>

        {children}

        </Grid>
        </Grid>
  )
}

export default AuthLayout