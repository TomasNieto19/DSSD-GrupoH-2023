import React from 'react'
import User from './User';
import { Grid } from '@mui/material';

const UsersList = ({users, type}) => {

  return (
    <Grid container padding={10}>
        {users.map((user)=>{

            return <Grid key={user.idUser} padding={3}><User key={user.idUser} user={user} type={type}/></Grid>

        })}
    </Grid>
  )
}

export default UsersList