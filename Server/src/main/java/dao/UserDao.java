package dao;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;
import org.hibernate.Hibernate;
import javax.persistence.TypedQuery;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import entities.Recipe;
import entities.User;

public class UserDao {

	private static UserDao instance;

	// Patron Singleton para reutilizar la instancia en el serivce
	public static UserDao getInstance() {

		if (instance == null) {
			instance = new UserDao();
		}
		return instance;
	}

	
	// Metodo para persistir un usuario en la BD
	public User addOrUpdateUser(User user) throws Exception {

		EntityManager em = JPAUtil.getEMF().createEntityManager();

		User userAdd = null;

		try {

			em.getTransaction().begin();
			userAdd = em.merge(user);
			em.getTransaction().commit();

		} catch (Exception e) {

			throw new Exception("Error al persistir Usuario: " + e.getMessage());

		} finally {
			
			em.close();
		}

		return userAdd;
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

	
	// Metodo que retorla la lista de usrios que sigue el userId
	public Set<User> getUserFollowing(int userId) {

		EntityManager em = JPAUtil.getEMF().createEntityManager();
		User user = null;

		try {

			user = em.find(User.class, userId);

			Hibernate.initialize(user.getFollowing());

		} finally {

			em.close();
		}

		return user.getFollowing();
	}
	//metodo que retorna la lista de recetas que el usuario faveó
	public Set<Recipe> getUserFavoriteRecipe(int userId){
		
		EntityManager em = JPAUtil.getEMF().createEntityManager();
		User user = null;
		try {

			user = em.find(User.class, userId);

			Hibernate.initialize(user.getFavoriteRecipes());

		} finally {

			em.close();
		}

		return user.getFavoriteRecipes();
	}


	//TRAE UN USUARIO  CUANDO EL USERNAME Y EL PASS SON CORRECTAS
	public User getUserByUsernameAndPassword(String username, String password) {
	    EntityManager em = JPAUtil.getEMF().createEntityManager();
	    TypedQuery<User> query = em.createQuery("SELECT u FROM User u WHERE u.username = :username AND u.password = :password", User.class);
	    query.setParameter("username", username);
	    query.setParameter("password", password);
	    List<User> results = query.getResultList();
	    em.close();

	    if (results.size() == 1) {
	        return results.get(0);
	    } else {
	    	System.err.println("No se encontró un usuario con las credenciales especificadas" +
	                            "\nUsuario "+username +" Clave " +password);
	        return null; 
	        
	    }
	}
	
	
	public User getUserByUsernameAndEmail(String username, String email) {
	    EntityManager em = JPAUtil.getEMF().createEntityManager();
	    TypedQuery<User> query = em.createQuery("SELECT u FROM User u WHERE u.username = :username AND u.email = :email", User.class);
	    query.setParameter("username", username);
	    query.setParameter("email", email);
	    List<User> results = query.getResultList();
	    em.close();
	    if (results.size() == 1) {//USUARIO EXISTE, SE CANCELA CREACION
	    	System.err.println("Usuario o email ya existe ¿desea restablecer contraseña?");

	        return results.get(0);
	    } else {
	    	//sE CREA UN NUEVO USUARIO
	    	System.out.println("Usuario: "+username + " fue creado correctamente!!! ");
	    	
	    	return null; 
	        
	    }
	}


	public User getUserByEmail(String email) {
	    EntityManager em = JPAUtil.getEMF().createEntityManager();
	    TypedQuery<User> query = em.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class);
	    query.setParameter("email", email);
	    List<User> results = query.getResultList();
	    em.close();

	    if (results.size() == 1) {
	        return results.get(0);
	    } else {
	        System.err.println("No se encontró un usuario con el correo electrónico especificado: " + email);
	        return null;
	    }
	}


	public User getUserByUsername(String username) {
	    EntityManager em = JPAUtil.getEMF().createEntityManager();
	    TypedQuery<User> query = em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class);
	    query.setParameter("username", username);
	    List<User> results = query.getResultList();
	    em.close();

	    if (results.size() == 1) {
	        return results.get(0);
	    } else {
	        System.err.println("No se encontró un usuario con el nombre de usuario especificado: " + username);
	        return null;
	    }
	}


	public User updateUser(User password) throws Exception {
	    EntityManager em = JPAUtil.getEMF().createEntityManager();
	    User entity = null;

	    try {
	        em.getTransaction().begin();
	        entity = em.merge(password);
	        em.getTransaction().commit();
	    } catch (Exception e) {
	        throw new Exception("Error al actualizar Usuario: " + e.getMessage());
	    } finally {
	        em.close();
	    }

	    return entity;
	
	 
	 }
   

	public void updatePasswordOfUser(String email, String newPassword) {
        EntityManager em = JPAUtil.getEMF().createEntityManager();
        EntityTransaction transaction = em.getTransaction();

        try {
            transaction.begin();

            // Busca al usuario por su correo electrónico
            TypedQuery<User> query = em.createQuery("SELECT u FROM User u WHERE u.email = :email", User.class);
            query.setParameter("email", email);
            User existingUser = query.getSingleResult();

            if (existingUser != null) {
                // Modifica la contraseña del usuario
                existingUser.setPassword(newPassword);
                em.merge(existingUser);
                transaction.commit();
            } else {
                System.err.println("No se pudo encontrar el usuario en la base de datos.");
            }
        } catch (Exception e) {
            if (transaction != null && transaction.isActive()) {
                transaction.rollback();
            }
            e.printStackTrace();
        } finally {
            em.close();
        }
    }
		

}