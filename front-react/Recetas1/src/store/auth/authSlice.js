import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {

            username: "",
            userId: 0,
            usersFollowing: [],
            favoriteRecipes: []

        }
    },
    reducers: {
        toLoginUser: (state, action)=>{

            state.user = action.payload.user;

        },
        unLoginUser: (state, action)=>{

            localStorage.clear();
            state.user = {username: "",
            userId: 0,
            usersFollowing: []}

        },
        setUsersFollowing: (state, action)=>{

            let userFollowing = action.payload.user;
            let userFind = state.user.usersFollowing.find(user => user.idUser === userFollowing.idUser);
            if(!userFind){
                state.user.usersFollowing.push(userFollowing);
            }else{

                let index = state.user.usersFollowing.indexOf(userFind);
                state.user.usersFollowing.splice(index, 1);

            }
            localStorage.setItem('user', JSON.stringify(state.user));

        },
        setFavs: (state, action) =>{

            state.user.favoriteRecipes = action.payload.recipes

        },
        setFavsRecipes: (state, action)=>{
            let recetaFav = action.payload.recipe;
            let recetaFind = state.user.favoriteRecipes.find(recipe => recipe.idRecipe === recetaFav.idRecipe);
            if(!recetaFind){
                state.user.favoriteRecipes.push(recetaFav);
            }else{

                let index = state.user.favoriteRecipes.indexOf(recetaFind);
                state.user.favoriteRecipes.splice(index, 1);

            }
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    }
});



export const { toLoginUser,unLoginUser,setUsersFollowing, setFavsRecipes,setFavs } = authSlice.actions;