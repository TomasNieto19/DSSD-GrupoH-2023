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

        [HttpGet("followings/{id}")]
        public async Task<IActionResult> GetFollowings(int id)
        {

            var request = new getFollowingsRequest { IdUser = id };

            return Ok(await userServiceClient.getFollowingsAsync(request));

        }

        [HttpPost("addUser")]
        public async Task<IActionResult> AddUser(UserDto userDto)
        {

            return Ok(await userServiceClient.addUserAsync(userDto));

        }

        [HttpPost("followAction")]
        public async Task<IActionResult> FollowAction(int idFollower, int idFollowing)
        {

            var request = new followActionRequest { IdFollower = idFollower, IdFollowing = idFollowing };

            return Ok(await userServiceClient.followActionAsync(request));

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(string username, string password)
        {

            var request = new loginRequest { Username = username, Password = password };

            return Ok(await userServiceClient.loginAsync(request));

        }
        [HttpGet("favoriteRecipes/{id}")]
        public async Task<IActionResult> getUserFavoriteRecipe(int id)
        {
            var request = new getFavoriteRecipesRequest { IdUser = id };

            return Ok(await userServiceClient.getFavoriteRecipesAsync(request));

        }



    }
}