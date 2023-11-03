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
@Table(name = "recetas_chef")
public class RecetasChef {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int idRecipe;
	
    @Column(name = "titulo", nullable = false)
    private String title;

    @Column(name = "descripcion", nullable = true)
    private String description;

    @Column(name = "tiempoCoccion", nullable = true)
    private int cookTime;

    @Column(name = "ingredientes", nullable = true)
    private String ingredients;

    @Column(name = "pasos", nullable = true)
    private String steps;

    @Column(name = "id_user")
    private Integer users;
    
    @Column(name = "foto", nullable = true)
    private String photoUrl;
    

   

    public RecetasChef(String title, String description, int cookTime, String ingredients, String steps, int users, String photoUrl) {
        super();
        this.title = title;
        this.description = description;
        this.cookTime = cookTime;
        this.ingredients = ingredients;
        this.steps = steps;
        this.users = users;
        this.photoUrl = photoUrl;
        
    }
    public RecetasChef(String title, String description, int cookTime, String ingredients, String steps, String photoUrl) {
        super();
        this.title = title;
        this.description = description;
        this.cookTime = cookTime;
        this.ingredients = ingredients;
        this.steps = steps;
        this.photoUrl = photoUrl;
       
    }
	@Override
	public String toString() {
		return "\nRecetasChef [\nid: " + idRecipe + ", Titulo: " + title + "Descripcion: " + description + "Tiempo de coccion: "
				+ cookTime + ", Ingredientes: " + ingredients + "Pasos: " + steps + "Usuario: " + users + "\nURL foto: "
				+ photoUrl + "]";
	}
    
    
    
}
