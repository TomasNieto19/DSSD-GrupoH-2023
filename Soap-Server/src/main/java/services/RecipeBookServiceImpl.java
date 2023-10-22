package services;

import java.util.List;

import javax.jws.WebService;

import dao.RecipeBookDao;
import entities.RecipeBook;
import entities.Recipe_in_RecipeBook;


@WebService(endpointInterface = "services.IRecipeBookService")//tome los metodos desde aca.
public class RecipeBookServiceImpl implements IRecipeBookService  {

	public String addRecipeBook(String name, int iduser) {
		
		String res="";
		
		try {
			
			RecipeBook recipeBookToAdd = new RecipeBook(name,iduser);
			
			RecipeBookDao.getInstance().addOrUpdateRecipeBook(recipeBookToAdd);

			res="Recetario añadido con exito";

		} catch (Exception e) {

			res="Error al añadir Recetario.";
	}
		return res;
	}

	@Override
	public List<RecipeBook> getAllRecipeBook() {
		List<RecipeBook> recetarios = RecipeBookDao.getInstance().getAll();
		return recetarios;
	}

	@Override
	public RecipeBook getRecipeBookById(int idRecipeBook) {
		RecipeBook recetario = RecipeBookDao.getInstance().getRecipeBookById(idRecipeBook);
		return recetario;
	}

	@Override
	public String deleteRecipeBook(int idRecipeBook) {
		String res="";
		
		try {
			
			RecipeBookDao.getInstance().deleteRecipeBook(idRecipeBook);

			res="Recetario eliminado con exito";

		} catch (Exception e) {

			res="Error al eliminar Recetario.";
		}
		return res;
	}

	@Override
	public String addRecipeInRecipeBook(int id_recipe_book, int id_recipe) {
		String res="";
		
		try {
			
			Recipe_in_RecipeBook aux = new Recipe_in_RecipeBook(id_recipe_book,id_recipe);
			
			RecipeBookDao.getInstance().addOrUpdateRecipeInRecipeBook(aux);

			res="Receta añadida al Recetario con exito";

		} catch (Exception e) {

			res="Error al añadir Receta al Recetario";
	}
		return res;
	
	}

	@Override
	public List<Recipe_in_RecipeBook> getRecipeInRecipeBookById(int id_recipe_book) {
		return RecipeBookDao.getInstance().getRecipeInRecipeBookById(id_recipe_book);
	}

	@Override
	public String deleteRecipefromRecipeBook(int id_recipe_book, int id_recipe) {
		String res="";
		
		try {
			
			RecipeBookDao.getInstance().deleteRecipefromRecipeBook(id_recipe_book, id_recipe);

			res="Receta eliminada del Recetario con exito";

		} catch (Exception e) {

			res="Error al eliminar Receta del recetario.";
		}
		return res;
	}

	@Override
	public boolean userIsModerator(int iduser) {
		return RecipeBookDao.getInstance().userIsModerator(iduser);
	}
	

}
