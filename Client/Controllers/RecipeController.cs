using Microsoft.AspNetCore.Mvc;
using Grpc.Net.Client;
using static UserService;

namespace Client.Controllers
{
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly GrpcChannel channel = GrpcChannel.ForAddress(GlobalConstants.JavaServerGRPC);
        private readonly RecipeService.RecipeServiceClient recipeServiceClient;

        public RecipeController()
        {
            recipeServiceClient = new RecipeService.RecipeServiceClient(channel);
        }

        [HttpGet("recipes")]
        public async Task<IActionResult> GetRcipes()
        {

            return Ok(await recipeServiceClient.getAllRecipeAsync(new EmptyRecipe()));

        }

        [HttpGet("recipe/{id}")]
        public async Task<IActionResult> GetRecipeById(int id)
        {

            var request = new getRecipeByIdRequest { IdRecipe = id };

            return Ok(await recipeServiceClient.getRecipeByIdAsync(request));

        }

        [HttpGet("userRecipes/{id}")]
        public async Task<IActionResult> GetRecipeByUserId(int id)
        {

            var request = new getRecipesByUserIdRequest { IdUser = id };

            return Ok(await recipeServiceClient.getRecipesByUserIdAsync(request));

        }

        [HttpPost("addRecipe")]
        public async Task<IActionResult> AddRecipe(RecipeDto recipeDto)
        {

            return Ok(await recipeServiceClient.addRecipeAsync(recipeDto));

        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditRecipe(RecipeDto recipeDto)
        {

            return Ok(await recipeServiceClient.editRecipeAsync(recipeDto));

        }
        [HttpGet("favoriteRecipes/{idUser}")]
        public async Task<IActionResult> GetFavoriteRecipes(int idUser)
        {
            var request = new getFavoriteRecipesRequest { UserId = idUser };

            return Ok(await recipeServiceClient.getFavoriteRecipesAsync(request));
        }

    }
}