package services;

import grpc.RecipeServiceGrpc;
import grpc.RecipeDtoOuterClass.EmptyRecipe;
import grpc.RecipeDtoOuterClass.RecipeDto;
import grpc.RecipeDtoOuterClass.getRecipeByIdRequest;
import grpc.UserDtoOuterClass.UserDto;
import grpc.RecipeDtoOuterClass;
import grpc.RecipeDtoOuterClass.AllRecipesResponse;
import io.grpc.stub.StreamObserver;
import entities.Recipe;


import java.util.List;

import dao.RecipeDao;
import dao.UserDao;

public class RecipeService extends RecipeServiceGrpc.RecipeServiceImplBase {

    private RecipeDto mapRecipeToRecipeDto(Recipe recipe){
    	//lo creo para dsp asignarselo al setUser del recipeDTO
    	
    	RecipeDtoOuterClass.User user=RecipeDtoOuterClass.User.newBuilder()
    			.setUserId(recipe.getUser().getIdUser())
    			.setNombre(recipe.getUser().getName())
    			.build();
    	
        return RecipeDto.newBuilder()
            .setIdRecipe(recipe.getIdRecipe())
            .setTitle(recipe.getTitle())
            .setDescription(recipe.getDescription())
            .setIngredients(recipe.getIngredients())
            .setCategory(recipe.getCategory())
            .setSteps(recipe.getSteps())
            .setPreparationTime(recipe.getPreparationTime())
            .setUser(user)
            
            .build();

    }


    @Override
    public void getRecipeById(getRecipeByIdRequest request, StreamObserver<RecipeDto> responseObserver) {
   

        RecipeDto recipe = null;
        
        try {
            
            recipe = mapRecipeToRecipeDto(RecipeDao.getInstance().getRecipeById(request.getIdRecipe()));
        
        } catch (Exception e) {
        
            System.out.println("Error al enviar la receta por id: " + e.getMessage());
            
        }
        finally {
            
            responseObserver.onNext(recipe);
            responseObserver.onCompleted();
        }
    }
    
    public void getAllRecipe(EmptyRecipe request,StreamObserver<AllRecipesResponse> responseObserver) {
    	
    	RecipeDtoOuterClass.AllRecipesResponse.Builder allRecipesResponseBuilder = RecipeDtoOuterClass.AllRecipesResponse.newBuilder();
    	
    	try {

			List<Recipe> recipeList = RecipeDao.getInstance().getAll();

			for (Recipe recipe : recipeList) {

				RecipeDto recipeDto = mapRecipeToRecipeDto(recipe);

				allRecipesResponseBuilder.addRecipes(recipeDto);
			}

		} catch (Exception e) {

			System.out.println("Error al enviar la lista de recetas.");

		} finally {

			responseObserver.onNext(allRecipesResponseBuilder.build());
			responseObserver.onCompleted();
		}
    	
    }
}