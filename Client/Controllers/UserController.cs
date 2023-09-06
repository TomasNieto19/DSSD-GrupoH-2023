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

            return Ok(await userServiceClient.getAllUsersAsync(new EmptyUser()));

        }

        [HttpGet("followers/{id}")]
        public async Task<IActionResult> GetFollowers(int id)
        {

            var request = new getFollowersRequest { IdUser = id };

            return Ok(await userServiceClient.getFollowersAsync(request));

        }

        [HttpPost("addUser")]
        public async Task<IActionResult> AddUser(UserDto userDto)
        {

            return Ok(await userServiceClient.addUserAsync(userDto));

        }

        [HttpPost("followers/{idFollower}/{idFollowing}")]
        public async Task<IActionResult> FollowAction(int idFollower, int idFollowing)
        {

            var request = new followActionRequest { IdFollower = idFollower, IdFollowing = idFollowing };

            return Ok(await userServiceClient.followActionAsync(request));

        }


    }
}