﻿using Grpc.Net.Client;
class Program
{
    static async Task Main(string[] args)
    {
        AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

        using var channel = GrpcChannel.ForAddress("http://localhost:8081");

        var client = new Greeter.GreeterClient(channel);

        var reply = await client.SayHelloAsync(new HelloRequest { Name = "World" });

        Console.WriteLine("Greeting from .NET: " + reply.Message);
    }
}