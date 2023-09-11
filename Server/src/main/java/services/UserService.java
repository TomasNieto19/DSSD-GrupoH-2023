package services;

import grpc.UserDtoOuterClass.ServerResponseUser;
import grpc.UserDtoOuterClass.AllUsersResponse;
import grpc.UserDtoOuterClass.EmptyUser;
import grpc.UserDtoOuterClass.UserDto;
import grpc.UserDtoOuterClass.followActionRequest;
import grpc.UserDtoOuterClass.followActionResponse;
import grpc.UserDtoOuterClass.getFollowingsRequest;
import grpc.UserDtoOuterClass.getFollowingsResponse;
import grpc.UserDtoOuterClass.loginRequest;
import grpc.UserDtoOuterClass.loginResponse;
import grpc.RecipeDtoOuterClass.RecipeDto;
import grpc.UserDtoOuterClass;
import grpc.UserServiceGrpc;
import org.modelmapper.ModelMapper;
import io.grpc.stub.StreamObserver;
import java.util.List;
import java.util.Set;
import dao.RecipeDao;
import dao.UserDao;
import entities.Recipe;
import entities.User;
import services.RecipeService;


public class UserService extends UserServiceGrpc.UserServiceImplBase {

	private final ModelMapper modelMapper = new ModelMapper();

	private UserDto mapUserToUserDto(User user) {
		return UserDto.newBuilder()
			.setIdUser(user.getIdUser())
			.setName(user.getName())
			.setEmail(user.getEmail())
			.setUsername(user.getUsername())
			.setPassword(user.getPassword())
			.build();
	}
	

	@Override
	public void addUser(UserDto request, StreamObserver<ServerResponseUser> responseObserver) {

		// Construye la respuesta que enviará el servidor luego de que se llame al
		// metodo addUser desde el Client.
		UserDtoOuterClass.ServerResponseUser.Builder serverResponse = UserDtoOuterClass.ServerResponseUser.newBuilder();

		try {

			User userToAdd = modelMapper.map(request, User.class);

			User userAdded = null;

			userAdded = UserDao.getInstance().addOrUpdateUser(userToAdd);

			serverResponse.setMessage("Usuario añadido correctamente");

			serverResponse.setIdUser(userAdded.getIdUser());

		} catch (Exception e) {

			serverResponse.setMessage("Error al añadir Usuario: " + e.getMessage());

		} finally {

			// Envia la respuesta al cliente
			responseObserver.onNext(serverResponse.build());

			// Indica que se completó la respuesta del servidor
			responseObserver.onCompleted();
		}
	}

	@Override
	public void getAllUsers(EmptyUser request, StreamObserver<AllUsersResponse> responseObserver) {

		UserDtoOuterClass.AllUsersResponse.Builder allUsersResponseBuilder = UserDtoOuterClass.AllUsersResponse.newBuilder();

		try {

			List<User> userList = UserDao.getInstance().getAll();

			for (User user : userList) {

				UserDto userDto = mapUserToUserDto(user);

				allUsersResponseBuilder.addUsers(userDto);
			}

		} catch (Exception e) {

			System.out.println("Error al enviar la lista de usuarios: " + e.getMessage());

		} finally {

			responseObserver.onNext(allUsersResponseBuilder.build());
			responseObserver.onCompleted();
		}
	}
	/*
	 * @Override public void getFavoriteRecipes(getFavoriteRecipesRequest
	 * request,StreamObserver<getFavoriteRecipesResponse> responseObserver) {
	 * 
	 * UserDtoOuterClass.getFavoriteRecipesResponse.Builder response =
	 * UserDtoOuterClass.getFavoriteRecipesResponse.newBuilder();
	 * 
	 * try {
	 * 
	 * Set<Recipe> recipeList =
	 * UserDao.getInstance().getUserFavoriteRecipe(request.getIdUser());
	 * 
	 * for (Recipe recipe : recipeList) {
	 * 
	 * 
	 * }
	 * 
	 * } catch (Exception e) {
	 * 
	 * System.out.println("Error al enviar la lista de recetas favoritas: " +
	 * e.getMessage());
	 * 
	 * } finally {
	 * 
	 * responseObserver.onNext(response.build()); responseObserver.onCompleted(); }
	 * }
	 */
	
	

	@Override
	public void getFollowings(getFollowingsRequest request, StreamObserver<getFollowingsResponse> responseObserver) {

		UserDtoOuterClass.getFollowingsResponse.Builder response = UserDtoOuterClass.getFollowingsResponse.newBuilder();
		
		try {

			Set<User> userList = UserDao.getInstance().getUserFollowing(request.getIdUser());

			for (User user : userList) {

				UserDto userDto = mapUserToUserDto(user);

				response.addFollowers(userDto);
			}

		} catch (Exception e) {

			System.out.println("Error al enviar la lista de seguidos: " + e.getMessage());

		} finally {

			responseObserver.onNext(response.build());
			responseObserver.onCompleted();
		}

	}

	@Override
	public void followAction(followActionRequest request, StreamObserver<followActionResponse> responseObserver) {

		followActionResponse.Builder response = followActionResponse.newBuilder();

		try {
			User userFollower = UserDao.getInstance().getUserById(request.getIdFollower());

			User userFollowing = UserDao.getInstance().getUserById(request.getIdFollowing());

			if (userFollower == null || userFollowing == null) throw new Exception("Error, usuario null");

			Set<User> followers = UserDao.getInstance().getUserFollowing(request.getIdFollower());

			if (followers.contains(userFollowing)) {

				followers.remove(userFollowing);

				response.setMessage("Se dejó de seguir al usuario correctamente");

			} else {

				followers.add(userFollowing);

				response.setMessage("Siguiendo al usuario correctamente");
			}

			userFollower.setFollowing(followers);

			UserDao.getInstance().addOrUpdateUser(userFollower);

		} catch (Exception e) {

			response.setMessage("Error al realizar la accion de seguir o dejar de seguir: " + e.getMessage());

		} finally {

			responseObserver.onNext(response.build());
			responseObserver.onCompleted();
		}
	}

	@Override
	public void login(loginRequest request, StreamObserver<loginResponse> responseObserver) {

		loginResponse.Builder response = loginResponse.newBuilder();

		try {

			User user = UserDao.getInstance().getUserByUsernameAndPassword(request.getUsername(),request.getPassword());

			if (user == null) {

				response.setMessage("Usuario o contraseña incorrectos");

			} else {

				response.setMessage("Usuario logueado correctamente");
				response.setUserId(user.getIdUser());
			}

		} catch (Exception e) {

			response.setMessage("Error al realizar el login: " + e.getMessage());

		} finally {

			responseObserver.onNext(response.build());
			responseObserver.onCompleted();
		}
	}

}