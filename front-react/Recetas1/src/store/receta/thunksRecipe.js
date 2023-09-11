import { imgurApi, recetasApi } from "../../api/api";

import { addRecipe, editRecipe, isLoadingRecipes, setRecipeDetail, setRecipes } from "./recipeSlice"

export const getRecipes = () => {

    return async (dispatch, getState) => {
        dispatch(isLoadingRecipes());

        const { data } = await recetasApi.get("/recipes");
        dispatch(setRecipes({ recipes: data.recipes }));

    }

}

export const getRecipesByUserId = (id) => {

    return async (dispatch, getState) => {

        dispatch(isLoadingRecipes());

        const { data } = await recetasApi.get(`/userRecipes/${id}`);

        dispatch(setRecipes({ recipes: data.recipes }));

    }

}

export const getRecipeByRecipeId = (id) => {

    return async (dispatch, getState) => {

        dispatch(isLoadingRecipes());

        const { data } = await recetasApi.get(`/recipe/${id}`);
        dispatch(setRecipeDetail({recipe: data}));

    }

}

export const addRecipeThunk = (titulo, descripcion, ingredientes, categoria, pasos, tiempo, images) => {

    return async (dispatch, getState) => {
        const {data: dataImg, status: statusImg} = await imgurApi.post("/3/image", images[0].file, {headers: {'Authorization': 'Client-ID f65efd43d7c6ecd'}});
        if(statusImg == 200){

            const {data: dataUrl} = dataImg;
            console.log(dataUrl.link);

        }
        const {auth} = getState();
        const {user} = auth;

        const bodyPost = {

            "title": titulo,
            "description": descripcion,
            "ingredients": ingredientes,
            "category": categoria,
            "steps": pasos,
            "preparationTime": parseInt(tiempo),
            "user": {
                "userId": user.userId,
                "name": user.username
            }

        }
        

        const { data, status } = await recetasApi.post("/addRecipe", bodyPost)
        if(status === 200 && data.idRecipe !== 0){

            const bodyState = {
                "idRecipe": data.idRecipe,
                "title": titulo,
                "description": descripcion,
                "ingredients": ingredientes,
                "category": categoria,
                "steps": pasos,
                "preparationTime": parseInt(tiempo),
                "user": {
                    "userId": user.userId,
                    "username": user.username
                }
    
            }

            dispatch(addRecipe({recipe: bodyState}));

        }
        

    }

}

export const editRecipeThunk = (id, titulo, descripcion, ingredientes, categoria, pasos, tiempo) => {
    return async (dispatch, getState) => {

        const {auth} = getState();
        const {user} = auth;

        const bodyPost = {
            "idRecipe": id,
            "title": titulo,
            "description": descripcion,
            "ingredients": ingredientes,
            "category": categoria,
            "steps": pasos,
            "preparationTime": parseInt(tiempo),
            "user": {
                "userId": user.userId,
                "nombre": user.username
            }

        }
        const bodyState = {
            "idRecipe": id,
            "title": titulo,
            "description": descripcion,
            "ingredients": ingredientes,
            "category": categoria,
            "steps": pasos,
            "preparationTime": parseInt(tiempo),
            "user": {
                "userId": user.userId,
                "username": user.username
            }

        }
        
            const { data } = await recetasApi.put("/edit", bodyPost)
        dispatch(editRecipe({recipe: bodyState}));
        
        

    }

}