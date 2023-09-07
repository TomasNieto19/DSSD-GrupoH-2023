package dao;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import entities.User;

public class PasswordResetService {
    private UserDao userDao = new UserDao();
    private EmailService emailService = new EmailService(); // Suponemos que tienes una clase EmailService para enviar correos electrónicos.

    // Mapa para almacenar los tokens de restablecimiento de contraseña asociados a los usuarios.
    private Map<String, String> passwordResetTokens = new HashMap<>();

    // Tiempo de vida de los tokens en milisegundos (por ejemplo, 1 hora).
    private static final long TOKEN_EXPIRATION_TIME = 3600000;

    public boolean requestPasswordReset(String email) {
        User user = userDao.getUserByEmail(email);

        if (user != null) {
            // Generar un token de restablecimiento de contraseña único y asociarlo al usuario.
            String resetToken = generateResetToken();
            passwordResetTokens.put(resetToken, user.getUsername());

            // Enviar el token de restablecimiento de contraseña por correo electrónico.
            boolean emailSent = emailService.sendResetTokenByEmail(email, resetToken);

            if (emailSent) {
            	/*Luego de enviar el toquen al email "cambio la contraseña en la BD"
            	tambien se podria usar el metodo para  resetear el pass y luego 
            	borrar el token*/
            	
            	UserDao.getInstance().updatePasswordOfUser(email,resetToken);

                return true; // Solicitud de restablecimiento exitosa
            }
        }

        return false; // El correo electrónico no está asociado a una cuenta existente
    }

    
    
    public boolean resetPassword(String resetToken, String newPassword) throws Throwable {
        // Verificar si el token de restablecimiento es válido
        if (passwordResetTokens.containsKey(resetToken)) {
            String username = passwordResetTokens.get(resetToken);
            User user = userDao.getUserByUsername(username);

            if (user != null) {
                // Actualizar la contraseña del usuario y eliminar el token de restablecimiento.
                user.setPassword(newPassword);
                userDao.updateUser(user);
                passwordResetTokens.remove(resetToken);
                return true; // Restablecimiento de contraseña exitoso
            }
        }

        return false; // Token no válido o expirado
    }

    // Método para generar un token de restablecimiento de contraseña único.
    private String generateResetToken() {
        // Utilizamos UUID para generar un token único.
        return UUID.randomUUID().toString();
    }
}
