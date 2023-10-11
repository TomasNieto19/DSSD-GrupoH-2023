import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        popularUsers: [],
        isLoading: false
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
        },
        setPopularUsers: (state, action ) => {
            state.popularUsers = action.payload.users;
            state.isLoading = false;
        },
        popularUsersLoading: (state, action) => {

            state.isLoading = true;

        }
    }
});



export const { setUsers,setFollow, setPopularUsers, popularUsersLoading } = userSlice.actions;