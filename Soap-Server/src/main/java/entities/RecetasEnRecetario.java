package entities;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class RecetasEnRecetario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private RecetarioChef recetarioChef; // Asociación con el recetario al que pertenece la receta

    @ManyToOne
    private RecetasChef recetaChef; // Asociación con la receta que está en el recetario

    // Getters y setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RecetarioChef getRecetarioChef() {
        return recetarioChef;
    }

    public void setRecetarioChef(RecetarioChef recetarioChef) {
        this.recetarioChef = recetarioChef;
    }

    public RecetasChef getRecetaChef() {
        return recetaChef;
    }

    public void setRecetaChef(RecetasChef recetaChef) {
        this.recetaChef = recetaChef;
    }

    // Constructor

    public RecetasEnRecetario() {
        // Constructor vacío
    }

    // Otros métodos y anotaciones según sea necesario
}
