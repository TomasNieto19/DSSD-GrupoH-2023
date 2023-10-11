import { imgurApi, kafkaApi, recetasApi } from "../../api/api";
import { setFavs, setFavsRecipes } from "../auth/authSlice";

import { addCommentToList, addRecipe, addRecipeFive, editRecipe, isLoadingRecipes, setFav, setLastFiveRecipes, setLoading, setLoadingFive, setPopularRecipes, setRecipeDetail, setRecipes, setScore, setScoreRecipes } from "./recipeSlice"

export const getRecipes = () => {

  return async (dispatch, getState) => {
    const { auth } = getState();
    const { user } = auth;
    const { favoriteRecipes } = user;
    dispatch(isLoadingRecipes());

    const { data } = await recetasApi.get("/recipes");
    const { recipes } = data;
    const { data: dataScores, status } = await kafkaApi.get("/kafka/recipesScore")
    let recipesData = recipes.map((recipe) => {

      let recipeFav = favoriteRecipes.find((recipeFav) => recipeFav.idRecipe === recipe.idRecipe);
      let averageScore;
      if (status === 200) {

        let recipeScore = dataScores.find((recipeScore) => recipeScore.idRecipe === recipe.idRecipe);
        averageScore = recipeScore ? recipeScore.averageScore : 0;

      }
      return {

        ...recipe,
        "fav": recipeFav ? true : false,
        "averageScore": averageScore ? averageScore : 0

      }

    })

    dispatch(setRecipes({ recipes: recipesData }));

  }

}

export const getRecipesByUserId = (id) => {

  return async (dispatch, getState) => {
    const { auth } = getState();
    const { user } = auth;
    const { favoriteRecipes } = user;
    dispatch(isLoadingRecipes());

    const { data } = await recetasApi.get(`/userRecipes/${id}`);
    const { data: dataScores, status } = await kafkaApi.get("/kafka/recipesScore");
    const recipesMapped = data.recipes.map((favRecipe) => {
      let recipeFav = favoriteRecipes.find((recipeFav) => recipeFav.idRecipe === favRecipe.idRecipe);
      let averageScore;
      if (status === 200) {

        let recipeScore = dataScores.find((recipeScore) => recipeScore.idRecipe === favRecipe.idRecipe);
        averageScore = recipeScore ? recipeScore.averageScore : 0;

      }
      return {

        ...favRecipe,
        "fav": recipeFav ? true : false,
        "averageScore": averageScore ? averageScore : 0

      }

    })

    dispatch(setRecipes({ recipes: recipesMapped }));

  }

}

export const getRecipeByRecipeId = (id) => {
  return async (dispatch, getState) => {
    const { auth } = getState();
    const { user } = auth;
    const { favoriteRecipes } = user;
    dispatch(isLoadingRecipes());
    const { data } = await recetasApi.get(`/recipe/${id}`);
    let { data: commentarys, status } = await kafkaApi.get(`/kafka/comments/${id}`);
    const { data: dataScore, status: statusScore } = await kafkaApi.get(`/kafka/recipesScoreId/${id}`)
    let averageScore;
    if (statusScore === 200) {
      averageScore = dataScore.length !== 0 ? dataScore[0].averageScore : 0;
    }
    commentarys = commentarys ? commentarys.reverse() : [];
    let favEnviar;
    let fav = favoriteRecipes.find((favRecipe) => favRecipe.idRecipe === data.idRecipe);
    favEnviar = {
      ...data,
      "commentarys": commentarys,
      "fav": fav ? true : false,
      "averageScore": averageScore ? averageScore : 0
    }
    dispatch(setLoading(false));
    dispatch(setRecipeDetail({ recipe: favEnviar }));
  }
}

