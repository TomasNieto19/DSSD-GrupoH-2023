package services;

import grpc.RecipeServiceGrpc;
import grpc.RecipeDtoOuterClass.EmptyRecipe;
import grpc.RecipeDtoOuterClass.RecipeDto;
import grpc.RecipeDtoOuterClass.ServerResponseRecipe;
import grpc.RecipeDtoOuterClass.getRecipeByIdRequest;
import grpc.UserDtoOuterClass.UserDto;
import grpc.RecipeDtoOuterClass;
import grpc.RecipeDtoOuterClass.AllRecipesResponse;
import io.grpc.stub.StreamObserver;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;

import dao.RecipeDao;
import dao.UserDao;
import entities.Recipe;
import entities.User;

import entities.Recipe;


import java.util.List;

import dao.RecipeDao;
import dao.UserDao;

public class RecipeService extends RecipeServiceGrpc.RecipeServiceImplBase {
	
	private final ModelMapper modelMapper = new ModelMapper();

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
    
    @Transactional
    public void editRecipe(RecipeDto request, StreamObserver<ServerResponseRecipe> responseObserver) {
    	// TODO Auto-generated method stub
    	ServerResponseRecipe.Builder serverResponse = ServerResponseRecipe.newBuilder();
    	Recipe recipe = null;
        User user = null;
        

        try {
        	recipe = modelMapper.map(request, Recipe.class);;
            user = UserDao.getInstance().getUserById(1);
        	recipe.setUser(user);
            RecipeDao.getInstance().editRecipe(recipe);

            serverResponse.setMessage("Receta editada correctamente");

        } catch (Exception e) {

            serverResponse.setMessage("Error al editar la receta: " + e.getMessage());

        }
        finally {

            responseObserver.onNext(serverResponse.build());
            responseObserver.onCompleted();
        }
    	
    }
    
    
    
    
}