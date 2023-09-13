package dao;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import entities.Recipe;

public class RecipeDao {

	private static RecipeDao instance;

	// Patron Singleton para reutilizar la instancia en el serivce
	public static RecipeDao getInstance() {

		if (instance == null) {
			instance = new RecipeDao();
		}
		return instance;
	}

	// Metodo para persistir una receta en la BD
	public Recipe addOrUpdateRecipe(Recipe recipe) throws Exception {

		EntityManager em = JPAUtil.getEMF().createEntityManager();
		Recipe recipeAdded = null;

		try {

			em.getTransaction().begin();
			recipeAdded = em.merge(recipe);
			em.getTransaction().commit();

		} catch (Exception e) {

			throw new Exception("Error al persistir Receta:  " + e.getMessage());

		} finally {

			em.close();
		}

		return recipeAdded;
	}

	// Metodo para traer todas las recetas
	@SuppressWarnings("unchecked")
	public List<Recipe> getAll() {

		EntityManager em = JPAUtil.getEMF().createEntityManager();
		List<Recipe> recetas = new ArrayList<>();

		try {

			String jpql = "SELECT r FROM Recipe r";
			Query query = em.createQuery(jpql, Recipe.class);
			recetas = query.getResultList();

		} finally {

			em.close();
		}

		return recetas;
	}

	// Metodo para traer receta por id
	public Recipe getRecipeById(int recipeId) {

		EntityManager em = JPAUtil.getEMF().createEntityManager();
		Recipe recipe = null;

		try {

			recipe = em.find(Recipe.class, recipeId);

		} finally {

			em.close();
		}

		return recipe;
	}

	// Metodo para traer las recetas del usuario
	@SuppressWarnings("unchecked")
	public List<Recipe> getRecipeByUserId(int userId) {

		EntityManager em = JPAUtil.getEMF().createEntityManager();
		List<Recipe> recetas = new ArrayList<>();

		try {

			String jpql = "SELECT r FROM Recipe r WHERE r.user.id = :userId";
			Query query = em.createQuery(jpql, Recipe.class);
			query.setParameter("userId", userId);
			recetas = query.getResultList();

		} finally {

			em.close();
		}

		return recetas;
	}

}