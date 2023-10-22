import { createSlice } from '@reduxjs/toolkit';

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        isLoading: false,
        isLoadingFive: false,
        isLoadingCSV: false,
        recipes: [],
        recipeDetail: {},
        lastFiveRecipes: [],
        popularRecipes: [],
        drafts: [],
        draftDetail: {}
       
    },
    reducers: {
        isLoadingRecipes: (state) => {
            state.isLoading = true;
        },
        setRecipes: (state, action) =>{

            state.isLoading = false;
            state.recipes = action.payload.recipes;

        },
        setLoadingFive: (state,action)=>{

            state.isLoadingFive = action.payload;

        },
        addRecipeFive: (state, action) =>{

            state.lastFiveRecipes.push(action.payload);
            if(state.lastFiveRecipes.length > 5){

                state.lastFiveRecipes.shift();

            }
            state.isLoadingFive = false;

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
            state.isLoading = false;

        },
        setRecipeDetail: (state, action)=>{

            state.recipeDetail = action.payload.recipe

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

        },
        addCommentToList: (state, action) =>{
            state.recipeDetail.commentarys.push(action.payload)
            state.recipeDetail.commentarys = state.recipeDetail.commentarys.reverse()
        },
        setScore: (state, action) =>{

            state.recipeDetail.averageScore = action.payload;

        },
        setScoreRecipes: (state, action) =>{

            let idRecipe = action.payload.idRecipe;
            let scoreAverage = action.payload.score;
            let recipeFind = state.recipes.find(recipe => recipe.idRecipe === idRecipe);
            let index = state.recipes.indexOf(recipeFind);
            state.recipes[index].averageScore = scoreAverage;
            state.recipeDetail.averageScore = scoreAverage;

        },
        setLastFiveRecipes: (state, action) =>{

            state.lastFiveRecipes = action.payload;
            state.isLoadingFive = false;

        },
        setPopularRecipes: (state, action) => {
            state.popularRecipes = action.payload;
            state.isLoading = false;
        },
        setDrafts: (state, action) =>{

            state.drafts = action.payload;
            state.isLoading = false;

        },
        setDraftDetail: (state, action)=>{

            state.draftDetail = action.payload;
            state.isLoading = false;

        },
        deleteDraftState: (state, action)=>{
            let idDraft = action.payload;
            let filterArray = state.drafts.filter(draft => draft.id_draft !== idDraft);
            state.drafts = filterArray;
        },
        setLoadingCSV: (state, action) =>{
            state.isLoadingCSV = action.payload;
        }
    }
});



export const { isLoadingRecipes, setRecipes,addRecipe, setRecipeDetail, editRecipe, setLoading, setFav, addCommentToList, setScore, setScoreRecipes, 
    setLastFiveRecipes, setLoadingFive, addRecipeFive, setPopularRecipes, setDrafts, setDraftDetail,deleteDraftState, setLoadingCSV} = recipeSlice.actions;