import React from 'react'
import User from './User';
import { Grid } from '@mui/material';

const UsersList = ({users}) => {

  return (
    <Grid container padding={10}>
        {users.map((user)=>{

            return <Grid xs={12} md={4} padding={3}><User key={user.idUser} user={user}/></Grid>

        })}
    </Grid>
  )
}

export default UsersList