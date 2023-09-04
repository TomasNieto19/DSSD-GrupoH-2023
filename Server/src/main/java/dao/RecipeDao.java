package dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import entities.Recipe;
import entities.User;

public class RecipeDao {

	//METODOS A IMPLEMENTAR: - EDITAR RECETA	 

	private static RecipeDao instance;

	// Patron Singleton para reutilizar la instancia en el serivce
	public static RecipeDao getInstance() {

		if (instance == null) {
			instance = new RecipeDao();
		}
		return instance;
	}

	
	// Metodo para persistir un usuario en la BD
	public Recipe addRecipe(Recipe recipe) throws Exception {

		EntityManager em = JPAUtil.getEMF().createEntityManager();
		Recipe entity = null;

		try {

			em.getTransaction().begin();
			entity = em.merge(recipe);
			em.getTransaction().commit();

		} catch (Exception e) {

			throw new Exception("Error al persistir Receta:  " + e.getMessage());

		} finally {
			em.close();
		}

		return entity;
	}
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

	
}