import { kafkaApi, recetasApi } from "../../api/api";
import { setPopularRecipes } from "./popularRecipesSlice";

export const getPopularRecipes = () =>{

    return async (dispatch, getStates) =>{

        const {data: dataScores, status} = await kafkaApi.get("/kafka/recipesScore");
        const { data } = await recetasApi.get("/recipes");
        const { recipes } = data;
        let popularRecipesData = [];
        popularRecipesData = dataScores.map((dataScore)=>{

            let recipeFind = recipes.find((rec) => rec.idRecipe === dataScore.idRecipe);
            if(recipeFind){
                return{

                    "title": recipeFind.title,
                    "description": recipeFind.description,
                    "user": recipeFind.user,
                    "averageScore": dataScore.averageScore
    
                }
            }
            

        }).filter((recipe)=> recipe!== undefined && recipe!==null)
        popularRecipesData.sort((a, b) => b.averageScore - a.averageScore)
        dispatch(setPopularRecipes(popularRecipesData));

    }

}