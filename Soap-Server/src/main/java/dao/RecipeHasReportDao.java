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
		        String sql8 = "DELETE FROM recipe_in_recipebook WHERE id_recipe = :id_recipe";
                Query query8 = em.createNativeQuery(sql8);
                query8.setParameter("id_recipe", id_recipe);
                int rowsDeleted8 = query8.executeUpdate();
                System.out.println("delete recipe_in_recipebook");
		        
                String sql6 = "DELETE FROM popularity_recipes WHERE id_recipe = :id_recipe";
                Query query6 = em.createNativeQuery(sql6);
                query6.setParameter("id_recipe", id_recipe);
                int rowsDeleted6 = query6.executeUpdate();
                System.out.println("delete popularity_recipes");
		        
                String sql5 = "DELETE FROM photo WHERE id_recipe = :id_recipe";
                Query query5 = em.createNativeQuery(sql5);
                query5.setParameter("id_recipe", id_recipe);
                int rowsDeleted5 = query5.executeUpdate();
                System.out.println("delete photo");
		        
                String sql4 = "DELETE FROM comments_recipes WHERE id_recipe_comment = :id_recipe";
                Query query4 = em.createNativeQuery(sql4);
                query4.setParameter("id_recipe", id_recipe);
                int rowsDeleted4 = query4.executeUpdate();
                System.out.println("delete comments_recipes");
		        
                String sql3 = "DELETE FROM favorite_recipes WHERE id_recipe = :id_recipe";
		        Query query3 = em.createNativeQuery(sql3);
		        query3.setParameter("id_recipe", id_recipe);
		        int rowsDeleted3 = query3.executeUpdate();
		        System.out.println("delete favorite_recipes");
		        
		        String sql2 = "DELETE FROM recipe_has_report WHERE id_recipe = :id_recipe";
		        Query query2 = em.createNativeQuery(sql2);
		        query2.setParameter("id_recipe", id_recipe);
		        int rowsDeleted2 = query2.executeUpdate();
		        System.out.println("delete recipe_has_report");
		        
		        String sql = "DELETE FROM recipe WHERE id_recipe = :id_recipe";
		        Query query = em.createNativeQuery(sql);
		        query.setParameter("id_recipe", id_recipe);
		        int rowsDeleted = query.executeUpdate();
		        System.out.println("delete recipe");
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
