package server;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import java.io.IOException;
import services.*;

public class server {

	public static void main(String[] args) throws IOException, InterruptedException {

		System.out.println("Iniciando servidor");

		Server server = ServerBuilder.forPort(8081)
				.addService(new RecipeService())
				.addService(new UserService())
				.build();

		server.start();

		System.out.println("Servidor en puerto " + server.getPort());
		
		server.awaitTermination();

	}
}