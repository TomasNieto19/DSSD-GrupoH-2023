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

        [HttpGet("userRecipes/{userId}")]
        public async Task<IActionResult> GetRecipeByUserId(int userId)
        {

            var request = new getRecipesByUserIdRequest { IdUser = userId };

            return Ok(await recipeServiceClient.getRecipesByUserIdAsync(request));

        }

        [HttpPut("edit")]
        public async Task<IActionResult> EditRecipe(RecipeRequest recipeRequest)
        {

           if (recipeRequest.Recipe != null)
            {
                var recipeDto = recipeRequest.Recipe;

                // Mapea el array de fotos request al array de fotos del RecipeDto por ser solo lectura
                recipeDto.Photos.AddRange(recipeRequest.Photos.Select(photoRequest => new Photo { Url = photoRequest.Url }));

                return Ok(await recipeServiceClient.editRecipeAsync(recipeDto));  
            }
            
            return BadRequest("La receta no puede ser nula");

        }

        [HttpPost("addRecipe")]
        public async Task<IActionResult> AddRecipe(RecipeRequest recipeRequest)
        {
            if (recipeRequest.Recipe != null)
            {
                var recipeDto = recipeRequest.Recipe;

                // Mapea el array de fotos request al array de fotos del RecipeDto por ser solo lectura
                recipeDto.Photos.AddRange(recipeRequest.Photos.Select(photoRequest => new Photo { Url = photoRequest.Url }));

                return Ok(await recipeServiceClient.addRecipeAsync(recipeDto));
            }
            
            return BadRequest("La receta no puede ser nula");

        }
    }

    public class PhotoRequest
    {
        public string? Url { get; set; }
    }
    public class RecipeRequest
    {
        public RecipeDto? Recipe { get; set; }
        public List<PhotoRequest> Photos { get; set; }
        public RecipeRequest()
        {
            Photos = new List<PhotoRequest>();
        }
    }
}