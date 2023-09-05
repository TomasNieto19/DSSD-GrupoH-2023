package services;

import grpc.RecipeDtoOuterClass.getRecipesByUserIdResponse;
import grpc.RecipeDtoOuterClass.getRecipesByUserIdRequest;
import grpc.RecipeDtoOuterClass.ServerResponseRecipe;
import grpc.RecipeDtoOuterClass.getRecipeByIdRequest;
import grpc.RecipeDtoOuterClass.AllRecipesResponse;
import grpc.RecipeDtoOuterClass.EmptyRecipe;
import grpc.RecipeDtoOuterClass.RecipeDto;
import grpc.RecipeDtoOuterClass;
import grpc.RecipeServiceGrpc;
import io.grpc.stub.StreamObserver;
import org.modelmapper.ModelMapper;
import entities.Recipe;
import entities.User;
import java.util.List;
import dao.RecipeDao;
import dao.UserDao;

public class RecipeService extends RecipeServiceGrpc.RecipeServiceImplBase {
	
	private final ModelMapper modelMapper = new ModelMapper();
	
	private RecipeDto mapRecipeToRecipeDto(Recipe recipe) {
		
		// lo creo para dsp asignarselo al setUser del recipeDTO
		RecipeDtoOuterClass.User user = RecipeDtoOuterClass.User.newBuilder()
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

		} finally {

			responseObserver.onNext(recipe);
			responseObserver.onCompleted();
		}
	}

	
	@Override
	public void getAllRecipe(EmptyRecipe request, StreamObserver<AllRecipesResponse> responseObserver) {

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
	
	
	@Override
	public void addRecipe(RecipeDto request, StreamObserver<ServerResponseRecipe> responseObserver) {

        ServerResponseRecipe.Builder serverResponse = ServerResponseRecipe.newBuilder();

        try {
            
        	User userCreator = UserDao.getInstance().getUserById(request.getUser().getUserId());

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
		 
	
	@Override
	public void getRecipesByUserId(getRecipesByUserIdRequest request, StreamObserver<getRecipesByUserIdResponse> responseObserver) {

		RecipeDtoOuterClass.getRecipesByUserIdResponse.Builder response = RecipeDtoOuterClass.getRecipesByUserIdResponse.newBuilder();
		
		try {
			
			List<Recipe> recipeList = RecipeDao.getInstance().getRecipeByUserId(request.getIdUser());

			for (Recipe recipe : recipeList) {

				RecipeDto recipeDto = mapRecipeToRecipeDto(recipe);

				response.addRecipes(recipeDto);
			}
			
		} catch (Exception e) {

			System.out.println("Error al enviar la lista de recetas del usuario.");

		} finally {

			responseObserver.onNext(response.build());
			responseObserver.onCompleted();
		}
	}
		

	@Override
    public void editRecipe(RecipeDto request, StreamObserver<ServerResponseRecipe> responseObserver) {
 
    	ServerResponseRecipe.Builder serverResponse = ServerResponseRecipe.newBuilder();
    	Recipe recipe = null;
        User user = null;
        
        try {
        	
        	user = UserDao.getInstance().getUserById(request.getUser().getUserId());
        	
        	recipe = modelMapper.map(request, Recipe.class);
        	
        	recipe.setUser(user);
        	
            RecipeDao.getInstance().editRecipe(recipe);

            serverResponse.setMessage("Receta editada correctamente");

        } catch (Exception e) {

            serverResponse.setMessage("Error al editar la receta: " + e.getMessage());

        }finally {

            responseObserver.onNext(serverResponse.build());
            responseObserver.onCompleted();
        }
    }


}