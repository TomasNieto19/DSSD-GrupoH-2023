package entities;


import javax.persistence.Column;
import javax.persistence.Entity;
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
@Table(name = "receta_en_seleccion_del_chef")
public class RecetaEnSeleccionDelChef {
	
	@Id
	@Column(name = "id")
	@ToString.Exclude
	private int id;//esta variable la creo para que poner una PK, sino se rompe todo(tambien esta en la bd)
	
	@Column(name = "idRecetario")
	private int idRecetario;
	@Column(name = "idReceta")
	private int idReceta;
	
	
	  public RecetaEnSeleccionDelChef(int idRecetario, int idReceta) { 
		  super();
		  this.idRecetario = idRecetario; 
		  this.idReceta = idReceta; 
	  }


	@Override
	public String toString() {
		return "\nReceta En Seleccion Del Chef [id=" + id + ", idRecetario=" + idRecetario + ", idReceta=" + idReceta + "]";
	}
	  
	  
	 
	
	
}
