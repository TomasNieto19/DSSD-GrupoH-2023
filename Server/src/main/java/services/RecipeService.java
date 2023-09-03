package services;

import grpc.RecipeServiceGrpc;
import grpc.RecipeDtoOuterClass.RecipeDto;
import grpc.RecipeDtoOuterClass.ServerResponseRecipe;
import grpc.RecipeDtoOuterClass.getRecipeByIdRequest;
import io.grpc.stub.StreamObserver;
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
            .setUserId(recipe.getUser().getIdUser())
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

    
    @Override
    public void addRecipe(RecipeDto request, StreamObserver<ServerResponseRecipe> responseObserver) {

        ServerResponseRecipe.Builder serverResponse = ServerResponseRecipe.newBuilder();
        
        User userCreator = null;

        try {
            
            userCreator = UserDao.getInstance().getUserById(request.getUserId());

            if(userCreator == null) throw new Exception("El usuario no existe");

            Recipe recipeToAdd = modelMapper.map(request, Recipe.class);
            
            recipeToAdd.setUser(userCreator);

            RecipeDao.getInstance().addRecipe(recipeToAdd);

            serverResponse.setMessage("Receta añadida correctamente");
            
        } catch (Exception e) {
           
            serverResponse.setMessage("Error al añadir la receta: " + e.getMessage());
            
        }
        finally {

            responseObserver.onNext(serverResponse.build());
            responseObserver.onCompleted();
        }
    }

    
}