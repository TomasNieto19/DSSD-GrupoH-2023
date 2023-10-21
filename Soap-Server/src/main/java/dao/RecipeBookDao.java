package dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import entities.RecipeBook;
import entities.Recipe_in_RecipeBook;

public class RecipeBookDao {

	private static RecipeBookDao instance;

	// Patron Singleton para reutilizar la instancia en el serivce
	public static RecipeBookDao getInstance() {

		if (instance == null) {
			instance = new RecipeBookDao();
		}
		return instance;
	}

	// Metodo para persistir un recetarios en la BD

	public RecipeBook addOrUpdateRecipeBook(RecipeBook recipeBook) throws Exception {

		EntityManager em = JPAUtil.getEMF().createEntityManager();

		RecipeBook recipeBookAdd = null;

		try {
			em.getTransaction().begin();
			recipeBookAdd = em.merge(recipeBook);
			em.getTransaction().commit();

		} catch (Exception e) {

			throw new Exception("Error al persistir Recetario: " + e.getMessage());

		} finally {

			em.close();
		}

		return recipeBookAdd;
	}

	// Metodo para traer todos los recetarios de la BD
	@SuppressWarnings("unchecked")
	public List<RecipeBook> getAll() {

		EntityManager em = JPAUtil.getEMF().createEntityManager();
		List<RecipeBook> recetarios = new ArrayList<>();

		try {

			String jpql = "SELECT rp FROM RecipeBook rp";
			Query query = em.createQuery(jpql, RecipeBook.class);
			recetarios = query.getResultList();

		} finally {

			em.close();
		}

		return recetarios;
	}

	// Metodo para traer Recetario por id
	public RecipeBook getRecipeBookById(int idRecipeBook) {

		EntityManager em = JPAUtil.getEMF().createEntityManager();
		RecipeBook recetario = null;

		try {

			recetario = em.find(RecipeBook.class, idRecipeBook);

		} finally {

			em.close();
		}

		return recetario;
	}

	public String deleteRecipeBook(int idRecipeBook) {

		String res = "";
		EntityManager em = JPAUtil.getEMF().createEntityManager();
		RecipeBook recetario = null;

		try {
			recetario = em.find(RecipeBook.class, idRecipeBook);// lo busco
			em.getTransaction().begin();
			em.remove(recetario);
			em.getTransaction().commit();

			res = "Recetario eliminado correctamente.";

		} catch (Exception e) {
			res = "Error al borrar recetario.";
		}

		return res;

	}

	// ----------------Recipe_in_RecipeBook----------------
	public Recipe_in_RecipeBook addOrUpdateRecipeInRecipeBook(Recipe_in_RecipeBook recipe_in_recipeBook)
			throws Exception {

		EntityManager em = JPAUtil.getEMF().createEntityManager();

		Recipe_in_RecipeBook RecipeToAddInRecipeBook = null;

		try {
			em.getTransaction().begin();
			RecipeToAddInRecipeBook = em.merge(recipe_in_recipeBook);
			em.getTransaction().commit();

		} catch (Exception e) {

			throw new Exception("Error al agregar receta en el recetario: " + e.getMessage());

		} finally {

			em.close();
		}

		return RecipeToAddInRecipeBook;
	}

	@SuppressWarnings({ "unchecked" })
	public List<Recipe_in_RecipeBook> getRecipeInRecipeBookById(int id_recipe_book) {

		EntityManager em = JPAUtil.getEMF().createEntityManager();
		List<Recipe_in_RecipeBook> recetarioConRecetas = new ArrayList<>();
		try {
			
			String jpql = "SELECT rp FROM Recipe_in_RecipeBook rp where rp.id_recipe_book = :id_recipe_book";
			Query query = em.createQuery(jpql, Recipe_in_RecipeBook.class);
			query.setParameter("id_recipe_book", id_recipe_book);
			recetarioConRecetas = query.getResultList();

		} finally {

			em.close();
		}

		return recetarioConRecetas;
	}
	@SuppressWarnings("unchecked")
	public String deleteRecipefromRecipeBook(int id_recipe_book, int id_recipe) {

		String res = "";
		EntityManager em = JPAUtil.getEMF().createEntityManager();
		List<Recipe_in_RecipeBook> recetaEnRecetario = null;

		try {
			em.getTransaction().begin();
			
			String jpql1="SELECT rp FROM Recipe_in_RecipeBook rp WHERE rp.id_recipe_book = :id_recipe_book AND rp.id_recipe = :id_recipe";
			Query query1=em.createQuery(jpql1,Recipe_in_RecipeBook.class);
			query1.setParameter("id_recipe_book", id_recipe_book);
			query1.setParameter("id_recipe", id_recipe);
			recetaEnRecetario=query1.getResultList();
			
			if(recetaEnRecetario.isEmpty()) {//si no existe lo que quiero borrar que no continue con la ejecucion
				
				throw new Exception();
			}
			//si no agrego lo de arriba nose porque pero no funciona bien el delete xd
			
			String jpql2 = "DELETE Recipe_in_RecipeBook rp WHERE rp.id_recipe_book = :id_recipe_book AND rp.id_recipe = :id_recipe";
			
			Query query2 = em.createQuery(jpql2);//se rompe aca
			query2.setParameter("id_recipe_book", id_recipe_book);
			query2.setParameter("id_recipe", id_recipe);
			query2.executeUpdate();
			
			em.getTransaction().commit();

			res = "Receta eliminado del Recetario correctamente.";

		} catch (Exception e) {
			res = "Error al borrar receta del recetario.";
		}
		return res;
	}
}
