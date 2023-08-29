package services;

import grpc.Greet;
import grpc.GreeterGrpc;
import io.grpc.stub.StreamObserver;

public class GreeterService extends GreeterGrpc.GreeterImplBase {

	@Override
	public void sayHello(Greet.HelloRequest request, StreamObserver<Greet.HelloReply> responseObserver) {
		String name = request.getName();
		String message = "Hello, from JAVA " + name + "!";

		Greet.HelloReply reply = Greet.HelloReply.newBuilder().setMessage(message).build();

		responseObserver.onNext(reply);
		responseObserver.onCompleted();
	}

}