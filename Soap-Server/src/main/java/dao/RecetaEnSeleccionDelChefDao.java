package dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;


import entities.RecetasChef;
import entities.RecetaEnSeleccionDelChef;
import entities.RecipeBook;
import entities.Recipe_in_RecipeBook;
import entities.SeleccionDelChef;
import entities.UsuarioChef;

import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class RecetaEnSeleccionDelChefDao {
	
	private static RecetaEnSeleccionDelChefDao instance;

	// Patron Singleton para reutilizar la instancia en el serivce
	public static RecetaEnSeleccionDelChefDao getInstance() {

		if (instance == null) {
			instance = new RecetaEnSeleccionDelChefDao();
		}
		return instance;
	}
	
	public RecetaEnSeleccionDelChef addRecetaEnSeleccionDelChef(RecetaEnSeleccionDelChef recetaEnSeleccionDelChef) throws Exception {

		EntityManager em = JPAUtil.getEMF().createEntityManager();

		RecetaEnSeleccionDelChef recetaEnSeleccionDelChefAdd = null;

		try {
			em.getTransaction().begin();
			recetaEnSeleccionDelChefAdd = em.merge(recetaEnSeleccionDelChef);
			em.getTransaction().commit();

		} catch (Exception e) {

			throw new Exception("Error al persistir Receta En Seleccion Del Chef: ");

		} finally {

			em.close();
		}

		return recetaEnSeleccionDelChefAdd;
	}

	// Metodo para traer todos los recetarios de la BD
		@SuppressWarnings("unchecked")
		public List<RecetaEnSeleccionDelChef> getAllRecetaEnSeleccionDelChef() {

			EntityManager em = JPAUtil.getEMF().createEntityManager();
			List<RecetaEnSeleccionDelChef> recetaEnSeleccionDelChef = new ArrayList<>();

			try {

				String jpql = "SELECT rs FROM receta_en_seleccion_del_chef rs";
				Query query = em.createQuery(jpql, RecetaEnSeleccionDelChef.class);
				recetaEnSeleccionDelChef = query.getResultList();

			} finally {

				em.close();
			}

			return recetaEnSeleccionDelChef;
		}
		
		
		// Metodo para traer seleccion Del Chef por id
		public RecetaEnSeleccionDelChef getRecetaEnSeleccionDelChefById(int idSelecChef) {

			EntityManager em = JPAUtil.getEMF().createEntityManager();
			RecetaEnSeleccionDelChef recetaEnSeleccionDelChef = null;

			try {

				recetaEnSeleccionDelChef = em.find(RecetaEnSeleccionDelChef.class, idSelecChef);

			} finally {

				em.close();
			}

			return recetaEnSeleccionDelChef;
		}
		
		public String deleteRecetaEnSeleccionDelChef(int idSelecChef) {

			String res = "";
			EntityManager em = JPAUtil.getEMF().createEntityManager();
			RecetaEnSeleccionDelChef recetaEnSeleccionDelChef = null;

			try {
				recetaEnSeleccionDelChef = em.find(RecetaEnSeleccionDelChef.class, idSelecChef);// lo busco
				em.getTransaction().begin();
				em.remove(recetaEnSeleccionDelChef);
				em.getTransaction().commit();

				res = "Receta En Seleccion Del Chef eliminado correctamente.";

			} catch (Exception e) {
				res = "Error al borrar Receta En Seleccion Del Chef.";
			}

			return res;

		}

}

