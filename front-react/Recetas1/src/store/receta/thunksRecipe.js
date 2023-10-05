import { imgurApi, kafkaApi, recetasApi } from "../../api/api";
import { setFavs, setFavsRecipes } from "../auth/authSlice";

import { addCommentToList, addRecipe, editRecipe, isLoadingRecipes, setFav, setLoading, setRecipeDetail, setRecipes, setScore, setScoreRecipes } from "./recipeSlice"

export const getRecipes = () => {

    return async (dispatch, getState) => {
        const {auth} = getState();
        const {user} = auth;
        const {favoriteRecipes} = user;
        dispatch(isLoadingRecipes());

        const { data } = await recetasApi.get("/recipes");
        const { recipes } = data;
        const {data: dataScores, status} = await kafkaApi.get("/kafka/recipesScore");
        console.log(dataScores);
        
        let recipesData = recipes.map((recipe)=>{

            let recipeFav = favoriteRecipes.find((recipeFav) => recipeFav.idRecipe === recipe.idRecipe);
            let recipeScore = dataScores.find((recipeScore)=> recipeScore.idRecipe === recipe.idRecipe);
            let averageScore = recipeScore ? recipeScore.averageScore : 0;
            if(recipeFav){

              return{

                ...recipe,
                "fav": true,
                "averageScore": averageScore

              }
      
            }else{

              return{

                ...recipe,
                "fav": false,
                "averageScore": averageScore

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
        const {data: dataScores, status} = await kafkaApi.get("/kafka/recipesScore");
        const recipesMapped = data.recipes.map((favRecipe)=>{
          let recipeFav = favoriteRecipes.find((recipeFav) => recipeFav.idRecipe === favRecipe.idRecipe);
          
          let recipeScore = dataScores.find((recipeScore)=> recipeScore.idRecipe === favRecipe.idRecipe);
          let averageScore = recipeScore ? recipeScore.averageScore : 0;
            if(recipeFav){

              return{

                ...favRecipe,
                "fav": true,
                "averageScore": averageScore

              }
      
            }else{

              return{

                ...favRecipe,
                "fav": false,
                "averageScore": averageScore

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
        const {data: commentarys, status} = await kafkaApi.get(`/kafka/comments/${id}`);
        const {data: dataScore, status: statusScore} = await kafkaApi.get(`/kafka/recipesScoreId/${id}`);
        const averageScore = dataScore.length !== 0 ? dataScore[0].averageScore : 0;
        let favEnviar;
        let fav = favoriteRecipes.find((favRecipe)=> favRecipe.idRecipe === data.idRecipe);
        if(fav){

          favEnviar = {

            ...data,
            "commentarys": commentarys,
            "fav": true,
            "averageScore": averageScore

          }

        }else{

          favEnviar = {

            ...data,
            "commentarys": commentarys,
            "fav": false,
            "averageScore": averageScore

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
            "photos": photos,
            "averageScore": 0,
            "commentarys": []
          
        }
  
        dispatch(addRecipe({ recipe: bodyState }));
        }
      
    }
  }

  export const setCommentsThunk = (idUser, recipe, comment) =>{

    return async (dispatch, getState) =>{

      let sendKafka = {
        "idUserComment": idUser,
        "idRecipeComment": recipe.idRecipe,
        "comment": comment,
        "idUserRecipeCreator": recipe.user.userId
      }

      const {data, status} = await kafkaApi.post('/kafka/comments', sendKafka);
      console.log(data);
      dispatch(addCommentToList(sendKafka));

    }

  }

export const editRecipeThunk = (recipe, titulo, descripcion, ingredientes, categoria, pasos, tiempo, photos, images) => {
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
            "idRecipe": recipe.idRecipe,
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
          
            "idRecipe": recipe.idRecipe,
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
            "photos": photosFinal,
            "commentarys": recipe.commentarys,
            "averageScore": recipe.averageScore
          
        }
        
            const { data } = await recetasApi.put("/edit", bodyPost)
        dispatch(editRecipe({recipe: bodyState}));
        
        

    }

}

export const favRecipeThunk = (id, recipe) => {
  return async (dispatch, getState) => {
    try {
      const { data, status } = await recetasApi.post(`/favoriteAction?idUser=${id}&idRecipe=${recipe.idRecipe}`);
      if (status === 200) {
        const body = {
          "idRecipe": recipe.idRecipe,
          "isFavorited": recipe.fav,
          "userIdCreator": recipe.user.userId
        };
        const { data: dataFavRecipe, status: statusFavRecipe } = await kafkaApi.post(`/kafka/favoriteRecipe`, body);
        if (statusFavRecipe === 200) {
          const { data: dataScore, status: statusScore } = await kafkaApi.get(`/kafka/recipesScoreId/${recipe.idRecipe}`);
          if (statusScore === 200) {
            console.log(dataScore);
            // Ahora puedes realizar la actualización del estado
            dispatch(setFav({ id: recipe.idRecipe }));
            dispatch(setFavsRecipes({ recipe: recipe }));
            dispatch(setScoreRecipes({ score: dataScore[0].averageScore, idRecipe: recipe.idRecipe }));
          }
        }
      }
    } catch (error) {
      // Maneja cualquier error que pueda ocurrir en las llamadas asincrónicas
      console.error("Error en favRecipeThunk:", error);
    }
  };
};

export const getFavRecipes = () =>{

  return async(dispatch, getState)=>{

    const {auth} = getState();
        const {user} = auth;
        const {favoriteRecipes} = user;
        const { data, status: statusFavs } = await recetasApi.get(`/favoriteRecipes/${user.userId}`);
        const {data: dataScores, status} = await kafkaApi.get("/kafka/recipesScore");
        
        if(statusFavs === 200){
            let favsMapped = data.favoriteRecipes.map((recipe)=>{
                let favFind = favoriteRecipes.find(recipeFav => recipeFav.idRecipe === recipe.idRecipe);
                let recipeScore = dataScores.find((recipeScore)=> recipeScore.idRecipe === recipe.idRecipe);
                let averageScore = recipeScore ? recipeScore.averageScore : 0;

                if(favFind){

                    return {

                        ...recipe,
                        "fav": true,
                        "averageScore": averageScore
    
                    }

                }else{
                    return {

                      ...recipe,
                      "fav": false,
                      "averageScore": averageScore
    
                    }
                }

                
            })
            dispatch(setFavs({recipes: favsMapped}));

        }

  }

}

export const setScoreThunk = (idUser, idRecipe, score) => {

  return async(dispatch, getState) =>{ 

  let body = {

    idUser,
    idRecipe,
    score

  }

  const {data, status} = await kafkaApi.post('/kafka/qualification', body);
  }

}

export const setScoreInRecipe = (idRecipe)=>{

  return async(dispatch, getState) =>{ 
  
    const {data, status} = await kafkaApi.get(`/kafka/recipesScoreId/${idRecipe}`);

    const averageScore = data.length !== 0 ? data[0].averageScore : 0;

    dispatch(setScore(averageScore))

  }

}