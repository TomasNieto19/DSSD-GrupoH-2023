package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Getter
@Table(name = "users")
public class User {
	/*
	 * ATRIBUTOS QUE FALTAN: 
	 * List<Usuario> usuarios que sigue 
	 * List<Receta> recetas favoritas
	 */

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_user")
	private int idUser;

	@Column(name = "name", nullable = false)
	private String name;

	@Column(name = "email", nullable = false)
	private String email;

	@Column(name = "username", nullable = false)
	private String username;

	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "role", nullable = false)
	private String role;

	public User(String name, String email, String username, String password,String role) {
		this.name = name;
		this.email = email;
		this.username = username;
		this.password = password;
		this.role= role;
	}

	@Override
	public String toString() {
		return 	"User id: " + idUser + ", name:" + name + ", email: " + email + ", username=" + username
				+ ", password: " + password + ", role: " + role ;
	}
	
	
}