export const addRecipeThunk = (titulo, descripcion, ingredientes, categoria, pasos, tiempo, images) => {
  return async (dispatch, getState) => {
    const photos = [];
    for (const image of images) {
      dispatch(setLoading(true));
      dispatch(setLoadingFive(true));
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
      const bodyAddKafka = {

        "username": user.username,
        "recipeTitle": titulo,
        "firstPhotoUrl": photos[0]

      }
      const { data: dataAdd, status: statusAdd } = await kafkaApi.post(`kafka/addRecipe`, bodyAddKafka);
      if (statusAdd === 200) {

        dispatch(addRecipe({ recipe: bodyState }));
        dispatch(addRecipeFive(bodyAddKafka));
      }
    }

  }
}

export const setCommentsThunk = (idUser, recipe, comment) => {

  return async (dispatch, getState) => {

    let sendKafka = {
      "idUserComment": idUser,
      "idRecipeComment": recipe.idRecipe,
      "comment": comment,
      "idUserRecipeCreator": recipe.user.userId
    }

    const { data, status } = await kafkaApi.post('/kafka/comments', sendKafka);
    dispatch(addCommentToList(sendKafka));

  }

}

export const editRecipeThunk = (recipe, titulo, descripcion, ingredientes, categoria, pasos, tiempo, photos, images) => {
  return async (dispatch, getState) => {

    const photosURL = [];
    if (images.length !== 0) {
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
    const { auth } = getState();
    const { user } = auth;
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
    dispatch(editRecipe({ recipe: bodyState }));



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

export const getFavRecipes = () => {

  return async (dispatch, getState) => {

    const { auth } = getState();
    const { user } = auth;
    const { favoriteRecipes } = user;
    const { data, status: statusFavs } = await recetasApi.get(`/favoriteRecipes/${user.userId}`);
    const { data: dataScores, status } = await kafkaApi.get("/kafka/recipesScore");

    if (statusFavs === 200) {
      let favsMapped = data.favoriteRecipes.map((recipe) => {
        let favFind = favoriteRecipes.find(recipeFav => recipeFav.idRecipe === recipe.idRecipe);
        let recipeScore = dataScores.find((recipeScore) => recipeScore.idRecipe === recipe.idRecipe);
        let averageScore = recipeScore ? recipeScore.averageScore : 0;
        return {

          ...recipe,
          "fav": favFind ? true : false,
          "averageScore": averageScore

        }
      })
      dispatch(setFavs({ recipes: favsMapped }));

    }

  }

}

export const setScoreThunk = (idUser, idRecipe, score) => {

  return async (dispatch, getState) => {

    let body = {

      idUser,
      idRecipe,
      score

    }

    const { data, status } = await kafkaApi.post('/kafka/qualification', body);
  }

}

export const setScoreInRecipe = (idRecipe) => {

  return async (dispatch, getState) => {

    const { data, status } = await kafkaApi.get(`/kafka/recipesScoreId/${idRecipe}`);

    const averageScore = data.length !== 0 ? data[0].averageScore : 0;

    dispatch(setScore(averageScore))

  }

}

export const setLastFiveRecipesThunk = () => {

  return async (dispatch, getState) => {
    dispatch(setLoadingFive(true));
    const { data, status } = await kafkaApi.get(`/kafka/lastRecipes`);

    if (status === 200) {

      dispatch(setLastFiveRecipes(data));

    }



  }

}

export const getPopularRecipes = () => {

  return async (dispatch, getStates) => {
    dispatch(isLoadingRecipes(true));
    const { data: dataScores, status } = await kafkaApi.get("/kafka/recipesScore");
    const { data } = await recetasApi.get("/recipes");
    const { recipes } = data;
    let popularRecipesData = [];

    if (status === 200 && dataScores.length !== 0) {

      popularRecipesData = dataScores.map((dataScore) => {

        let recipeFind = recipes.find((rec) => rec.idRecipe === dataScore.idRecipe);
        if (recipeFind && dataScore.averageScore !== 0) {
          return {

            "title": recipeFind.title,
            "description": recipeFind.description,
            "user": recipeFind.user,
            "averageScore": dataScore.averageScore

          }
        }


      }).filter((recipe) => recipe !== undefined && recipe !== null)
      popularRecipesData.sort((a, b) => b.averageScore - a.averageScore)
    }
    dispatch(setPopularRecipes(popularRecipesData));

  }

}