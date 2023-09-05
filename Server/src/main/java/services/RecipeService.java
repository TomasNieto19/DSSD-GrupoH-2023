package services;

import grpc.RecipeServiceGrpc;
import grpc.RecipeDtoOuterClass.RecipeDto;
import grpc.RecipeDtoOuterClass.ServerResponseRecipe;
import grpc.RecipeDtoOuterClass.getRecipeByIdRequest;
import io.grpc.stub.StreamObserver;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;

import dao.RecipeDao;
import dao.UserDao;
import entities.Recipe;
import entities.User;
public class RecipeService extends RecipeServiceGrpc.RecipeServiceImplBase {
	
	private final ModelMapper modelMapper = new ModelMapper();

    private RecipeDto mapRecipeToRecipeDto(Recipe recipe){

        return RecipeDto.newBuilder()
            .setIdRecipe(recipe.getIdRecipe())
            .setTitle(recipe.getTitle())
            .setDescription(recipe.getDescription())
            .setIngredients(recipe.getIngredients())
            .setCategory(recipe.getCategory())
            .setSteps(recipe.getSteps())
            .setPreparationTime(recipe.getPreparationTime())

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