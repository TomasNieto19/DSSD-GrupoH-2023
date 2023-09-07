package server;

import java.util.List;

import dao.AuthenticationService;
import dao.PasswordResetService;
import dao.RecipeDao;
import dao.RegistrationService;
import dao.UserDao;
import entities.Recipe;
import entities.User;

public class Login {
	public static final String ANSI_GREEN = "\u001B[32m";
	public static final String ANSI_RESET = "\u001B[0m";

	public static void main(String[] args) throws Exception {

	
		    //*METODO RETORNA INFORMACION DEL USUARIO  USER Y PASS CORRECTA------------------------------------------------------------
		    //***************************
			System.out.println("\nTrae informacion de usuario (User,Pass)\n"+UserDao.getInstance().getUserByUsernameAndPassword("user","1234"));
			
			
			
			//*METODO PARA INICIAR SESION----------------------------------------------------------------------------------------------
			//***************************
			System.out.println("\nInicio de sesion");
			AuthenticationService authService = new AuthenticationService();
	        String username = "ADMIn";
	        String password = "1234";

	        User authenticatedUser = authService.authenticate(username, password);

	        if (authenticatedUser != null) {
	            System.out.println(ANSI_GREEN+ "Inicio de sesión exitoso para el usuario: " + authenticatedUser.getName()+ANSI_RESET);
	        } else {
	            System.err.println("Inicio de sesión fallido. Credenciales incorrectas.");
	        }
	       
	        
	        
	        //*METODO PARA REGISTRAR USUARIOS (CON VALIDACION)-------------------------------------------------------------------------
	        //************************************************
	        System.out.println("\nRegistro de usuario");
	        RegistrationService registrationService = new RegistrationService ();
	        
	        registrationService.registerUser("Matias", "matiasferreira123@gmail.com", "User123", "1234","Role");
	        
	      //*METODO PARA RESTABLECER CONTRASEÑA--------------------------------------------------------------------------------------
			 //*******************************************
			 System.out.println("\nRestablecer contraseña");
			 PasswordResetService passwordResetService = new PasswordResetService();
			 passwordResetService.requestPasswordReset("matiasferreira123@gmail.com");
			 
			 System.out.println("\nRestablecer contraseña fallida");
			 passwordResetService.requestPasswordReset("matiasferreira123@gmail.coma");
			 
	        
	        //*TRAE TODOS LOS USUARIOS DE LA BASE DE DATOS----------------------------------------------------------------------------  
	        //********************************************
	        System.out.println("\nTrae todos los usuarios de BD");
			  List<User> usuarios = UserDao.getInstance().getAll();
			  
			   for (User usuario : usuarios) {
			 	System.out.println(usuario); 
			 	}
			   
			   
			 
			//*METODO PARA CREAR USUARIO (SIN VALIDACION)------------------------------------------------------------------------------
		    //*******************************************
			 System.out.println("\nCreo usuario sin validacion ");
		     //User user = new User("Walter", "Walter@gmail.com", "UserW", "1234","Role");
		     //UserDao.getInstance().addUser(user);
	         //System.out.println(UserDao.getInstance().getUserById(1)); 
			   
	        
			//*TRAE USUARIO POR ID----------------------------------------------------------------------------------------------------  
		     //********************
			   System.out.println("\nTrae usuario por id");
		        User retrievedUser;
				try {
					retrievedUser = UserDao.getInstance().getUserById(2);
					System.out.println("Usuario devuelto por id: " + retrievedUser);
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			//*TRAE USUARIO POR USERNAME----------------------------------------------------------------------------------------------  
			 //********************	
			 System.out.println("\nTrae usuario por username");   
			 System.out.println(UserDao.getInstance().getUserByUsername("ADMIN"));
			 //System.out.println(UserDao.getInstance().getUserByUsername("ADMINn"));
			 
			//*TRAE USUARIO POR EMAIL-------------------------------------------------------------------------------------------------  
		     //******************** 
			 System.out.println("\nTrae usuario por email"); 
			 System.out.println(UserDao.getInstance().getUserByEmail("matiasferreira123@gmail.com"));
			 //System.out.println(UserDao.getInstance().getUserByEmail("matiasferreira123@gmail.comm"));
	
			//*CAMBIAR CONTRASEÑA DE FORMA MANUAL-------------------------------------------------------------------------------------  
		     //********************
			 System.out.println("\nCamabiar contraseña de forma manual");
			 UserDao.getInstance().updatePasswordOfUser(UserDao.getInstance().getUserById(3).getEmail(), "CAMBIADO");
			 System.out.println(UserDao.getInstance().getUserById(3));
			
	
	}
}
