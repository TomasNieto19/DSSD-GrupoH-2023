using Microsoft.AspNetCore.Mvc;
using Grpc.Net.Client;

namespace Client.Controllers
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly GrpcChannel channel = GrpcChannel.ForAddress(GlobalConstants.JavaServerGRPC);
        private readonly UserService.UserServiceClient userServiceClient;

        public UserController()
        {
            userServiceClient = new UserService.UserServiceClient(channel);
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {

            return Ok(await userServiceClient.getAllUsersAsync(new Empty()));

        }

        [HttpPost("addUser")]
        public async Task<IActionResult> AddUser(UserDto userDto)
        {

            return Ok(await userServiceClient.addUserAsync(userDto));

        }


    }
}