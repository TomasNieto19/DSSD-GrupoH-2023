package dao;

import javax.persistence.EntityManager;
import entities.Recipe;

public class RecipeDao {

	/*
	 * METODOS A IMPLEMENTAR: - AGREGAR RECETA - EDITAR RECETA
	 */

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

	
}