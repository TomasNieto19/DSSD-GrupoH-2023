package dao;

import entities.User;

public class RegistrationService {private UserDao userDao = new UserDao();

public boolean isUsernameEmailTaken(String username,String email) {
    User existingUser = userDao.getUserByUsernameAndEmail(username,email);
    return existingUser != null;
}

public boolean registerUser(String name, String email, String username, String password, String role) {
    // verifico si el user o el email esta en uso
    if (isUsernameEmailTaken(username,email) ) {
        return false; // Usuario ya registrado
    }

    // crea usuario y lo guardo en la BD
   
    User newUser = new User(name, email, username, password, role);
    try {
		userDao.addUser(newUser);
	} catch (Exception e) {
		e.printStackTrace();
	}
    return true; // Registro exitoso
}

}
