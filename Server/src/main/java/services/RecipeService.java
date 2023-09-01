package services;

import grpc.RecipeServiceGrpc;
import grpc.RecipeDtoOuterClass.RecipeDto;
import grpc.RecipeDtoOuterClass.getRecipeByIdRequest;
import io.grpc.stub.StreamObserver;
import dao.RecipeDao;
import entities.Recipe;

public class RecipeService extends RecipeServiceGrpc.RecipeServiceImplBase {

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
}