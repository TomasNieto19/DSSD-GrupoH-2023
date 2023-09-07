import { recetasApi } from "../../api/api";

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

export const addRecipeThunk = (titulo, descripcion, ingredientes, categoria, pasos, tiempo) => {

    return async (dispatch, getState) => {

        const bodyPost = {

            "title": titulo,
            "description": descripcion,
            "ingredients": ingredientes,
            "category": categoria,
            "steps": pasos,
            "preparationTime": parseInt(tiempo),
            "user": {
                "userId": 1,
                "name": "Usuario1"
            }

        }
        const bodyState = {

            "title": titulo,
            "description": descripcion,
            "ingredients": ingredientes,
            "category": categoria,
            "steps": pasos,
            "preparationTime": parseInt(tiempo),
            "user": {
                "userId": 1,
                "nombre": "Usuario1"
            }

        }

        const { data } = await recetasApi.post("/addRecipe", bodyPost)
        dispatch(addRecipe({recipe: bodyState}));

    }

}

export const editRecipeThunk = (id, titulo, descripcion, ingredientes, categoria, pasos, tiempo) => {
    return async (dispatch, getState) => {

        const bodyPost = {
            "idRecipe": id,
            "title": titulo,
            "description": descripcion,
            "ingredients": ingredientes,
            "category": categoria,
            "steps": pasos,
            "preparationTime": parseInt(tiempo),
            "user": {
                "userId": 1,
                "nombre": "Usuario1"
            }

        }

        console.log(bodyPost);
        const bodyState = {
            "idRecipe": id,
            "title": titulo,
            "description": descripcion,
            "ingredients": ingredientes,
            "category": categoria,
            "steps": pasos,
            "preparationTime": parseInt(tiempo),
            "user": {
                "userId": 1,
                "nombre": "Usuario1"
            }

        }
        
            const { data } = await recetasApi.put("/edit", bodyPost)
        dispatch(editRecipe({recipe: bodyState}));
        
        

    }

}