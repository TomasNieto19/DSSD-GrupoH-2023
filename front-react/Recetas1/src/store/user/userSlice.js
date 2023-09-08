import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: []
    },
    reducers: {
        setUsers: (state, action ) => {
            state.users = action.payload.users;
        },
        setFollow: (state, action) =>{

            let id = action.payload.id
            let userFind = state.users.find(user => user.idUser === id);
            let index = state.users.indexOf(userFind);
            state.users[index].followed = !state.users[index].followed;
        }
    }
});



export const { setUsers,setFollow } = userSlice.actions;