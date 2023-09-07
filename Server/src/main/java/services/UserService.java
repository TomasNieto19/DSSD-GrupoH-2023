package services;

import grpc.UserDtoOuterClass.ServerResponseUser;
import grpc.UserDtoOuterClass.AllUsersResponse;
import grpc.UserDtoOuterClass.EmptyUser;
import grpc.UserDtoOuterClass.UserDto;
import grpc.UserDtoOuterClass.followActionRequest;
import grpc.UserDtoOuterClass.followActionResponse;
import grpc.UserDtoOuterClass.getFollowersRequest;
import grpc.UserDtoOuterClass.getFollowersResponse;
import grpc.UserDtoOuterClass;
import grpc.UserServiceGrpc;
import org.modelmapper.ModelMapper;
import io.grpc.stub.StreamObserver;
import java.util.List;
import java.util.Set;
import dao.UserDao;
import entities.User;

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

		// Construye la respuesta que enviará el servidor luego de que se llame al metodo addUser desde el Client.
		UserDtoOuterClass.ServerResponseUser.Builder serverResponse = UserDtoOuterClass.ServerResponseUser.newBuilder();

		try {

			User userToAdd = modelMapper.map(request, User.class);
			User userAdded = null;
			userAdded = UserDao.getInstance().addUser(userToAdd);
			
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

		UserDtoOuterClass.AllUsersResponse.Builder allUsersResponseBuilder = UserDtoOuterClass.AllUsersResponse
				.newBuilder();

		try {

			List<User> userList = UserDao.getInstance().getAll();

			for (User user : userList) {

				UserDto userDto = mapUserToUserDto(user);

				allUsersResponseBuilder.addUsers(userDto);
			}

		} catch (Exception e) {

			System.out.println("Error al enviar la lista de usuarios");

		} finally {

			responseObserver.onNext(allUsersResponseBuilder.build());
			responseObserver.onCompleted();
		}
	}

	
	@Override
	public void getFollowers(getFollowersRequest request, StreamObserver<getFollowersResponse> responseObserver) {
	
		UserDtoOuterClass.getFollowersResponse.Builder response = UserDtoOuterClass.getFollowersResponse.newBuilder();

		try {

			Set<User> userList = UserDao.getInstance().getUserFollowers(request.getIdUser());

			for (User user : userList) {

				UserDto userDto = mapUserToUserDto(user);

				response.addFollowers(userDto);
			}

		} catch (Exception e) {

			System.out.println("Error al enviar la lista de usuarios");

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
			
			if( userFollower == null || userFollowing == null ) throw new Exception("Error, usuario null");
			
			Set<User> followers = UserDao.getInstance().getUserFollowers(request.getIdFollower());
			
			if( followers.contains(userFollowing) ) {
				
				followers.remove(userFollowing);

				response.setMessage("Se dejó de seguir al usuario correctamente");
				
			}else {
				
				followers.add(userFollowing);
				
				response.setMessage("Siguiendo al usuario correctamente");
			}
			
			userFollower.setFollowers(followers);
			
			UserDao.getInstance().addUser(userFollower);
			
		} catch (Exception e) {
			
			response.setMessage("Error al realizar la accion de seguir o dejar de seguir: " + e.getMessage());
		 
		}finally {
			
			responseObserver.onNext(response.build());
			responseObserver.onCompleted();
		}
	}


}