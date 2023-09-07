package server;

import dao.*;
import dao.AuthenticationService;
import dao.PasswordResetService;
import dao.RecipeDao;
import dao.RegistrationService;
import dao.UserDao;
import entities.*;
import entities.Recipe;
import java.util.List;

public class prueba {

  public static final String ANSI_GREEN = "\u001B[32m";
  public static final String ANSI_RESET = "\u001B[0m";

  public static void main(String[] args) throws Exception {
    /*
	  System.out.println( UserDao.getInstance().getUserById(10) );
    *
     * System.out.println(UserDao.getInstance().getUserFollowers(1)); 
     *
     * System.out.println(user.getFollowers());
     *
     * Recipe receta = new Recipe("Torta de Chocolate",
     * "Una deliciosa receta de torta de chocolate",
     * "Harina, huevos, chocolate, azúcar...", "Postre",
     * "1. Mezclar ingredientes...", 45, UserDao.getInstance().getUserById(1));
     *
     * RecipeDao.getInstance().addRecipe(receta);
     *
     *
     * System.out.println(RecipeDao.getInstance().getRecipeByUserId(1));
     *
     *
     * System.out.println(RecipeDao.getInstance().getRecipeById(1));
     *
     *
     * Recipe receta = new Recipe("Torta de Chocolate",
     * "Una deliciosa receta de torta de chocolate",
     * "Harina, huevos, chocolate, azúcar...", "Postre",
     * "1. Mezclar ingredientes...", 45, UserDao.getInstance().getUserById(1));
     *
     * RecipeDao.getInstance().addRecipe(receta);
     *
     * Recipe receta = RecipeDao.getInstance().getRecipeById(2);
     *
     * receta.setCategory("Postre");
     *
     * RecipeDao.getInstance().editRecipe(receta);
     *
     * System.out.println(RecipeDao.getInstance().getRecipeById(1));
     *
     * System.out.println(UserDao.getInstance().getUserById(1));
     *
     *
     * Prueba de persistencia desde Java con JPA
     * System.out.println(UserDao.getInstance().getUserById(1));
     *
     * User user = new User("tomas", "tnieto852@gmail.com", "tomiUsername", "1234");
     * UserDao.getInstance().addUser(user);
     *
     *
     * System.out.println( UserDao.getInstance().getAll() ); Prueba traer todos los
     * usuarios List<User> usuarios = UserDao.getInstance().getAll();
     *
     * for (User usuario : usuarios) { System.out.println(usuario); }
     *
     * Prueba traer todos los usuarios List<User> usuarios =
     * UserDao.getInstance().getAll();
     *
     * for (User usuario : usuarios) { System.out.println(usuario); }
     *
     *
     * System.out.println(RecipeDao.getInstance().getAll());
     */
  }
}