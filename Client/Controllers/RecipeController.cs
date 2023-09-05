using Microsoft.AspNetCore.Mvc;
using Grpc.Net.Client;

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

        [HttpPost("addRecipe")]
        public async Task<IActionResult> AddRecipe(RecipeDto recipeDto)
        {

            return Ok(await recipeServiceClient.addRecipeAsync(recipeDto));

        }


    }
}