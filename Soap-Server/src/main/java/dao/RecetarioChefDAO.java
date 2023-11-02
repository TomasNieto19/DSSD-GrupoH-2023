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

public class RecetarioChefDAO {
	
	private static RecetarioChefDAO instance;

	// Patron Singleton para reutilizar la instancia en el serivce
	public static RecetarioChefDAO getInstance() {

		if (instance == null) {
			instance = new RecetarioChefDAO();
		}
		return instance;
	}
	public SeleccionDelChef addOrUpdateSeleccionDelChef(SeleccionDelChef seleccionDelChef) throws Exception {

		EntityManager em = JPAUtil.getEMF().createEntityManager();

		SeleccionDelChef SeleccionDelChefAdd = null;

		try {
			em.getTransaction().begin();
			SeleccionDelChefAdd = em.merge(seleccionDelChef);
			em.getTransaction().commit();

		} catch (Exception e) {

			throw new Exception("Error al persistir SeleccionDelChef: ");

		} finally {

			em.close();
		}

		return SeleccionDelChefAdd;
	}

	// Metodo para traer todos los recetarios de la BD
		@SuppressWarnings("unchecked")
		public List<SeleccionDelChef> getAll() {

			EntityManager em = JPAUtil.getEMF().createEntityManager();
			List<SeleccionDelChef> seleccionDelChef = new ArrayList<>();

			try {

				String jpql = "SELECT sc FROM seleccion_del_chef sh";
				Query query = em.createQuery(jpql, SeleccionDelChef.class);
				seleccionDelChef = query.getResultList();

			} finally {

				em.close();
			}

			return seleccionDelChef;
		}
		
		
		// Metodo para traer seleccion Del Chef por id
		public SeleccionDelChef getSeleccionDelChefById(int idSelecChef) {

			EntityManager em = JPAUtil.getEMF().createEntityManager();
			SeleccionDelChef seleccionDelChef = null;

			try {

				seleccionDelChef = em.find(SeleccionDelChef.class, idSelecChef);

			} finally {

				em.close();
			}

			return seleccionDelChef;
		}
		
		public String deleteSeleccionDelChef(int idSelecChef) {

			String res = "";
			EntityManager em = JPAUtil.getEMF().createEntityManager();
			SeleccionDelChef seleccionDelChef = null;

			try {
				seleccionDelChef = em.find(SeleccionDelChef.class, idSelecChef);// lo busco
				em.getTransaction().begin();
				em.remove(seleccionDelChef);
				em.getTransaction().commit();

				res = "seleccion Del Chef eliminado correctamente.";

			} catch (Exception e) {
				res = "Error al borrar seleccion Del Chef.";
			}

			return res;

		}

}

