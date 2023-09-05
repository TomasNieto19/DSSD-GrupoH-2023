package services;

import grpc.UserDtoOuterClass.ServerResponseUser;
import grpc.UserDtoOuterClass.AllUsersResponse;
import grpc.UserDtoOuterClass.EmptyUser;
import grpc.UserDtoOuterClass.UserDto;
import grpc.UserDtoOuterClass;
import grpc.UserServiceGrpc;
import org.modelmapper.ModelMapper;
import io.grpc.stub.StreamObserver;
import java.util.List;
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

		// Construye la respuesta que enviará el servidor luego de que se llame al
		// metodo addUser desde el Client.
		UserDtoOuterClass.ServerResponseUser.Builder serverResponse = UserDtoOuterClass.ServerResponseUser.newBuilder();

		try {

			User userToAdd = modelMapper.map(request, User.class);

			UserDao.getInstance().addUser(userToAdd);

			serverResponse.setMessage("Usuario añadido correctamente");

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

	
}