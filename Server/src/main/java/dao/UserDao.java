package dao;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import entities.User;

public class UserDao {
	/*
	 * METODOS A IMPLEMENTAR: 
	 * - LISTADO DE USUARIOS QUE SIGUE. 
	 * - LISTADO DE RECETAS FAVORITAS.
	 */

	private static UserDao instance;

	// Patron Singleton para reutilizar la instancia en el serivce
	public static UserDao getInstance() {

		if (instance == null) {
			instance = new UserDao();
		}
		return instance;
	}

	
	// Metodo para persistir un usuario en la BD
	public void addUser(User user) throws Exception {

		EntityManager em = JPAUtil.getEMF().createEntityManager();
	

		try {

			em.getTransaction().begin();
			em.persist(user);
			em.getTransaction().commit();

		} catch (Exception e) {

			throw new Exception("Error al persistir Usuario: " + e.getMessage());

		} finally {
			
			em.close();
		}
	}

	
	// Metodo para traer todos los usuarios de la BD
	@SuppressWarnings("unchecked")
	public List<User> getAll() {

		EntityManager em = JPAUtil.getEMF().createEntityManager();
		List<User> usuarios = new ArrayList<>();

		try {

			String jpql = "SELECT u FROM User u";
			Query query = em.createQuery(jpql, User.class);
			usuarios = query.getResultList();

		} finally {

			em.close();
		}

		return usuarios;
	}

	
	// Metodo para traer usuario por id
	public User getUserById(int userId) {

		EntityManager em = JPAUtil.getEMF().createEntityManager();
		User user = null;

		try {

			user = em.find(User.class, userId);

		} finally {

			em.close();

		}

		return user;
	}

	
}