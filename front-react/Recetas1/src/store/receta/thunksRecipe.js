import { imgurApi, recetasApi } from "../../api/api";
import { setFavs, setFavsRecipes } from "../auth/authSlice";

import { addRecipe, editRecipe, isLoadingRecipes, setFav, setLoading, setRecipeDetail, setRecipes } from "./recipeSlice"

export const getRecipes = () => {

    return async (dispatch, getState) => {
        const {auth} = getState();
        const {user} = auth;
        const {favoriteRecipes} = user;
        dispatch(isLoadingRecipes());

        const { data } = await recetasApi.get("/recipes");
        const { recipes } = data;
        
        
        let recipesData = recipes.map((recipe)=>{

            let recipeFav = favoriteRecipes.find((recipeFav) => recipeFav.idRecipe === recipe.idRecipe);

            if(recipeFav){

              return{

                ...recipe,
                "fav": true

              }
      
            }else{

              return{

                ...recipe,
                "fav": false

              }

            }

        })
        
        dispatch(setRecipes({ recipes: recipesData }));

    }

}

export const getRecipesByUserId = (id) => {

    return async (dispatch, getState) => {
      const {auth} = getState();
      const {user} = auth;
      const {favoriteRecipes} = user;
        dispatch(isLoadingRecipes());

        const { data } = await recetasApi.get(`/userRecipes/${id}`);
        const recipesMapped = data.recipes.map((favRecipe)=>{

          let recipeFav = favoriteRecipes.find((recipeFav) => recipeFav.idRecipe === favRecipe.idRecipe);

            if(recipeFav){

              return{

                ...favRecipe,
                "fav": true

              }
      
            }else{

              return{

                ...favRecipe,
                "fav": false

              }

            }

        })

        dispatch(setRecipes({ recipes: recipesMapped }));

    }

}

export const getRecipeByRecipeId = (id) => {

    return async (dispatch, getState) => {
        const {auth} = getState();
        const {user} = auth;
        const {favoriteRecipes} = user;
        dispatch(isLoadingRecipes());
        const { data } = await recetasApi.get(`/recipe/${id}`);
        let favEnviar;
        let fav = favoriteRecipes.find((favRecipe)=> favRecipe.idRecipe === data.idRecipe);
        if(fav){

          favEnviar = {

            ...data,
            "fav": true

          }

        }else{

          favEnviar = {

            ...data,
            "fav": false

          }

        }
        dispatch(setLoading(false));
        dispatch(setRecipeDetail({recipe: favEnviar}));

    }

}

export const addRecipeThunk = (titulo, descripcion, ingredientes, categoria, pasos, tiempo, images) => {
    return async (dispatch, getState) => {
      const photos = [];
      for (const image of images) {
        dispatch(setLoading(true));
          const { data: dataImg, status: statusImg } = await imgurApi.post("/3/image", image.file, {
            headers: { 'Authorization': 'Client-ID f65efd43d7c6ecd' }
          });
  
          if (statusImg === 200) {
            const { data: dataUrl } = dataImg;
            const data = { url: dataUrl.link };
            photos.push(data);
          }   
      }
      dispatch(setLoading(false));
      const { auth } = getState();
      const { user } = auth;
  
      const bodyPost = {
        "recipe": {
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
        },
        "photos": photos
      }
  
      const { data, status } = await recetasApi.post("/addRecipe", bodyPost);
      if (status === 200 && data.idRecipe !== 0) {
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
            },
            "photos": photos
          
        }
  
        dispatch(addRecipe({ recipe: bodyState }));
        }
      
    }
  }

export const editRecipeThunk = (id, titulo, descripcion, ingredientes, categoria, pasos, tiempo, photos, images) => {
    return async (dispatch, getState) => {

      const photosURL = [];
      if(images.length !== 0){
      for (const image of images) {
        dispatch(setLoading(true));
          const { data: dataImg, status: statusImg } = await imgurApi.post("/3/image", image.file, {
            headers: { 'Authorization': 'Client-ID f65efd43d7c6ecd' }
          });
  
          if (statusImg === 200) {
            const { data: dataUrl } = dataImg;
            const data = { url: dataUrl.link };
            photosURL.push(data);
          }   
      }
      }
      dispatch(setLoading(false));
        const photosFinal = [...photos, ...photosURL];
        const {auth} = getState();
        const {user} = auth;
        const bodyPost = {
          "recipe": {
            "idRecipe": id,
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
          },
          "photos": photosFinal
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
            },
            "photos": photosFinal
          
        }
        
            const { data } = await recetasApi.put("/edit", bodyPost)
        dispatch(editRecipe({recipe: bodyState}));
        
        

    }

}

export const favRecipeThunk = (id, recipe) =>{

  return async (dispatch, getState) =>{

      const {data, status} = await recetasApi.post(`/favoriteAction?idUser=${id}&idRecipe=${recipe.idRecipe}`);
      if(status === 200){
        dispatch(setFav({id: recipe.idRecipe}));
        dispatch(setFavsRecipes({recipe: recipe}));

      }

  }

}

export const getFavRecipes = () =>{

  return async(dispatch, getState)=>{

    const {auth} = getState();
        const {user} = auth;
        const {favoriteRecipes} = user;
        const { data, status: statusFavs } = await recetasApi.get(`/favoriteRecipes/${user.userId}`);
        if(statusFavs === 200){
            let favsMapped = data.favoriteRecipes.map((recipe)=>{
                let favFind = favoriteRecipes.find(recipeFav => recipeFav.idRecipe === recipe.idRecipe);

                if(favFind){

                    return {

                        ...recipe,
                        "fav": true
    
                    }

                }else{
                    return {

                      ...recipe,
                      "fav": false
    
                    }
                }

                
            })
            dispatch(setFavs({recipes: favsMapped}));

        }

  }

}