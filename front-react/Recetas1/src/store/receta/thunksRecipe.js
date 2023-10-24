import { toast } from "react-toastify";
import { imgurApi, kafkaApi, pythonApi, recetasApi, restApi } from "../../api/api";
import { setFavs, setFavsRecipes } from "../auth/authSlice";

import { addCommentToList, addRecipe, addRecipeFive, deleteDraftState, deleteRecipeReport, editRecipe, ignoreRecipeReport, isLoadingRecipes, setDenuncias, setDraftDetail, setDrafts, setFav, setIsLoadingReports, setLastFiveRecipes, setLoading, setLoadingCSV, setLoadingFive, setPopularRecipes, setRecipeDetail, setRecipes, setScore, setScoreRecipes } from "./recipeSlice"

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
        averageScore = recipeScore ? recipeScore.averageScore : 0;  console.log("mehiceee")

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
    console.log(commentarys)
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

export const addRecipeThunk = (titulo, descripcion, ingredientes, categoria, pasos, tiempo, images, photosCargadas) => {
  return async (dispatch, getState) => {
    console.log("las fotos cargadas", photosCargadas);
    let fotosCargadas;
    const photos = [];
    if(images && images.length !== 0 && !images[0].file){
      fotosCargadas = images;
    }else{
      for (const image of images) {
        dispatch(setLoading(true));
        dispatch(setLoadingFive(true));
        const { data: dataImg, status: statusImg } = await imgurApi.post("/3/image", image.file, {
          headers: { 'Authorization': 'Client-ID b87bf9175769490' }
        });
  
        if (statusImg === 200) {
          const { data: dataUrl } = dataImg;
          const data = { url: dataUrl.link };
          photos.push(data);
        }else{
          console.log(data);
        }
      }
    }
    let fotosFinal = fotosCargadas ? [...photosCargadas, ...fotosCargadas] : [...photosCargadas, ...photos] 
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
      "photos": fotosFinal
    }
    console.log("estoy estoy enviando: ", bodyPost);
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
        "photos": fotosFinal,
        "averageScore": 0,
        "commentarys": []

      }
      const bodyAddKafka = {

        "username": user.username,
        "recipeTitle": titulo,
        "firstPhotoUrl": fotosFinal[0]

      }
      const { data: dataAdd, status: statusAdd } = await kafkaApi.post(`kafka/addRecipe`, bodyAddKafka);
      if (statusAdd === 200) {

        dispatch(addRecipe({ recipe: bodyState }));
        dispatch(addRecipeFive(bodyAddKafka));
        toast.success("La receta fue agregada correctamente",{
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
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
    toast.success("La receta fue editada correctamente",{
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })


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

export const sendRecipeReported = (id, motivo) =>{

  return async (dispatch, getState) => {

    const bodyDenuncia = {

      "id_recipe": id,
      "reason": motivo,
      "is_reason": true

    }

    const { data, status } = await pythonApi.post(`/soap/agregarDenuncia`, bodyDenuncia);

    if(status ===200){

      toast.success("Denuncia enviada");

    }

  }

}

export const setLastFiveRecipesThunk = () => {

  return async (dispatch, getState) => {
    dispatch(setLoadingFive(true));
    const { data, status } = await kafkaApi.get(`/kafka/lastRecipes`);
    if (status === 200) {

      dispatch(setLastFiveRecipes(data));

    }else{
      dispatch(setLastFiveRecipes([]))
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

export const setCSVFile = (dataCSV) => {

  return async (dispatch, getState) => {
    setLoadingCSV(true);
    if(dataCSV && dataCSV.length !== 0){

      for(const draft of dataCSV ){

        const { data, status } = await restApi.post("/rest/postDraft", draft);
        console.log(data, status);

      }

    }
    toast.success("CSV Subido correctamente",{
      position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
    setLoadingCSV(false);

  }

}

export const getDraftsThunk = () =>{

  return async (dispatch, getState) => {
    dispatch(isLoadingRecipes());
    const { data, status } = await restApi.get("/rest/getDrafts");
    if(status === 200){

      dispatch(setDrafts(data));

    }

  }

}

export const getDraftById = (id) =>{

  return async (dispatch, getState) => {
    dispatch(setLoading(true))
    const { data, status } = await restApi.get(`/rest/getDraftId/${id}`);
    if(status === 200){
      let dataState = {
        ...data,
        id_draft: parseInt(id)
      }
      dispatch(setDraftDetail(dataState));

    }

  }

}

export const updateDraft = (id, draftUpdate, photos, images) => {

  return async (dispatch, getState) => {
    dispatch(setLoading(true));
    const urlPhotos = [];
    for (const image of images) {
      const { data: dataImg, status: statusImg } = await imgurApi.post("/3/image", image.file, {
        headers: { 'Authorization': 'Client-ID f65efd43d7c6ecd' }
      });

      if (statusImg === 200) {
        const { data: dataUrl } = dataImg;
        const data = { url: dataUrl.link };
        urlPhotos.push(data);
      }
    }
    let finalPhotos = [...photos, ...urlPhotos]
    let draftUpdateWithPhotos = {

      ...draftUpdate,
      finalPhotos

    }
    const { data, status } = await restApi.put(`/rest/putDraft/${id}`, draftUpdateWithPhotos);
    let draftToUpdate = {
      ...draftUpdate,
      "id_draft": id,
      finalPhotos
    }
    if(status === 200){
      dispatch(setDraftDetail(draftToUpdate));
      let message = "Se guardaron correctamente los datos";
      toast.success(message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    }else{
      let message = "Error al intentar guardar los cambios.";
      toast.error(message, {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    })
    }
  }
}

export const deleteDraft = (id) => {

  return async (dispatch, getState) => {
    const { data, status } = await restApi.delete(`/rest/deleteDraft/${parseInt(id)}`);
    if(status === 200){
      toast.success("El borrador eliminado",{
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    }

  }

}

export const getRecipesReportedThunk = () =>{

  return async (dispatch, getState) => {
    dispatch(setIsLoadingReports(true));
    const { data, status } = await pythonApi.get(`/soap/traerTodasDenuncias`);
    if(status === 200){
     
        dispatch(setDenuncias(data));

      }else{

        dispatch(setDenuncias(data));

      }
    

  }

}

export const ignoreReportThunk = (id) =>{

  return async (dispatch, getState) => {
    dispatch(setIsLoadingReports(true));
    const { data, status } = await pythonApi.put(`/soap/ignorarDenuncia/${id}`);
    if(status === 200){
     
        dispatch(ignoreRecipeReport(id));
        dispatch(setIsLoadingReports(false));
        toast.success("Receta ignorada");
      }else{

        dispatch(setIsLoadingReports(false));

      }
    

  }

}

export const deleteRecipeThunk = (id) =>{

  return async (dispatch, getState) => {
    const { data, status } = await pythonApi.delete(`/soap/eliminarReceta/${id}`);
    if(status === 200){
     
      dispatch(deleteRecipeReport(id));
      toast.success("Receta eliminada");

      }else{

        

      }
    

  }

}