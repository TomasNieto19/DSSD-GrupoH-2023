package dao;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import entities.RecetasChef;
import entities.RecipeBook;
import entities.Recipe_in_RecipeBook;
import entities.UsuarioChef;

public class RecetasChefDao {
	
	
	
	private static RecetasChefDao instance;

	// Patron Singleton para reutilizar la instancia en el serivce
	public static RecetasChefDao getInstance() {

		if (instance == null) {
			instance = new RecetasChefDao();
		}
		return instance;
	}
	
	
	// Metodo para persistir un recetarios en la BD

		public RecetasChef 	addRecetasChef(RecetasChef recetasChefEnCasa) throws Exception {

			EntityManager em = JPAUtil.getEMF().createEntityManager();

			RecetasChef addrecetasChefEnCasa = null;

			try {
				em.getTransaction().begin();
				addrecetasChefEnCasa = em.merge(recetasChefEnCasa);
				em.getTransaction().commit();

			} catch (Exception e) {

				throw new Exception("Error al persistir Recetario: " + e.getMessage());

			} finally {

				em.close();
			}

			return addrecetasChefEnCasa;
		}
	
		
		public List<RecetasChef> getAllRecetasChef() {
	        EntityManager em = JPAUtil.getEMF().createEntityManager();
	        List<RecetasChef> recetasChef = null;

	        try {
	            String jpql = "SELECT rc FROM RecetasChef rc";
	            Query query = em.createQuery(jpql, RecetasChef.class);
	            recetasChef = query.getResultList();
	        } finally {
	            em.close();
	        }

	        return recetasChef;
	    }
	
		
		public void deleteAllRecetasChef(String tabla) {
	        EntityManager em = JPAUtil.getEMF().createEntityManager();
	        EntityTransaction tx = null;

	        try {
	            tx = em.getTransaction();
	            tx.begin();

	            // Utiliza una sentencia SQL para eliminar todos los registros de la tabla
	          
	            String sql = "DELETE FROM "+tabla.toString();
	            em.createNativeQuery(sql).executeUpdate();
	            tx.commit();
	            System.out.println("Todos los registros de la tabla: "+ tabla +", fueron borrados con Exito!");
	        } catch (Exception e) {
	            if (tx != null && tx.isActive()) {
	                tx.rollback();
	                System.out.println("La tabla:" + tabla + "esta vacia." );
	                e.printStackTrace();
	            }
	        } finally {
	            em.close();
	        }
	        
	        
	    }
		
		// Metodo para traer Recetario por id
		public RecetasChef getRecetaById(int idReceta) {

			EntityManager em = JPAUtil.getEMF().createEntityManager();
			RecetasChef receta  = null;

			try {

				receta  = em.find(RecetasChef.class, idReceta);

			} finally {

				em.close();
			}

			return receta ;
		}
		
		public String deleteRecetaChef(int idRecetaChef) {

			String res = "";
			EntityManager em = JPAUtil.getEMF().createEntityManager();
			RecetasChef receta = null;

			try {
				receta = em.find(RecetasChef.class, idRecetaChef);// lo busco
				em.getTransaction().begin();
				em.remove(receta);
				em.getTransaction().commit();

				res = "Receta eliminado correctamente.";

			} catch (Exception e) {
				res = "Error al borrar recetario.";
			}

			return res;

		}
		

		
}
