import { createSlice } from '@reduxjs/toolkit';

export const popularRecipesSlice = createSlice({
    name: 'popularRecipes',
    initialState: {
        popularRecipes: [],
        isLoading: false
    },
    reducers: {
        setPopularRecipes: (state, action) => {
            state.popularRecipes = action.payload;
            state.isLoading = false;
        },
        isLoadingRecipes: (state, action) =>{

            state.isLoading = true;

        }
    }
});



export const { setPopularRecipes, isLoadingRecipes } = popularRecipesSlice.actions;