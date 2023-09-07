import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {

            username: "",
            userId: 0

        }
    },
    reducers: {
        toRegisterUser: (state, action)=>{

            state.user = action.payload.user;

        },
        unLoginUser: (state, action)=>{

            localStorage.clear();
            state.user = {}

        }
    }
});



export const { toRegisterUser,unLoginUser } = authSlice.actions;