import { createSlice } from '@reduxjs/toolkit';

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        isLoading: false,
        recipes: [],
        recipeDetail: {}
       
    },
    reducers: {
        isLoadingRecipes: (state) => {
            state.isLoading = true;
        },
        setRecipes: (state, action) =>{

            state.isLoading = false;
            state.recipes = action.payload.recipes;

        },
        setLoading: (state, action)=>{

            state.isLoading = action.payload;

        },
        setFav: (state, action) =>{

            let id = action.payload.id
            let recipeFind = state.recipes.find(recipe => recipe.idRecipe === id);
            let index = state.recipes.indexOf(recipeFind);
            state.recipes[index].fav = !state.recipes[index].fav;
            state.recipeDetail.fav = !state.recipeDetail.fav; 

        },
        addRecipe: (state, action)=>{

            state.recipes.push(action.payload.recipe);

        },
        setRecipeDetail: (state, action)=>{

            state.recipeDetail = action.payload.recipe;

        },
        editRecipe: (state, action) =>{

            let recipeEdit = action.payload.recipe
            let recipeFind = state.recipes.find(recipe => recipe.idRecipe === recipeEdit.idRecipe);
            let index = state.recipes.indexOf(recipeFind);
            state.recipes[index].title = recipeEdit.title;
            state.recipes[index].description = recipeEdit.description;
            state.recipes[index].category = recipeEdit.category;
            state.recipes[index].steps = recipeEdit.steps;
            state.recipes[index].ingredients = recipeEdit.ingredients;
            state.recipes[index].preparationTime = recipeEdit.preparationTime;
            state.recipeDetail = recipeEdit;

        }
    }
});



export const { isLoadingRecipes, setRecipes,addRecipe, setRecipeDetail, editRecipe, setLoading, setFav} = recipeSlice.actions;