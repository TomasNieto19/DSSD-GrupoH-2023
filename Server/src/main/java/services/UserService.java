package services;

import grpc.UserServiceGrpc;
import grpc.UserDtoOuterClass;
import java.util.List;
import org.modelmapper.ModelMapper;
import dao.UserDao;
import entities.User;
import grpc.UserDtoOuterClass.AllUsersResponse;
import grpc.UserDtoOuterClass.Empty;
import grpc.UserDtoOuterClass.ServerResponse;
import grpc.UserDtoOuterClass.UserDto;
import io.grpc.stub.StreamObserver;

public class UserService extends UserServiceGrpc.UserServiceImplBase {

	private final ModelMapper modelMapper = new ModelMapper();

	private UserDto mapUserToUserDto(User user) {
		return UserDto.newBuilder().setIdUser(user.getIdUser()).setName(user.getName()).setEmail(user.getEmail())
				.setUsername(user.getUsername()).setPassword(user.getPassword()).build();
	}

	
	@Override
	public void addUser(UserDto request, StreamObserver<ServerResponse> responseObserver) {
		
		// Construye la respuesta que enviará el servidor luego de que se llame al metodo addUser desde el Client.
		UserDtoOuterClass.ServerResponse.Builder serverResponse = UserDtoOuterClass.ServerResponse.newBuilder();

		try {

			User userToAdd = modelMapper.map(request, User.class);

			UserDao.getInstance().addUser(userToAdd);
			
			serverResponse.setMessage("Usuario añadido correctamente");

		} catch (Exception e) {

			serverResponse.setMessage("Error al añadir Usuario: " + e.getMessage());

		} finally {
			
			//Envia la respuesta al cliente
			responseObserver.onNext(serverResponse.build());
			
			//Indica que se completó la respuesta del servidor
			responseObserver.onCompleted();
		}
	}

	
	@Override
	public void getAllUsers(Empty request, StreamObserver<AllUsersResponse> responseObserver) {

		UserDtoOuterClass.AllUsersResponse.Builder allUsersResponseBuilder = UserDtoOuterClass.AllUsersResponse.newBuilder();

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