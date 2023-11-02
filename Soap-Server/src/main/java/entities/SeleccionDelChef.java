package entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@ToString
@EqualsAndHashCode
@Setter
@Getter
@Table(name = "seleccion_del_chef")
public class SeleccionDelChef {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int idSelecChef;
	
	@Column(name = "nombre", nullable = false)
	private String name;
	
	@Column(name = "idUsuario", nullable = false)
	private int idUser;
	
	@Column(name = "visibleComunidad", nullable = false)
	private boolean visibleComunidad;
	
	public SeleccionDelChef(String name, int idUser, boolean visibleComunidad) {
		super();
		this.name = name;
		this.idUser = idUser;
		this.visibleComunidad = visibleComunidad;
	}
 
}