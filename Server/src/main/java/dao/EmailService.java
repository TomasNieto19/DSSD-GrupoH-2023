package dao;
public class EmailService {
    public boolean sendResetTokenByEmail(String email, String resetToken) {
        // Simulación de envío de correo electrónico.
        System.out.println("Enviando correo electrónico de restablecimiento de contraseña a: " + email);
        System.out.println("Token de restablecimiento: " + resetToken);
     
        return true;
    }
}
