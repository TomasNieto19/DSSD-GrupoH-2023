package dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import entities.RecipeBook;
import entities.Recipe_has_report;
import entities.Recipe_in_RecipeBook;

public class RecipeHasReportDao {
	private static RecipeHasReportDao instance;
	
	public static RecipeHasReportDao getInstance() {

		if (instance == null) {
			instance = new RecipeHasReportDao();
		}
		return instance;
	}
	
	// Metodo para persistir un Reportes en la BD

		public Recipe_has_report addOrUpdateReport(Recipe_has_report recipe_has_report) throws Exception {

			EntityManager em = JPAUtil.getEMF().createEntityManager();

			Recipe_has_report recipeReportAdd = null;

			try {
				em.getTransaction().begin();
				recipeReportAdd = em.merge(recipe_has_report);
				em.getTransaction().commit();

			} catch (Exception e) {

				throw new Exception("Error al persistir Recetario: " + e.getMessage());

			} finally {

				em.close();
			}

			return recipeReportAdd;
		}
		
		// Metodo para traer todos las recetas con reportes de la BD
		@SuppressWarnings("unchecked")
		public List<Recipe_has_report> getAll() {

			EntityManager em = JPAUtil.getEMF().createEntityManager();
			List<Recipe_has_report> recetasDenunciadas = new ArrayList<>();

			try {

				String jpql = "SELECT rr FROM Recipe_has_report rr where rr.is_reason = true";
				Query query = em.createQuery(jpql, Recipe_has_report.class);
				recetasDenunciadas = query.getResultList();

			} finally {

				em.close();
			}

			return recetasDenunciadas;
		}
		
		@SuppressWarnings("unchecked")
		public String ignoreRecipeReport(int id_report) {

			String res = "";
			EntityManager em = JPAUtil.getEMF().createEntityManager();

			try {
				em.getTransaction().begin();
				
				String jpql1="UPDATE Recipe_has_report r SET r.is_reason = false WHERE r.id_report = :id_report";
				Query query1=em.createQuery(jpql1);
				query1.setParameter("id_report", id_report);
				query1.executeUpdate();
			
				
				em.getTransaction().commit();

				res = "Reporte ignorado";

			} catch (Exception e) {
				res = "Error al ignorar receta denuncia.";
			}
			return res;
		}
		
		@SuppressWarnings("unchecked")
		public String deleteRecipeReport(int id_recipe) {
		    String res = "";
		    EntityManager em = JPAUtil.getEMF().createEntityManager();

		    try {
		        em.getTransaction().begin();
		        String sql3 = "DELETE FROM favorite_recipes WHERE id_recipe = :id_recipe";
		        Query query3 = em.createNativeQuery(sql3);
		        query3.setParameter("id_recipe", id_recipe);
		        int rowsDeleted3 = query3.executeUpdate();

		        String sql2 = "DELETE FROM recipe_has_report WHERE id_recipe = :id_recipe";
		        Query query2 = em.createNativeQuery(sql2);
		        query2.setParameter("id_recipe", id_recipe);
		        int rowsDeleted2 = query2.executeUpdate();
		        
		        String sql = "DELETE FROM recipe WHERE id_recipe = :id_recipe";
		        Query query = em.createNativeQuery(sql);
		        query.setParameter("id_recipe", id_recipe);
		        int rowsDeleted = query.executeUpdate();

		        em.getTransaction().commit();

		        if (rowsDeleted > 0) {
		            res = "Receta eliminada";
		        } else {
		            res = "No se encontró la receta con el ID especificado.";
		        }

		    } catch (Exception e) {
		        res = "Error al borrar receta: " + e.getMessage();
		    } finally {
		        em.close();
		    }

		    return res;
		}
}
