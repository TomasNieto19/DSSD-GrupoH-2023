﻿using Grpc.Net.Client;
class Program
{
    static async Task Main(string[] args)
    {

        AppContext.SetSwitch("System.Net.Http.SocketsHttpHandler.Http2UnencryptedSupport", true);

        using var channel = GrpcChannel.ForAddress("http://localhost:8081");


        // PRUEBA DEL HELLO WORLD
        var client = new Greeter.GreeterClient(channel);

        var reply = await client.SayHelloAsync(new HelloRequest { Name = "Mundo" });

        Console.WriteLine("Greeting from .NET: " + reply.Message);
        


        // PRUEBA DEL ADD USER
        var userServiceClient = new UserService.UserServiceClient(channel);

        var userDto = new UserDto
        {
            Name = "John Doe",
            Email = "johndoe@example.com",
            Username = "johndoe",
            Password = "password123"
        };

        var serverResponse = await userServiceClient.addUserAsync(userDto);
        Console.WriteLine("Server Response: " + serverResponse.Message);
        


        /*/ PRUEBA DEL GET ALL USERS
        var userServiceClient = new UserService.UserServiceClient(channel);

        var allUsersResponse = await userServiceClient.getAllUsersAsync(new Empty());

        foreach (var userDto in allUsersResponse.Users)
        {
            Console.WriteLine($"User ID: {userDto.IdUser}, Name: {userDto.Name}, Email: {userDto.Email}");
        }
        */


        /*/ PRUEBA DEL GET RECETA POR ID
        var recipeServiceClient = new RecipeService.RecipeServiceClient(channel);

        var request = new getRecipeByIdRequest
        {
            IdRecipe = 1
        };

        var serverResponse = await recipeServiceClient.getRecipeByIdAsync(request);
    
        Console.WriteLine(serverResponse);
        */
    }
}