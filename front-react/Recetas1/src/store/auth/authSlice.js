import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {

            username: "",
            userId: 0,
            usersFollowing: []

        }
    },
    reducers: {
        toLoginUser: (state, action)=>{

            state.user = action.payload.user;

        },
        unLoginUser: (state, action)=>{

            localStorage.clear();
            state.user = {}

        },
        setUsersFollowing: (state, action)=>{

            let userFollowing = action.payload.user;
            let userFind = state.user.usersFollowing.find(user => user.idUser === userFollowing.idUser);
            console.log("LO ENCONTRE", userFind);
            if(!userFind){
                state.user.usersFollowing.push(userFollowing);
            }else{

                let index = state.user.usersFollowing.indexOf(userFind);
                state.user.usersFollowing.splice(index, 1);

            }
            

        }
    }
});



export const { toLoginUser,unLoginUser,setUsersFollowing } = authSlice.actions;